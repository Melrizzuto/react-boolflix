import { FaStar, FaRegStar } from "react-icons/fa";
import styles from './Card.module.css';

function Card({ item }) {
    // scrivo una funzione che disegna le stelle in base al voto
    const drawStars = () => {
        const stars = [];
        const rating = Math.ceil(item.vote_average / 2); // converto il voto in un intervallo da 1 a 5
        for (let i = 1; i <= 5; i++) {
            const star = i <= rating ? (
                <FaStar key={i} />
            ) : (
                <FaRegStar key={i} />
            );
            stars.push(star);
        }
        return stars;
    };

    // gestisco la lingua della bandiera, se non esiste metto una bandiera di placeholder
    const flag = item.original_language ? `${item.original_language}.png` : "placeholder.jpg";

    return (
        <div className={styles.card}>
            {/* mostro l'immagine del poster */}
            <img
                src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                alt={item.title || item.name}
                className={styles.cardImage}
            />
            <div className={styles.cardDescription}>
                {/* mostro il titolo del film o della serie */}
                <h3>{item.title || item.name}</h3>

                {/* mostro una breve descrizione del film o della serie */}
                <p>{item.overview || "Descrizione non disponibile."}</p>

                {/* se è una serie tv, aggiungo un badge */}
                {item.media_type === 'tv' && <span className={styles.tvBadge}>TV Show</span>}

                {/* mostro il titolo originale */}
                <p><strong>Titolo Originale:</strong> {item.original_title || item.original_name}</p>
                {/* mostro la lingua */}
                <p><strong>Lingua:</strong> {item.original_language}</p>

                {/* mostro la bandiera corrispondente alla lingua */}
                <div className={styles.flag}>
                    <img
                        src={`/img/flags/${flag}`}
                        alt={`Flag of ${item.original_language}`}
                        className="img-fluid"
                    />
                </div>

                {/* mostro le stelle in base al voto */}
                <div className={styles.cardStar}>{drawStars()}</div>

                {/* mostro il voto numerico */}
                <p><strong>Voto:</strong> {item.vote_average}</p>
            </div>
        </div>
    );
};

export default Card;