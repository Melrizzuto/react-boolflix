import { GlobalProvider } from './context/GlobalContext';
import Main from "./components/Main";
import Header from "./components/Header";
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import SeriesList from './components/SeriesList';

function App() {


  return (
    <GlobalProvider>
      <div className="App">
        <Header />
        <Main>
          <SearchBar />
          <MovieList />
          <SeriesList />
        </Main>
      </div>
    </GlobalProvider>
  );
}

export default App;