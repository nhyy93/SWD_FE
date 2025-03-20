import React from "react";
import CyclistProfile from "./CyclistProfile";
import CyclistActivityFeed from "./CyclistActivityFeed";
import "./CyclistProfilePage.css";

export default function CyclistProfilePage() {
    return (
        <div className="profile-page-container">
            <div className="profile-section">
                <CyclistProfile />
            </div>

            <div className="activity-section">
                <CyclistActivityFeed />
            </div>
        </div>
    );
}
