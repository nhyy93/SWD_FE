import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import "./AdminLayout.css";

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="admin-content">
                <main className="admin-main">
                    <Outlet /> {/* This renders child pages */}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
