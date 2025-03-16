import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10; // Cantidad de elementos por página

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const offset = (page - 1) * limit;
        const response = await fetch(
          `https://api.coincap.io/v2/assets?limit=${limit}&offset=${offset}`
        );
        const data = await response.json();
        if (!Array.isArray(data.data)) {
          throw new Error("La API no devolvió un array");
        }
        setCoins(Array.isArray(data.data)? data.data: []);
      } catch (error) {
        setError("Error al obtener las criptomonedas.");
      }
      setLoading(false);
    };

    fetchCoins();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <div className={styles.homeContainer}>
      <h1>📊 Principales Criptomonedas</h1>
      {loading && <p className={styles.loading} >⏳ Cargando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      
      {!loading && !error && (
        <>
          <ul className={styles.cryptoList}>
            {coins?.map((coin) => (
              <li key={coin.id} className={styles.cryptoItem}>
                <Link to={`/coin/${coin.id}`} className={styles.cryptoLink}>
                  <span className={styles.cryptoRank}>#{coin.rank}</span>
                  <span className={styles.cryptoName}>
                    {coin.name} ({coin.symbol})
                  </span>
                  <span className={styles.cryptoPrice}>
                    💰 ${parseFloat(coin.priceUsd).toFixed(2)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.pagination}>
            <button onClick={handlePrev} disabled={page === 1}>
              Anterior
            </button>
            <span> Página {page} </span>
            <button onClick={handleNext}>
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home; 
