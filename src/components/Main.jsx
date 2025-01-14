
import MovieList from './MovieList';
import SeriesList from './SeriesList';

function Main() {
    return (
        <main className="container mt-5 pt-5">
            <h1 className="text-center mb-4">Tutti i Film e le Serie TV</h1>
            <section>
                <h2>Film</h2>
                <MovieList />
            </section>
            <section>
                <h2>Serie TV</h2>
                <SeriesList />
            </section>
        </main>
    );
};

export default Main;