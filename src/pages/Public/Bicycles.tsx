import React, { useEffect, useState } from "react";
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
import axios from "axios";


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

  const [bicycles, setBicycles] = useState<any[]>([]);
  const [sellingFast, setSellingFast] = useState<any[]>([]);
  const [bestForLess, setBestForLess] = useState<any | null>(null);
  const [moreOptions, setMoreOptions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [bestSellers, setBestSellers] = useState<any[]>([]);


  useEffect(() => {
    const fetchBicycles = async () => {
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

        const products = response.data;

        const bikeProducts = products.filter((product) => product.type === "BIKE");

        const sortedBikes = [...bikeProducts].sort((a, b) => a.price - b.price);

        setBicycles(sortedBikes);
        setSellingFast(sortedBikes.slice(0, 5));
        setBestSellers(sortedBikes.slice(0, 2));
        setBestForLess(sortedBikes[0]);
        setMoreOptions(sortedBikes);

      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again.");
      }
    };

    fetchBicycles();
  }, []);


  return (
    <div className={styles.bicycles}>
      <Header />

      <div className={styles.heroSection} style={{ backgroundImage: `url(${heroImage})` }}>
        <h1>Bikes</h1>
        <p>Like riding a bike, but better</p>
        <Button type="primary" size="large">See the bikes</Button>
      </div>

      {/* Selling Fast Section */}
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
          {sellingFast.map((bike) => (
            <SwiperSlide key={bike.id}>
              <Card hoverable className={styles.bikeCard}>
                <img
                  src={
                    bike.imageUrls && bike.imageUrls.length > 0
                      ? bike.imageUrls[0] // URL từ API
                      : "/assets/default-bike.jpg" // Ảnh mặc định nếu không có
                  }
                  alt={bike.productName}
                  className={styles.bikeImage}
                />

                <h3>{bike.productName}</h3>
                <p>{bike.description}</p>
                <p className={styles.price}>
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(bike.price)}
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

      {/* Best for Less Section */}
      {bestForLess && (
        <div className={styles.newBikeDisplay}>
          <Card hoverable className={styles.bikeDetailCard}>
            <div className={styles.bikeContent}>
              <div className={styles.bikeImageWrapper}>
                <img
                  src={bestForLess.imageUrls && bestForLess.imageUrls.length > 0 ? bestForLess.imageUrls[0] : "/assets/default-bike.jpg"}
                  alt={bestForLess.productName}
                  className={styles.bikeImage}
                />
              </div>

              <div className={styles.bikeInfo}>
                <div className={styles.badges}>
                  <span className={styles.tag}>Best for less</span>
                </div>
                <h2>{bestForLess.productName}</h2>
                <p>{bestForLess.description}</p>
                <p><strong>Free Ground Shipping</strong></p>
                <p className={styles.price}>
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(bestForLess.price)}
                </p>
                <Button type="primary">Check Availability</Button>
              </div>
            </div>
          </Card>
        </div>
      )}


      {/* More Options Section */}
      <div className={styles.productListSection}>
        <h2>More Options</h2>
        <div className={styles.productGrid}>
          {moreOptions.map((bike) => (
            <Card key={bike.id} hoverable className={styles.productCard}>
              <div className={styles.productImageWrapper}>
                <img
                  src={bike.imageUrls && bike.imageUrls.length > 0 ? bike.imageUrls[0] : "/assets/default-bike.jpg"}
                  alt={bike.productName}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.productInfo}>
                <h3>{bike.productName}</h3>
                <p>{bike.description}</p>
                <p className={styles.price}>
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(bike.price)}
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
          {bestSellers.map((bike) => (
            <Card key={bike.id} hoverable className={styles.storyCard}>
              <div className={styles.productImageWrapper}>
                <img
                  src={bike.imageUrls && bike.imageUrls.length > 0 ? bike.imageUrls[0] : "/assets/default-bike.jpg"}
                  alt={bike.productName}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.productInfo}>
                <h3>{bike.productName}</h3>
                <p>{bike.description}</p>
                <p className={styles.price}>
                  {bike.price.toLocaleString("vi-VN")} ₫
                </p>
                <Button type="primary">View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bicycles;
