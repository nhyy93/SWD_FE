import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./ShopOwnerLayout.module.css";

const ShopOwnerLayout = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default ShopOwnerLayout;
