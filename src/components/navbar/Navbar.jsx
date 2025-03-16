import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <h2>CryptoTracker</h2>
      
      <div 
        className={styles.menuIcon} 
        onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`${styles.navLinks} ${menuOpen ? styles.show : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
        <Link to="/favorites" onClick={() => setMenuOpen(false)}>Favoritos</Link>
      </div>
    </nav>
  );
};

export default Navbar;