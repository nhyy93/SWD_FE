import styles from "./ShopOwner.module.css";

const OrderStatus = () => {
  const orders = [
    { id: "#ORD001", customer: "Alice Johnson", date: "2025-03-19", status: "Pending" },
    { id: "#ORD002", customer: "Bob Smith", date: "2025-03-18", status: "Processing" },
    { id: "#ORD003", customer: "Charlie Brown", date: "2025-03-17", status: "Shipped" },
    { id: "#ORD004", customer: "David White", date: "2025-03-16", status: "Delivered" },
    { id: "#ORD005", customer: "Eve Adams", date: "2025-03-15", status: "Cancelled" },
  ];

  return (
    <div className={styles.orderStatusContainer}>
      <div className={styles.header}>
        <h1>🚀 Order Status</h1>
        <p>Track customer order statuses in real-time.</p>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th className={styles.statusHeader}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderStatus;
