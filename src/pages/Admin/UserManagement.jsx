import React, { useState } from "react";
import "./Admin.css";
import { FaEye, FaCheckCircle, FaTimesCircle, FaTrash, FaSearch } from "react-icons/fa";

const UserManagement = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Cyclist A", email: "cyclistA@gmail.com", phone: "08133768472", role: "Cyclist", department: "Radiology", verified: false },
        { id: 2, name: "Shop Owner B", email: "shopB@gmail.com", phone: "08132962607", role: "Shop Owner", department: "Internal Medicine", verified: true },
        { id: 3, name: "Cyclist C", email: "cyclistC@gmail.com", phone: "08133768472", role: "Cyclist", department: "Pathology", verified: true },
        { id: 4, name: "Shop Owner D", email: "shopD@gmail.com", phone: "08133768472", role: "Shop Owner", department: "Orthopedic", verified: false },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("All");

    // Xác minh user
    const handleVerify = (id) => {
        setUsers(users.map(user => user.id === id ? { ...user, verified: true } : user));
    };

    // Xoá user
    const handleSuspend = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    // Xem chi tiết user
    const handleViewDetails = (user) => {
        alert(`User Details:\nName: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}\nRole: ${user.role}\nDepartment: ${user.department}`);
    };

    // Lọc user dựa trên search và role
    const filteredUsers = users.filter(user => {
        return (
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterRole === "All" || user.role === filterRole)
        );
    });

    return (
        <div className="admin-container">
            <h1>User & Shop Management</h1>
            <p>Manage user profiles and shop authenticity.</p>

            {/* Search & Filter */}
            <div className="admin-controls">
                <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select className="role-filter" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                    <option value="All">All Roles</option>
                    <option value="Cyclist">Cyclist</option>
                    <option value="Shop Owner">Shop Owner</option>
                </select>
            </div>

            {/* Table */}
            <div className="admin-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Verified</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.role}</td>
                                    <td>{user.department}</td>
                                    <td>
                                        {user.verified ? (
                                            <FaCheckCircle className="verified-icon" />
                                        ) : (
                                            <FaTimesCircle className="not-verified-icon" />
                                        )}
                                    </td>
                                    <td>
                                        <button className="action-button view" onClick={() => handleViewDetails(user)}>
                                            <FaEye />
                                        </button>
                                        {!user.verified && (
                                            <button className="action-button verify" onClick={() => handleVerify(user.id)}>
                                                <FaCheckCircle />
                                            </button>
                                        )}
                                        <button className="action-button suspend" onClick={() => handleSuspend(user.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="no-results">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
