import styles from "./Staff.module.css";

const OrderProcessing = () => {
  const orders = [
    { id: "#ORD001", customer: "Alice Johnson", date: "2025-03-19", status: "Processing" },
    { id: "#ORD002", customer: "Bob Smith", date: "2025-03-18", status: "Shipped" },
    { id: "#ORD003", customer: "Charlie Brown", date: "2025-03-17", status: "Delivered" },
  ];

  return (
    <div className={styles.staffContainer}>
      <h2 className={styles.pageTitle}>📦 Order Processing</h2>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td className={styles[order.status.toLowerCase()]}>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderProcessing;
