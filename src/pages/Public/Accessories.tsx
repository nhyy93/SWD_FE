import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import styles from "./Accessories.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Accessories: React.FC = () => {
  const [accessories, setAccessories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        // const token = localStorage.getItem("token");

        // if (!token) {
        //   setError("User is not authenticated. Please log in.");
        //   return;
        // }

        const response = await axios.get("http://localhost:8080/api/products", {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });

        const accessoryProducts = response.data.filter((item) => item.type === "ACCESSORY");

        setAccessories(accessoryProducts);
      } catch (error) {
        console.error("Error fetching accessories:", error);
        setError("Failed to fetch accessories. Please try again.");
      }
    };

    fetchAccessories();
  }, []);

  return (
    <div className={styles.accessories}>
      <Header />

      <div className={styles.heroSection}>
        <h1>Bike Gear</h1>
        <p>Find everything from pedals, lights, locks, and more for your ride.</p>
      </div>

      <section className={styles.productsContainer}>

        <div className={styles.productGrid}>
          {error ? (
            <p className={styles.error}>{error}</p>
          ) : accessories.length === 0 ? (
            <p>No accessories available.</p>
          ) : (
            accessories.map((item) => (
              <div key={item.id} className={styles.productCard}>
                {item.tag && <span className={styles.productTag}>{item.tag}</span>}
                <img
                  src={item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : "/assets/default-accessory.jpg"}
                  alt={item.productName}
                  className={styles.productImage}
                />
                <h3>{item.productName}</h3>
                <p className={styles.price}>
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}
                </p>
                <Button type="primary">Add to Cart</Button>
              </div>
            ))
          )}
        </div>
      </section>

      <section className={styles.relatedStories}>
        <h2>Related Stories</h2>
        <div className={styles.storiesGrid}>
          <div className={styles.storyCard}>
            <img src="/assets/ac1.jpg" alt="Story 1" />
            <h4>How to choose a bike helmet</h4>
            <p>A guide to choosing the perfect helmet for you.</p>
          </div>
          <div className={styles.storyCard}>
            <img src="/assets/ac2.avif" alt="Story 2" />
            <h4>How to choose cycling shoes</h4>
            <p>The best guide for selecting the right shoes.</p>
          </div>
          <div className={styles.storyCard}>
            <img src="/assets/ac3.avif" alt="Story 3" />
            <h4>Flat pedals vs clipless pedals</h4>
            <p>Understanding the best pedals for your needs.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Accessories;
