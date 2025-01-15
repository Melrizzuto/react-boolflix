import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';
import styles from './SearchBar.module.css';

function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const [searched, setSearched] = useState(false);
    const { setMovies, setSeries, setLoading, setError } = useGlobalContext();

    // Funzione per gestire la ricerca
    function handleSearch() {
        const query = searchValue;
        const apiKey = import.meta.env.VITE_API_KEY;

        setLoading(true);
        setError(null);

        // Eseguiamo due ricerche, una per i film e una per le serie
        const movieSearch = axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: apiKey,
                query: query,
                language: 'it-IT',
            },
        });

        const seriesSearch = axios.get(`https://api.themoviedb.org/3/search/tv`, {
            params: {
                api_key: apiKey,
                query: query,
                language: 'it-IT',
            },
        });

        // Eseguiamo entrambe le richieste contemporaneamente
        Promise.all([movieSearch, seriesSearch])
            .then((responses) => {
                setLoading(false);
                const movieResults = responses[0].data.results;
                const seriesResults = responses[1].data.results;

                // Impostiamo i film e le serie
                setMovies(movieResults);
                setSeries(seriesResults);
                setSearched(true); // Impostiamo "searched" a true dopo aver cercato

                // Se non ci sono risultati, impostiamo un messaggio di errore
                if (movieResults.length === 0 && seriesResults.length === 0) {
                    setError('Nessun risultato trovato');
                }
            })
            .catch((error) => {
                setLoading(false);
                setError('Errore durante la ricerca, riprova più tardi');
                console.error('Errore nella richiesta API:', error);
            });
    }

    // Effettua la ricerca solo se c'è qualcosa nella barra di ricerca
    useEffect(() => {
        if (!searchValue && !searched) {
            // Carica i contenuti predefiniti solo quando la barra di ricerca è vuota e non è stata eseguita una ricerca
            const apiKey = import.meta.env.VITE_API_KEY;
            setLoading(true);
            // Chiamate per film e serie più popolari
            const moviePopular = axios.get(`https://api.themoviedb.org/3/movie/popular`, {
                params: {
                    api_key: apiKey,
                    language: 'it-IT',
                },
            });

            const seriesPopular = axios.get(`https://api.themoviedb.org/3/tv/popular`, {
                params: {
                    api_key: apiKey,
                    language: 'it-IT',
                },
            });

            // Eseguiamo entrambe le richieste per i contenuti più popolari
            Promise.all([moviePopular, seriesPopular])
                .then((responses) => {
                    setLoading(false);
                    const movieResults = responses[0].data.results;
                    const seriesResults = responses[1].data.results;
                    setMovies(movieResults); // Impostiamo i film più popolari
                    setSeries(seriesResults);
                })
                .catch((error) => {
                    setLoading(false);
                    setError('Errore durante il recupero dei contenuti');
                    console.error('Errore nella richiesta API:', error);
                });
        }
    }, [searchValue, setMovies, setSeries, setLoading, setError, searched]);

    // Gestisco il cambio nella barra di ricerca
    function handleChange(e) {
        setSearchValue(e.target.value);
        setSearched(false); // Resetto searched quando si modifica la ricerca
    }

    // Funzione che avvia la ricerca quando l'utente preme "Enter"
    function SearchOnEnter(e) {
        if (e.code === 'Enter' && searchValue.trim()) {
            handleSearch();
        }
    }

    return (
        <div className={styles.searchBarContainer}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Cerca un film o una serie..."
                    value={searchValue}
                    onChange={handleChange} // Aggiorno searchValue mentre digito
                    onKeyUp={SearchOnEnter} // Attiva la ricerca premendo "Enter"
                    className={styles.searchInput}
                />
                <button
                    onClick={handleSearch}
                    className={styles.searchButton}
                >
                    Cerca
                </button>
            </div>


        </div>
    );
}

export default SearchBar;