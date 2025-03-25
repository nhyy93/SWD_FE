import { useState } from "react";
import axios from "axios";
import styles from "./ShopOwner.module.css";

const CreatePost = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("BIKE");
  const [shopId, setShopId] = useState("1");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("User is not authenticated. Please log in.");
        return;
      }

      const productData = {
        productName,
        description,
        price: parseFloat(price),
        type,
        createdAt: new Date().toISOString(),
        shopId: parseInt(shopId),
        imageUrls: [imageUrl],
      };

      const response = await axios.post("http://localhost:8080/api/products", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("API Response:", response.data);
      setMessage(`Product created successfully`);
      setProductName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
    } catch (error) {
      console.error("Error creating product:", error);
      setMessage("Failed to create product. Please try again.");
    }
  };

  return (
    <div className={styles.createPostContainer}>
      <h2 className={styles.pageTitle}>📝 Create New Product</h2>

      {message && <p className={styles.message}>{message}</p>}

      <form onSubmit={handleSubmit} className={styles.postForm}>
        <div className={styles.inputGroup}>
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write something about your product..."
            required
          />
        </div>

        <div className={styles.inputGroupRow}>
          <div className={styles.inputGroup}>
            <label>Price (VND)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="BIKE">Bike</option>
              <option value="ACCESSORY">Accessory</option>
            </select>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Shop ID</label>
          <input
            type="number"
            value={shopId}
            onChange={(e) => setShopId(e.target.value)}
            placeholder="Enter Shop ID"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
