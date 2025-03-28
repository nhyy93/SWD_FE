import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./CreateShop.module.css";

const CreateShop: React.FC = () => {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState({
    shpName: "",
    shpLocation: "",
    openHours: "",
    shpDescription: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setShopData({ ...shopData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Unauthorized: Please log in.");
        return;
      }

      const payload = { shop: shopData };

      await axios.post("http://localhost:8080/api/shops/requests/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setMessage("Shop request submitted successfully!");
      setTimeout(() => navigate("/"), 2000); 
    } catch (error) {
      console.error("Error creating shop:", error);
      setMessage("Failed to submit shop request.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create Your Shop</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Shop Name</label>
          <input type="text" name="shpName" value={shopData.shpName} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Location</label>
          <input type="text" name="shpLocation" value={shopData.shpLocation} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Opening Hours</label>
          <input type="text" name="openHours" placeholder="08:00 - 22:00" value={shopData.openHours} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea name="shpDescription" value={shopData.shpDescription} onChange={handleChange} required></textarea>
        </div>

        <button type="submit" className={styles.submitButton}>Submit Request</button>
      </form>
    </div>
  );
};

export default CreateShop;
