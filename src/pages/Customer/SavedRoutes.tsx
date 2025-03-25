import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css"; // Tái sử dụng sidebar CSS
import "./SavedRoutes.css";
import {
    FaUserCircle, FaBox, FaHistory, FaHome, FaUsers,
    FaBell, FaMapMarkedAlt, FaShoppingCart, FaComments
} from "react-icons/fa";

const initialRoutes = [
    { id: 101, title: "An Lợi Đông to Tân Phú", date: "2025-02-20", sport: "Cycling", location: "Thủ Đức", distance: "11.3 mi", duration: "01:05", speed: "10.4 mph" },
    { id: 102, title: "Vinhomes Central Park to Nguyễn Huệ", date: "2025-03-05", sport: "Cycling", location: "Bình Thạnh", distance: "9.2 mi", duration: "00:50", speed: "11.0 mph" },
    { id: 103, title: "Cầu Phú Mỹ to Quận 7", date: "2025-03-10", sport: "Cycling", location: "Quận 7", distance: "14.5 mi", duration: "01:20", speed: "10.9 mph" },
    { id: 104, title: "Hồ Con Rùa to Nhà Thờ Đức Bà", date: "2025-03-15", sport: "Cycling", location: "Quận 3", distance: "4.8 mi", duration: "00:30", speed: "9.5 mph" },
    { id: 105, title: "Bình Quới to Thanh Đa", date: "2025-03-20", sport: "Cycling", location: "Bình Thạnh", distance: "12.1 mi", duration: "01:10", speed: "10.2 mph" },
];

export default function SavedRoutes() {
    const [routes, setRoutes] = useState(initialRoutes);
    const [search, setSearch] = useState("");

    const handleDelete = (id: number) => setRoutes(routes.filter(route => route.id !== id));

    const handleGPSImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) alert(`GPS File Imported: ${file.name}`);
    };

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <h2 className={styles.logo}>CycWorld</h2>
                <ul>
                    <li><FaHome /><Link to="/">Home</Link></li>
                    <li ><FaUserCircle /><Link to="/profile">Profile</Link></li>
                    <li><FaUsers /><Link to="/group">My Group</Link></li>
                    <li><FaBell /><Link to="/notifications">Notifications</Link></li>
                    <li><FaShoppingCart /><Link to="/cart">My Cart</Link></li>
                    <li className={styles.active}><FaMapMarkedAlt /><Link to="/saved">Saved Routes</Link></li>
                    <li><FaBox /><Link to="/orders">Orders Status</Link></li>
                    <li><FaHistory /><Link to="/transactions">Transaction History</Link></li>
                    <li><FaComments /><Link to="/blogs">Manage Blogs</Link></li>
                </ul>
            </aside>

            {/* Content */}
            <main className={styles.profileContent}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2>Saved Routes</h2>
                    {/* Import GPS */}
                    <label style={{ backgroundColor: "#4CAF50", padding: "10px 15px", borderRadius: "8px", color: "#fff", cursor: "pointer" }}>
                        ➕ Import GPS
                        <input type="file" accept=".gpx,.tcx" onChange={handleGPSImport} hidden />
                    </label>
                </div>

                {/* Search */}
                <input
                    className="search-box"
                    placeholder="Search by name..."
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Route List */}
                <div className="routes-list">
                    {routes.filter((r) => r.title.toLowerCase().includes(search.toLowerCase())).map((route) => (
                        <div className="route-card" key={route.id}>
                            <img src="https://i.ibb.co/cbLz7pM/route-map.png" alt="Route" />
                            <div className="route-info">
                                <h3>{route.title}</h3>
                                <p>{route.date} | {route.distance} | {route.speed}</p>
                            </div>
                            <button onClick={() => handleDelete(route.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
