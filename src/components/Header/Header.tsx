import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { FaUserCircle } from "react-icons/fa";

const AppHeader: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
  
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername || ""); // Tránh giá trị undefined
    } else {
      setIsLoggedIn(false);
      setUsername(""); // Reset khi logout
    }
  }, []); // Chỉ chạy 1 lần khi component mount
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>CycWorld</div>

      {/* Navigation Menu */}
      <nav>
        <ul className={styles.menu}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/bicycles">Bicycles</Link></li>
          <li><Link to="/accessories">Accessories</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      <div className={styles.authButtons}>
        {isLoggedIn ? (
          <div className={styles.profileSection}>
            <div
              className={styles.profileIcon}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaUserCircle size={28} />
            </div>

            {showDropdown && (
              <div className={styles.dropdownMenu}>
                <p className={styles.username}>{username}</p>
                <Link to="/profile" className={styles.dropdownItem}>
                  View Profile
                </Link>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className={styles.login}>Login</button>
            </Link>
            <Link to="/register">
              <button className={styles.register}>Register</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
