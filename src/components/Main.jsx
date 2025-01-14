import { useEffect, useState } from 'react';
import { useGlobalContext } from "../context/GlobalContext";
import MovieList from './MovieList';
import SeriesList from './SeriesList';
import styles from './Main.module.css';

function Main() {
    const {
        movies,
        series,
        isLoading,
        isSearching,
        selectedGenre,
    } = useGlobalContext();

    const [filteredMovies, setFilteredMovies] = useState([]);
    const [filteredSeries, setFilteredSeries] = useState([]);

    useEffect(() => {
        // filtro i film in base al genere selezionato
        if (selectedGenre === 'all') {
            setFilteredMovies(movies);
        } else {
            setFilteredMovies(
                movies.filter((m) => m.genre_ids.includes(parseInt(selectedGenre)))
            );
        }
    }, [movies, selectedGenre]);

    useEffect(() => {
        // filtro le serie in base al genere selezionato
        if (selectedGenre === 'all') {
            setFilteredSeries(series);
        } else {
            setFilteredSeries(
                series.filter((s) => s.genre_ids.includes(parseInt(selectedGenre)))
            );
        }
    }, [series, selectedGenre]);

    if (isLoading) {
        // mostro un messaggio di caricamento
        return <p className={styles.loading}>sto caricando...</p>;
    }

    if (isSearching && filteredMovies.length === 0 && filteredSeries.length === 0) {
        // mostro un messaggio quando non ci sono risultati
        return <p className={styles.noResults}>nessun risultato trovato.</p>;
    }

    return (
        <main className={styles.mainContainer}>
            <section className='container-sm'>
                <h2 className='p-4'>Film</h2>
                {/* mostro la lista dei film */}
                <MovieList movies={filteredMovies} />
            </section>
            <section className='container-sm'>
                <h2 className='p-4'>Serie tv</h2>
                {/* mostro la lista delle serie */}
                <SeriesList series={filteredSeries} />
            </section>
        </main>
    );
}

export default Main;