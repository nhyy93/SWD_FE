import React, { useState } from "react";
import "./Admin.css";
import { FaEye, FaMapMarkedAlt, FaBell, FaClipboardList, FaExclamationTriangle } from "react-icons/fa";

const MatchRideMonitoring = () => {
    const [matches, setMatches] = useState([
        { id: 1, name: "Mountain Challenge", startTime: "10:00 AM", endTime: "12:30 PM", participants: 12, status: "Ongoing" },
        { id: 2, name: "City Tour Race", startTime: "2:00 PM", endTime: "4:00 PM", participants: 20, status: "Completed" },
        { id: 3, name: "Night Ride", startTime: "7:00 PM", endTime: "9:00 PM", participants: 8, status: "Issue" },
    ]);

    const [trips, setTrips] = useState([
        { id: 1, name: "Coastal Ride", organizer: "Cyclist A", route: "Beach Road", startTime: "9:00 AM", endTime: "11:00 AM", status: "Ongoing" },
        { id: 2, name: "Forest Trail", organizer: "Cyclist B", route: "Nature Park", startTime: "1:00 PM", endTime: "3:00 PM", status: "Completed" },
        { id: 3, name: "City Night Loop", organizer: "Cyclist C", route: "Downtown", startTime: "8:00 PM", endTime: "10:00 PM", status: "Canceled" },
    ]);

    const [alerts, setAlerts] = useState([
        { id: 1, type: "Accident", description: "Participant 5 reported an accident.", status: "Unresolved" },
        { id: 2, type: "Route Exit", description: "Cyclist A left the designated route.", status: "Resolved" },
        { id: 3, type: "GPS Issue", description: "Signal lost for Cyclist B.", status: "Unresolved" },
    ]);

    return (
        <div className="admin-container">
            <h1>Match & Ride Monitoring</h1>
            <p>Monitor active matches, ongoing rides, and alerts in real-time.</p>

            {/* Match Monitoring */}
            <div className="admin-section">
                <h2>Ongoing Matches</h2>
                <div className="admin-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Match Name</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Participants</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.map(match => (
                                <tr key={match.id}>
                                    <td>{match.name}</td>
                                    <td>{match.startTime}</td>
                                    <td>{match.endTime}</td>
                                    <td>{match.participants}</td>
                                    <td className={match.status === "Ongoing" ? "status-active" : match.status === "Completed" ? "status-completed" : "status-issue"}>
                                        {match.status}
                                    </td>
                                    <td>
                                        <button className="action-button view"><FaEye /></button>
                                        <button className="action-button map"><FaMapMarkedAlt /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Trip Monitoring */}
            <div className="admin-section">
                <h2>Ongoing Trips</h2>
                <div className="admin-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Trip Name</th>
                                <th>Organizer</th>
                                <th>Route</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trips.map(trip => (
                                <tr key={trip.id}>
                                    <td>{trip.name}</td>
                                    <td>{trip.organizer}</td>
                                    <td>{trip.route}</td>
                                    <td>{trip.startTime}</td>
                                    <td>{trip.endTime}</td>
                                    <td className={trip.status === "Ongoing" ? "status-active" : trip.status === "Completed" ? "status-completed" : "status-canceled"}>
                                        {trip.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Alerts & Issues */}
            <div className="admin-section">
                <h2>Alerts & Issues</h2>
                <div className="admin-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alerts.map(alert => (
                                <tr key={alert.id}>
                                    <td className="alert-type">{alert.type}</td>
                                    <td>{alert.description}</td>
                                    <td className={alert.status === "Unresolved" ? "status-issue" : "status-resolved"}>
                                        {alert.status}
                                    </td>
                                    <td>
                                        <button className="action-button notify"><FaBell /></button>
                                        <button className="action-button resolve"><FaClipboardList /></button>
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

export default MatchRideMonitoring;
