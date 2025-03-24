import React, { useState } from "react";
import "./CyclistProfile.css";

export default function CyclistProfile() {
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState("ABCABC");
    const [email, setEmail] = useState("FPTFPT@example.com");
    const [location, setLocation] = useState("FPT UniversityUniversity");
    const [bikeBrand, setBikeBrand] = useState("Trek Domane SL6");
    const [bikeImage, setBikeImage] = useState("https://via.placeholder.com/400x200?text=Your+Bike");
    const [aboutMe, setAboutMe] = useState("Passionate cyclist who loves exploring new trails and pushing the limits.");

    const handleSave = () => setEditMode(false);

    return (
        <div className="profile-container">
            <h1 className="profile-title">Cyclist Profile</h1>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Avatar" className="profile-avatar" />

            {editMode ? (
                <div className="edit-form">
                    <label>Name: <input value={name} onChange={(e) => setName(e.target.value)} /></label>
                    <label>Email: <input value={email} onChange={(e) => setEmail(e.target.value)} /></label>
                    <label>Location: <input value={location} onChange={(e) => setLocation(e.target.value)} /></label>
                    <label>Bike Brand: <input value={bikeBrand} onChange={(e) => setBikeBrand(e.target.value)} /></label>
                    <label>Bike Image URL: <input value={bikeImage} onChange={(e) => setBikeImage(e.target.value)} /></label>
                    <label>About Me: <textarea value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} /></label>
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div className="profile-details">
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Location:</strong> {location}</p>
                    <p><strong>Bike Brand:</strong> {bikeBrand}</p>
                    <p><strong>Joined:</strong> January 2024</p>
                    <button onClick={() => setEditMode(true)}>✏️ Edit Profile</button>
                </div>
            )}

            <div className="bike-section">
                <h2>My Bike</h2>
                <img src={bikeImage} alt="Cyclist's Bike" className="bike-image" />
            </div>

            <div className="profile-bio">
                <h2>About Me</h2>
                <p>{aboutMe}</p>
            </div>
        </div>
    );
}
