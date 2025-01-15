import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import styles from './SearchBar.module.css';

function SearchBar() {
    // inizializzo lo stato per il valore della barra di ricerca
    const [searchValue, setSearchValue] = useState('');

    // prendo le funzioni dal contesto globale
    const { searchContent, fetchPopularContent } = useGlobalContext();

    // creo una variabile per tracciare se c'è stata una ricerca
    const [hasSearched, setHasSearched] = useState(false);

    // questa funzione si occupa di aggiornare il valore della barra di ricerca quando l'utente digita
    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    // questa funzione viene chiamata quando l'utente clicca su "Cerca" o preme "Enter"
    const handleSearch = () => {
        if (searchValue.trim()) {
            // se la barra non è vuota, chiamo la funzione per fare la ricerca
            searchContent(searchValue.trim());
            // segno che c'è stata una ricerca
            setHasSearched(true);
        } else {
            // se la barra è vuota, ripristino i contenuti iniziali
            fetchPopularContent();
            // segno che non c'è stata una ricerca
            setHasSearched(false);
        }
    };

    // questa funzione viene chiamata quando l'utente preme un tasto
    const handleKeyUp = (e) => {
        if (e.code === 'Enter') {
            // se l'utente preme "Enter", chiamo la funzione di ricerca
            handleSearch();
        }
    };

    // uso useEffect per monitorare la barra di ricerca e ripristinare i contenuti se necessario
    useEffect(() => {
        if (searchValue.trim() === '' && hasSearched) {
            // se la barra è vuota e c'era stata una ricerca, ripristino i contenuti
            fetchPopularContent();
            // resetto il flag della ricerca
            setHasSearched(false);
        }
    }, [searchValue, hasSearched, fetchPopularContent]); // monitoro il valore della barra e se c'è stata una ricerca

    return (
        <div className={styles.searchBarContainer}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Cerca un film o una serie..."
                    value={searchValue}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    className={styles.searchInput}
                />
                <button onClick={handleSearch} className={styles.searchButton}>
                    Cerca
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
