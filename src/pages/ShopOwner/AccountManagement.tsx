import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ShopOwner.module.css";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          setError("Unauthorized: Please log in.");
          return;
        }

        const response = await axios.get("http://localhost:8080/api/shops/employees", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const formattedAccounts = response.data.map((emp: any) => ({
          id: emp.id,
          name: emp.username,
          email: emp.email,
          phone: emp.phone || "N/A", 
          role: emp.role,
          status: emp.accountStatus === "Verified" ? "Active" : "Inactive",
        }));

        setAccounts(formattedAccounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setError("Failed to fetch accounts. Please try again.");
      }
    };

    fetchAccounts();
  }, []);

  const toggleStatus = (id: number) => {
    setAccounts(accounts.map(acc =>
      acc.id === id ? { ...acc, status: acc.status === "Active" ? "Inactive" : "Active" } : acc
    ));
  };

  return (
    <div className={styles.accountContainer}>
      <h2>👤 Account Management</h2>
      <p>Manage your team’s accounts, update permissions, and control account status.</p>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.accountTable}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length > 0 ? (
              accounts.map((acc) => (
                <tr key={acc.id}>
                  <td>{acc.name}</td>
                  <td>{acc.email}</td>
                  <td>{acc.phone}</td>
                  <td>{acc.role}</td>
                  <td>
                    <span className={acc.status === "Active" ? styles.active : styles.inactive}>
                      {acc.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className={styles.toggleBtn}
                      onClick={() => toggleStatus(acc.id)}
                    >
                      {acc.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.noData}>No accounts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountManagement;
