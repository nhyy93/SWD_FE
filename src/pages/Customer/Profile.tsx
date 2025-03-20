import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [joinedDate, setJoinedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "Guest";
    const storedEmail = localStorage.getItem("email") || "Not available";
    const storedDate = localStorage.getItem("joinedAt") || "Unknown";
    setUsername(storedUsername);
    setEmail(storedEmail);
    setJoinedDate(storedDate);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileBox}>
        <h2>👤 User Profile</h2>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Joined:</strong> {joinedDate}</p>

        <div className={styles.buttonGroup}>
          <button className={styles.editBtn}>Edit Profile</button>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
