import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaUserCircle, FaBox, FaHistory, FaHome, FaUsers, FaBell, FaMapMarkedAlt, FaShoppingCart, FaComments } from "react-icons/fa";
import axios from "axios";
import styles from "./RouteSharingPage.module.css";

export default function RouteSharingPage() {
  const [routeData, setRouteData] = useState({
    routeLength: "",
    estimatedTime: "",
    difficulty: "normal",
    startLocation: "",
    destination: "",
    location: "Vietnam",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setRouteData({ ...routeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Unauthorized: Please log in.");
        return;
      }
      await axios.post("http://localhost:8080/api/routes", routeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Route created successfully!");
    } catch (error) {
      setMessage("Failed to create route. Please try again.");
      console.error("Error creating route:", error);
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
          <li><FaUsers /><Link to="/group-ride">My Group</Link></li>
          <li><FaBell /><Link to="/notifications">Notifications</Link></li>
          <li><FaShoppingCart /><Link to="/cart">My Cart</Link></li>
          <li className={styles.active}><FaMapMarkedAlt /><Link to="/route-sharing">Route Sharing</Link></li>
          <li><FaBox /><Link to="/orders">Orders Status</Link></li>
          <li><FaHistory /><Link to="/transactions">Transaction History</Link></li>
          <li><FaComments /><Link to="/blogs">Manage Blogs</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <Container className={styles.mainContent}>
        <Row className="justify-content-center">
          <Col md={6} className={styles.formContainer}>
            <h2 className="text-center">Create a New Route</h2>
            {message && <p className={styles.message}>{message}</p>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Route Length (km)</Form.Label>
                <Form.Control type="number" name="routeLength" value={routeData.routeLength} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estimated Time (hours)</Form.Label>
                <Form.Control type="number" name="estimatedTime" value={routeData.estimatedTime} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Difficulty</Form.Label>
                <Form.Select name="difficulty" value={routeData.difficulty} onChange={handleChange}>
                  <option value="easy">Easy</option>
                  <option value="normal">Normal</option>
                  <option value="hard">Hard</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Start Location</Form.Label>
                <Form.Control type="text" name="startLocation" value={routeData.startLocation} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Destination</Form.Label>
                <Form.Control type="text" name="destination" value={routeData.destination} onChange={handleChange} required />
              </Form.Group>
              <Button type="submit" className={styles.submitButton}>Create Route</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
