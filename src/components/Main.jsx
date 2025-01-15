import { useGlobalContext } from "../context/GlobalContext";
import MediaList from './MediaList';
import styles from './Main.module.css';

function Main() {
    const {
        movies,
        series,
        isLoading,
        isSearching,
    } = useGlobalContext();

    // Se i dati sono ancora in caricamento
    if (isLoading) {
        return <p className={styles.loading}>Sto caricando...</p>;
    }

    // Se la ricerca non ha prodotto risultati
    if (isSearching && movies.length === 0 && series.length === 0) {
        return <p className={styles.noResults}>Nessun risultato trovato.</p>;
    }

    return (
        <main className={styles.mainContainer}>
            {/* Sezione per i film popolari */}
            <section className='container-sm p-3'>
                {/* Mostro la lista dei film */}
                <MediaList />
            </section>
        </main>
    );
}

export default Main;