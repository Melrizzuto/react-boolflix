import { GlobalProvider } from './context/GlobalContext';
import Main from "./components/Main";
import Header from "./components/Header";
import SearchBar from './components/SearchBar';

function App() {


  return (
    <GlobalProvider>
      <div className="App">
        <Header />
        <Main>
          <SearchBar />
        </Main>
      </div>
    </GlobalProvider>
  );
}

export default App;