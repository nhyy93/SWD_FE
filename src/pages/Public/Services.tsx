import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Services.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const isLoggedIn = false; 

const Services: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = (route: string) => {
    if (!isLoggedIn) {
      navigate("/login"); 
    } else {
      navigate(route); 
    }
  };

  return (
    <div className={styles.servicesContainer}>
      <Header />

      <div className={styles.servicesContent}>
        <h1>Our Services</h1>
        <p>Discover our top-quality bicycles, accessories, and repair services.</p>

        <div className={styles.serviceList}>
          <div className={styles.serviceCard}>
            <img src="/assets/sv1.webp" alt="Bike Sale" />
            <h2>Bicycle Sales</h2>
            <p>We offer high-quality bicycles from top brands.</p>
            <button onClick={() => handleButtonClick("/bicycles")}>Shop Now</button>
          </div>

          <div className={styles.serviceCard}>
            <img src="/assets/sv2.jpg" alt="Accessories" />
            <h2>Accessories Sales</h2>
            <p>Find all the accessories you need, from gloves and lights to helmets.</p>
            <button onClick={() => handleButtonClick("/accessories")}>Shop Now</button>
          </div>

          <div className={styles.serviceCard}>
            <img src="/assets/repair.jpg" alt="Bike Repair" />
            <h2>Bike Repair Service</h2>
            <p>Sign up for professional bike repair services with our experienced technicians.</p>
            <button onClick={() => handleButtonClick("/service-register")}>Book Service</button>
          </div>
        </div>

        {!isLoggedIn && (
          <p className={styles.notice}>
            <strong>Note:</strong> You need to <Link to="/login">log in</Link> to purchase products or book services.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Services;
