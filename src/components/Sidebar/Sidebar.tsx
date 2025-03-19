import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const location = useLocation();
  const isShopOwner = location.pathname.startsWith("/shop-owner");

  return (
    <div className={styles.sidebar}>
      <h2>{isShopOwner ? "Shop Owner" : "Staff"}</h2>
      <ul>
        {isShopOwner ? (
          <>
            <li><Link to="/shop-owner/account">👤 Account Management</Link></li>
            <li><Link to="/shop-owner/orders">📦 Order Management</Link></li>
            <li><Link to="/shop-owner/order-status">🚀 Order Status</Link></li>
            <li><Link to="/shop-owner/revenue">📊 Revenue Statistics</Link></li>
            <li><Link to="/shop-owner/create-post">📝 Create Post</Link></li>
            <li><Link to="/shop-owner/services">🛠️ Service Management</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/staff/chat">💬 Customer Chat</Link></li>
            <li><Link to="/staff/order-processing">📦 Order Processing</Link></li>
            <li><Link to="/staff/delivery">🚚 Delivery Management</Link></li>
            <li><Link to="/staff/warehouse">🏬 Warehouse</Link></li>
          </>
        )}
      </ul>
      <button className={styles.logoutBtn}>🚪 Logout</button>
    </div>
  );
};

export default Sidebar;
