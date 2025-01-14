import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [error, setError] = useState(null);

    return (
        <GlobalContext.Provider
            value={{
                movies,
                setMovies,
                series,
                setSeries,
                loading,
                setLoading,
                isSearching,
                setIsSearching,
                selectedGenre,
                setSelectedGenre,
                error,
                setError,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

function useGlobalContext() {
    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobalContext };