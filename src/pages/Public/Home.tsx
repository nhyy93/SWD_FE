import React from "react";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Home: React.FC = () => {
  return (
    <div className={styles.homepage}>
      <Header />
      <section className={styles.heroSection} style={{ backgroundImage: 'url("/assets/bghome.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className={styles.heroContent}>
          <h1>Custom made</h1>
          <p>
            Introducing CycWorld. Realize the bike of your dreams.
          </p>
          <button>Customize your dream ride</button>
        </div>
      </section>


      <section className={styles.shopByWorld}>
        <h2>Shop by world</h2>
        <div className={styles.worldGrid}>
          <div className={styles.worldItem}>
            <img src="/assets/m1.jpg" alt="Road Bikes" />
            <p>Road Bikes</p>
          </div>
          <div className={styles.worldItem}>
            <img src="/assets/m2.jpg" alt="Gravel Bikes" />
            <p>Gravel Bikes</p>
          </div>
          <div className={styles.worldItem}>
            <img src="/assets/m3.jpg" alt="Mountain Bikes" />
            <p>Mountain Bikes</p>
          </div>
          <div className={styles.worldItem}>
            <img src="/assets/m4.webp" alt="E-Bikes" />
            <p>E-Bikes</p>
          </div>
          <div className={styles.worldItem}>
            <img src="/assets/m5.webp" alt="City & Touring Bikes" />
            <p>City & Touring Bikes</p>
          </div>
        </div>
      </section>

      <section className={styles.discoverMore}>
        <h2>Discover more from CycWorld</h2>
        <div className={styles.discoverGrid}>
          <div className={styles.discoverCard}>
            <img src="/assets/deal1.jpg" alt="Deal 1" />
            <h3>Go fast for less</h3>
            <p>
              Compact geometry, promising long rides at a fraction of speed.
            </p>
          </div>
          <div className={styles.discoverCard}>
            <img src="/assets/deal2.jpg" alt="Deal 2" />
            <h3>Deal of the day</h3>
            <p>
              Aero-road CF SLX AXS: built for speed and performance.
            </p>
          </div>
          <div className={styles.discoverCard}>
            <img src="/assets/deal3.jpg" alt="Deal 3" />
            <h3>Save on adventures</h3>
            <p>
              Explore rough terrains with comfort and style.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.supportSection}>
        <h2>CycWorld Support</h2>
        <div className={styles.supportGrid}>
          <div className={styles.supportItem}>
            <img src="/assets/support1.jpg" alt="Support 1" />
            <h3>Visit the CycWorld Showroom Center</h3>
            <p>Learn More</p>
          </div>
          <div className={styles.supportItem}>
            <img src="/assets/support2.jpg" alt="Support 2" />
            <h3>MyCycWorld: My Rides, Connected</h3>
            <p>Download the App</p>
          </div>
        </div>
      </section>

      <section className={styles.newsSection}>
        <h2>News & Stories</h2>
        <div className={styles.newsGrid}>
          <div className={styles.newsCard}>
            <img src="/assets/new1.jpg" alt="News 1" />
            <p>Mountain bike passion: where every trail is a new adventure.</p>
            <button>Read more</button>
          </div>
          <div className={styles.newsCard}>
            <img src="/assets/new2.webp" alt="News 2" />
            <p>Gear up for your next gravel ride. Tips and stories.</p>
            <button>Read more</button>
          </div>
          <div className={styles.newsCard}>
            <img src="/assets/new3.jpg" alt="News 3" />
            <p>Urban commute made easy: city cycling at its best.</p>
            <button>Read more</button>
          </div>
          <div className={styles.newsCard}>
            <img src="/assets/new4.jpg" alt="News 4" />
            <p>Join our charity ride event, pushing limits for a cause.</p>
            <button>Read more</button>
          </div>
          <div className={styles.newsCard}>
            <img src="/assets/new5.avif" alt="News 5" />
            <p>Off-road challenge: explore beyond the beaten path.</p>
            <button>Read more</button>
          </div>
          <div className={styles.newsCard}>
            <img src="/assets/new6.webp" alt="News 6" />
            <p>The ultimate guide to bikepacking adventures.</p>
            <button>Read more</button>
          </div>
          <div className={styles.newsCard}>
            <img src="/assets/new7.jpeg" alt="News 7" />
            <p>Best scenic cycling routes around the world.</p>
            <button>Read more</button>
          </div>
        </div>
      </section>


      <Footer />

    </div>
  );
};

export default Home;
