import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import { 
  FaUserCircle, FaBox, FaHistory, FaCog, FaHome, FaUsers, 
  FaBell, FaMapMarkedAlt, FaShoppingCart , FaSave, FaTimes, FaSignOutAlt, 
  FaComments
} from "react-icons/fa";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    city: "",
    state: "",
    password: "",
  });

  useEffect(() => {
    const storedUser = {
      firstName: localStorage.getItem("firstName") || "",
      lastName: localStorage.getItem("lastName") || "",
      email: localStorage.getItem("email") || "",
      phone: localStorage.getItem("phone") || "",
      address: localStorage.getItem("address") || "",
      city: localStorage.getItem("city") || "",
      state: localStorage.getItem("state") || "",
      password: localStorage.getItem("password") || "",
    };
    setUserData(storedUser);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    Object.keys(userData).forEach((key) => {
      localStorage.setItem(key, userData[key as keyof typeof userData]);
    });
    alert("Profile updated successfully!");
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
          <li>
            <FaHome />
            <Link to="/" className={styles.noUnderline}>Home</Link>
          </li>
          <li className={styles.active}><FaUserCircle /> Profile</li>
          <li><FaUsers /> My Group</li>
          <li><FaBell /> Notifications</li>
          <li><FaShoppingCart /> My Cart</li>
          <li><FaMapMarkedAlt /> Saved Routes</li>
          <li><FaBox /> Orders Status</li>
          <li><FaHistory /> Transaction History</li>
          <li><FaComments /> Chat</li>
        </ul>
      </aside>

      <main className={styles.profileContent}>
        <h2>Edit Profile</h2>
        <div className={styles.profileForm}>
          <div className={styles.avatarSection}>
            <img src="https://via.placeholder.com/100" alt="User Avatar" className={styles.avatar} />
          </div>

          <div className={styles.formGroup}>
            <label>First Name</label>
            <input type="text" name="firstName" value={userData.firstName} onChange={handleInputChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Last Name</label>
            <input type="text" name="lastName" value={userData.lastName} onChange={handleInputChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" name="email" value={userData.email} onChange={handleInputChange} disabled />
          </div>

          <div className={styles.formGroup}>
            <label>Phone</label> 
            <input type="text" name="phone" value={userData.phone} onChange={handleInputChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Address</label>
            <input type="text" name="address" value={userData.address} onChange={handleInputChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Contact Number</label>
            <input type="text" name="phone" value={userData.phone} onChange={handleInputChange} />
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label>City</label>
              <input type="text" name="city" value={userData.city} onChange={handleInputChange} />
            </div>

            <div className={styles.formGroup}>
              <label>State</label>
              <input type="text" name="state" value={userData.state} onChange={handleInputChange} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.cancelBtn} onClick={() => navigate("/")}>
              <FaTimes /> Cancel
            </button>
            <button className={styles.saveBtn} onClick={handleSave}>
              <FaSave /> Save
            </button>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
