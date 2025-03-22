"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Button, Nav, Tab } from "react-bootstrap"
import { Store, MapPin, PenToolIcon as Tools, ShoppingBag, MessageCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ShopServicesPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("services")

  const navigateTo = (path: string) => {
    navigate(path)
  }

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="fw-bold">Cửa hàng & Dịch vụ</h1>
          <p className="text-muted">Tìm kiếm cửa hàng, đặt dịch vụ và mua sắm phụ kiện xe đạp</p>
        </Col>
      </Row>

      <Tab.Container activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="services">Dịch vụ</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="shops">Cửa hàng</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="services">
            <Row className="g-4">
              <Col md={6} lg={4}>
                <Card className="h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="text-center mb-4">
                      <div className="bg-light rounded-circle d-inline-flex p-3 mb-3">
                        <Tools size={32} className="text-primary" />
                      </div>
                      <h3>Đặt dịch vụ</h3>
                      <p className="text-muted">Đặt dịch vụ sửa chữa, thuê xe từ cửa hàng</p>
                    </div>
                    <p>
                      Dễ dàng đặt lịch sửa chữa xe đạp, bảo dưỡng định kỳ hoặc thuê xe đạp từ các cửa hàng đối tác. Theo
                      dõi trạng thái đơn hàng và nhận thông báo khi dịch vụ hoàn thành.
                    </p>
                    <div className="mt-auto">
                      <Button variant="primary" className="w-100" onClick={() => navigateTo("/book-services")}>
                        Đặt dịch vụ ngay
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={4}>
                <Card className="h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="text-center mb-4">
                      <div className="bg-light rounded-circle d-inline-flex p-3 mb-3">
                        <Store size={32} className="text-primary" />
                      </div>
                      <h3>Tìm cửa hàng</h3>
                      <p className="text-muted">Tìm kiếm cửa hàng xe đạp gần bạn</p>
                    </div>
                    <p>
                      Khám phá các cửa hàng xe đạp chất lượng cao trong khu vực của bạn. Xem đánh giá, dịch vụ cung cấp
                      và thông tin liên hệ. Lọc theo loại dịch vụ, khoảng cách và đánh giá.
                    </p>
                    <div className="mt-auto">
                      <Button variant="primary" className="w-100" onClick={() => navigateTo("/find-shops")}>
                        Tìm cửa hàng
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={4}>
                <Card className="h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="text-center mb-4">
                      <div className="bg-light rounded-circle d-inline-flex p-3 mb-3">
                        <ShoppingBag size={32} className="text-primary" />
                      </div>
                      <h3>Mua sắm</h3>
                      <p className="text-muted">Mua phụ kiện, xe đạp từ cửa hàng</p>
                    </div>
                    <p>
                      Mua sắm phụ kiện xe đạp, thiết bị và xe đạp mới từ các cửa hàng đối tác. Thanh toán trực tuyến an
                      toàn và theo dõi đơn hàng của bạn. Nhận thông báo khi đơn hàng được giao.
                    </p>
                    <div className="mt-auto">
                      <Button variant="primary" className="w-100" onClick={() => navigateTo("/buy-products")}>
                        Mua sắm ngay
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Pane>

          <Tab.Pane eventKey="shops">
            <Row className="mb-4">
              <Col>
                <Card>
                  <Card.Body>
                    <h3 className="mb-3">Cửa hàng nổi bật</h3>
                    <p className="text-muted">
                      Khám phá các cửa hàng xe đạp hàng đầu trong khu vực của bạn. Nhấn vào nút bên dưới để xem danh
                      sách đầy đủ.
                    </p>
                    <Button variant="primary" onClick={() => navigateTo("/find-shops")}>
                      Xem tất cả cửa hàng
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="g-4">
              <Col md={6} lg={4}>
                <Card>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Cửa hàng Xe đạp Hà Nội</Card.Title>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <MapPin size={16} className="text-muted" />
                      <small>123 Đường Láng, Đống Đa, Hà Nội</small>
                    </div>
                    <Card.Text>
                      Cửa hàng xe đạp chuyên nghiệp với đầy đủ dịch vụ sửa chữa, bảo dưỡng và phụ kiện cao cấp.
                    </Card.Text>
                    <Button variant="outline-primary" size="sm" onClick={() => navigateTo("/find-shops")}>
                      Xem chi tiết
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={4}>
                <Card>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Xe đạp Thể thao Pro</Card.Title>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <MapPin size={16} className="text-muted" />
                      <small>45 Trần Duy Hưng, Cầu Giấy, Hà Nội</small>
                    </div>
                    <Card.Text>
                      Chuyên xe đạp thể thao, phụ kiện chuyên nghiệp và dịch vụ bảo dưỡng cho người đam mê đạp xe.
                    </Card.Text>
                    <Button variant="outline-primary" size="sm" onClick={() => navigateTo("/find-shops")}>
                      Xem chi tiết
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={4}>
                <Card>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Xe đạp Gia đình</Card.Title>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <MapPin size={16} className="text-muted" />
                      <small>78 Lê Văn Lương, Thanh Xuân, Hà Nội</small>
                    </div>
                    <Card.Text>
                      Cửa hàng xe đạp cho cả gia đình với nhiều mẫu mã đa dạng, giá cả phải chăng và dịch vụ thân thiện.
                    </Card.Text>
                    <Button variant="outline-primary" size="sm" onClick={() => navigateTo("/find-shops")}>
                      Xem chi tiết
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      <Row className="mt-5">
        <Col>
          <Card className="bg-light">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={8}>
                  <h3>Liên hệ với cửa hàng</h3>
                  <p className="mb-md-0">Bạn cần hỗ trợ? Liên hệ trực tiếp với cửa hàng qua chat hoặc gọi điện.</p>
                </Col>
                <Col md={4} className="text-md-end">
                  <Button
                    variant="primary"
                    className="d-flex align-items-center gap-2 ms-auto"
                    onClick={() => navigateTo("/communication")}
                  >
                    <MessageCircle size={18} />
                    Chat & Gọi điện
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

