import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useGlobalContext } from '../context/GlobalContext';
import Card from './Card';
import styles from './MediaList.module.css';

function MediaList() {
    const { movies, series, loading, error } = useGlobalContext();

    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 700,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        nextArrow: <div className={styles.nextArrow} aria-label="Next Slide">➜</div>,
        prevArrow: <div className={styles.prevArrow} aria-label="Previous Slide">➜</div>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: '20px',
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '20px',
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

    if (error) {
        return <div className="text-center">{error}</div>;
    }

    if (loading) {
        return <p className="text-center">Caricamento...</p>;
    }

    return (
        <div className={styles.container}>
            {/* Jumbotron con Video di Sfondo */}
            <div className={styles.jumbotron}>
                <div className={styles.videoContainer}>
                    <video className={styles.backgroundVideo} autoPlay loop muted>
                        <source src="/video/4231453-hd_1920_1080_25fps.mp4" type="video/mp4" />
                        Il tuo browser non supporta il video.
                    </video>
                </div>
                <div className={styles.overlay}>
                    <div className={styles.textContent}>
                        <h1>Benvenuto nella tua esperienza di streaming</h1>
                        <p>Guarda film e serie TV senza interruzioni. Inizia ora!</p>
                        <button className={styles.watchButton}>Inizia a guardare</button>
                    </div>
                </div>
            </div>

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
        </div>
    );
}

export default MediaList;
