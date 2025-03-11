import React from "react";
import styles from "./Auth.module.css";
import Header from "../../components/Header/Header";

const Register: React.FC = () => {
  return (
    <div className={styles.authContainer}>
      <Header />
      <div className={styles.authBox}>
        <h2>Register</h2>
        <form>
          <input type="text" placeholder="Full Name" className={styles.input} />
          <input type="email" placeholder="Email" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
          <input type="password" placeholder="Confirm Password" className={styles.input} />
          <button type="submit" className={styles.submitButton}>Register</button>
        </form>
        <p className={styles.switchAuth}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
