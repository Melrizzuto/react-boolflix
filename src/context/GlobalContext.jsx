import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [error, setError] = useState(null);

    const fetchMoviesAndSeries = () => {
        const apiKey = import.meta.env.VITE_API_KEY; // Prendo la chiave API dal file .env
        setLoading(true); // Imposto lo stato di caricamento su true
        setError(null); // Reset errore precedente

        const moviesPromise = axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: { api_key: apiKey, language: 'it-IT' },
        });

        const seriesPromise = axios.get('https://api.themoviedb.org/3/tv/popular', {
            params: { api_key: apiKey, language: 'it-IT' },
        });

        Promise.all([moviesPromise, seriesPromise])
            .then(([moviesResponse, seriesResponse]) => {
                setMovies(moviesResponse.data.results || []);
                setSeries(seriesResponse.data.results || []);
            })
            .catch((error) => {
                console.error('Errore durante il recupero dei dati:', error);
                setError('Impossibile recuperare i dati. Riprova più tardi.');
            })
            .finally(() => {
                setLoading(false); // Alla fine, metto il caricamento su false
            });
    };

    // Chiamata iniziale per recuperare i dati
    useEffect(() => {
        fetchMoviesAndSeries();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                movies,
                setMovies,
                series,
                setSeries,
                loading,
                setLoading,
                isSearching,
                setIsSearching,
                selectedGenre,
                setSelectedGenre,
                error,
                setError,
                fetchMoviesAndSeries,
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