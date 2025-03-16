import React from "react";
import { Button, Card } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import heroImage from "../../assets/anh2.webp";
import styles from "./Bicycles.module.css";

// Fake dữ liệu xe đạp
const bicycles = [
  {
    id: 1,
    name: "Neuron:ON CF 7",
    description: "Bosch Performance Line SX, RockShox Pike",
    price: "$4,399",
    oldPrice: "$5,499",
    discount: "-20%",
    image: "/assets/bic1.png",
  },
  {
    id: 2,
    name: "Grizl:ON CF 9",
    description: "Performance Line Sprint, SRAM Force XPLR AXS, 12-speed",
    price: "$5,399",
    oldPrice: "$5,999",
    discount: "Sale",
    image: "/assets/bic2.webp",
  },
  {
    id: 3,
    name: "Grand Canyon:ON 7",
    description: "Shimano Deore M6100, RODI TRYP30 EVO",
    price: "$3,799",
    oldPrice: "",
    discount: "625 Wh battery",
    image: "/assets/bic3.jpg",
  },
  {
    id: 4,
    name: "Spectral:ON CF 8",
    description: "Shimano EP801, FOX 36 Performance Elite",
    price: "$6,499",
    oldPrice: "$7,199",
    discount: "-10%",
    image: "/assets/bic4.jpg",
  },
];

const Bicycles: React.FC = () => {
  return (
    <div className={styles.bicycles}>
      <Header />

      <div className={styles.heroSection} style={{ backgroundImage: `url(${heroImage})` }}>
        <h1>Bikes</h1>
        <p>Like riding a bike, but better</p>
        <Button type="primary" size="large">See the bikes</Button>
      </div>

      {/* Carousel - Selling Fast */}
      <section className={styles.section}>
        <h2>Selling Fast</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className={styles.bikeSwiper}
        >
          {bicycles.map((bike) => (
            <SwiperSlide key={bike.id}>
              <Card hoverable className={styles.bikeCard}>
                <span className={styles.discount}>{bike.discount}</span>
                <img src={bike.image} alt={bike.name} className={styles.bikeImage} />
                <h3>{bike.name}</h3>
                <p>{bike.description}</p>
                <p className={styles.price}>
                  {bike.price} {bike.oldPrice && <span className={styles.oldPrice}>{bike.oldPrice}</span>}
                </p>
                <Button type="primary">Detail</Button>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Light Assist E-Bikes Explained */}
      <section className={styles.techSection}>
        <h2>Light Assist E-Bikes Explained</h2>
        <Button type="default" size="large">Discover More</Button>
      </section>

      {/* Related Stories */}
      <section className={styles.section}>
        <h2>Related Stories</h2>
        <div className={styles.storyGrid}>
          <Card hoverable className={styles.storyCard}>E-Bike Buyer's Guide</Card>
          <Card hoverable className={styles.storyCard}>Winter Cycling Tips</Card>
        </div>
      </section>

      {/* Bestsellers */}
      <section className={styles.section}>
        <h2>Bestsellers</h2>
        <div className={styles.storyGrid}>
          <Card hoverable className={styles.storyCard}>Bike A</Card>
          <Card hoverable className={styles.storyCard}>Bike B</Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bicycles;
