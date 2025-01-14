import { useEffect, useState } from 'react';
import axios from 'axios';

function SeriesList() {
    const [series, setSeries] = useState([]);

    const apiKey = import.meta.env.VITE_API_KEY;
    const imagePath = import.meta.env.VITE_API_PATH;

    // chiamata API per ottenere le serie TV
    useEffect(() => {
        const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=it_IT`;

        axios
            .get(url)
            .then((response) => {
                setSeries(response.data.results);
            })
            .catch((error) => console.error('Errore nella ricerca:', error));
    }, [apiKey]);

    return (
        <div className="row">
            {series.length > 0 ? (
                series.map((tv) => (
                    <div key={tv.id} className="col-md-3 mb-4">
                        <div className="card">
                            {tv.poster_path && (
                                <img
                                    src={`${imagePath}${tv.poster_path}`}
                                    alt={tv.name}
                                    className="card-img-top"
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{tv.name}</h5>
                                <p className="card-text">Voto: {tv.vote_average}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Nessuna serie TV trovata</p>
            )}
        </div>
    );
};

export default SeriesList;