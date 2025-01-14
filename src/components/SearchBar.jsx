import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';
import styles from './SearchBar.module.css';

function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const [searchType, setSearchType] = useState('movie');
    const { setMovies, setSeries, setLoading, setError, loading, error } = useGlobalContext();

    // funzione per gestire la ricerca
    function handleSearch(query) {
        const apiKey = import.meta.env.VITE_API_KEY;
        const endpoint = searchType === 'movie' ? 'movie' : 'tv';

        setLoading(true);
        setError(null);

        axios
            .get(`https://api.themoviedb.org/3/search/${endpoint}`, {
                params: {
                    api_key: apiKey,
                    query: query,
                    language: 'it-IT',
                },
            })
            .then((response) => {
                setLoading(false);
                if (response.data.results) {
                    if (searchType === 'movie') {
                        setMovies(response.data.results);
                    } else {
                        setSeries(response.data.results);
                    }
                } else {
                    setError('Nessun risultato trovato');
                }
            })
            .catch((error) => {
                setLoading(false);
                setError('Errore durante la ricerca, riprova più tardi');
                console.error('Errore nella richiesta API:', error);
            });
    };

    // effettuo la ricerca solo se c'è qualcosa nella search bar
    useEffect(() => {
        if (searchValue) {
            handleSearch(searchValue);
        } else {
            // se non ci sono valori nella search bar, carica i contenuti predefiniti
            const apiKey = import.meta.env.VITE_API_KEY;
            setLoading(true);
            axios
                .get(`https://api.themoviedb.org/3/${searchType}/popular`, {
                    params: {
                        api_key: apiKey,
                        language: 'it-IT',
                    },
                })
                .then((response) => {
                    setLoading(false);
                    if (searchType === 'movie') {
                        setMovies(response.data.results);
                    } else {
                        setSeries(response.data.results);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    setError(error, 'Errore durante il recupero dei contenuti');
                });
        }
    }, [searchValue, searchType, setMovies, setSeries, setLoading, setError]);

    return (
        <div className={styles.searchBarContainer}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Cerca un film o una serie..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)} // aggiorno searchValue mentre digito
                    className={styles.searchInput}
                />
            </div>

            {/* Seleziona tra Film o Serie TV */}
            <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)} // aggiorna searchType
                className={styles.searchType}
            >
                <option value="movie">Film</option>
                <option value="tv">Serie TV</option>
            </select>

            {/* Mostra un indicatore di caricamento */}
            {loading && <p className={styles.loading}>Caricamento...</p>}

            {/* Mostra gli errori se ce ne sono */}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

export default SearchBar;