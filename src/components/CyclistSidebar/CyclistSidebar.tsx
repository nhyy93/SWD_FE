import React from "react";
import "./CyclistSidebar.css";

export default function CyclistSidebar({ setActiveTab, activeTab }) {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Avatar" className="avatar" />
                <h2 className="username">John Doe</h2>
            </div>
            <div className="sidebar-menu">
                <button onClick={() => setActiveTab('profile')} className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}>
                    🧑‍💼 Profile
                </button>
                <button onClick={() => setActiveTab('saved')} className={`menu-item ${activeTab === 'saved' ? 'active' : ''}`}>
                    📍 Saved Routes
                </button>
                <button onClick={() => setActiveTab('blogs')} className={`menu-item ${activeTab === 'blogs' ? 'active' : ''}`}>
                    📝 Manage Blogs
                </button>
            </div>
        </div>
    );
}
