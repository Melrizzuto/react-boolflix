import { useState } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';
import styles from './SearchBar.module.css';

function SearchBar() {
    // creo gli stati per la ricerca e il tipo di ricerca (film o serie)
    const [searchValue, setSearchValue] = useState('');
    const [searchType, setSearchType] = useState('movie');
    const { setMovies, setSeries, setLoading, setError, loading, error } = useGlobalContext();

    // funzione per gestire la ricerca
    function handleSearch() {
        if (!searchValue) return; // se non c'è valore di ricerca, esco dalla funzione

        const apiKey = import.meta.env.VITE_API_KEY; // prendo la chiave API dal file .env
        const endpoint = searchType === 'movie' ? 'movie' : 'tv'; // imposta l'endpoint in base al tipo di ricerca

        setLoading(true); // imposta lo stato di caricamento su true
        setError(null); // resetto eventuali errori precedenti

        // faccio la richiesta per cercare i risultati tramite API
        axios
            .get(`https://api.themoviedb.org/3/search/${endpoint}`, {
                params: {
                    api_key: apiKey,
                    query: searchValue, // parametro di ricerca
                    language: 'it-IT', // lingua italiana
                },
            })
            .then((response) => {
                setLoading(false); // finita la richiesta, imposto loading su false
                if (response.data.results) {
                    // se ci sono risultati, li setto nei rispettivi stati
                    if (searchType === 'movie') {
                        setMovies(response.data.results);
                    } else {
                        setSeries(response.data.results);
                    }
                } else {
                    setError('Nessun risultato trovato'); // se non ci sono risultati, setto un errore
                }
            })
            .catch((error) => {
                setLoading(false); // se c'è un errore nella richiesta, imposto loading su false
                setError('Errore durante la ricerca, riprova più tardi'); // setto il messaggio di errore
                console.error('Errore nella richiesta API:', error); // loggo l'errore
            });
    }

    return (
        <div className={styles.searchBarContainer}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Cerca un film o una serie..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)} // aggiorno lo stato searchvalue al cambio dell'input
                    className={styles.searchInput}
                />
                <button
                    onClick={handleSearch}
                    className={styles.searchButton}
                    disabled={loading} // disabilito il tasto se c'è una ricerca in corso
                >
                    Cerca
                </button>
            </div>
            <select
                className={styles.searchType}
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)} // cambio il tipo di ricerca (film o serie)
            >
                <option value="movie">Film</option>
                <option value="tv">Serie TV</option>
            </select>
            {error && <p className={styles.error}>{error}</p>} {/* Mostro un errore se presente */}
        </div>
    );
}

export default SearchBar;