import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Favorites.module.css"; 

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Obtener favoritos de localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className={styles.favoritesContainer}>
      <h1>⭐ Criptomonedas Favoritas</h1>

      {favorites.length === 0 ? (
        <p className={styles.noFavorites}>No tienes criptomonedas favoritas aún.</p>
      ) : (
        <ul className={styles.favoritesList}>
          {favorites.map((coin) => (
            <li key={coin.id} className={styles.favoriteItem}>
              <Link to={`/coin/${coin.id}`} className={styles.favoriteLink}>
                <span className={styles.favoriteName}>{coin.name} ({coin.symbol})</span>
                <span className={styles.favoritePrice}>💰 ${parseFloat(coin.priceUsd).toFixed(2)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites; 
