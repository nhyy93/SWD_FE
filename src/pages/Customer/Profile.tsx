import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Profile.module.css";
import {
  FaUserCircle, FaBox, FaHistory, FaHome, FaUsers,
  FaBell, FaMapMarkedAlt, FaShoppingCart, FaSave, FaTimes, FaSignOutAlt, FaComments
} from "react-icons/fa";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = {
      username: localStorage.getItem("username") || "",
      email: localStorage.getItem("email") || "Not available",
      address: localStorage.getItem("address") || "",
      phone: localStorage.getItem("phone") || "Not available",
    };
    setUserData(storedUser);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: Please log in.");
        return;
      }

      await axios.put("http://localhost:8080/api/user", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      Object.keys(userData).forEach((key) => {
        localStorage.setItem(key, userData[key as keyof typeof userData]);
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>CycWorld</h2>
        <ul>
          <li><FaHome /><Link to="/">Home</Link></li>
          <li className={styles.active}><FaUserCircle /><Link to="/profile">Profile</Link></li>
          <li><FaUsers /><Link to="/group-ride">My Group</Link></li>
          <li><FaBell /><Link to="/notifications">Notifications</Link></li>
          <li><FaShoppingCart /><Link to="/cart">My Cart</Link></li>
          <li><FaMapMarkedAlt /><Link to="/route-sharing">Route Sharing</Link></li>
          <li><FaBox /><Link to="/orders">Orders Status</Link></li>
          <li><FaHistory /><Link to="/transactions">Transaction History</Link></li>
          <li><FaComments /><Link to="/blogs">Manage Blogs</Link></li>
          <li className={styles.logoutBtn}><FaSignOutAlt /><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </aside>

      <main className={styles.profileContent}>
        <h2>Profile</h2>
        <div className={styles.profileForm}>
          <div className={styles.avatarSection}>
            <img src="https://via.placeholder.com/100" alt="User Avatar" className={styles.avatar} />
          </div>

          <div className={styles.formGroup}>
            <label>Username</label>
            <input type="text" name="username" value={userData.username} onChange={handleInputChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" name="email" value={userData.email} onChange={handleInputChange} disabled />
          </div>

          <div className={styles.formGroup}>
            <label>Contact Number</label>
            <input type="text" name="phone" value={userData.phone} onChange={handleInputChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Address</label>
            <input type="text" name="address" value={userData.address} onChange={handleInputChange} />
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.cancelBtn} onClick={() => navigate("/")}>
              <FaTimes /> Cancel
            </button>
            <button className={styles.saveBtn} onClick={handleSave}>
              <FaSave /> Save
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
