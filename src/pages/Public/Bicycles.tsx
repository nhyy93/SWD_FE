import React from "react";
import { Button, Card, Row, Col } from "antd";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import heroImage from "../../assets/anh2.webp";
import styles from "./Bicycles.module.css"; 

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <Header />

      {/* Hero Section */}
      <div className={styles.heroSection} style={{ backgroundImage: `url(${heroImage})` }}>
        <h1>Bikes</h1>
        <p>Like riding a bike, but better</p>
        <Button type="primary" size="large">See the bikes</Button>
      </div>

      {/* Choose Your Ride */}
      <section className={styles.section}>
        <h2>Choose your ride</h2>
        <Row gutter={[16, 16]} justify="center">
          {["Mountain Bikes", "Touring Bikes", "City Bikes"].map((item) => (
            <Col span={6} key={item}><Card hoverable className={styles.card}>{item}</Card></Col>
          ))}
        </Row>
      </section>

      {/* Selling Fast */}
      <section className={styles.section}>
        <h2>Selling Fast</h2>
        <Row gutter={[16, 16]} justify="center">
          {["Bike 1", "Bike 2"].map((item) => (
            <Col span={6} key={item}><Card hoverable className={styles.card}>{item}</Card></Col>
          ))}
        </Row>
      </section>

      {/* Technology Section */}
      <section className={styles.techSection}>
        <h2>Light Assist E-Bikes Explained</h2>
        <Button type="default" size="large">Discover More</Button>
      </section>

      {/* Blog Section */}
      <section className={styles.section}>
        <h2>Related Stories</h2>
        <Row gutter={[16, 16]} justify="center">
          {["E-Bike Buyer's Guide", "Winter Cycling Tips"].map((item) => (
            <Col span={6} key={item}><Card hoverable className={styles.card}>{item}</Card></Col>
          ))}
        </Row>
      </section>

      {/* Bestsellers */}
      <section className={styles.section}>
        <h2>Bestsellers</h2>
        <Row gutter={[16, 16]} justify="center">
          {["Bike A", "Bike B"].map((item) => (
            <Col span={6} key={item}><Card hoverable className={styles.card}>{item}</Card></Col>
          ))}
        </Row>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
