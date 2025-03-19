import styles from "./OrderProcessing.module.css";

const OrderProcessing = () => {
  return (
    <div className={styles.processingContainer}>
      <h2>📦 Xử lý đơn hàng</h2>
      <p>Kiểm tra, xác nhận và đóng gói đơn hàng.</p>
    </div>
  );
};

export default OrderProcessing;
