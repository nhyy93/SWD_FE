import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bicycles from "./pages/Public/Bicycles";
import Login from "./pages/Public/Login";
import Register from "./pages/Guest/Register";
import About from "./pages/Public/About";
import Home from "./pages/Public/Home";
import Services from "./pages/Public/Services";
import Accessories from "./pages/Public/Accessories";

import AccountManagement from "./pages/ShopOwner/AccountManagement";
import OrderManagement from "./pages/ShopOwner/OrderManagement";
import OrderStatus from "./pages/ShopOwner/OrderStatus";
import RevenueStats from "./pages/ShopOwner/RevenueStats";
import CreatePost from "./pages/ShopOwner/CreatePost";

import Chat from "./pages/Staff/Chat";
import Delivery from "./pages/Staff/Delivery";
import OrderProcessing from "./pages/Staff/OrderProcessing";
import Warehouse from "./pages/Staff/Warehouse";
import ShopOwnerLayout from "./pages/ShopOwner/ShopOwnerLayout";
import StaffLayout from "./pages/Staff/StaffLayout";
import ServiceManagement from "./pages/ShopOwner/ServiceManagement";
import Profile from "./pages/Customer/Profile";
import ShopServicesPage from "./pages/Cyclist/ShopServicePage";
import CommunicationPage from "./pages/Cyclist/CommunicationPage";
import FindShopsPage from "./pages/Cyclist/FindShopPage";
import BuyProductPage from "./pages/Cyclist/BuyProductPage";
import BookServicesPage from "./pages/Cyclist/BookServicePage";
import RouteSharingPage from "./pages/Cyclist/RouteSharingPage";
import GroupRidePage from "./pages/Cyclist/GroupRidePage";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/bicycles" element={<Bicycles />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/shop-owner" element={<ShopOwnerLayout />}>
          <Route path="account" element={<AccountManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="order-status" element={<OrderStatus />} />
          <Route path="revenue" element={<RevenueStats />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="/shop-owner/services" element={<ServiceManagement />} />
        </Route>

        <Route path="/staff" element={<StaffLayout />}>
          <Route path="delivery" element={<Delivery />} />
          <Route path="order-processing" element={<OrderProcessing />} />
          <Route path="warehouse" element={<Warehouse />} />
          <Route path="chat" element={<Chat />} />
        </Route>
        <Route path="/group-ride" element={<GroupRidePage />} />
        <Route path="/route-sharing" element={<RouteSharingPage />} />
        <Route path="/book-services" element={<BookServicesPage />} />
        <Route path="/buy-product" element={<BuyProductPage />} />
        <Route path="/find-shop" element={<FindShopsPage />} />
        <Route path="/shop-services" element={<ShopServicesPage />} />
        <Route path="/communication" element={<CommunicationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
