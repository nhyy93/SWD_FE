import React, { useState } from "react";
import CyclistSidebar from "../../components/CyclistSidebar/CyclistSidebar";
import CyclistProfile from "./CyclistProfile";
import SavedRoutes from "./SavedRoutes";
import ManageBlogs from "./ManageBlogs";
import CyclistProfilePage from "./CyclistProfilePage";
import "./CyclistLayout.css";

export default function CyclistLayout() {
    const [activeTab, setActiveTab] = useState("profile");

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return <CyclistProfilePage />;
            case "saved":
                return <SavedRoutes />;
            case "blogs":
                return <ManageBlogs />;
            default:
                return <CyclistProfile />;
        }
    };

    return (
        <div className="cyclist-layout">
            <CyclistSidebar setActiveTab={setActiveTab} activeTab={activeTab} />
            <div className="cyclist-content">{renderContent()}</div>
        </div>
    );
}
