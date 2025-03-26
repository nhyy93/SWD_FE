import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
// import Header from "../../components/Header/Header";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
  
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password: userPassword,
      });

      console.log(response.data);
  
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("phone", response.data.phone || "Not available");

      
      if (response.data.role === "ADMIN") {
        setError("You do not have permission to access this page.");
      } else if (response.data.role === "SHOP_OWNER") {
        navigate("/shop-owner/account");
      } else if (response.data.role === "STAFF") {
        navigate("/staff/delivery");  
      } else {
        navigate("/");
      }
      if (response.data.role !== "ADMIN") {
        window.location.reload();
    }
    } catch (err) {
      setError("Invalid username or password");
    }
  };
  

  return (
    <div className={styles.authContainer}>
      {/* <Header /> */}
      <div className={styles.authBox}>
        <h2>LOGIN</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.submitButton}>Login</button>
        </form>
        <p className={styles.switchAuth}>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
