import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useGlobalContext } from '../context/GlobalContext';
import Card from './Card';
import styles from './MediaList.module.css';

function MediaList() {
    const { movies, series, loading, error } = useGlobalContext(); // Accesso ai dati dal contesto globale

    // Configurazione del carosello
    const carouselSettings = {
        dots: false, // Mantieni i punti di navigazione sotto il carosello
        infinite: true, // Permette l'infinito loop del carosello
        speed: 700, // Velocità di transizione tra gli elementi
        autoplay: true, // Attiva il carosello automatico
        autoplaySpeed: 2000, // Velocità dell'autoplay
        slidesToShow: 4, // Quante immagini mostriamo per volta
        slidesToScroll: 2, // Quante immagini scorriamo per volta
        centerMode: true, // Carosello centrato per un effetto più dinamico
        centerPadding: '0', // Elimina il padding ai lati
        nextArrow: <div className={styles.nextArrow}>{"➜"}</div>, // Freccia personalizzata
        prevArrow: <div className={styles.prevArrow}>{"➜"}</div>, // Freccia personalizzata
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1, // Scorrere solo 1 elemento su tablet
                    centerPadding: 20// Elimina il padding ai lati
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1, // Scorrere solo 1 elemento su dispositivi mobili
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    // Visualizza un messaggio di errore se esiste
    if (error) {
        return <div className="text-center">{error}</div>;
    }

    // Visualizza un messaggio di caricamento mentre i dati vengono recuperati
    if (loading) {
        return <p className="text-center">Caricamento...</p>;
    }

    return (
        <div className={styles.container}>
            {/* Sezione Film Popolari */}
            {movies.length > 0 && (
                <div className={styles.popularSection}>
                    <h2>Film Popolari</h2>
                    <Slider {...carouselSettings}>
                        {movies.map((movie) => (
                            <div key={movie.id}>
                                <Card item={movie} />
                            </div>
                        ))}
                    </Slider>
                </div>
            )}

            {/* Sezione Serie TV Popolari */}
            {series.length > 0 && (
                <div className={styles.popularSection}>
                    <h2>Serie TV Popolari</h2>
                    <Slider {...carouselSettings}>
                        {series.map((serie) => (
                            <div key={serie.id}>
                                <Card item={serie} />
                            </div>
                        ))}
                    </Slider>
                </div>
            )}

            {/* Sezione Griglia per Film */}
            {movies.length > 0 && (
                <div className={styles.gridSection}>
                    <h2>Film</h2>
                    <div className={styles.grid}>
                        {movies.map((movie) => (
                            <Card key={movie.id} item={movie} />
                        ))}
                    </div>
                </div>
            )}

            {/* Sezione Griglia per Serie TV */}
            {series.length > 0 && (
                <div className={styles.gridSection}>
                    <h2>Serie TV</h2>
                    <div className={styles.grid}>
                        {series.map((serie) => (
                            <Card key={serie.id} item={serie} />
                        ))}
                    </div>
                </div>
            )}

            {/* Controllo per visualizzare più film o serie TV */}
            {(movies.length > 0 || series.length > 0) && (
                <div className={styles.additionalSection}>
                    <h4>Altri Film e Serie TV</h4>
                    <div className={styles.grid}>
                        {/* Se ci sono nuovi film */}
                        {movies.length > 0 &&
                            movies.slice(5).map((movie) => (
                                <Card key={movie.id} item={movie} />
                            ))}

                        {/* Se ci sono nuove serie TV */}
                        {series.length > 0 &&
                            series.slice(5).map((serie) => (
                                <Card key={serie.id} item={serie} />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MediaList;
