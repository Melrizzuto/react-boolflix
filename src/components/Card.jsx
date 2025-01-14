import { FaStar, FaRegStar } from "react-icons/fa";
import styles from "./Card.module.css";

const supportedFlags = ["de", "en", "es", "it", "fr"];
const imgBasePath = import.meta.env.VITE_API_PATH;

function Card({ item }) {
    if (!item) return null;

    // fn che disegna le stelle
    function drawStars() {
        const stars = [];
        const rating = Math.ceil(item.vote_average / 2);
        for (let i = 1; i <= 5; i++) {
            stars.push(i <= rating ? <FaStar key={i} /> : <FaRegStar key={i} />);
        }
        return stars;
    };

    // percorso dell'immagine del poster
    const posterSrc = item.poster_path
        ? `${imgBasePath}${item.poster_path}`
        : "/img/placeholders/poster-placeholder.jpg";

    // percorso della bandiera
    const flagPath = supportedFlags.includes(item.original_language)
        ? `/img/${item.original_language}.png`
        : "/img/placeholder.jpg";

    return (
        <div className={styles.card}>
            {/* Immagine del poster */}
            <img
                src={posterSrc}
                alt={item.title || item.name || "Poster non disponibile"}
                className={styles.cardImage}
            />
            <div className={styles.cardDescription}>
                {/* Titolo del film o serie */}
                <h3>{item.title || item.name}</h3>

                {/* Breve descrizione */}
                <p>{item.overview || "Descrizione non disponibile."}</p>

                {/* Badge per serie TV */}
                {item.media_type === "tv" && <span className={styles.tvBadge}>TV Show</span>}

                {/* Titolo originale */}
                <p>
                    <strong>Titolo Originale:</strong> {item.original_title || item.original_name}
                </p>

                {/* Lingua */}
                <p>
                    <strong>Lingua:</strong> {item.original_language}
                </p>

                {/* Bandiera */}
                <div className={styles.flag}>
                    <img
                        src={flagPath}
                        alt={`Flag of ${item.original_language}`}
                        className="img-fluid"
                    />
                </div>

                {/* Stelle e voto */}
                <div className={styles.cardStar}>{drawStars()}</div>
                <p>
                    <strong>Voto:</strong> {item.vote_average}
                </p>
            </div>
        </div>
    );
}

export default Card;