import React from 'react';
import "./Admin.css";

const Dashboard = () => {
    // Dummy data for demonstration
    const stats = {
        activeUsers: 1200,
        activeMatches: 150,
        activeShops: 80,
        revenue: "$10,000",
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h3>Overview</h3>
                <ul>
                    <li>Active Users: {stats.activeUsers}</li>
                    <li>Active Matches: {stats.activeMatches}</li>
                    <li>Active Shops: {stats.activeShops}</li>
                    <li>Total Revenue: {stats.revenue}</li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
