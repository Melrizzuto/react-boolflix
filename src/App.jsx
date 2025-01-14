import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalProvider } from './context/GlobalProvider';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        {/* nel wrapping inserirò i componenti dell'app */}
      </div>
    </GlobalProvider>
  );
}

export default App;