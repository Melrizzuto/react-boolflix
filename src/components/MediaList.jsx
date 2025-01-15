import { useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';
import Card from './Card';
import styles from './MediaList.module.css';

function MovieList() {
    // Uso il contesto globale per accedere agli state
    const { movies, setMovies, series, setSeries, loading, setLoading } = useGlobalContext();

    useEffect(() => {
        const fetchMoviesAndSeries = () => {
            const apiKey = import.meta.env.VITE_API_KEY; // Prendo la chiave API dal file .env
            setLoading(true); // Imposto lo stato di caricamento su true

            // Chiamata per recuperare i film
            axios.get('https://api.themoviedb.org/3/movie/popular', {
                params: {
                    api_key: apiKey,
                    language: 'it-IT', // Imposto la lingua italiana
                },
            })
                .then((moviesResponse) => {
                    setMovies(moviesResponse.data.results); // Imposto lo stato con i film
                })
                .catch((error) => {
                    console.error('Errore durante il recupero dei film:', error);
                });

            // Chiamata per recuperare le serie TV
            axios.get('https://api.themoviedb.org/3/tv/popular', {
                params: {
                    api_key: apiKey,
                    language: 'it-IT',
                },
            })
                .then((seriesResponse) => {
                    setSeries(seriesResponse.data.results); // Imposto lo stato con le serie TV
                })
                .catch((error) => {
                    console.error('Errore durante il recupero delle serie TV:', error);
                })
                .finally(() => {
                    setLoading(false); // Alla fine, metto il caricamento su false
                });
        };

        fetchMoviesAndSeries(); // Chiamo la funzione per recuperare film e serie TV
    }, [setMovies, setSeries, setLoading]); // Dipendenze

    return (
        <div className={styles.movieListContainer}>
            {loading ? (
                <p className="text-center">Caricamento...</p> // Mostra il caricamento se loading è true
            ) : (
                <>
                    <div className={styles.title}>Film Popolari</div>
                    <div className={styles.cardWrapper}>
                        {movies.map((movie) => (
                            <div className={styles.cardItem} key={movie.id}>
                                <Card item={movie} />
                            </div>
                        ))}
                    </div>

                    <div className={styles.title}>Serie TV Popolari</div>
                    <div className={styles.cardWrapper}>
                        {series.map((serie) => (
                            <div className={styles.cardItem} key={serie.id}>
                                <Card item={serie} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default MovieList;