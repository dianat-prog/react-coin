import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Coin.module.css";  

const Coin = () => {
  const { id } = useParams(); // Obtiene el id de la criptomoneda desde la URL
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${id}`);
        if (!response.ok) throw new Error("Criptomoneda no encontrada");
        const data = await response.json();
        setCoin(data.data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchCoin();
  }, [id]);


  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);


  const toggleFavorite = () => {
    let updatedFavorites;
    if (favorites.some(fav => fav.id === coin.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== coin.id);
    } else {
      updatedFavorites = [...favorites, { id: coin.id, name: coin.name, symbol: coin.symbol }];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className={styles.container}>
      {loading && <p className={styles.loader}></p>}
      {error && <p className={styles.error}>{error}</p>}

      {coin && (
        <div className={styles.coin_details}>
          <h1 className={styles.title}>{coin.name} ({coin.symbol})</h1>
          <p className={styles.coin_change}>🏆 Ranking: #{coin.rank}</p>
          <p className={styles.coin_change}>💰 Precio: ${parseFloat(coin.priceUsd).toFixed(2)}</p>
          <p className={styles.coin_change}>📈 Market Cap: ${parseFloat(coin.marketCapUsd).toLocaleString()}</p>
          <p className={styles.coin_change}>🔄 Suministro Circulante: {parseFloat(coin.supply).toLocaleString()}</p>
          <p className={styles.coin_change}>📊 Cambio 24h: {parseFloat(coin.changePercent24Hr).toFixed(2)}%</p>
          <button onClick={toggleFavorite}
            className={favorites.some(fav => fav.id === coin.id) ? styles.favButtonActive : styles.favButton}>
            {favorites.some(fav => fav.id === coin.id) ? "Quitar de Favoritos" : "Añadir a Favoritos"}
         </button>
        </div>
      )}
    </div>
  );
};

export default Coin;