import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import axios from "axios";
import styles from "./ProductManagement.module.css";

const { Option } = Select;

const ProductManagement: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const response = await axios.get("http://localhost:8080/api/products", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Unauthorized: Please log in.");
                return;
            }

            await axios.delete(`http://localhost:8080/api/products/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setProducts(products.filter((product) => product.id !== productId));
            alert("Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product.");
        }
    };


    return (
        <div className={styles.container}>
            <h1>📦 Product Management</h1>

            <Table
                dataSource={products}
                loading={loading}
                rowKey="id"
                columns={[
                    { title: "Product Name", dataIndex: "productName", key: "productName" },
                    { title: "Description", dataIndex: "description", key: "description" },
                    { title: "Price", dataIndex: "price", key: "price", render: (text) => `${text.toLocaleString()} ₫` },
                    {
                        title: "Type",
                        dataIndex: "type",
                        key: "type",
                        render: (type) => (
                            <span className={`${styles.productType} ${type === "ACCESSORY" ? styles.accessory : styles.bike}`}>
                                {type}
                            </span>
                        ),
                    },
                    {
                        title: "Actions",
                        key: "actions",
                        render: (_, record) => (
                            <Button className={styles.deleteBtn} danger onClick={() => handleDeleteProduct(record.id)}>
                                Delete
                            </Button>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default ProductManagement;
