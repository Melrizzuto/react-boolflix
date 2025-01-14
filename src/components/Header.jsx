import SearchBar from './SearchBar';
import styles from "./Header.module.css"

function Header() {
    return (
        <header className={`${styles.navbar} ${styles.bgDark} ${styles.fixedTop}`}>
            <div className={styles.containerFluid}>
                <a className={styles.navbarBrand} href="#">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                        alt="Netflix Logo"
                        height="30"
                    />
                </a>
                <SearchBar />
            </div>
        </header>
    );
}

export default Header;