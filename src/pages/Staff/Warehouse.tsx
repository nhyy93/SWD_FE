import styles from "./Warehouse.module.css";

const Warehouse = () => {
  return (
    <div className={styles.warehouseContainer}>
      <h2>🏢 Quản lý kho hàng</h2>
      <p>Danh sách sản phẩm trong kho.</p>
    </div>
  );
};

export default Warehouse;
