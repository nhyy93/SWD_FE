import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
import { FaUserCircle, FaBox, FaHistory, FaHome, FaUsers, FaBell, FaMapMarkedAlt, FaShoppingCart, FaComments } from "react-icons/fa";

export default function TransactionHistoryPage() {
    const [selected, setSelected] = useState<any>(null);
    const [filterStatus, setFilterStatus] = useState("All");

    const transactions = [
        {
            id: "#HD0001",
            date: "2025-03-10",
            type: "Accessory",
            service: "Shimano Groupset",
            amount: 5200000,
            status: "Completed",
            payment: "Bank Transfer",
            note: "",
            history: ["10/03 - Ordered", "12/03 - Delivered", "12/03 - Completed"],
            loyalty: 520
        },
        {
            id: "#HD0002",
            date: "2025-03-15",
            type: "Service",
            service: "Chain Cleaning + Disc Brake Adjustment",
            amount: 350000,
            status: "Completed",
            payment: "E-wallet MoMo",
            note: "Clean the chain carefully",
            history: ["15/03 - Scheduled", "16/03 - Service Done", "16/03 - Completed"],
            loyalty: 35
        },
        {
            id: "#HD0003",
            date: "2025-03-20",
            type: "Accessory",
            service: "Bike Water Bottle",
            amount: 240000,
            status: "Shipping",
            payment: "COD",
            note: "",
            history: ["20/03 - Ordered", "21/03 - Shipping"],
            loyalty: 24
        },
        {
            id: "#HD0004",
            date: "2025-03-25",
            type: "Service",
            service: "Full Bike Maintenance",
            amount: 800000,
            status: "Scheduled",
            payment: "Cash",
            note: "Appointment on 29/03",
            history: ["25/03 - Scheduled"],
            loyalty: 80
        }
    ];

    const filteredData = filterStatus === "All" ? transactions : transactions.filter(tx => tx.status === filterStatus);

    const formatCurrency = (num: number) => num.toLocaleString("vi-VN") + "đ";

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <h2 className={styles.logo}>CycWorld</h2>
                <ul>
                    <li><FaHome /><Link to="/">Home</Link></li>
                    <li><FaUserCircle /><Link to="/profile">Profile</Link></li>
                    <li><FaUsers /><Link to="/group-ride">My Group</Link></li>
                    <li><FaBell /><Link to="/notifications">Notifications</Link></li>
                    <li><FaShoppingCart /><Link to="/cart">My Cart</Link></li>
                    <li><FaMapMarkedAlt /><Link to="/route-sharing">Route Sharing</Link></li>
                    <li><FaBox /><Link to="/orders">Orders Status</Link></li>
                    <li className={styles.active}><FaHistory /><Link to="/transactions">Transaction History</Link></li>
                    <li><FaComments /><Link to="/blogs">Manage Blogs</Link></li>
                </ul>
            </aside>

            {/* Content */}
            <div style={{ marginLeft: "270px", padding: "40px", background: "#f5f5f5", minHeight: "100vh", width: "calc(100% - 270px)" }}>
                <h2>Transaction History</h2>

                {/* Filter */}
                <div style={{ marginBottom: "20px" }}>
                    <select onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: "8px", borderRadius: "6px" }}>
                        <option value="All">All Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Shipping">Shipping</option>
                        <option value="Scheduled">Scheduled</option>
                    </select>
                </div>

                {/* Table */}
                <table style={{
                    width: "100%",
                    background: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    marginBottom: "30px",
                    borderCollapse: "collapse"
                }}>
                    <thead style={{ background: "#343a40", color: "#fff" }}>
                        <tr>
                            <th style={{ padding: "12px" }}>Order ID</th>
                            <th style={{ padding: "12px" }}>Date</th>
                            <th style={{ padding: "12px" }}>Service / Product</th>
                            <th style={{ padding: "12px" }}>Amount</th>
                            <th style={{ padding: "12px" }}>Status</th>
                            <th style={{ padding: "12px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(tx => (
                            <tr key={tx.id} style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ padding: "12px" }}>{tx.id}</td>
                                <td style={{ padding: "12px" }}>{tx.date}</td>
                                <td style={{ padding: "12px" }}>{tx.service}</td>
                                <td style={{ padding: "12px", fontWeight: "bold" }}>{formatCurrency(tx.amount)}</td>
                                <td style={{
                                    padding: "12px",
                                    color: tx.status === "Completed" ? "green" : tx.status === "Shipping" ? "orange" : "#007bff",
                                    fontWeight: 500
                                }}>{tx.status}</td>
                                <td style={{ padding: "12px" }}>
                                    <button onClick={() => setSelected(tx)} style={{ background: "#007bff", color: "#fff", padding: "8px 14px", borderRadius: "6px", border: "none" }}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Transaction Detail */}
                {selected && (
                    <div style={{ background: "#fff", padding: "30px", borderRadius: "10px" }}>
                        <h3>Transaction Details - {selected.id}</h3>
                        <p><strong>Date:</strong> {selected.date}</p>
                        <p><strong>Status:</strong> <span style={{ color: selected.status === "Completed" ? "green" : "orange" }}>{selected.status}</span></p>
                        <p><strong>Total Amount:</strong> {formatCurrency(selected.amount)}</p>
                        <p><strong>Payment Method:</strong> {selected.payment}</p>
                        <p><strong>Note:</strong> {selected.note || "No note"}</p>

                        <h4>History:</h4>
                        <ul>
                            {selected.history.map((h: string, idx: number) => <li key={idx}>{h}</li>)}
                        </ul>

                        {/* Loyalty */}
                        <h4>Reward Points Earned: {selected.loyalty} pts</h4>

                        {/* Action */}
                        <div style={{ marginTop: "20px" }}>
                            <button style={{ background: "#28a745", color: "#fff", padding: "8px 16px", borderRadius: "6px", marginRight: "10px" }}>Download Invoice</button>
                            <button style={{ background: "#ffc107", color: "#333", padding: "8px 16px", borderRadius: "6px", marginRight: "10px" }}>Re-Order Service</button>
                            <button style={{ background: "#17a2b8", color: "#fff", padding: "8px 16px", borderRadius: "6px", marginRight: "10px" }}>Chat Support</button>
                            <button onClick={() => setSelected(null)} style={{ background: "red", color: "#fff", padding: "8px 16px", borderRadius: "6px" }}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
