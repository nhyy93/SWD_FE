import styles from "./Staff.module.css";

const Delivery = () => {
  const deliveries = [
    { id: "#DLV001", driver: "Mike Johnson", status: "On the way" },
    { id: "#DLV002", driver: "Sarah Lee", status: "Delivered" },
  ];

  return (
    <div className={styles.staffContainer}>
      <h2 className={styles.pageTitle}>🚚 Delivery Management</h2>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Delivery ID</th>
            <th>Driver</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery, index) => (
            <tr key={index}>
              <td>{delivery.id}</td>
              <td>{delivery.driver}</td>
              <td className={styles[delivery.status.replace(/\s+/g, "").toLowerCase()]}>{delivery.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Delivery;
