import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./GroupRidePage.module.css";
import {
  FaUserCircle, FaBox, FaHistory, FaHome, FaUsers,
  FaBell, FaMapMarkedAlt, FaShoppingCart, FaComments, FaEdit, FaTrash
} from "react-icons/fa";

export default function GroupRidePage() {
  const [groupData, setGroupData] = useState({
    startPoint: "",
    endPoint: "",
    routeId: "",
    location: "Vietnam",
    matchStatus: "PENDING",
    matchType: "PRIVATE",
    matchPassword: "",
    startTime: "",
    finishTime: "",
  });

  const [groups, setGroups] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showGroups, setShowGroups] = useState(false);
  const [message, setMessage] = useState("");
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Unauthorized: Please log in.");
        return;
      }
      const response = await axios.get("http://localhost:8080/api/group-rides/my-group", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroups(response.data);
    } catch (error) {
      console.error("Error fetching group rides:", error);
    }
  };

  const handleChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };


  const resetForm = () => {
    setGroupData({
      startPoint: "",
      endPoint: "",
      routeId: "",
      location: "Vietnam",
      matchStatus: "PENDING",
      matchType: "PRIVATE",
      matchPassword: "",
      startTime: "",
      finishTime: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        setMessage("Unauthorized: Please log in.");
        console.error("🚨 No token found in localStorage!");
        return;
      }
  
      if (!groupData.startTime || !groupData.finishTime) {
        setMessage("Start time and finish time are required.");
        return;
      }
  
      const formatDateTime = (dateTime) => new Date(dateTime).toISOString();
  
      const payload = {
        ...groupData,
        routeId: parseInt(groupData.routeId, 10),
        startTime: formatDateTime(groupData.startTime),
        finishTime: formatDateTime(groupData.finishTime),
      };
  
      console.log("📤 Sending Payload:", JSON.stringify(payload, null, 2));
  
      const headers = {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      };
  
      if (editMode) {
        await axios.put(`http://localhost:8080/api/group-rides/${editId}`, payload, { headers });
        setMessage("Group ride updated successfully!");
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post("http://localhost:8080/api/group-rides", payload, { headers });
        setMessage("Group ride created successfully!");
      }
  
      fetchGroups(); 
      resetForm();
    } catch (error) {
      console.error("❌ Error:", error.response ? error.response.data : error);
      setMessage(`Failed to create/update group ride. Reason: ${error.response?.data?.message || "Unknown error"}`);
    }
  };
  
  
  const handleEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/api/group-rides/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGroupData(response.data);
      setEditMode(true);
      setEditId(id);
    } catch (error) {
      console.error("Error fetching group ride details:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/group-rides/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Group ride deleted successfully!");
      fetchGroups();
    } catch (error) {
      console.error("Error deleting group ride:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>CycWorld</h2>
        <ul>
          <li><FaHome /><Link to="/">Home</Link></li>
          <li><FaUserCircle /><Link to="/profile">Profile</Link></li>
          <li className={styles.active}><FaUsers /><Link to="/group-ride">My Group</Link></li>
          <li><FaBell /><Link to="/notifications">Notifications</Link></li>
          <li><FaShoppingCart /><Link to="/cart">My Cart</Link></li>
          <li><FaMapMarkedAlt /><Link to="/route-sharing">Route Sharing</Link></li>
          <li><FaBox /><Link to="/orders">Orders Status</Link></li>
          <li><FaHistory /><Link to="/transactions">Transaction History</Link></li>
          <li><FaComments /><Link to="/blogs">Manage Blogs</Link></li>
        </ul>
      </aside>

      <div className={styles.mainContent}>
        <div className={styles.contentWrapper}>

          <div className={styles.formContainer}>
            <h2>{editMode ? "Edit Group Ride" : "Create a New Group Ride"}</h2>
            {message && <p className={styles.message}>{message}</p>}
            <form onSubmit={handleSubmit}>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Start Point</label>
                  <input type="text" name="startPoint" value={groupData.startPoint} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>End Point</label>
                  <input type="text" name="endPoint" value={groupData.endPoint} onChange={handleChange} required />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Route ID</label>
                  <input type="number" name="routeId" value={groupData.routeId} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Match Type</label>
                  <select name="matchType" value={groupData.matchType} onChange={handleChange}>
                    <option value="PUBLIC">Public</option>
                    <option value="PRIVATE">Private</option>
                  </select>
                </div>
                {groupData.matchType === "PRIVATE" && (
                  <div className={styles.formGroup}>
                    <label>Match Password</label>
                    <input type="text" name="matchPassword" value={groupData.matchPassword} onChange={handleChange} required />
                  </div>
                )}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Start Time</label>
                    <input
                      type="datetime-local"
                      name="startTime"
                      value={groupData.startTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Finish Time</label>
                    <input
                      type="datetime-local"
                      name="finishTime"
                      value={groupData.finishTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

              </div>

              <button type="submit" className={styles.submitButton}>{editMode ? "Update Ride" : "Create Ride"}</button>
            </form>
          </div>

          <button className={styles.showGroupsButton} onClick={() => setShowGroups(!showGroups)}>
            {showGroups ? "Hide My Group Rides" : "Show My Group Rides"}
          </button>

          {showGroups && (
            <div className={styles.groupList}>
              <h2>My Group Rides</h2>
              <ul>
                {groups.map((group) => (
                  <li key={group.id} className={styles.groupItem}>
                    <span>{group.startPoint} → {group.endPoint}</span>
                    <div>
                      <FaEdit onClick={() => handleEdit(group.id)} className={styles.icon} />
                      <FaTrash onClick={() => handleDelete(group.id)} className={styles.icon} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
