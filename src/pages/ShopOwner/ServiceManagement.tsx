import { useState } from "react";
import styles from "./ShopOwner.module.css";

const ServiceManagement = () => {
  const [services, setServices] = useState([
    { id: 1, name: "Premium Bike Check", price: "$50", status: "Active" },
    { id: 2, name: "Tire Replacement", price: "$20", status: "Active" },
    { id: 3, name: "Brake Adjustment", price: "$30", status: "Inactive" },
  ]);

  const [newService, setNewService] = useState({ name: "", price: "", status: "Active" });
  const [showModal, setShowModal] = useState(false);

  // 🟢 Toggle Service Status
  const toggleStatus = (id: number) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, status: service.status === "Active" ? "Inactive" : "Active" } : service
      )
    );
  };

  // ❌ Delete Service
  const deleteService = (id: number) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

  // ➕ Add New Service
  const addService = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.max(...services.map(s => s.id), 0) + 1; // Generate new ID
    setServices([...services, { id, ...newService }]);
    setShowModal(false);
    setNewService({ name: "", price: "", status: "Active" });
  };

  return (
    <div className={styles.container}>
      <h1>🛠️ Service Management</h1>
      <button className={styles.addBtn} onClick={() => setShowModal(true)}>➕ Add Service</button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.price}</td>
              <td>
                <button
                  className={service.status === "Active" ? styles.active : styles.inactive}
                  onClick={() => toggleStatus(service.id)}
                >
                  {service.status}
                </button>
              </td>
              <td>
                <button className={styles.deleteBtn} onClick={() => deleteService(service.id)}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding New Service */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>➕ Create Service</h2>
            <form onSubmit={addService} className={styles.form}>
              <label>Service Name</label>
              <input
                type="text"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                required
              />

              <label>Price</label>
              <input
                type="text"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                required
              />

              <label>Status</label>
              <select
                value={newService.status}
                onChange={(e) => setNewService({ ...newService, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitBtn}>Create</button>
                <button onClick={() => setShowModal(false)} className={styles.cancelBtn}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
