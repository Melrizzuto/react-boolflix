import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useGlobalContext } from '../context/GlobalContext';
import Card from './Card';
import styles from './MediaList.module.css';

function MediaList() {
    // Estraggo i dati e lo stato dal contesto globale.
    const { movies, series, loading, error, hasSearched } = useGlobalContext();

    // Configuro le impostazioni del carosello per Slider.
    const carouselSettings = {
        dots: false, // Non mostro i punti di navigazione.
        infinite: true, // Abilito lo scorrimento infinito.
        speed: 700, // Imposto la velocità di transizione.
        autoplay: true, // Abilito la riproduzione automatica.
        autoplaySpeed: 2000, // Definisco l'intervallo di tempo per il cambio di slide.
        slidesToShow: 4, // Mostro quattro slide alla volta.
        slidesToScroll: 1, // Scorro una slide alla volta.
        centerMode: true, // Centro le slide attive.
        centerPadding: '0', // Rimuovo il padding intorno alla slide attiva.
        nextArrow: <div className={styles.nextArrow} aria-label="Next Slide">➜</div>, // Definisco la freccia per andare avanti.
        prevArrow: <div className={styles.prevArrow} aria-label="Previous Slide">➜</div>, // Definisco la freccia per tornare indietro.
        responsive: [
            {
                breakpoint: 1024, // Quando la larghezza è inferiore a 1024px.
                settings: {
                    slidesToShow: 2, // Mostro due slide alla volta.
                    slidesToScroll: 1, // Scorro una slide alla volta.
                    centerPadding: '20px', // Aggiungo un po' di padding.
                },
            },
            {
                breakpoint: 768, // Quando la larghezza è inferiore a 768px.
                settings: {
                    slidesToShow: 1, // Mostro una slide alla volta.
                    slidesToScroll: 1, // Scorro una slide alla volta.
                    centerPadding: '20px', // Aggiungo un po' di padding.
                },
            },
            {
                breakpoint: 480, // Quando la larghezza è inferiore a 480px.
                settings: {
                    slidesToShow: 1, // Mostro una slide alla volta.
                    slidesToScroll: 1, // Scorro una slide alla volta.
                },
            },
        ],
    };

    // Se c'è un errore, lo mostro all'utente.
    if (error) {
        return <div className="text-center">{error}</div>;
    }

    // Se i dati stanno caricando, mostro un messaggio di caricamento.
    if (loading) {
        return <p className="text-center">Caricamento...</p>;
    }

    // Ritorno il layout principale del componente.
    return (
        <div className={styles.container}>
            {/* Mostro il jumbotron solo se l'utente non ha ancora effettuato una ricerca. */}
            {!hasSearched && (
                <div className={styles.jumbotron}>
                    <div className={styles.videoContainer}>
                        {/* Aggiungo un video di sfondo che si riproduce automaticamente. */}
                        <video className={styles.backgroundVideo} autoPlay loop muted>
                            <source src="/video/4231453-hd_1920_1080_25fps.mp4" type="video/mp4" />
                            Il tuo browser non supporta il video.
                        </video>
                    </div>
                    <div className={styles.overlay}>
                        {/* Aggiungo il contenuto testuale sopra il video. */}
                        <div className={styles.textContent}>
                            <h1>Benvenuto nella tua esperienza di streaming</h1>
                            <p>Guarda film e serie TV senza interruzioni. Inizia ora!</p>
                            <button className={styles.watchButton}>Inizia a guardare</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mostro la sezione dei film popolari se sono presenti film. */}
            {movies.length > 0 && (
                <div className={styles.popularSection}>
                    <h2>Film Popolari</h2>
                    {/* Utilizzo il carosello per visualizzare i film popolari. */}
                    <Slider {...carouselSettings}>
                        {movies.map((movie) => (
                            <div key={movie.id}>
                                <Card item={movie} /> {/* Ogni film è rappresentato da una card. */}
                            </div>
                        ))}
                    </Slider>
                </div>
            )}

            {/* Mostro la sezione delle serie TV popolari se sono presenti serie. */}
            {series.length > 0 && (
                <div className={styles.popularSection}>
                    <h2>Serie TV Popolari</h2>
                    {/* Utilizzo il carosello per visualizzare le serie TV popolari. */}
                    <Slider {...carouselSettings}>
                        {series.map((serie) => (
                            <div key={serie.id}>
                                <Card item={serie} /> {/* Ogni serie è rappresentata da una card. */}
                            </div>
                        ))}
                    </Slider>
                </div>
            )}

            {/* Mostro una griglia con tutti i film se sono presenti. */}
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

            {/* Mostro una griglia con tutte le serie TV se sono presenti. */}
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
