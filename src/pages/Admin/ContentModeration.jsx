import React, { useState } from "react";
import "./Admin.css";
import { FaEye, FaCheckCircle, FaTimesCircle, FaMapMarkedAlt, FaEdit, FaReply } from "react-icons/fa";

const ContentModeration = () => {
    const [routes, setRoutes] = useState([
        { id: 1, name: "Scenic Mountain Trail", author: "Cyclist A", distance: 25, difficulty: "Hard", status: "Pending", description: "A breathtaking ride through the mountains." },
        { id: 2, name: "City Park Loop", author: "Cyclist B", distance: 12, difficulty: "Easy", status: "Approved", description: "A peaceful ride around the city park." },
    ]);

    const [blogs, setBlogs] = useState([
        { id: 1, title: "Cycling Tips for Beginners", author: "Cyclist X", date: "2024-03-10", status: "Pending", summary: "A complete guide for new cyclists.", tags: ["Tips", "Beginner"] },
        { id: 2, title: "Best Cycling Routes", author: "Cyclist Y", date: "2024-03-08", status: "Approved", summary: "Explore the top cycling routes worldwide.", tags: ["Routes", "Travel"] },
    ]);

    const [moderationLog, setModerationLog] = useState([]);

    const handleApprove = (type, id) => {
        if (type === "route") {
            setRoutes(routes.map(route => route.id === id ? { ...route, status: "Approved" } : route));
        } else {
            setBlogs(blogs.map(blog => blog.id === id ? { ...blog, status: "Approved" } : blog));
        }
        setModerationLog([...moderationLog, { type, id, action: "Approved", date: new Date().toLocaleString() }]);
    };

    const handleReject = (type, id, reason) => {
        if (type === "route") {
            setRoutes(routes.map(route => route.id === id ? { ...route, status: "Rejected" } : route));
        } else {
            setBlogs(blogs.map(blog => blog.id === id ? { ...blog, status: "Rejected" } : blog));
        }
        setModerationLog([...moderationLog, { type, id, action: "Rejected", reason, date: new Date().toLocaleString() }]);
    };

    return (
        <div className="admin-container">
            <h1>Content Moderation</h1>
            <p>Review and manage public routes and blog submissions.</p>

            {/* Public Routes */}
            <div className="admin-section">
                <h2>Public Route Submissions</h2>
                <div className="admin-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Author</th>
                                <th>Distance (km)</th>
                                <th>Difficulty</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {routes.map(route => (
                                <tr key={route.id}>
                                    <td>{route.name}</td>
                                    <td>{route.author}</td>
                                    <td>{route.distance}</td>
                                    <td>{route.difficulty}</td>
                                    <td className={route.status === "Pending" ? "status-pending" : route.status === "Approved" ? "status-approved" : "status-rejected"}>
                                        {route.status}
                                    </td>
                                    <td>
                                        <button className="action-button map"><FaMapMarkedAlt /></button>
                                        {route.status === "Pending" && (
                                            <>
                                                <button className="action-button approve" onClick={() => handleApprove("route", route.id)}><FaCheckCircle /></button>
                                                <button className="action-button reject" onClick={() => handleReject("route", route.id, "Route not safe")}><FaTimesCircle /></button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Blog Moderation */}
            <div className="admin-section">
                <h2>Blog Submissions</h2>
                <div className="admin-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map(blog => (
                                <tr key={blog.id}>
                                    <td>{blog.title}</td>
                                    <td>{blog.author}</td>
                                    <td>{blog.date}</td>
                                    <td className={blog.status === "Pending" ? "status-pending" : blog.status === "Approved" ? "status-approved" : "status-rejected"}>
                                        {blog.status}
                                    </td>
                                    <td>
                                        <button className="action-button view"><FaEye /></button>
                                        <button className="action-button edit"><FaEdit /></button>
                                        {blog.status === "Pending" && (
                                            <>
                                                <button className="action-button approve" onClick={() => handleApprove("blog", blog.id)}><FaCheckCircle /></button>
                                                <button className="action-button reject" onClick={() => handleReject("blog", blog.id, "Content not appropriate")}><FaTimesCircle /></button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Moderation Log */}
            <div className="admin-section">
                <h2>Moderation Log</h2>
                <div className="admin-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>ID</th>
                                <th>Action</th>
                                <th>Reason</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moderationLog.map((log, index) => (
                                <tr key={index}>
                                    <td>{log.type === "route" ? "Route" : "Blog"}</td>
                                    <td>{log.id}</td>
                                    <td className={log.action === "Approved" ? "status-approved" : "status-rejected"}>{log.action}</td>
                                    <td>{log.reason || "-"}</td>
                                    <td>{log.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContentModeration;
