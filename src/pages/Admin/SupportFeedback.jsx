import React, { useState } from "react";
import "./Admin.css";
import { FaCheckCircle, FaTimesCircle, FaEnvelope, FaFilter, FaDownload, FaHeadset, FaChartPie } from "react-icons/fa";

const SupportFeedback = () => {
    // Dummy data
    const [supportRequests] = useState([
        { id: "REQ001", user: "Cyclist A", email: "cyclistA@gmail.com", category: "Login Issue", priority: "High", status: "Pending", date: "2024-03-15" },
        { id: "REQ002", user: "Shop Owner B", email: "shopB@gmail.com", category: "Payment Issue", priority: "Medium", status: "Resolved", date: "2024-03-14" },
        { id: "REQ003", user: "Cyclist C", email: "cyclistC@gmail.com", category: "Transaction Dispute", priority: "Low", status: "In Progress", date: "2024-03-13" },
    ]);

    const [feedbackList] = useState([
        { id: 1, user: "Cyclist X", type: "Positive", rating: 5, comment: "Great service!" },
        { id: 2, user: "Cyclist Y", type: "Negative", rating: 2, comment: "Issues with support response time." },
        { id: 3, user: "Cyclist Z", type: "Feature Request", rating: "-", comment: "Add more route tracking features." },
    ]);

    return (
        <div className="admin-container">
            <h1>Support & Feedback</h1>
            <p>Manage user support requests and feedback.</p>

            {/* Dashboard Overview */}
            <div className="admin-section">
                <h2>Support Dashboard</h2>
                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <FaChartPie className="dashboard-icon" />
                        <div>
                            <h3>120</h3>
                            <p>New Requests This Week</p>
                        </div>
                    </div>
                    <div className="dashboard-card">
                        <FaCheckCircle className="dashboard-icon" />
                        <div>
                            <h3>80%</h3>
                            <p>Resolved Cases</p>
                        </div>
                    </div>
                    <div className="dashboard-card">
                        <FaTimesCircle className="dashboard-icon" />
                        <div>
                            <h3>20%</h3>
                            <p>Pending Cases</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Support Requests */}
            <div className="admin-section">
                <h2>Support Requests</h2>
                <div className="admin-controls">
                    <button className="action-button filter"><FaFilter /> Filter</button>
                    <button className="action-button export"><FaDownload /> Export Report</button>
                </div>
                <div className="admin-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {supportRequests.map(req => (
                                <tr key={req.id}>
                                    <td>{req.id}</td>
                                    <td>{req.user}</td>
                                    <td>{req.email}</td>
                                    <td>{req.category}</td>
                                    <td className={req.priority === "High" ? "priority-high" : req.priority === "Medium" ? "priority-medium" : "priority-low"}>
                                        {req.priority}
                                    </td>
                                    <td className={req.status === "Resolved" ? "status-resolved" : req.status === "Pending" ? "status-pending" : "status-inprogress"}>
                                        {req.status}
                                    </td>
                                    <td>{req.date}</td>
                                    <td>
                                        <button className="action-button view"><FaEnvelope /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Feedback */}
            <div className="admin-section">
                <h2>User Feedback</h2>
                <div className="admin-table">
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Type</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbackList.map(feedback => (
                                <tr key={feedback.id}>
                                    <td>{feedback.user}</td>
                                    <td className={feedback.type === "Positive" ? "feedback-positive" : feedback.type === "Negative" ? "feedback-negative" : "feedback-feature"}>
                                        {feedback.type}
                                    </td>
                                    <td>{feedback.rating}</td>
                                    <td>{feedback.comment}</td>
                                    <td>
                                        <button className="action-button reply"><FaHeadset /></button>
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

export default SupportFeedback;
