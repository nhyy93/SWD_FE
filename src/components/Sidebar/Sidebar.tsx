import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { 
  FaHome, FaUserCircle, FaUsers, FaBell, FaShoppingCart, 
  FaMapMarkedAlt, FaBox, FaHistory, FaComments 
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  
  const isShopOwner = role === "SHOP_OWNER";
  const isCyclist = role === "CYCLIST";
  const isStaff = role === "STAFF";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");

    navigate("/login");
    window.location.reload();
  };

  return (
    <div className={styles.sidebar}>
      <h2>{isShopOwner ? "Shop Owner" : isCyclist ? "Cyclist" : "Staff"}</h2>
      <ul>
        {/* Shop Owner Sidebar */}
        {isShopOwner && (
          <>
            <li><Link to="/"><FaHome /> Home</Link></li>
            <li><Link to="/shop-owner/account">👤 Account Management</Link></li>
            <li><Link to="/shop-owner/products">📦 Product Management</Link></li>
            <li><Link to="/shop-owner/orders">📦 Order Management</Link></li>
            <li><Link to="/shop-owner/order-status">🚀 Order Status</Link></li>
            <li><Link to="/shop-owner/revenue">📊 Revenue Statistics</Link></li>
            <li><Link to="/shop-owner/create-post">📝 Create Post</Link></li>
            <li><Link to="/shop-owner/services">🛠️ Service Management</Link></li>
          </>
        )}

        {/* Cyclist Sidebar */}
        {isCyclist && (
          <>
            <li><Link to="/"><FaHome /> Home</Link></li>
            <li><Link to="/profile"><FaUserCircle /> Profile</Link></li>
            <li><Link to="/group-ride"><FaUsers /> My Group</Link></li>
            <li><Link to="/notifications"><FaBell /> Notifications</Link></li>
            <li><Link to="/cart"><FaShoppingCart /> My Cart</Link></li>
            <li><Link to="/route-sharing"><FaMapMarkedAlt /> Route Sharing</Link></li>
            <li><Link to="/orders"><FaBox /> Orders Status</Link></li>
            <li><Link to="/transactions"><FaHistory /> Transaction History</Link></li>
            <li><Link to="/blogs"><FaComments /> Manage Blogs</Link></li>
          </>
        )}

        {/* Staff Sidebar */}
        {isStaff && (
          <>
            <li><Link to="/"><FaHome /> Home</Link></li>
            <li><Link to="/staff/chat">💬 Customer Chat</Link></li>
            <li><Link to="/staff/order-processing">📦 Order Processing</Link></li>
            <li><Link to="/staff/delivery">🚚 Delivery Management</Link></li>
            <li><Link to="/staff/warehouse">🏬 Warehouse</Link></li>
          </>
        )}
      </ul>
      <button className={styles.logoutBtn} onClick={handleLogout}>🚪 Logout</button>
    </div>
  );
};

export default Sidebar;
