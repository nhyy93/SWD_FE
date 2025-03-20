import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Bicycles from "./pages/Public/Bicycles";
import Login from "./pages/Public/Login";
import Register from "./pages/Guest/Register";
import About from "./pages/Public/About";
import Home from "./pages/Public/Home";
import Services from "./pages/Public/Services";
import Accessories from "./pages/Public/Accessories";

// Shop Owner Pages
import AccountManagement from "./pages/ShopOwner/AccountManagement";
import OrderManagement from "./pages/ShopOwner/OrderManagement";
import OrderStatus from "./pages/ShopOwner/OrderStatus";
import RevenueStats from "./pages/ShopOwner/RevenueStats";
import CreatePost from "./pages/ShopOwner/CreatePost";
import ServiceManagement from "./pages/ShopOwner/ServiceManagement";
import ShopOwnerLayout from "./pages/ShopOwner/ShopOwnerLayout";

// Staff Pages
import Chat from "./pages/Staff/Chat";
import Delivery from "./pages/Staff/Delivery";
import OrderProcessing from "./pages/Staff/OrderProcessing";
import Warehouse from "./pages/Staff/Warehouse";
import StaffLayout from "./pages/Staff/StaffLayout";

// Cyclist Pages
import CyclistLayout from "./pages/Profile/CyclistLayout";
import CyclistProfile from "./pages/Profile/CyclistProfile";
import SavedRoutes from "./pages/Profile/SavedRoutes";
import ManageBlogs from "./pages/Profile/ManageBlogs";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bicycles" element={<Bicycles />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        {/* Shop Owner Routes */}
        <Route path="/shop-owner" element={<ShopOwnerLayout />}>
          <Route path="account" element={<AccountManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="order-status" element={<OrderStatus />} />
          <Route path="revenue" element={<RevenueStats />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="services" element={<ServiceManagement />} />
        </Route>

        {/* Staff Routes */}
        <Route path="/staff" element={<StaffLayout />}>
          <Route path="delivery" element={<Delivery />} />
          <Route path="order-processing" element={<OrderProcessing />} />
          <Route path="warehouse" element={<Warehouse />} />
          <Route path="chat" element={<Chat />} />
        </Route>

        {/* Cyclist Routes */}
        <Route path="/cyclist" element={<CyclistLayout />}>
          <Route path="profile" element={<CyclistProfile />} />
          <Route path="saved" element={<SavedRoutes />} />
          <Route path="blogs" element={<ManageBlogs />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
