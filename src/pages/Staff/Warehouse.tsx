import styles from "./Staff.module.css";

const Warehouse = () => {
  const inventory = [
    { item: "Mountain Bike", stock: 10 },
    { item: "Helmet", stock: 25 },
    { item: "Cycling Gloves", stock: 50 },
  ];

  return (
    <div className={styles.staffContainer}>
      <h2 className={styles.pageTitle}>🏬 Warehouse Inventory</h2>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.item}</td>
              <td>{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Warehouse;
