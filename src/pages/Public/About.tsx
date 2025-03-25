import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./About.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const About: React.FC = () => {
  const [bestSeller, setBestSeller] = useState<any | null>(null);

  useEffect(() => {
    const fetchBestseller = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("User is not authenticated.");
          return;
        }

        const response = await axios.get("http://localhost:8080/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const sortedProducts = [...response.data].sort((a, b) => a.price - b.price);
        setBestSeller(sortedProducts[0]); 
      } catch (error) {
        console.error("Error fetching bestseller:", error);
      }
    };

    fetchBestseller();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.aboutPage}>
        <section className={styles.contactSection}>
          <div className={styles.contactText}>
            <p className={styles.breadcrumbs}>CycWorld / Support Center</p>
            <h2>Contact Us</h2>
            <h3>Contact Form</h3>
            <p>Live support available</p>
          </div>

          <div className={styles.contactForm}>
            <p className={styles.contactDescription}>
              We're here to help! From questions about bikes to filing a warranty claim,
              our experts have you covered.
            </p>
            <p className={styles.responseTime}>
              Due to high volume of inquiries, response times may take up to 5-10 days.
            </p>
            <h3>📞 012-345-6789</h3>
            <p>Mon-Fri 8:30am - 5:00pm</p>
            <p>123 High-Tech Park</p>
            <p>cycworld@gmail.com</p>
          </div>
        </section>

        <section className={styles.newsSection}>
          <div className={styles.newsText}>
            <h2>News & Stories</h2>
            <p>
              After months of planning, Alex finally purchased his dream bike along with top-notch accessories from a popular cycling website. 
              The site not only offered the best gear but also featured a collection of well-loved cycling routes, complete with stories from riders who had conquered them before.
            </p>
            <p>
              Eager to put his new purchase to the test, Alex chose a scenic trail known for its mix of challenging hills and breathtaking views. 
              As he pedaled along the winding roads, he felt a deep connection to every mile—the same routes that had inspired countless cyclists before him.
            </p>
            <button className={styles.newsButton}>Read More</button>
          </div>
          <div className={styles.newsImage}>
            <img src="/assets/story.jpg" alt="Cyclist Story" />
          </div>
        </section>

        <section className={styles.bestsellersSection}>
          <h2>Bestsellers</h2>
          <div className={styles.bikeGrid}>
            {[
              { id: 1, name: "AMIRA SLR 6.0", price: "3.999.000 ₫", img: "/assets/dc1.jpeg" },
              { id: 2, name: "SRAM RED AXS RD 12s, DT Swiss ARC 1100 Dicut db", price: "6.999.000 ₫", img: "/assets/dc2.jpg" },
            ].map((bike) => (
              <div key={bike.id} className={styles.bikeCard}>
                <img src={bike.img} alt={bike.name} />
                <h3>{bike.name}</h3>
                <p>Shimano 105 R7100, 12-speed, DT Swiss Arc 1100</p>
                <p className={styles.price}>{bike.price}</p>
                <button>Detail</button>
              </div>
            ))}

            {bestSeller && (
              <div key={bestSeller.id} className={styles.bikeCard}>
                <img
                  src={bestSeller.imageUrls && bestSeller.imageUrls.length > 0 ? bestSeller.imageUrls[0] : "/assets/default-bike.jpg"}
                  alt={bestSeller.productName}
                />
                <h3>{bestSeller.productName}</h3>
                <p>{bestSeller.description}</p>
                <p className={styles.price}>{bestSeller.price.toLocaleString("vi-VN")} ₫</p>
                <button>Detail</button>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
