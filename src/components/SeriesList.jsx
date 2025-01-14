import { useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';
import Card from './Card';
import styles from './SeriesList.module.css';

function SeriesList() {
    // sto usando il contesto globale per accedere agli state 
    const { series, setSeries, loading, setLoading } = useGlobalContext();

    useEffect(() => {
        // qui definisco la funzione per recuperare le serie tv
        const fetchSeries = () => {
            const apiKey = import.meta.env.VITE_API_KEY; // prendo la chiave API dal fine .env
            setLoading(true); // metto il carimaneto su true prima di fare la richiesta
            axios.get('https://api.themoviedb.org/3/tv/popular', { // faccio la richiesta in get per ottenere le serie TV popolari
                params: {
                    api_key: apiKey,
                    language: 'it-IT', // imposto la lingua italiana
                },
            })
                .then((response) => {
                    // quando la richiesta va a buon fine, aggiorno lo stato series con i risultati
                    setSeries(response.data.results);
                })
                .catch((error) => {
                    // se c'è un errore, loggo l'errore nella console
                    console.error('Errore durante il recupero delle serie:', error);
                })
                .finally(() => {
                    // alla fine, metto il caricamento su false
                    setLoading(false);
                });
        };

        fetchSeries(); // chiamo la funzione per recuperare le serie

    }, [setSeries, setLoading]); // setto le dipendenze

    return (
        <div className={styles.seriesListContainer}>
            {loading ? ( // se loading è true, mostro il messaggio di caricamento
                <p className="text-center">Caricamento serie TV...</p>
            ) : ( // altrimenti, mappo le serie e le mostro come Card
                series.map((serie) => (
                    <div className={styles.seriesCardWrapper} key={serie.id}>
                        <Card item={serie} />
                    </div>
                ))
            )}
        </div>
    );
}

export default SeriesList;