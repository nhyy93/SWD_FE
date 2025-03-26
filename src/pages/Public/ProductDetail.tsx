import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ProductDetail.module.css";
import { Button, Spin } from "antd";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log(`Fetching product ID: ${id}`);

                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Unauthorized: Please log in.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:8080/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                setProduct(response.data);
            } catch (error) {
                setError("Failed to fetch product details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) return <div className={styles.loading}><Spin size="large" /></div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <div>
            <Header />

            <div className={styles.container}>
                <div className={styles.imageSection}>
                    <img
                        src={product.imageUrls?.[0] || "/assets/default-product.jpg"}
                        alt={product.productName}
                        className={styles.productImage}
                    />
                </div>
                <div className={styles.infoSection}>
                    <h1 className={styles.productTitle}>{product.productName}</h1>
                    <p className={styles.productDescription}>{product.description}</p>
                    <p className={styles.productPrice}>
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
                    </p>
                    <div className={styles.buttonGroup}>
                        <Button className={`${styles.addToCart}`}>Add To Cart</Button>
                        <Button className={`${styles.buyNow}`}>Buy Now</Button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetail;
