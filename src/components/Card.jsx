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

                {/* Nuove informazioni da visualizzare */}
                <p><strong>Titolo Originale:</strong> {item.original_title || item.original_name}</p>
                <p><strong>Lingua:</strong> {item.original_language}</p>
                <p><strong>Voto:</strong> {item.vote_average}</p>
            </div>
        </div>
    );
};

export default Card;