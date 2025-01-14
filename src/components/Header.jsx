import SearchBar from './SearchBar';
import './Header.css';

function Header() {
    return (
        <header className="navbar navbar-dark bg-dark px-3 fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                        alt="Netflix Logo"
                        height="25"
                    />
                </a>
                <SearchBar />
            </div>
        </header>
    );
}

export default Header;