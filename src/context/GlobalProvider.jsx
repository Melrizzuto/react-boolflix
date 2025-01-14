import { createContext, useState } from 'react';

// setto il contesto
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [movies, setMovies] = useState([]); // Lista dei film
    const [series, setSeries] = useState([]); // Lista delle serie TV

    return (
        <GlobalContext.Provider value={{ movies, setMovies, series, setSeries }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalProvider, GlobalContext }