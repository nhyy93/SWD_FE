import React, { useState } from "react";
import "./Admin.css";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Select from "react-select";
import { FaFileCsv, FaFilePdf, FaDownload } from "react-icons/fa";

const Dashboard = () => {
    const [timeFilter, setTimeFilter] = useState("This Month");

    // Dummy analytics data
    const analytics = {
        activeUsers: 1200,
        activeMatches: 150,
        activeShops: 80,
        revenue: 10000,
        totalOrders: 850,
        refundRate: 5,
    };

    // Chart Data
    const userGrowthData = [
        { month: "Jan", users: 500 },
        { month: "Feb", users: 700 },
        { month: "Mar", users: 1200 },
        { month: "Apr", users: 1500 },
    ];

    const revenueData = [
        { month: "Jan", revenue: 5000 },
        { month: "Feb", revenue: 7500 },
        { month: "Mar", revenue: 10000 },
        { month: "Apr", revenue: 13000 },
    ];

    const transactionData = [
        { status: "Success", value: 700 },
        { status: "Failed", value: 50 },
        { status: "Refunded", value: 100 },
    ];

    const COLORS = ["#2ecc71", "#e74c3c", "#f39c12"];

    const handleDownloadReport = (type) => {
        alert(`Downloading ${type} report...`);
    };

    return (
        <div className="admin-container">
            <h1>Dashboard Analytics</h1>
            <p>Get an overview of platform activity, revenue, and user behavior.</p>

            {/* Filter Options */}
            <div className="filter-section">
                <Select
                    options={[
                        { value: "Today", label: "Today" },
                        { value: "This Week", label: "This Week" },
                        { value: "This Month", label: "This Month" },
                    ]}
                    defaultValue={{ value: "This Month", label: "This Month" }}
                    onChange={(option) => setTimeFilter(option.value)}
                />
            </div>

            {/* KPI Cards */}
            <div className="stats-grid">
                <div className="stats-card">
                    <h3>Active Users</h3>
                    <p>{analytics.activeUsers}</p>
                </div>
                <div className="stats-card">
                    <h3>Ongoing Matches</h3>
                    <p>{analytics.activeMatches}</p>
                </div>
                <div className="stats-card">
                    <h3>Registered Shops</h3>
                    <p>{analytics.activeShops}</p>
                </div>
                <div className="stats-card">
                    <h3>Total Revenue</h3>
                    <p>${analytics.revenue}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="charts-container">
                <div className="chart-card">
                    <h3>User Growth</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={userGrowthData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="users" stroke="#3498db" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Revenue Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="revenue" fill="#2ecc71" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-card">
                    <h3>Transaction Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={transactionData}
                                dataKey="value"
                                nameKey="status"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            />
                            <Tooltip />
                            <Legend />
                        </PieChart>

                    </ResponsiveContainer>
                </div>
            </div>

            {/* Export Report */}
            <div className="report-section">
                <h3>Export Report</h3>
                <button className="export-btn csv" onClick={() => handleDownloadReport("CSV")}>
                    <FaFileCsv /> CSV
                </button>
                <button className="export-btn pdf" onClick={() => handleDownloadReport("PDF")}>
                    <FaFilePdf /> PDF
                </button>
            </div>
        </div >
    );
};

export default Dashboard;
