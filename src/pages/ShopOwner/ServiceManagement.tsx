import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ShopOwner.module.css";

const SERVICE_TYPES = ["RENTAL", "BIKE_REPAIR", "PURCHASING"];

const ServiceManagement = () => {
  const [services, setServices] = useState<any[]>([]);
  const [newService, setNewService] = useState({ servType: "RENTAL", servDescription: "" });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔄 Fetch danh sách dịch vụ từ API
  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: Please log in.");
        return;
      }

      const response = await axios.get("http://localhost:8080/api/services", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Failed to fetch services. Please try again.");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const addService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: Please log in.");
        return;
      }

      await axios.post("http://localhost:8080/api/services/create", newService, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setShowModal(false);
      setNewService({ servType: "RENTAL", servDescription: "" });

      // 🔄 Fetch lại danh sách ngay sau khi tạo thành công
      fetchServices();
    } catch (error) {
      console.error("Error creating service:", error);
      setError("Failed to create service.");
    }
  };

  const toggleStatus = async (id: number) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, status: service.status === "Active" ? "Inactive" : "Active" } : service
      )
    );
  };

  const deleteService = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: Please log in.");
        return;
      }

      await axios.delete(`http://localhost:8080/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setServices(services.filter((service) => service.id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
      setError("Failed to delete service.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>🛠️ Service Management</h1>
      {error && <p className={styles.error}>{error}</p>}
      <button className={styles.addBtn} onClick={() => setShowModal(true)}>➕ Add Service</button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Service Type</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id || Math.random()}>
              <td>{service.servType}</td>
              <td>{service.servDescription}</td>
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

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>➕ Create Service</h2>
            <form onSubmit={addService} className={styles.form}>
              <label>Service Type</label>
              <select
                value={newService.servType}
                onChange={(e) => setNewService({ ...newService, servType: e.target.value })}
              >
                {SERVICE_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <label>Description</label>
              <input
                type="text"
                value={newService.servDescription}
                onChange={(e) => setNewService({ ...newService, servDescription: e.target.value })}
                required
              />

              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitBtn}>Create</button>
                <button type="button" onClick={() => setShowModal(false)} className={styles.cancelBtn}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
