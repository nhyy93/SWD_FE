import React from "react";
import "./CyclistActivityFeed.css";

export default function CyclistActivityFeed() {
    return (
        <div className="activity-feed">
            <h2 className="activity-title">Recent Activity</h2>

            <div className="activity-card">
                <p className="activity-date">🚴 You planned a bike ride. <span>February 29, 2025</span></p>
                <h3 className="activity-route">from <b>An Lợi Đông</b> to <b>Tân Phú</b></h3>

                <div className="activity-info">
                    <img src="https://via.placeholder.com/300x150" alt="Route" className="activity-image" />
                    <div className="activity-stats">
                        <span>⏱️ 01:05</span>
                        <span>📏 11.3 mi</span>
                        <span>🚴‍♂️ 10.4 mph</span>
                        <span>📈 225 ft</span>
                        <span>📉 150 ft</span>
                    </div>
                </div>

                <div className="activity-actions">
                    <button>👍 Like</button>
                    <button>🔎 View</button>
                </div>

                <input className="activity-comment" placeholder="Write a comment..." />
            </div>
        </div>
    );
}
