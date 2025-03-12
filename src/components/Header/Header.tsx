import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const AppHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>CycWorld</div>

      {/* Navigation Menu */}
      <nav>
        <ul className={styles.menu}>
          <li><Link to="/">Home</Link></li>
          <li><a href="#">Services</a></li>
          <li><Link to="/bicycles">Bicycles</Link></li>
          <li><a href="#">Accessories</a></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      {/* Auth Buttons */}
      <div className={styles.authButtons}>
        <Link to="/login">
          <button className={styles.login}>Login</button>
        </Link>
        <Link to="/register">
          <button className={styles.register}>Register</button>
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
