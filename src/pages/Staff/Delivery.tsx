import styles from "./Delivery.module.css";

const Delivery = () => {
  return (
    <div className={styles.deliveryContainer}>
      <h2>🚚 Quản lý giao hàng</h2>
      <p>Danh sách đơn hàng đang vận chuyển.</p>
    </div>
  );
};

export default Delivery;
