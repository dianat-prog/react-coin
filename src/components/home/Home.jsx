import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

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
        setCoins(data.data);
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
    <div className="home-container">
      <h1>📊 Principales Criptomonedas</h1>
      {loading && <p className="loading">⏳ Cargando...</p>}
      {error && <p className="error">{error}</p>}
      
      {!loading && !error && (
        <>
          <ul className="crypto-list">
            {coins.map((coin) => (
              <li key={coin.id} className="crypto-item">
                <Link to={`/coin/${coin.id}`} className="crypto-link">
                  <span className="crypto-rank">#{coin.rank}</span>
                  <span className="crypto-name">
                    {coin.name} ({coin.symbol})
                  </span>
                  <span className="crypto-price">
                    💰 ${parseFloat(coin.priceUsd).toFixed(2)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="pagination">
            <button onClick={handlePrev} disabled={page === 1}>
              Anterior
            </button>
            <span>Página {page}</span>
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
