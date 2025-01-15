import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = import.meta.env.VITE_API_KEY;

    // Funzione per recuperare film e serie popolari
    const fetchPopularContent = () => {
        setLoading(true);
        setError(null);

        axios
            .get('https://api.themoviedb.org/3/movie/popular', {
                params: { api_key: apiKey, language: 'it-IT' },
            })
            .then((response) => {
                setMovies(response.data.results || []);
            })
            .catch((error) => {
                console.error('Errore durante il recupero dei film:', error);
                setError('Errore durante il recupero dei film.');
            })
            .finally(() => {
                axios
                    .get('https://api.themoviedb.org/3/tv/popular', {
                        params: { api_key: apiKey, language: 'it-IT' },
                    })
                    .then((response) => {
                        setSeries(response.data.results || []);
                    })
                    .catch((error) => {
                        console.error('Errore durante il recupero delle serie:', error);
                        setError('Errore durante il recupero delle serie.');
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            });
    };

    // Funzione per la ricerca di film e serie
    const searchContent = (query) => {
        setLoading(true);
        setError(null);

        axios
            .get('https://api.themoviedb.org/3/search/movie', {
                params: { api_key: apiKey, query, language: 'it-IT' },
            })
            .then((response) => {
                const movieResults = response.data.results || [];
                setMovies(movieResults);

                axios
                    .get('https://api.themoviedb.org/3/search/tv', {
                        params: { api_key: apiKey, query, language: 'it-IT' },
                    })
                    .then((response) => {
                        const seriesResults = response.data.results || [];
                        setSeries(seriesResults);

                        if (movieResults.length === 0 && seriesResults.length === 0) {
                            setError('Nessun risultato trovato.');
                        }
                    })
                    .catch((error) => {
                        console.error('Errore durante la ricerca delle serie:', error);
                        setError('Errore durante la ricerca delle serie.');
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            })
            .catch((error) => {
                console.error('Errore durante la ricerca dei film:', error);
                setError('Errore durante la ricerca dei film.');
                setLoading(false); // Fermare il caricamento in caso di errore immediato
            });
    };

    // Chiamata iniziale per contenuti popolari
    useEffect(() => {
        fetchPopularContent();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                movies,
                series,
                loading,
                error,
                fetchPopularContent,
                searchContent,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

function useGlobalContext() {
    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobalContext };