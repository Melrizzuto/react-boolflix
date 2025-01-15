import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import styles from './SearchBar.module.css';

function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const { searchContent } = useGlobalContext();

    const handleSearch = () => {
        if (searchValue.trim()) {
            searchContent(searchValue.trim());
        }
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const SearchOnEnter = (e) => {
        if (e.code === 'Enter' && searchValue.trim()) {
            handleSearch();
        }
    };

    return (
        <div className={styles.searchBarContainer}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Cerca un film o una serie..."
                    value={searchValue}
                    onChange={handleChange}
                    onKeyUp={SearchOnEnter}
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