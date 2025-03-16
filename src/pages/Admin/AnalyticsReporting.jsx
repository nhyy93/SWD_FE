import React from 'react';
import "./Admin.css";

const AnalyticsReporting = () => {
    // Dummy analytics data for demonstration
    const analytics = {
        activeUsers: 1200,
        activeMatches: 150,
        activeShops: 80,
        revenue: "$10,000",
        popularAreas: ["Downtown", "Uptown", "Suburbs"],
    };

    return (
        <div>
            <h1>Analytics & Reporting</h1>
            <div>
                <h3>Platform Statistics</h3>
                <ul>
                    <li>Active Users: {analytics.activeUsers}</li>
                    <li>Active Matches: {analytics.activeMatches}</li>
                    <li>Active Shops: {analytics.activeShops}</li>
                    <li>Total Revenue: {analytics.revenue}</li>
                    <li>Popular Areas: {analytics.popularAreas.join(', ')}</li>
                </ul>
            </div>
        </div>
    );
};

export default AnalyticsReporting;
