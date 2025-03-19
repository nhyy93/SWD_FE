import styles from "./ShopOwner.module.css";

const orders = [
  { id: "#001", customer: "John Doe", status: "Processing", total: "$120.00" },
  { id: "#002", customer: "Jane Smith", status: "Shipped", total: "$220.00" },
  { id: "#003", customer: "Michael Brown", status: "Delivered", total: "$320.00" },
];

const OrderManagement = () => {
  return (
    <div className={styles.container}>
      <h2>📦 Order Management</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.status}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;