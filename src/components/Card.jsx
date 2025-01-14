import styles from './Card.module.css';

const Card = ({ item }) => {
    return (
        <div className={styles.card}>
            <img
                src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                alt={item.title || item.name}
                className={styles.cardImage}
            />
            <div className={styles.cardDescription}>
                <h3>{item.title || item.name}</h3>
                <p>{item.overview}</p>
                {item.media_type === 'tv' && <span className={styles.tvBadge}>TV Show</span>}
            </div>
        </div>
    );
};

export default Card;