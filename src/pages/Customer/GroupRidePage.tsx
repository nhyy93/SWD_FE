"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Nav, Tab, Button } from "react-bootstrap";
import { PlusCircle, Users } from "lucide-react";
import { GroupRideList } from "../../components/Cyclist/GroupRideList";
import { CreateRideForm } from "../../components/Cyclist/CreateRideForm";
import styles from "./Profile.module.css";
import {
  FaUserCircle, FaBox, FaHistory, FaHome, FaUsers,
  FaBell, FaMapMarkedAlt, FaShoppingCart, FaComments
} from "react-icons/fa";

export default function GroupRidePage() {
  const [activeTab, setActiveTab] = useState("browse");

  return (
    <div className={styles.container}>
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

      {/* Main Content */}
      <div className={styles.mainContent}>
        <Container className="py-4">
          <Row className="mb-4 align-items-center">
            <Col>
              <h1 className="fw-bold">Group Rides</h1>
              <p className="text-muted">Join cycling groups and ride together with other cyclists</p>
            </Col>
            <Col xs="auto">
              <div className="d-flex gap-2">
                <Button
                  variant={activeTab === "create" ? "primary" : "outline-primary"}
                  onClick={() => setActiveTab("create")}
                  className="d-flex align-items-center gap-2"
                >
                  <PlusCircle size={16} />
                  Create Group
                </Button>
                <Button
                  variant={activeTab === "browse" ? "primary" : "outline-primary"}
                  onClick={() => setActiveTab("browse")}
                  className="d-flex align-items-center gap-2"
                >
                  <Users size={16} />
                  My Group
                </Button>
              </div>
            </Col>
          </Row>

          <Tab.Container activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
            <Nav variant="tabs" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="browse">My Group</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="create">Create Group</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="browse">
                <GroupRideList />
              </Tab.Pane>
              <Tab.Pane eventKey="create">
                <CreateRideForm />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </div>
    </div>
  );
}
