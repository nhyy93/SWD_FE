import { useState } from "react";
import styles from "./ShopOwner.module.css";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@shop.com", phone: "(123) 456-7890", role: "Shop Owner", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@staff.com", phone: "(987) 654-3210", role: "Staff", status: "Active" },
    { id: 3, name: "Charlie Brown", email: "charlie@staff.com", phone: "(555) 123-4567", role: "Staff", status: "Inactive" },
  ]);

  const toggleStatus = (id: number) => {
    setAccounts(accounts.map(acc => 
      acc.id === id ? { ...acc, status: acc.status === "Active" ? "Inactive" : "Active" } : acc
    ));
  };

  return (
    <div className={styles.accountContainer}>
      <h2>👤 Account Management</h2>
      <p>Manage your team’s accounts, update permissions, and control account status.</p>

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
            {accounts.map((acc) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountManagement;
