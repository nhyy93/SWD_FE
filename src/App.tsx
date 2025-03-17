// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bicycles from "./pages/Public/Bicycles";
import Login from "./pages/Guest/Login";
import Register from "./pages/Guest/Register";
import About from "./pages/Public/About";
import Home from "./pages/Public/Home";

// Admin pages
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";
import MatchRideMonitoring from "./pages/Admin/MatchRideMonitoring";
import ContentModeration from "./pages/Admin/ContentModeration";
import PlatformConfig from "./pages/Admin/PlatformConfig";
import AnalyticsReporting from "./pages/Admin/AnalyticsReporting";
import SupportFeedback from "./pages/Admin/SupportFeedback";
import Sidebar from "./components/Sidebar/Sidebar";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/bicycles" element={<Bicycles />} />
        <Route path="/about" element={<About />} />

        {/* Guest routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="matches" element={<MatchRideMonitoring />} />
          <Route path="content" element={<ContentModeration />} />
          <Route path="config" element={<PlatformConfig />} />
          <Route path="analytics" element={<AnalyticsReporting />} />
          <Route path="support" element={<SupportFeedback />} />
        </Route>
      </Routes>

    </Router >
  );
}

export default App;
