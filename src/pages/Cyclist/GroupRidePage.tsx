"use client"

import { useState } from "react"
import { Container, Row, Col, Nav, Tab, Button } from "react-bootstrap"
import { PlusCircle, Users } from "lucide-react"
import { GroupRideList } from "../../components/Cyclist/GroupRideList"
import { CreateRideForm } from "../../components/Cyclist/CreateRideForm"

export default function GroupRidePage() {
  const [activeTab, setActiveTab] = useState("browse")

  return (
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
              Create Ride
            </Button>
            <Button
              variant={activeTab === "browse" ? "primary" : "outline-primary"}
              onClick={() => setActiveTab("browse")}
              className="d-flex align-items-center gap-2"
            >
              <Users size={16} />
              Browse Rides
            </Button>
          </div>
        </Col>
      </Row>

      <Tab.Container activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="browse">Browse Rides</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="create">Create Ride</Nav.Link>
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
  )
}

