import React from "react";
import styles from "./Auth.module.css";
import Header from "../../components/Header/Header";

const Login: React.FC = () => {
  return (
    <div className={styles.authContainer}>
      <Header />
      <div className={styles.authBox}>
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
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
