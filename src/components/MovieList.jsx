import { useEffect, useState } from 'react';
import axios from 'axios';

function MovieList() {
    const [movies, setMovies] = useState([]);

    // const apiUrl = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;
    const imagePath = import.meta.env.VITE_API_PATH;

    // chiamata API per ottenere i film
    useEffect(() => {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=it_IT`;

        axios
            .get(url)
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch((error) => console.error('Errore nella ricerca:', error));
    }, [apiKey]);

    return (
        <div className="row">
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <div key={movie.id} className="col-md-3 mb-4">
                        <div className="card">
                            {movie.poster_path && (
                                <img
                                    src={`${imagePath}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="card-img-top"
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">Voto: {movie.vote_average}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Nessun film trovato</p>
            )}
        </div>
    );
};

export default MovieList;