import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";


const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <h2>CryptoTracker</h2>
      <div>
        <Link to="/">Inicio</Link>
        <Link to="/favorites">Favoritos</Link>
      </div>
    </nav>
  );
};

export default Navbar;