import { useGlobalContext } from '../context/GlobalContext';
import Card from './Card';
import styles from './MediaList.module.css';

function MediaList({ type, title }) {
    const { movies, series, loading } = useGlobalContext();

    const data = type === 'movie' ? movies : series;

    if (loading) {
        return <p className="text-center">Caricamento...</p>;
    }

    if (data.length === 0) {
        return <p className="text-center">Nessun {title} disponibile al momento.</p>;
    }

    return (
        <div className={styles.cardWrapper}>
            {data.map((item) => (
                <div className={styles.cardItem} key={item.id}>
                    <Card item={item} />
                </div>
            ))}
        </div>
    );
}

export default MediaList;