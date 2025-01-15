import { useEffect, useState } from 'react';
import { useGlobalContext } from "../context/GlobalContext";
import MediaList from './MediaList';
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
        // Filtro i film in base al genere selezionato
        if (selectedGenre === 'all') {
            setFilteredMovies(movies);
        } else {
            setFilteredMovies(
                movies.filter((m) => m.genre_ids.includes(parseInt(selectedGenre)))
            );
        }
    }, [movies, selectedGenre]);

    useEffect(() => {
        // Filtro le serie in base al genere selezionato
        if (selectedGenre === 'all') {
            setFilteredSeries(series);
        } else {
            setFilteredSeries(
                series.filter((s) => s.genre_ids.includes(parseInt(selectedGenre)))
            );
        }
    }, [series, selectedGenre]);

    if (isLoading) {
        // Mostro un messaggio di caricamento
        return <p className={styles.loading}>Sto caricando...</p>;
    }

    if (isSearching && filteredMovies.length === 0 && filteredSeries.length === 0) {
        // Mostro un messaggio quando non ci sono risultati
        return <p className={styles.noResults}>Nessun risultato trovato.</p>;
    }

    return (
        <main className={styles.mainContainer}>
            <section className='container-sm'>
                <h2 className='p-4'>Film</h2>
                {/* Mostro la lista dei film filtrati */}
                <MediaList items={filteredMovies} type="movie" />
            </section>
            <section className='container-sm'>
                <h2 className='p-4'>Serie TV</h2>
                {/* Mostro la lista delle serie filtrate */}
                <MediaList items={filteredSeries} type="series" />
            </section>
        </main>
    );
}

export default Main;