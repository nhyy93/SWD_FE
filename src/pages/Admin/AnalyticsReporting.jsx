import React, { useState } from "react";
import "./Admin.css";
import { FaFileInvoiceDollar, FaChartBar, FaSyncAlt, FaMoneyBillWave, FaEye, FaFilter, FaDownload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AnalyticsReporting = () => {
    // Dummy data
    const [transactions] = useState([
        { id: "TXN001", buyer: "Cyclist A", shop: "Shop Owner B", item: "Bike Repair", amount: 50, status: "Success", paymentMethod: "Credit Card", date: "2024-03-15" },
        { id: "TXN002", buyer: "Cyclist B", shop: "Shop Owner C", item: "Helmet", amount: 30, status: "Refunded", paymentMethod: "PayPal", date: "2024-03-14" },
        { id: "TXN003", buyer: "Cyclist C", shop: "Shop Owner D", item: "Bike Rental", amount: 20, status: "Pending", paymentMethod: "Cash", date: "2024-03-13" },
    ]);

    const [disputes] = useState([
        { id: "DIS001", txnId: "TXN002", complainant: "Cyclist B", reason: "Item not received", evidence: "Screenshot", status: "Resolved" },
        { id: "DIS002", txnId: "TXN003", complainant: "Cyclist C", reason: "Wrong amount charged", evidence: "Invoice", status: "Pending" },
    ]);

    return (
        <div className="admin-container">
            <h1>Analytics & Reporting</h1>
            <p>Monitor revenue, transactions, and dispute resolutions.</p>

            {/* Dashboard Overview */}
            <div className="admin-section">
                <h2>Revenue Dashboard</h2>
                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <FaChartBar className="dashboard-icon" />
                        <div>
                            <h3>10,000,000 VND</h3>
                            <p>Total Revenue</p>
                        </div>
                    </div>
                    <div className="dashboard-card">
                        <FaFileInvoiceDollar className="dashboard-icon" />
                        <div>
                            <h3>320</h3>
                            <p>Successful Transactions</p>
                        </div>
                    </div>
                    <div className="dashboard-card">
                        <FaSyncAlt className="dashboard-icon" />
                        <div>
                            <h3>15</h3>
                            <p>Refunded Transactions</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction Management */}
            <div className="admin-section">
                <h2>Transaction Management</h2>
                <div className="admin-controls">
                    <button className="action-button filter"><FaFilter /> Filter</button>
                    <button className="action-button export"><FaDownload /> Export Report</button>
                </div>
                <div className="admin-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Buyer</th>
                                <th>Shop</th>
                                <th>Item</th>
                                <th>Amount ($)</th>
                                <th>Status</th>
                                <th>Payment Method</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(txn => (
                                <tr key={txn.id}>
                                    <td>{txn.id}</td>
                                    <td>{txn.buyer}</td>
                                    <td>{txn.shop}</td>
                                    <td>{txn.item}</td>
                                    <td>{txn.amount}</td>
                                    <td className={txn.status === "Success" ? "status-success" : txn.status === "Refunded" ? "status-refunded" : "status-pending"}>
                                        {txn.status}
                                    </td>
                                    <td>{txn.paymentMethod}</td>
                                    <td>{txn.date}</td>
                                    <td>
                                        <button className="action-button view"><FaEye /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Dispute & Refund Management */}
            <div className="admin-section">
                <h2>Dispute & Refunds</h2>
                <div className="admin-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Dispute ID</th>
                                <th>Transaction ID</th>
                                <th>Complainant</th>
                                <th>Reason</th>
                                <th>Evidence</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {disputes.map(dispute => (
                                <tr key={dispute.id}>
                                    <td>{dispute.id}</td>
                                    <td>{dispute.txnId}</td>
                                    <td>{dispute.complainant}</td>
                                    <td>{dispute.reason}</td>
                                    <td>{dispute.evidence}</td>
                                    <td className={dispute.status === "Resolved" ? "status-resolved" : "status-pending"}>
                                        {dispute.status}
                                    </td>
                                    <td>
                                        <button className="action-button approve"><FaCheckCircle /></button>
                                        <button className="action-button reject"><FaTimesCircle /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsReporting;
