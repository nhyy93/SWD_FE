import React from "react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
import {
    FaUserCircle, FaBox, FaHistory, FaHome, FaUsers,
    FaBell, FaMapMarkedAlt, FaShoppingCart, FaComments
} from "react-icons/fa";

export default function NotificationPage() {
    const notifications = [
        { id: 1, message: "Your order #1234 has been shipped.", time: "2 hours ago" },
        { id: 2, message: "You joined the 'Weekend Mountain Ride'.", time: "1 day ago" },
        { id: 3, message: "New cycling service available near you!", time: "3 days ago" },
    ];

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <h2 className={styles.logo}>CycWorld</h2>
                <ul>
                    <li><FaHome /><Link to="/">Home</Link></li>
                    <li><FaUserCircle /><Link to="/profile">Profile</Link></li>
                    <li><FaUsers /><Link to="/group-ride">My Group</Link></li>
                    <li className={styles.active}><FaBell /><Link to="/noti">Notifications</Link></li>
                    <li><FaShoppingCart /><Link to="/cart">My Cart</Link></li>
                    <li><FaMapMarkedAlt /><Link to="/route-sharing">Route Sharing</Link></li>
                    <li><FaBox /><Link to="/orders">Orders Status</Link></li>
                    <li><FaHistory /><Link to="/transactions">Transaction History</Link></li>
                    <li><FaComments /><Link to="/blogs">Manage Blogs</Link></li>
                </ul>
            </aside>

            {/* Content */}
            <div style={{
                marginLeft: "270px",
                background: "#f5f5f5",
                minHeight: "100vh",
                padding: "40px",
                boxSizing: "border-box",
                width: "calc(100% - 270px)"
            }}>
                <h2 style={{ fontSize: "28px", marginBottom: "30px" }}>Notifications</h2>

                <div style={{
                    maxWidth: "900px",
                    margin: "0 auto"
                }}>
                    {notifications.length === 0 ? (
                        <p>No notifications.</p>
                    ) : (
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {notifications.map((n) => (
                                <li key={n.id} style={{
                                    background: "#e6f3ff",
                                    padding: "20px 25px",
                                    borderRadius: "8px",
                                    marginBottom: "20px",
                                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                    fontSize: "16px"
                                }}>
                                    <p style={{ margin: 0 }}>{n.message}</p>
                                    <small style={{ color: "#555", fontSize: "14px" }}>{n.time}</small>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>



        </div>
    );
}
