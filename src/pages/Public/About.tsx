import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./About.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const About: React.FC = () => {
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        const products = response.data;
        const bikeProducts = products.filter((product) => product.type === "BIKE");
        const sortedBikes = [...bikeProducts].sort((a, b) => a.price - b.price);
        setBestSellers(sortedBikes.slice(0, 2));
      } catch (error) {
        console.error("Error fetching bestsellers:", error);
      }
    };

    fetchBestsellers();
  }, []);

  const handleDetailClick = (productId: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      navigate(`/product/${productId}`);
    }
  };

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
            {bestSellers.map((bike) => (
              <div key={bike.id} className={styles.bikeCard}>
                <img
                  src={bike.imageUrls && bike.imageUrls.length > 0 ? bike.imageUrls[0] : "/assets/default-bike.jpg"}
                  alt={bike.productName}
                />
                <h3>{bike.productName}</h3>
                <p>{bike.description}</p>
                <p className={styles.price}>{bike.price.toLocaleString("vi-VN")} ₫</p>
                <button onClick={() => handleDetailClick(bike.id)}>Detail</button>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
