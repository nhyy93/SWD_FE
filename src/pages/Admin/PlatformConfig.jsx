import React, { useState } from "react";
import "./Admin.css";
import { FaToggleOn, FaToggleOff, FaCog, FaMoneyBillWave, FaBell, FaClipboardList, FaHistory, FaWrench } from "react-icons/fa";

const PlatformConfig = () => {
    // Dummy configuration data
    const [config, setConfig] = useState({
        platformName: "CycleConnect",
        language: "English",
        currency: "USD",
        timezone: "UTC-5",
        maintenanceMode: false,
        roles: { cyclist: true, shopOwner: true, adminAssistant: false },
    });

    const [paymentSettings, setPaymentSettings] = useState({
        serviceFee: 5,
        commissionRate: 10,
        refundPolicy: "Allowed within 7 days",
        paymentMethods: { creditCard: true, paypal: true, cash: false },
    });

    const [features, setFeatures] = useState([
        { id: 1, name: "Live Tracking", active: true, users: 500, feedback: "Good" },
        { id: 2, name: "Instant Payment", active: false, users: 200, feedback: "Average" },
    ]);

    const [logs] = useState([
        { id: 1, action: "Updated payment settings", user: "Admin", date: "2024-03-15" },
        { id: 2, action: "Changed refund policy", user: "Admin", date: "2024-03-10" },
    ]);

    const toggleFeature = (id) => {
        setFeatures(features.map(f => f.id === id ? { ...f, active: !f.active } : f));
    };

    return (
        <div className="admin-container">
            <h1>Platform Configuration</h1>
            <p>Manage general platform settings, payments, notifications, and system updates.</p>

            {/* General Settings */}
            <div className="admin-section">
                <h2>General Settings</h2>
                <div className="admin-card">
                    <FaCog className="config-icon" />
                    <div>
                        <p><strong>Platform Name:</strong> {config.platformName}</p>
                        <p><strong>Language:</strong> {config.language}</p>
                        <p><strong>Currency:</strong> {config.currency}</p>
                        <p><strong>Timezone:</strong> {config.timezone}</p>
                        <p><strong>Maintenance Mode:</strong> {config.maintenanceMode ? "Enabled" : "Disabled"}</p>
                    </div>
                </div>
            </div>

            {/* Payment & Commission Settings */}
            <div className="admin-section">
                <h2>Payment & Commission Settings</h2>
                <div className="admin-card">
                    <FaMoneyBillWave className="config-icon" />
                    <div>
                        <p><strong>Service Fee:</strong> {paymentSettings.serviceFee}%</p>
                        <p><strong>Commission Rate:</strong> {paymentSettings.commissionRate}%</p>
                        <p><strong>Refund Policy:</strong> {paymentSettings.refundPolicy}</p>
                        <p><strong>Payment Methods:</strong>
                            {Object.keys(paymentSettings.paymentMethods).map(method => (
                                paymentSettings.paymentMethods[method] ? ` ${method.toUpperCase()} ` : ""
                            ))}
                        </p>
                    </div>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="admin-section">
                <h2>Notification Settings</h2>
                <div className="admin-card">
                    <FaBell className="config-icon" />
                    <p>Email & Push Notifications are enabled for critical system events.</p>
                </div>
            </div>

            {/* Feature Management */}
            <div className="admin-section">
                <h2>Feature Management</h2>
                <div className="admin-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>Status</th>
                                <th>Users</th>
                                <th>Feedback</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map(feature => (
                                <tr key={feature.id}>
                                    <td>{feature.name}</td>
                                    <td>{feature.active ? "Enabled" : "Disabled"}</td>
                                    <td>{feature.users}</td>
                                    <td>{feature.feedback}</td>
                                    <td>
                                        <button className="action-button toggle" onClick={() => toggleFeature(feature.id)}>
                                            {feature.active ? <FaToggleOn /> : <FaToggleOff />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Configuration Change Logs */}
            <div className="admin-section">
                <h2>Configuration Change Logs</h2>
                <div className="admin-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>User</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => (
                                <tr key={log.id}>
                                    <td>{log.action}</td>
                                    <td>{log.user}</td>
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

export default PlatformConfig;
