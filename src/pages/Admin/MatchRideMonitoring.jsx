import React, { useState } from 'react';
import "./Admin.css";

const MatchRideMonitoring = () => {
    // Sample data for matches
    const [matches] = useState([
        { id: 1, cyclist: 'Cyclist A', shop: 'Shop Owner B', status: 'Active', rides: 5 },
        { id: 2, cyclist: 'Cyclist C', shop: 'Shop Owner D', status: 'Completed', rides: 3 },
        { id: 3, cyclist: 'Cyclist E', shop: 'Shop Owner F', status: 'Active', rides: 2 },
    ]);

    return (
        <div>
            <h1>Match & Ride Monitoring</h1>
            <p>Monitor ongoing matches and view ride logs.</p>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cyclist</th>
                        <th>Shop Owner</th>
                        <th>Status</th>
                        <th>Rides</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map(match => (
                        <tr key={match.id}>
                            <td>{match.id}</td>
                            <td>{match.cyclist}</td>
                            <td>{match.shop}</td>
                            <td>{match.status}</td>
                            <td>{match.rides}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MatchRideMonitoring;
