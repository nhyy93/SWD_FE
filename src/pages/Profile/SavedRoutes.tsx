import React, { useState } from "react";
import "./SavedRoutes.css";

const initialRoutes = [
    {
        id: 101,
        title: "An Lợi Đông to Tân Phú",
        date: "2025-02-20",
        sport: "Cycling",
        location: "Thủ Đức",
        distance: "11.3 mi",
        duration: "01:05",
        speed: "10.4 mph",
        ascent: "225 ft",
        descent: "150 ft",
    },
    {
        id: 102,
        title: "Vinhomes Central Park to Nguyễn Huệ",
        date: "2025-03-05",
        sport: "Cycling",
        location: "Bình Thạnh",
        distance: "9.2 mi",
        duration: "00:50",
        speed: "11.0 mph",
        ascent: "180 ft",
        descent: "130 ft",
    },
    {
        id: 103,
        title: "Cầu Phú Mỹ to Quận 7",
        date: "2025-03-10",
        sport: "Cycling",
        location: "Quận 7",
        distance: "14.5 mi",
        duration: "01:20",
        speed: "10.9 mph",
        ascent: "300 ft",
        descent: "210 ft",
    },
    {
        id: 104,
        title: "Hồ Con Rùa to Nhà Thờ Đức Bà",
        date: "2025-03-15",
        sport: "Cycling",
        location: "Quận 3",
        distance: "4.8 mi",
        duration: "00:30",
        speed: "9.5 mph",
        ascent: "75 ft",
        descent: "60 ft",
    },
    {
        id: 105,
        title: "Bình Quới to Thanh Đa",
        date: "2025-03-20",
        sport: "Cycling",
        location: "Bình Thạnh",
        distance: "12.1 mi",
        duration: "01:10",
        speed: "10.2 mph",
        ascent: "210 ft",
        descent: "190 ft",
    },

];

export default function SavedRoutes() {
    const [routes, setRoutes] = useState(initialRoutes);
    const [search, setSearch] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [sportFilter, setSportFilter] = useState("");

    const handleDelete = (id: number) => {
        setRoutes(routes.filter((route) => route.id !== id));
    };

    const handleGPSImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) alert(`GPS File Imported: ${file.name}`);
    };

    const filteredRoutes = routes.filter(
        (route) =>
            (!search || route.title.toLowerCase().includes(search.toLowerCase())) &&
            (!locationFilter || route.location.includes(locationFilter)) &&
            (!dateFilter || route.date === dateFilter) &&
            (!sportFilter || route.sport === sportFilter)
    );

    return (
        <div className="saved-routes-container">
            <div className="header">
                <h1>Saved Routes</h1>
                <button className="import-btn">
                    <label>
                        ➕ Import GPS
                        <input type="file" accept=".gpx,.tcx" onChange={handleGPSImport} hidden />
                    </label>
                </button>
            </div>

            {/* Filters */}
            <div className="filters">
                <input
                    placeholder="Location"
                    onChange={(e) => setLocationFilter(e.target.value)}
                />
                <input type="date" onChange={(e) => setDateFilter(e.target.value)} />
                <select onChange={(e) => setSportFilter(e.target.value)}>
                    <option value="">All Sports</option>
                    <option value="Cycling">Cycling</option>
                </select>
            </div>

            {/* Search */}
            <input
                type="text"
                className="search-box"
                placeholder="Search by name..."
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Route List */}
            <div className="routes-list">
                {filteredRoutes.map((route) => (
                    <div className="route-card" key={route.id}>
                        <img src="https://i.ibb.co/cbLz7pM/route-map.png" alt="Route map" />
                        <div className="route-info">
                            <h3>{route.title}</h3>
                            <div className="tags">
                                <span className="tag easy">Easy</span>
                                <span>⏱️ {route.duration}</span>
                                <span>📏 {route.distance}</span>
                                <span>🚴 {route.speed}</span>
                                <span>📈 {route.ascent}</span>
                                <span>📉 {route.descent}</span>
                            </div>
                            <p className="date">{route.date}</p>
                        </div>
                        <div className="actions">
                            <span>🔒</span>
                            <button onClick={() => handleDelete(route.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
