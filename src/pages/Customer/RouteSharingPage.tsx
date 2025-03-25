"use client"

import { useState } from "react"
import { Container, Row, Col, Nav, Tab, Button } from "react-bootstrap"
import { MapPin, Share2 } from "lucide-react"
import { RoutesList } from "../../components/Cyclist/RouteList"
import { CreateRouteForm } from "../../components/Cyclist/CreateRouteForm"
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
import {
  FaUserCircle, FaBox, FaHistory, FaHome, FaUsers,
  FaBell, FaMapMarkedAlt, FaShoppingCart, FaComments
} from "react-icons/fa";

export default function RouteSharingPage() {
  const [activeTab, setActiveTab] = useState("browse")

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>CycWorld</h2>
        <ul>
          <li><FaHome /><Link to="/">Home</Link></li>
          <li><FaUserCircle /><Link to="/profile">Profile</Link></li>
          <li ><FaUsers /><Link to="/group-ride">My Group</Link></li>
          <li><FaBell /><Link to="/notifications">Notifications</Link></li>
          <li><FaShoppingCart /><Link to="/cart">My Cart</Link></li>
          <li className={styles.active}><FaMapMarkedAlt /><Link to="/route-sharing">Route Sharing</Link></li>
          <li><FaBox /><Link to="/orders">Orders Status</Link></li>
          <li><FaHistory /><Link to="/transactions">Transaction History</Link></li>
          <li><FaComments /><Link to="/blogs">Manage Blogs</Link></li>
        </ul>
      </aside>
      <div className={styles.mainContent}>
        <Container className="py-4">
          <Row className="mb-4 align-items-center">
            <Col>
              <h1 className="fw-bold">Route Sharing</h1>
              <p className="text-muted">Save and share your cycling routes with the community</p>
            </Col>
            <Col xs="auto">
              <div className="d-flex gap-2">
                <Button
                  variant={activeTab === "create" ? "primary" : "outline-primary"}
                  onClick={() => setActiveTab("create")}
                  className="d-flex align-items-center gap-2"
                >
                  <MapPin size={16} />
                  Create Route
                </Button>
                <Button
                  variant={activeTab === "browse" ? "primary" : "outline-primary"}
                  onClick={() => setActiveTab("browse")}
                  className="d-flex align-items-center gap-2"
                >
                  <Share2 size={16} />
                  Save Routes
                </Button>
              </div>
            </Col>
          </Row>

          <Tab.Container activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
            <Nav variant="tabs" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="browse">Save Routes</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="create">Create Route</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="browse">
                <RoutesList />
              </Tab.Pane>
              <Tab.Pane eventKey="create">
                <CreateRouteForm />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </div>
    </div>
  )
}

