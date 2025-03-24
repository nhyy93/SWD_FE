import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

const AppHeader: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username") || "";
    const storedEmail = localStorage.getItem("email") || "";

    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setEmail(storedEmail);
    } else {
      setIsLoggedIn(false);
      setUsername("");
      setEmail("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>CycWorld</div>

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
          <div className={styles.profileCartSection}>
            {/* ✅ Hiển thị giỏ hàng khi đã đăng nhập */}
            <Link to="/cart" className={styles.cartIcon}>
              <FaShoppingCart size={24} />
            </Link>

            <div
              className={styles.profileIcon}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaUserCircle size={28} />
            </div>

            {showDropdown && (
              <div className={styles.dropdownMenu}>
                <p className={styles.username}>{username}</p>
                <p className={styles.email}>{email}</p>
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
