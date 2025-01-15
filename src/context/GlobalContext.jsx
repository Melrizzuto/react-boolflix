import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Creo il contesto globale
const GlobalContext = createContext();

function GlobalProvider({ children }) {
    // Definisco gli stati per memorizzare film, serie, errori e lo stato di caricamento
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_API_KEY;

    // Memorizzo i contenuti iniziali per ripristinarli successivamente
    const [initialMovies, setInitialMovies] = useState([]);
    const [initialSeries, setInitialSeries] = useState([]);

    // Aggiungo uno stato per tracciare se l'utente ha fatto una ricerca
    const [hasSearched, setHasSearched] = useState(false);

    // Funzione che carica i contenuti popolari (film e serie)
    const fetchPopularContent = () => {
        setLoading(true);
        setError(null);

        // Carico i film popolari dall'API
        axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: { api_key: apiKey, language: 'it-IT' },
        })
            .then(response => {
                const moviesData = response.data.results || [];
                setMovies(moviesData);
                setInitialMovies(moviesData); // Salvo i contenuti iniziali dei film
            })
            .catch(error => {
                console.error('Errore durante il recupero dei film:', error);
                setError('Errore durante il recupero dei film.');
            });

        // Carico le serie popolari dall'API
        axios.get('https://api.themoviedb.org/3/tv/popular', {
            params: { api_key: apiKey, language: 'it-IT' },
        })
            .then(response => {
                const seriesData = response.data.results || [];
                setSeries(seriesData);
                setInitialSeries(seriesData); // Salvo i contenuti iniziali delle serie
            })
            .catch(error => {
                console.error('Errore durante il recupero delle serie:', error);
                setError('Errore durante il recupero delle serie.');
            })
            .finally(() => setLoading(false));
    };

    // Funzione per ripristinare i contenuti iniziali se la ricerca è vuota
    const resetContent = () => {
        setMovies(initialMovies);  // Ripristino i film iniziali
        setSeries(initialSeries);  // Ripristino le serie iniziali
    };

    // Funzione per eseguire la ricerca dei contenuti in base alla query dell'utente
    const searchContent = (query) => {
        setLoading(true);
        setError(null);

        // Se la query è vuota, ripristino i contenuti iniziali
        if (!query.trim()) {
            resetContent(); // Chiamo la funzione per ripristinare i contenuti
            setHasSearched(false); // Indico che non è stata fatta una ricerca
            return;
        }

        // Eseguo la ricerca dei film in base alla query
        axios.get('https://api.themoviedb.org/3/search/movie', {
            params: { api_key: apiKey, query, language: 'it-IT' },
        })
            .then(response => {
                setMovies(response.data.results || []);
            })
            .catch(error => {
                console.error('Errore durante la ricerca dei film:', error);
                setError('Errore durante la ricerca dei film.');
            });

        // Eseguo la ricerca delle serie in base alla query
        axios.get('https://api.themoviedb.org/3/search/tv', {
            params: { api_key: apiKey, query, language: 'it-IT' },
        })
            .then(response => {
                setSeries(response.data.results || []);
            })
            .catch(error => {
                console.error('Errore durante la ricerca delle serie:', error);
                setError('Errore durante la ricerca delle serie.');
            })
            .finally(() => {
                setLoading(false);
                setHasSearched(true); // Indico che la ricerca è stata effettuata
            });
    };

    // Uso useEffect per caricare i contenuti popolari al primo caricamento
    useEffect(() => {
        fetchPopularContent();
    }, []);

    // Fornisco il contesto con tutte le funzioni e gli stati necessari
    return (
        <GlobalContext.Provider value={{
            movies,
            series,
            loading,
            error,
            fetchPopularContent,
            searchContent,
            hasSearched, // Aggiungo l'informazione sulla ricerca
            resetContent // Fornisco la funzione per resettare i contenuti
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

function useGlobalContext() {
    // Restituisco il contesto per permettere l'accesso in altre parti dell'app
    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobalContext };

