import { useState } from "react";
import styles from "./ShopOwner.module.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  return (
    <div className={styles.createPostContainer}>
      <h2 className={styles.pageTitle}>📝 Create New Post</h2>
      <form className={styles.postForm}>
        <div className={styles.inputGroup}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <div className={styles.inputGroupRow}>
          <div className={styles.inputGroup}>
            <label>Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Discount (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Enter discount (if any)"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something about your product..."
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
