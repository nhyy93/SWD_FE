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
  {
    id: 5,
    name: "Precede:ON Comfort 5",
    description: "Bosch Performance Line Sport, Shimano CUES U4000",
    price: "$3,699",
    oldPrice: "",
    discount: "",
    image: "/assets/pro1.webp",
  },
  {
    id: 6,
    name: "US Pathlite:ON 7 step-through",
    description: "Shimano MT200, Shimano CUES U6000",
    price: "$4,299",
    oldPrice: "",
    discount: "",
    image: "/assets/bic6.jpeg",
  },
  {
    id: 7,
    name: "Precede:ON Comfort 4",
    description: "Bosch Active Line, Shimano CUES U3020",
    price: "$2,299",
    oldPrice: "$3,499",
    discount: "-34%",
    image: "/assets/bic7.webp",
  },
  {
    id: 8,
    name: "Pathlite:ON 5 SUV step-through",
    description: "Shimano MT200, Shimano CUES U6000",
    price: "$3,699",
    oldPrice: "",
    discount: "",
    image: "/assets/bic8.webp",
  },
  {
    id: 9,
    name: "Precede:ON Comfort 7",
    description: "Bosch Performance Line Sport, Shimano Nexus 5",
    price: "$4,499",
    oldPrice: "",
    discount: "New",
    image: "/assets/bic9.webp",
  },
  {
    id: 10,
    name: "Grand Canyon:ON 7",
    description: "Shimano Deore M6100, RODI TRYP30 EVO",
    price: "$3,799",
    oldPrice: "",
    discount: "625 Wh battery",
    image: "/assets/bic3.jpg",
  },
  {
    id: 11,
    name: "Strive:ON CFR Underdog",
    description: "Bosch Performance Line CX, Fox 38 Rhythm Grip",
    price: "$5,799",
    oldPrice: "",
    discount: "",
    image: "/assets/bic11.webp",
  },
  {
    id: 12,
    name: "Spectral:ON CF 8",
    description: "Shimano EP801, Fox 38 Rhythm 160mm 29",
    price: "$5,999",
    oldPrice: "",
    discount: "Coming soon",
    image: "/assets/bic12.jpg",
  },

  {
    id: 13,
    name: "Pathlite:ON 5 SUV mid-step",
    description: "Shimano MT200, Shimano Deore M5100 11s",
    price: "$3,499",
    oldPrice: "",
    discount: "Coming soon",
    image: "/assets/bic13.jpg",
  },
  {
    id: 14,
    name: "Pathlite:ON 4 SUV step-through",
    description: "Shimano MT200, Shimano CUES U6000",
    price: "$3,399",
    oldPrice: "",
    discount: "Coming soon",
    image: "/assets/bic14.jpg",
  },
  {
    id: 15,
    name: "Grail:ON CF 7 AXS",
    description: "Bosch Performance Line Speed 28mph, SRAM Rival XPLR eTap AXS",
    price: "$5,599",
    oldPrice: "",
    discount: "Coming soon",
    image: "/assets/bic15.webp",
  }
];

const stories = [
  {
    id: 1,
    title: "E-Bike Buyer's Guide",
    date: "6/15/21",
    description: "Our comprehensive guide to e-bikes will help you decide which e-bike is best for you.",
    image: "/assets/str1.jpg",
  },
  {
    id: 2,
    title: "E-bike in winter: Care and maintenance tips for safe riding",
    date: "10/29/24",
    description: "Want to ride through the winter but aren’t sure how? Read on for our top tips...",
    image: "/assets/str2.jpg",
  },
  {
    id: 3,
    title: "Electric Touring Bikes Buying Guide",
    date: "7/16/21",
    description: "E-touring bikes are great for cycling holidays and discovering new places. Which one should you choose?",
    image: "/assets/str3.jpg",
  },
  {
    id: 4,
    title: "How to look after your e-bike battery",
    date: "11/14/24",
    description: "E-bike batteries are expensive to replace, so you need to take good care of them. Follow our advice...",
    image: "/assets/str4.jpeg",
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

      <div className={styles.lightAssistSection}>
        <div className={styles.overlay}>
          <div className={styles.lightAssistContent}>
            <h2>Light assist e-bikes explained</h2>
            <p>
              Learn more about our new generation of lightweight e-bikes.
            </p>
            <div className={styles.lightAssistButtons}>
              <Button type="primary" size="large">Shop :ONfly bikes</Button>
              <Button size="large" className={styles.discoverButton}>Discover more</Button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.newBikeDisplay}>
        <Card hoverable className={styles.bikeDetailCard}>
          <div className={styles.bikeContent}>
            <div className={styles.bikeImageWrapper}>
              <img src="/assets/bic2.webp" alt="Grizl:ONfly CF 7" />
            </div>

            <div className={styles.bikeInfo}>
              <div className={styles.badges}>
                <span className={styles.discount}>-20%</span>
                <span className={styles.tag}>Best for less</span>
              </div>
              <h2>Grizl:ONfly CF 7</h2>
              <p>Performance Line Sprint, Shimano GRX RX812 GS</p>
              <p><strong>Free Ground Shipping</strong></p>
              <p className={styles.price}>
                <span>{bicycles[1].price}</span>
                <span className={styles.oldPrice}>{bicycles[1].oldPrice}</span>
              </p>
              <Button type="primary">Check Availability</Button>
            </div>
          </div>
        </Card>
      </div>

      <div className={styles.productListSection}>
        <h2>More Options</h2>
        <div className={styles.productGrid}>
          {bicycles.map((bike) => (
            <Card key={bike.id} hoverable className={styles.productCard}>
              <div className={styles.productImageWrapper}>
                <img src={bike.image} alt={bike.name} className={styles.productImage} />
              </div>
              <div className={styles.productInfo}>
                {bike.discount && <span className={styles.discount}>{bike.discount}</span>}
                <h3>{bike.name}</h3>
                <p>{bike.description}</p>
                <p className={styles.price}>
                  {bike.price} {bike.oldPrice && <span className={styles.oldPrice}>{bike.oldPrice}</span>}
                </p>
                <Button type="primary">View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <section className={styles.section}>
        <h2>Related Stories</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className={styles.storySwiper}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
        >
          {stories.map((story) => (
            <SwiperSlide key={story.id}>
              <Card hoverable className={styles.storyCard}>
                <div className={styles.storyImageWrapper}>
                  <img src={story.image} alt={story.title} className={styles.storyImage} />
                </div>
                <div className={styles.storyContent}>
                  <p className={styles.storyDate}>{story.date}</p>
                  <h3 className={styles.storyTitle}>{story.title}</h3>
                  <p className={styles.storyDescription}>{story.description}</p>
                  <button className={styles.readMore}>Read More</button>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>;

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
