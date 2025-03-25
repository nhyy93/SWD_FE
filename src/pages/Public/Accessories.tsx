import React from "react";
import { Link } from "react-router-dom";
import styles from "./Accessories.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const accessories = [
  {
    id: 1,
    name: "CycWorld Garmin Mount",
    price: "$29.95",
    img: "/assets/accessory1.jpg",
    tag: "Sale",
  },
  {
    id: 2,
    name: "CycWorld Frontlight Set",
    price: "$134.95",
    oldPrice: "$154.95",
    img: "/assets/accessory2.jpg",
    tag: "Sale",
  },
  {
    id: 3,
    name: "CycWorld Carbon Bottle Cage",
    price: "$39.95",
    oldPrice: "$44.95",
    img: "/assets/accessory3.jpg",
    tag: "New",
  },
  {
    id: 4,
    name: "CycWorld Gear Groove Computer Mount",
    price: "$19.95",
    img: "/assets/accessory4.jpg",
    tag: "New Stock",
  },
  {
    id: 5,
    name: "CycWorld GEAR GROOVE Carbon Mount",
    price: "$134.95",
    oldPrice: "$154.95",
    img: "/assets/accessory5.jpg",
    tag: "Sale",
  },
];

const Accessories: React.FC = () => {
  return (
    <div className={styles.accessories}>
      <Header />

      <div className={styles.heroSection}>
        <h1>Bike Gear</h1>
        <p>Find everything from pedals, lights, locks, and more for your ride.</p>
        <button className={styles.primaryButton}>See all gear</button>
      </div>

      <section className={styles.productsContainer}>
        <div className={styles.filters}>
          <button className={styles.filterButton}>Recommended</button>
          <button className={styles.filterButton}>Show Filters</button>
        </div>

        <div className={styles.productGrid}>
          {accessories.map((item) => (
            <div key={item.id} className={styles.productCard}>
              {item.tag && <span className={styles.productTag}>{item.tag}</span>}
              <img src={item.img} alt={item.name} className={styles.productImage} />
              <h3>{item.name}</h3>
              <p className={styles.price}>
                {item.oldPrice && <span className={styles.oldPrice}>{item.oldPrice}</span>}
                {item.price}
              </p>
              <button className={styles.buyButton}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.relatedCategories}>
        <h2>Related Categories</h2>
        <div className={styles.categoryButtons}>
          <button className={styles.categoryButton}>Bike Parts</button>
          <button className={styles.categoryButton}>Clothing</button>
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
