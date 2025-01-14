import { useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';
import Card from './Card';
import styles from './MovieList.module.css';

function MovieList() {
    // uso il contesto globale per accedere agli state
    const { movies, setMovies, loading, setLoading } = useGlobalContext();

    useEffect(() => {
        // qui definisco la funzione per recuperare i film
        function fetchMovies() {
            const apiKey = import.meta.env.VITE_API_KEY; // prendo la chiave API dal file .env
            setLoading(true);  // imposto lo stato di caricamento su true
            axios.get('https://api.themoviedb.org/3/movie/popular', { // faccio la richiesta get per ottenere i film popolari
                params: {
                    api_key: apiKey,
                    language: 'it-IT', // imposto la lingua italiana
                },
            })
                .then((response) => {
                    // quando la richiesta va a buon fine, aggiorno lo stato movies con i risultati
                    setMovies(response.data.results);
                })
                .catch((error) => {
                    // se c'è un errore, loggo l'errore nella console
                    console.error('Errore durante il recupero dei film:', error);
                })
                .finally(() => {
                    // alla fine della richiesta, imposto loading su false
                    setLoading(false);
                });
        };

        fetchMovies(); // chiamo la funzione per recuperare i film
    }, [setMovies, setLoading]);

    return (
        <div className={styles.movieListContainer}>
            {loading ? (
                <p className="text-center">Caricamento film...</p>
            ) : (
                movies.map((movie) => (
                    <div className={styles.movieCardWrapper} key={movie.id}>
                        <Card item={movie} />
                    </div>
                ))
            )}
        </div>
    );
}

export default MovieList;