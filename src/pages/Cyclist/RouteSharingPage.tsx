"use client"

import { useState } from "react"
import { Container, Row, Col, Nav, Tab, Button } from "react-bootstrap"
import { MapPin, Share2 } from "lucide-react"
import { RoutesList } from "../../components/Cyclist/RouteList"
import { CreateRouteForm } from "../../components/Cyclist/CreateRouteForm"

export default function RouteSharingPage() {
  const [activeTab, setActiveTab] = useState("browse")

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="fw-bold">Chia sẻ tuyến đường</h1>
          <p className="text-muted">Lưu và chia sẻ tuyến đường đạp xe của bạn với cộng đồng</p>
        </Col>
        <Col xs="auto">
          <div className="d-flex gap-2">
            <Button
              variant={activeTab === "create" ? "primary" : "outline-primary"}
              onClick={() => setActiveTab("create")}
              className="d-flex align-items-center gap-2"
            >
              <MapPin size={16} />
              Tạo tuyến đường
            </Button>
            <Button
              variant={activeTab === "browse" ? "primary" : "outline-primary"}
              onClick={() => setActiveTab("browse")}
              className="d-flex align-items-center gap-2"
            >
              <Share2 size={16} />
              Duyệt tuyến đường
            </Button>
          </div>
        </Col>
      </Row>

      <Tab.Container activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="browse">Duyệt tuyến đường</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="create">Tạo tuyến đường</Nav.Link>
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
  )
}

