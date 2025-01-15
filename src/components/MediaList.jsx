import { useGlobalContext } from '../context/GlobalContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from './Card';
import styles from './MediaList.module.css';

const flags = ["de", "en", "es", "it", "fr"];

function MediaList({ type, title }) {
    const { movies, series, loading } = useGlobalContext();

    const data = type === 'movie' ? movies : series;

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
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

    if (loading) {
        return <p className="text-center">Caricamento...</p>;
    }

    if (data.length === 0) {
        return <p className="text-center">Nessun {title} disponibile al momento.</p>;
    }

    return (
        <div>
            <h2>{title}</h2>
            <Slider {...carouselSettings}>
                {data.map((item) => (
                    <div key={item.id}>
                        <Card item={item} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default MediaList;