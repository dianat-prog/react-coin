import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css"; 

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Obtener favoritos de localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="favorites-container">
      <h1>⭐ Criptomonedas Favoritas</h1>

      {favorites.length === 0 ? (
        <p className="no-favorites">No tienes criptomonedas favoritas aún.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((coin) => (
            <li key={coin.id} className="favorite-item">
              <Link to={`/coin/${coin.id}`} className="favorite-link">
                <span className="favorite-name">{coin.name} ({coin.symbol})</span>
                <span className="favorite-price">💰 ${parseFloat(coin.priceUsd).toFixed(2)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
