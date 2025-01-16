import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import styles from './Header.module.css';

function Header() {
    const [isTransparent, setIsTransparent] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsTransparent(true);
            } else {
                setIsTransparent(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`${styles.navbar} ${styles.bgDark} ${styles.fixedTop} ${isTransparent ? styles.transparent : ''}`}
        >
            <div className={styles.containerFluid}>
                <a href="/" className={styles.navbarBrand}>
                    <h1>Boolflix </h1>
                </a>
                <SearchBar />
            </div>
        </header>
    );
}

export default Header;
