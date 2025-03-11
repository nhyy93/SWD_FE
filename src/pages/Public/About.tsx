import React from "react";
import styles from "./About.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const About: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.aboutPage}>
        {/* Contact Section */}
        <section className={styles.contactSection}>
          <div className={styles.contactText}>
            <p className={styles.breadcrumbs}>CycWorld / Support Center</p>
            <h2>Contact Us</h2>
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
          <div className={styles.contactForm}>
            <h3>Contact Form</h3>
            <p>Live support available</p>
          </div>
        </section>

        {/* News Section */}
        <section className={styles.newsSection}>
          <div className={styles.newsText}>
            <h2>News & Stories</h2>
            <p>
              Get the latest updates on road biking, gravel adventures, 
              and fitness cycling trends.
            </p>
            <p>
              Plus, inside knowledge about our latest bike models, products, 
              and everything related to CycWorld.
            </p>
            <button className={styles.newsButton}>Read More</button>
          </div>
          <div className={styles.newsImage}>
            <img src="/assets/news-image.jpg" alt="Cyclist Story" />
          </div>
        </section>

        {/* Bestsellers Section */}
        <section className={styles.bestsellersSection}>
          <h2>Bestsellers</h2>
          <div className={styles.bikeGrid}>
            {[
              { id: 1, name: "AMIRA SLR 6.0", price: "$3,999", img: "/assets/dc1.jpeg" },
              { id: 2, name: "AMIRA RED AXS", price: "$5,499", img: "/assets/bike2.jpg" },
              { id: 3, name: "AMIRA EX 5.0", price: "$7,199", img: "/assets/bike3.jpg" },
            ].map((bike) => (
              <div key={bike.id} className={styles.bikeCard}>
                <img src={bike.img} alt={bike.name} />
                <h3>{bike.name}</h3>
                <p>Shimano 105 R7100, 12-speed, DT Swiss Arc 1100</p>
                <p className={styles.price}>{bike.price}</p>
                <button>Detail</button>
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
