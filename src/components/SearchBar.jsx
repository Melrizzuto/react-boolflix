import { useState, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('movie');
    const { setMovies, setSeries, setLoading, setError } = useContext(GlobalContext);

    function handleSearch() {
        if (!query) return;

        const apiKey = import.meta.env.VITE_API_KEY;
        const endpoint = searchType === 'movie' ? 'movie' : 'tv';

        setLoading(true);
        setError(null);

        axios
            .get(`https://api.themoviedb.org/3/search/${endpoint}`, {
                params: {
                    api_key: apiKey,
                    query: query,
                    language: 'it-IT',
                },
            })
            .then((response) => {
                setLoading(false);
                if (searchType === 'movie') {
                    setMovies(response.data.results);
                } else {
                    setSeries(response.data.results);
                }
            })
            .catch((error) => {
                setLoading(false);
                setError('Errore durante la ricerca. Riprova più tardi.');
                console.error('Errore durante la ricerca:', error);
            });
    };

    return (
        <div className="search-bar d-flex">
            <input
                className="form-control me-2"
                type="text"
                placeholder="Cerca un film o una serie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <select onChange={(e) => setSearchType(e.target.value)} value={searchType}>
                <option value="movie">Film</option>
                <option value="tv">Serie TV</option>
            </select>
            <button className="btn btn-outline-light" onClick={handleSearch}>Cerca</button>
        </div>
    );
}

export default SearchBar;