import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
import { FaUserCircle, FaBox, FaHistory, FaHome, FaUsers, FaBell, FaMapMarkedAlt, FaShoppingCart, FaComments } from "react-icons/fa";

export default function OrderStatusPage() {
    const [selected, setSelected] = useState<any>(null);
    const [filter, setFilter] = useState("All");

    const orders = [
        {
            id: "#12345",
            date: "2025-03-26",
            status: "Processing",
            payment: "Cash on Delivery",
            shippingMethod: "Home Delivery",
            address: "Nguyen Van A - 123 Nguyen Trai, District 1, HCMC",
            phone: "0909.xxx.xxx",
            note: "Please install after 5 PM. Thanks!",
            services: { installation: true, maintenance: false, upgrade: true },
            timeline: ["Order Received", "Preparing Items", "Shipping", "Delivered"],
            currentStep: 2,
            items: [
                { name: "Shimano Altus M315 Shifter Set", qty: 1, price: 750000 },
                { name: "750ml Bike Water Bottle", qty: 2, price: 120000 },
                { name: "Chain Cleaning Combo", qty: 1, price: 180000 }
            ],
            installFee: 200000,
            shippingFee: 0,
        },
        {
            id: "#12346",
            date: "2025-03-24",
            status: "Shipped",
            payment: "Bank Transfer",
            shippingMethod: "AhaMove",
            address: "Le Van B - 45 Le Lai, District 1, HCMC",
            phone: "0912.xxx.xxx",
            note: "Urgent delivery.",
            services: { installation: false, maintenance: false, upgrade: true },
            timeline: ["Order Received", "Preparing Items", "Shipping", "Delivered"],
            currentStep: 3,
            items: [
                { name: "Giant Saddle Bag", qty: 1, price: 350000 },
                { name: "Bike Chain Lube", qty: 2, price: 90000 },
            ],
            installFee: 0,
            shippingFee: 30000,
        },
        {
            id: "#12347",
            date: "2025-03-20",
            status: "Completed",
            payment: "E-wallet",
            shippingMethod: "Self Pickup",
            address: "Tran Thi C - 789 Cach Mang Thang 8, District 10, HCMC",
            phone: "0933.xxx.xxx",
            note: "",
            services: { installation: false, maintenance: true, upgrade: false },
            timeline: ["Order Received", "Preparing Items", "Shipping", "Delivered"],
            currentStep: 4,
            items: [
                { name: "Kenda 700x25C Road Tire", qty: 2, price: 280000 },
                { name: "Multi-tool Repair Kit", qty: 1, price: 150000 },
            ],
            installFee: 0,
            shippingFee: 0,
        }
    ];

    const filteredOrders = filter === "All" ? orders : orders.filter(o => o.status === filter);

    const formatCurrency = (num: number) => num.toLocaleString('vi-VN') + "đ";

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <h2 className={styles.logo}>CycWorld</h2>
                <ul>
                    <li><FaHome /><Link to="/">Home</Link></li>
                    <li><FaUserCircle /><Link to="/profile">Profile</Link></li>
                    <li><FaUsers /><Link to="/group-ride">My Group</Link></li>
                    <li><FaBell /><Link to="/notifications">Notifications</Link></li>
                    <li><FaShoppingCart /><Link to="/cart">My Cart</Link></li>
                    <li><FaMapMarkedAlt /><Link to="/route-sharing">Route Sharing</Link></li>
                    <li className={styles.active}><FaBox /><Link to="/orders">Orders Status</Link></li>
                    <li><FaHistory /><Link to="/transactions">Transaction History</Link></li>
                    <li><FaComments /><Link to="/blogs">Manage Blogs</Link></li>
                </ul>
            </aside>

            <div style={{ marginLeft: "270px", padding: "40px", background: "#f5f5f5", minHeight: "100vh", width: "calc(100% - 270px)" }}>
                <h2>Order Status</h2>

                {/* Filter */}
                <div style={{ marginBottom: "20px" }}>
                    <select onChange={(e) => setFilter(e.target.value)} style={{ padding: "8px", borderRadius: "6px" }}>
                        <option>All</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                    </select>
                </div>

                {/* Orders Table */}
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    background: "#fff",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}>
                    <thead style={{ background: "#343a40", color: "#fff" }}>
                        <tr>
                            <th style={{ padding: "12px" }}>Order ID</th>
                            <th style={{ padding: "12px" }}>Status</th>
                            <th style={{ padding: "12px" }}>Date</th>
                            <th style={{ padding: "12px" }}>Payment</th>
                            <th style={{ padding: "12px" }}>Shipping Method</th>
                            <th style={{ padding: "12px" }}>Total</th>
                            <th style={{ padding: "12px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => {
                            const total = order.items.reduce((sum, i) => sum + i.price * i.qty, 0) + order.installFee + order.shippingFee;
                            return (
                                <tr key={order.id} style={{ borderBottom: "1px solid #ddd" }}>
                                    <td style={{ padding: "12px", fontWeight: "bold" }}>{order.id}</td>
                                    <td style={{
                                        padding: "12px",
                                        color: order.status === "Completed" ? "green" : order.status === "Cancelled" ? "red" : "orange",
                                        fontWeight: "500"
                                    }}>{order.status}</td>
                                    <td style={{ padding: "12px" }}>{order.date}</td>
                                    <td style={{ padding: "12px" }}>{order.payment}</td>
                                    <td style={{ padding: "12px" }}>{order.shippingMethod}</td>
                                    <td style={{ padding: "12px", fontWeight: "bold" }}>{formatCurrency(total)}</td>
                                    <td style={{ padding: "12px" }}>
                                        <button
                                            onClick={() => setSelected(order)}
                                            style={{
                                                background: "#007bff",
                                                color: "#fff",
                                                padding: "8px 14px",
                                                borderRadius: "6px",
                                                border: "none",
                                                cursor: "pointer"
                                            }}
                                        >View</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                {/* Order Detail */}
                {selected && (
                    <div style={{ background: "#fff", padding: "30px", borderRadius: "10px", marginTop: "30px" }}>
                        <h3>Order Details - {selected.id}</h3>
                        <p><strong>Order Date:</strong> {selected.date}</p>
                        <p><strong>Status:</strong> {selected.status}</p>
                        <p><strong>Payment Method:</strong> {selected.payment}</p>
                        <p><strong>Shipping Method:</strong> {selected.shippingMethod}</p>

                        <h4>Products</h4>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
                            <tbody>
                                {selected.items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item.name}</td>
                                        <td>{item.qty}</td>
                                        <td>{formatCurrency(item.price)}</td>
                                        <td>{formatCurrency(item.qty * item.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h4>Extra Services</h4>
                        <p>Installation: {selected.services.installation ? "✔️ Yes" : "❌ No"}</p>
                        <p>Maintenance: {selected.services.maintenance ? "✔️ Yes" : "❌ No"}</p>
                        <p>Upgrade: {selected.services.upgrade ? "✔️ Yes" : "❌ No"}</p>

                        <h4>Summary</h4>
                        <p>Accessories Total: {formatCurrency(selected.items.reduce((sum, i) => sum + i.price * i.qty, 0))}</p>
                        <p>Installation Fee: {formatCurrency(selected.installFee)}</p>
                        <p>Shipping Fee: {selected.shippingFee === 0 ? "Free" : formatCurrency(selected.shippingFee)}</p>
                        <h4>Total: {formatCurrency(selected.items.reduce((sum, i) => sum + i.price * i.qty, 0) + selected.installFee + selected.shippingFee)}</h4>

                        <h4>Shipping Address</h4>
                        <p>{selected.address}</p>
                        <p>Phone: {selected.phone}</p>

                        <h4>Customer Note</h4>
                        <p>{selected.note || "No note"}</p>

                        <h4>Order Progress</h4>
                        <div style={{ display: "flex", gap: "20px" }}>
                            {selected.timeline.map((step, index) => (
                                <div key={index} style={{
                                    padding: "10px 15px",
                                    background: index === selected.currentStep ? "#007bff" : "#ddd",
                                    color: index === selected.currentStep ? "#fff" : "#333",
                                    borderRadius: "8px"
                                }}>{step}</div>
                            ))}
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <p>📞 Hotline: {selected.phone}</p>
                            {selected.status === "Processing" && (
                                <button style={{ background: "red", color: "#fff", padding: "8px 16px", borderRadius: "6px", marginRight: "10px" }}>Cancel Order</button>
                            )}
                            <button style={{ background: "#28a745", color: "#fff", padding: "8px 16px", borderRadius: "6px" }}>Chat with Shop</button>
                            <button onClick={() => setSelected(null)} style={{ background: "#6c757d", color: "#fff", padding: "8px 16px", borderRadius: "6px", marginLeft: "10px" }}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}