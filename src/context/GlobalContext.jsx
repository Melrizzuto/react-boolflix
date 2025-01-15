import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Creazione del contesto globale
const GlobalContext = createContext();

// Componente Provider per il contesto globale
function GlobalProvider({ children }) {
    // Stati per gestire i dati, il caricamento e gli errori
    const [movies, setMovies] = useState([]); // Stato per memorizzare i film
    const [series, setSeries] = useState([]); // Stato per memorizzare le serie
    const [loading, setLoading] = useState(false); // Stato per indicare il caricamento
    const [error, setError] = useState(null); // Stato per gestire eventuali errori

    // Chiave API memorizzata nell'ambiente di sviluppo
    const apiKey = import.meta.env.VITE_API_KEY;

    /**
     * Funzione per recuperare i contenuti popolari (film e serie)
     * Effettua due chiamate API consecutive per ottenere i dati dei film e delle serie
     */
    const fetchPopularContent = () => {
        setLoading(true); // Avvia il caricamento
        setError(null); // Resetta eventuali errori precedenti

        // Prima chiamata per ottenere i film popolari
        axios
            .get('https://api.themoviedb.org/3/movie/popular', {
                params: { api_key: apiKey, language: 'it-IT' },
            })
            .then((response) => {
                setMovies(response.data.results || []); // Aggiorna lo stato con i film ricevuti
            })
            .catch((error) => {
                console.error('Errore durante il recupero dei film:', error);
                setError('Errore durante il recupero dei film.');
            })
            .finally(() => {
                // Seconda chiamata per ottenere le serie popolari
                axios
                    .get('https://api.themoviedb.org/3/tv/popular', {
                        params: { api_key: apiKey, language: 'it-IT' },
                    })
                    .then((response) => {
                        setSeries(response.data.results || []); // Aggiorna lo stato con le serie ricevute
                    })
                    .catch((error) => {
                        console.error('Errore durante il recupero delle serie:', error);
                        setError('Errore durante il recupero delle serie.');
                    })
                    .finally(() => {
                        setLoading(false); // Conclude il caricamento
                    });
            });
    };

    /**
     * Funzione per cercare contenuti basati su una query
     * Effettua due chiamate API consecutive per cercare film e serie
     */
    const searchContent = (query) => {
        setLoading(true); // Avvia il caricamento
        setError(null); // Resetta eventuali errori precedenti

        // Prima chiamata per cercare i film
        axios
            .get('https://api.themoviedb.org/3/search/movie', {
                params: { api_key: apiKey, query, language: 'it-IT' },
            })
            .then((response) => {
                const movieResults = response.data.results || [];
                setMovies(movieResults); // Aggiorna lo stato con i film trovati

                // Seconda chiamata per cercare le serie
                axios
                    .get('https://api.themoviedb.org/3/search/tv', {
                        params: { api_key: apiKey, query, language: 'it-IT' },
                    })
                    .then((response) => {
                        const seriesResults = response.data.results || [];
                        setSeries(seriesResults); // Aggiorna lo stato con le serie trovate

                        // Controlla se non sono stati trovati risultati
                        if (movieResults.length === 0 && seriesResults.length === 0) {
                            setError('Nessun risultato trovato.');
                        }
                    })
                    .catch((error) => {
                        console.error('Errore durante la ricerca delle serie:', error);
                        setError('Errore durante la ricerca delle serie.');
                    })
                    .finally(() => {
                        setLoading(false); // Conclude il caricamento
                    });
            })
            .catch((error) => {
                console.error('Errore durante la ricerca dei film:', error);
                setError('Errore durante la ricerca dei film.');
                setLoading(false); // Conclude il caricamento in caso di errore
            });
    };

    // Effettua una chiamata iniziale per ottenere i contenuti popolari al primo rendering
    useEffect(() => {
        fetchPopularContent();
    }, []);

    // Fornisce il contesto globale ai componenti figli
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

// Hook per accedere facilmente al contesto globale (custom)
function useGlobalContext() {
    return useContext(GlobalContext);
}

// Esporta il Provider e l'hook per l'utilizzo nei componenti
export { GlobalProvider, useGlobalContext };