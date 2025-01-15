
import { useGlobalContext } from '../context/GlobalContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from './Card';
import styles from './MediaList.module.css';

function MediaList() {
    const { movies, series, loading, error } = useGlobalContext();

    // Configurazione del carosello
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
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
            {/* Sezione Popolari che include sia film che serie TV */}
            <div className={styles.popularSection}>
                <h2>Popolari</h2>
                <Slider {...carouselSettings}>
                    {/* Mostra film e serie TV insieme nel carosello */}
                    {[...movies, ...series].map((item) => (
                        <div key={item.id}>
                            <Card item={item} />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Sezione Film (solo film) */}
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

            {/* Sezione Serie TV (solo serie TV) */}
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
        </div>
    );
}

export default MediaList;