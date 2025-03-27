"use client"

import { Modal, Button, Badge, Row, Col, ListGroup, Tab, Nav, Alert } from "react-bootstrap"
import { MapPin, Clock, BarChart2, User, Heart, Share2 } from "lucide-react"
import { RouteComments } from "./RouteComments"
import axios from "axios"


interface RouteData {
  route_id: number
  username: string
  route_length: number
  estimated_time: number
  difficulty: string
  start_location: string
  destination: string
  location: string
}

interface RouteDetailData {
  route_detail_id: number
  route_id: number
  route_type: string
  path_data: { lat: number; lng: number }[]
}

interface RouteDetailsModalProps {
  show: boolean
  onHide: () => void
  route: RouteData
  routeDetail: RouteDetailData | null
}

export function RouteDetailsModal({ show, onHide, route }: RouteDetailsModalProps) {
  const [routeDetail, setRouteDetail] = useState<RouteDetailData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRouteDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/route-details/route/${route.route_id}`)
        setRouteDetail(response.data[0]) // Assuming the response is a list and we take the first item
      } catch (error) {
        console.error("Error fetching route details:", error)
        setError("Failed to load route details.")
      }
    }

    if (show) {
      fetchRouteDetails()
    }
  }, [show, route.route_id])

  const getBadgeVariant = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "success"
      case "medium":
        return "warning"
      case "hard":
        return "danger"
      default:
        return "secondary"
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "Dễ"
      case "medium":
        return "Trung bình"
      case "hard":
        return "Khó"
      default:
        return difficulty
    }
  }

  const getRouteTypeDescription = (routeType: string) => {
    switch (routeType) {
      case "Nhanh nhất":
        return "Đường cao tốc, ít đèn giao thông, phù hợp cho người muốn tiết kiệm thời gian."
      case "Ven biển":
        return "Đường ven biển đẹp nhất, phù hợp cho người thích ngắm cảnh."
      case "Ít xe cộ":
        return "Đường có ít xe cộ, phù hợp cho người mới tập đạp xe."
      default:
        return "Không có mô tả chi tiết."
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Tuyến đường: {route.start_location} → {route.destination}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container defaultActiveKey="details">
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="details">Thông tin chi tiết</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="map">Bản đồ</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="comments">Bình luận</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="details">
              <Row>
                <Col md={8}>
                  {routeDetail && (
                    <div className="mb-3">
                      <h5 className="d-flex align-items-center gap-2">
                        {routeDetail.route_type === "Nhanh nhất" && "🚀"}
                        {routeDetail.route_type === "Ven biển" && "🌊"}
                        {routeDetail.route_type === "Ít xe cộ" && "🚲"}
                        Loại đường đi: {routeDetail.route_type}
                      </h5>
                      <p>{getRouteTypeDescription(routeDetail.route_type)}</p>
                    </div>
                  )}

                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex align-items-center gap-2">
                      <MapPin size={18} className="text-muted" />
                      <div>
                        <strong>Tuyến đường:</strong> {route.start_location} → {route.destination}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center gap-2">
                      <Clock size={18} className="text-muted" />
                      <div>
                        <strong>Thời gian dự kiến:</strong> {route.estimated_time} giờ
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center gap-2">
                      <BarChart2 size={18} className="text-muted" />
                      <div>
                        <strong>Độ khó:</strong>{" "}
                        <Badge bg={getBadgeVariant(route.difficulty)}>{getDifficultyText(route.difficulty)}</Badge>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center gap-2">
                      <User size={18} className="text-muted" />
                      <div>
                        <strong>Người tạo:</strong> {route.username}
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={4}>
                  <div className="border rounded p-3 mb-3">
                    <h6>Thông tin tuyến đường</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Khoảng cách:</span>
                      <Badge bg="primary">{route.route_length} km</Badge>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Vị trí:</span>
                      <Badge bg="secondary">{route.location}</Badge>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>ID Tuyến đường:</span>
                      <span>{route.route_id}</span>
                    </div>
                    {routeDetail && (
                      <div className="d-flex justify-content-between mb-2">
                        <span>ID Chi tiết:</span>
                        <span>{routeDetail.route_detail_id}</span>
                      </div>
                    )}
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <Button
                      variant="outline-primary"
                      className="d-flex align-items-center justify-content-center gap-2"
                    >
                      <Heart size={16} />
                      Thích tuyến đường
                    </Button>
                    <Button
                      variant="outline-success"
                      className="d-flex align-items-center justify-content-center gap-2"
                    >
                      <Share2 size={16} />
                      Chia sẻ tuyến đường
                    </Button>
                  </div>
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="map">
              {routeDetail ? (
                <div>
                  <div
                    className="bg-light border rounded"
                    style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <div className="text-center">
                      <p className="text-muted mb-2">Bản đồ tương tác sẽ hiển thị ở đây</p>
                      <p className="text-muted">Dữ liệu tọa độ GPS:</p>
                      <pre
                        className="bg-dark text-light p-3 rounded"
                        style={{ textAlign: "left", maxHeight: "200px", overflow: "auto" }}
                      >
                        {JSON.stringify(routeDetail.path_data, null, 2)}
                      </pre>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-3">
                    <Button variant="outline-primary" size="sm">
                      Tải xuống GPX
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      Xem biểu đồ độ cao
                    </Button>
                  </div>
                </div>
              ) : (
                <Alert variant="warning">Không có dữ liệu chi tiết về tọa độ GPS cho tuyến đường này.</Alert>
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="comments">
              <RouteComments
                routeId={route.route_id}
                comments={[
                  {
                    id: "comment1",
                    user: {
                      id: "user5",
                      name: "Emily Chen",
                      avatar: "/placeholder.svg?height=40&width=40",
                    },
                    text: "Tuyến đường này rất đẹp! Cảnh quan ở Hạ Long thật tuyệt vời.",
                    createdAt: "2025-03-10T14:25:00",
                  },
                  {
                    id: "comment2",
                    user: {
                      id: "user6",
                      name: "Michael Brown",
                      avatar: "/placeholder.svg?height=40&width=40",
                    },
                    text: "Tôi thấy đoạn cuối khá khó. Nên chuẩn bị phanh tốt cho đoạn đường xuống dốc!",
                    createdAt: "2025-03-12T09:15:00",
                  },
                ]}
              />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

