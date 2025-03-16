import React, { useState } from 'react';
import "./Admin.css";

const PlatformConfig = () => {
    // Sample configuration settings
    const [settings, setSettings] = useState({
        serviceFee: 5, // percentage
        commissionRate: 10, // percentage
        notifications: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        // In a real app, send settings to the backend
        alert('Settings saved successfully!');
    };

    return (
        <div>
            <h1>Platform Configuration</h1>
            <form onSubmit={handleSave}>
                <div>
                    <label>
                        Service Fee (%):
                        <input
                            type="number"
                            name="serviceFee"
                            value={settings.serviceFee}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Commission Rate (%):
                        <input
                            type="number"
                            name="commissionRate"
                            value={settings.commissionRate}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Notifications:
                        <input
                            type="checkbox"
                            name="notifications"
                            checked={settings.notifications}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Save Settings</button>
            </form>
        </div>
    );
};

export default PlatformConfig;
