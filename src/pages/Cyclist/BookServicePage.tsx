import type React from "react"

import { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Badge,
  ListGroup,
  Nav,
  Alert,
  Modal,
} from "react-bootstrap"
import { Calendar, Clock, PenToolIcon as Tools, MapPin, CheckCircle2, Info, Phone } from 'lucide-react'
import { useSearchParams } from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

// Định nghĩa interface cho dữ liệu cửa hàng
interface Shop {
  id: number
  name: string
  address: string
  district: string
  city: string
  phone: string
  rating: number
  reviewCount: number
  openHours: string
  services: string[]
  image: string
}

// Định nghĩa interface cho dịch vụ
interface Service {
  id: number
  name: string
  description: string
  price: number
  duration: number
  category: string
}

// Dữ liệu mẫu cho cửa hàng
const mockShops: Shop[] = [
  {
    id: 1,
    name: "Cửa hàng Xe đạp Hà Nội",
    address: "123 Đường Láng, Đống Đa",
    district: "Đống Đa",
    city: "Hà Nội",
    phone: "024-1234-5678",
    rating: 4.8,
    reviewCount: 124,
    openHours: "08:00 - 19:00",
    services: ["Sửa chữa", "Bảo dưỡng", "Cho thuê xe"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Xe đạp Thể thao Pro",
    address: "45 Trần Duy Hưng, Cầu Giấy",
    district: "Cầu Giấy",
    city: "Hà Nội",
    phone: "024-8765-4321",
    rating: 4.6,
    reviewCount: 98,
    openHours: "07:30 - 20:00",
    services: ["Sửa chữa", "Bảo dưỡng", "Tư vấn chuyên sâu"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

// Dữ liệu mẫu cho dịch vụ
const mockServices: Service[] = [
  {
    id: 1,
    name: "Bảo dưỡng cơ bản",
    description: "Kiểm tra tổng thể, vệ sinh và bôi trơn các bộ phận",
    price: 200000,
    duration: 60,
    category: "Bảo dưỡng",
  },
  {
    id: 2,
    name: "Bảo dưỡng toàn diện",
    description: "Kiểm tra, vệ sinh, bôi trơn và điều chỉnh tất cả các bộ phận",
    price: 350000,
    duration: 120,
    category: "Bảo dưỡng",
  },
  {
    id: 3,
    name: "Thay săm lốp",
    description: "Thay thế săm lốp mới",
    price: 150000,
    duration: 30,
    category: "Sửa chữa",
  },
  {
    id: 4,
    name: "Điều chỉnh phanh",
    description: "Kiểm tra và điều chỉnh hệ thống phanh",
    price: 100000,
    duration: 45,
    category: "Sửa chữa",
  },
  {
    id: 5,
    name: "Thay xích",
    description: "Thay thế xích mới",
    price: 250000,
    duration: 60,
    category: "Sửa chữa",
  },
  {
    id: 6,
    name: "Thuê xe đạp thể thao",
    description: "Thuê xe đạp thể thao trong ngày",
    price: 200000,
    duration: 480,
    category: "Cho thuê xe",
  },
  {
    id: 7,
    name: "Thuê xe đạp đường trường",
    description: "Thuê xe đạp đường trường trong ngày",
    price: 250000,
    duration: 480,
    category: "Cho thuê xe",
  },
]

// Định nghĩa interface cho form đặt dịch vụ
interface BookingFormData {
  shopId: number
  serviceId: number
  bikeType: string
  bikeModel: string
  date: Date | null
  time: string
  notes: string
  name: string
  phone: string
  email: string
}

export default function BookServicesPage() {
  const [searchParams] = useSearchParams()
  const shopIdParam = searchParams.get("shop")
  
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [bookingData, setBookingData] = useState<BookingFormData>({
    shopId: 0,
    serviceId: 0,
    bikeType: "",
    bikeModel: "",
    date: null,
    time: "",
    notes: "",
    name: "",
    phone: "",
    email: "",
  })

  // Lấy thông tin cửa hàng từ URL parameter
  useEffect(() => {
    if (shopIdParam) {
      const shopId = parseInt(shopIdParam)
      const shop = mockShops.find(s => s.id === shopId)
      if (shop) {
        setSelectedShop(shop)
        setBookingData(prev => ({ ...prev, shopId: shopId }))
      }
    }
  }, [shopIdParam])

  // Lọc dịch vụ theo danh mục
  const filteredServices = mockServices.filter((service) => {
    if (activeCategory === "all") return true
    return service.category === activeCategory
  })

  // Xử lý khi chọn dịch vụ
  const handleSelectService = (service: Service) => {
    setSelectedService(service)
    setBookingData((prev) => ({ ...prev, serviceId: service.id }))
  }

  // Xử lý khi chọn cửa hàng
  const handleSelectShop = (shop: Shop) => {
    setSelectedShop(shop)
    setBookingData((prev) => ({ ...prev, shopId: shop.id }))
  }

  // Xử lý khi thay đổi ngày
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
    setBookingData((prev) => ({ ...prev, date: date }))
  }

  // Xử lý khi thay đổi form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setBookingData((prev) => ({ ...prev, [name]: value }))
  }

  // Xử lý khi submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmModal(true)
  }

  // Xử lý khi xác nhận đặt dịch vụ
  const handleConfirmBooking = () => {
    console.log("Booking data:", bookingData)
    setShowConfirmModal(false)
    setIsSubmitted(true)

    // Reset form sau 3 giây
    setTimeout(() => {
      setIsSubmitted(false)
      setSelectedService(null)
      setSelectedDate(null)
      setBookingData({
        shopId: selectedShop?.id || 0,
        serviceId: 0,
        bikeType: "",
        bikeModel: "",
        date: null,
        time: "",
        notes: "",
        name: "",
        phone: "",
        email: "",
      })
    }, 3000)
  }

  // Format giá tiền
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="fw-bold">Đặt dịch vụ</h1>
          <p className="text-muted">Đặt dịch vụ sửa chữa, bảo dưỡng hoặc thuê xe đạp từ các cửa hàng đối tác</p>
        </Col>
      </Row>

      {isSubmitted ? (
        <Alert variant="success" className="d-flex align-items-center gap-2">
          <CheckCircle2 size={24} />
          <div>
            <Alert.Heading>Đặt dịch vụ thành công!</Alert.Heading>
            <p className="mb-0">
              Cảm ơn bạn đã đặt dịch vụ. Chúng tôi đã gửi thông tin xác nhận đến email của bạn. Cửa hàng sẽ liên hệ với
              bạn trong thời gian sớm nhất.
            </p>
          </div>
        </Alert>
      ) : (
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">Chọn cửa hàng</h5>
              </Card.Header>
              <Card.Body>
                {selectedShop ? (
                  <div>
                    <div className="text-center mb-3">
                      <img
                        src={selectedShop.image || "/placeholder.svg"}
                        alt={selectedShop.name}
                        className="img-fluid rounded"
                      />
                    </div>
                    <h5>{selectedShop.name}</h5>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <MapPin size={16} className="text-muted" />
                      <small>{selectedShop.address}</small>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Clock size={16} className="text-muted" />
                      <small>Giờ mở cửa: {selectedShop.openHours}</small>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Phone size={16} className="text-muted" />
                      <small>{selectedShop.phone}</small>
                    </div>
                    <div className="d-grid">
                      <Button variant="outline-primary" size="sm" onClick={() => setSelectedShop(null)}>
                        Chọn cửa hàng khác
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-muted mb-3">Vui lòng chọn một cửa hàng để đặt dịch vụ:</p>
                    <ListGroup>
                      {mockShops.map((shop) => (
                        <ListGroup.Item
                          key={shop.id}
                          action
                          onClick={() => handleSelectShop(shop)}
                          className="d-flex align-items-center gap-3"
                        >
                          <img
                            src={shop.image || "/placeholder.svg"}
                            alt={shop.name}
                            width={60}
                            height={60}
                            className="rounded"
                          />
                          <div>
                            <h6 className="mb-0">{shop.name}</h6>
                            <small className="text-muted">{shop.address}</small>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                )}
              </Card.Body>
            </Card>

            {selectedShop && (
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">Danh mục dịch vụ</h5>
                </Card.Header>
                <Card.Body>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
                        Tất cả dịch vụ
                      </Nav.Link>
                    </Nav.Item>
                    {Array.from(new Set(mockServices.map((service) => service.category))).map((category) => (
                      <Nav.Item key={category}>
                        <Nav.Link active={activeCategory === category} onClick={() => setActiveCategory(category)}>
                          {category}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col md={8}>
            {!selectedShop ? (
              <Alert variant="info" className="d-flex align-items-center gap-2">
                <Info size={24} />
                <div>
                  <Alert.Heading>Chọn cửa hàng</Alert.Heading>
                  <p className="mb-0">Vui lòng chọn một cửa hàng từ danh sách bên trái để xem các dịch vụ có sẵn.</p>
                </div>
              </Alert>
            ) : !selectedService ? (
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Chọn dịch vụ</h5>
                </Card.Header>
                <Card.Body>
                  <Row xs={1} md={2} className="g-3">
                    {filteredServices.map((service) => (
                      <Col key={service.id}>
                        <Card
                          className="h-100 cursor-pointer"
                          onClick={() => handleSelectService(service)}
                          style={{ cursor: "pointer" }}
                        >
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start">
                              <div className="d-flex align-items-center gap-2">
                                <Tools size={20} className="text-primary" />
                                <h5 className="mb-0">{service.name}</h5>
                              </div>
                              <Badge bg="primary">{formatPrice(service.price)}</Badge>
                            </div>
                            <p className="text-muted mt-2">{service.description}</p>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                              <Badge bg="secondary">{service.category}</Badge>
                              <div className="d-flex align-items-center gap-1">
                                <Clock size={14} className="text-muted" />
                                <small>{service.duration} phút</small>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            ) : (
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Đặt lịch dịch vụ</h5>
                  <Button variant="outline-secondary" size="sm" onClick={() => setSelectedService(null)}>
                    Chọn dịch vụ khác
                  </Button>
                </Card.Header>
                <Card.Body>
                  <div className="mb-4">
                    <h5>Thông tin dịch vụ đã chọn</h5>
                    <Card className="bg-light">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5>{selectedService.name}</h5>
                            <p className="mb-2">{selectedService.description}</p>
                            <div className="d-flex gap-2">
                              <Badge bg="secondary">{selectedService.category}</Badge>
                              <div className="d-flex align-items-center gap-1">
                                <Clock size={14} className="text-muted" />
                                <small>{selectedService.duration} phút</small>
                              </div>
                            </div>
                          </div>
                          <h5 className="text-primary">{formatPrice(selectedService.price)}</h5>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <h5>Thông tin xe đạp</h5>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Loại xe đạp</Form.Label>
                          <Form.Select
                            name="bikeType"
                            value={bookingData.bikeType}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Chọn loại xe đạp</option>
                            <option value="road">Xe đạp đường trường</option>
                            <option value="mountain">Xe đạp địa hình</option>
                            <option value="city">Xe đạp thành phố</option>
                            <option value="folding">Xe đạp gấp</option>
                            <option value="electric">Xe đạp điện</option>
                            <option value="other">Khác</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Mẫu xe</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nhập hãng và mẫu xe"
                            name="bikeModel"
                            value={bookingData.bikeModel}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <h5>Thời gian</h5>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Ngày</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <Calendar size={16} />
                            </InputGroup.Text>
                            <DatePicker
                              selected={selectedDate}
                              onChange={handleDateChange}
                              minDate={new Date()}
                              placeholderText="Chọn ngày"
                              className="form-control"
                              dateFormat="dd/MM/yyyy"
                              required
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Giờ</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <Clock size={16} />
                            </InputGroup.Text>
                            <Form.Select name="time" value={bookingData.time} onChange={handleInputChange} required>
                              <option value="">Chọn giờ</option>
                              <option value="08:00">08:00</option>
                              <option value="09:00">09:00</option>
                              <option value="10:00">10:00</option>
                              <option value="11:00">11:00</option>
                              <option value="13:00">13:00</option>
                              <option value="14:00">14:00</option>
                              <option value="15:00">15:00</option>
                              <option value="16:00">16:00</option>
                              <option value="17:00">17:00</option>
                            </Form.Select>
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label>Ghi chú</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Nhập thông tin thêm về tình trạng xe hoặc yêu cầu đặc biệt"
                        name="notes"
                        value={bookingData.notes}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <h5>Thông tin liên hệ</h5>
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Họ tên</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nhập họ tên của bạn"
                            name="name"
                            value={bookingData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Số điện thoại</Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="Nhập số điện thoại của bạn"
                            name="phone"
                            value={bookingData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Nhập địa chỉ email của bạn"
                            name="email"
                            value={bookingData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Đặt lịch dịch vụ
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      )}

      {/* Modal xác nhận đặt dịch vụ */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đặt dịch vụ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc chắn muốn đặt dịch vụ sau:</p>
          {selectedService && (
            <Card className="mb-3">
              <Card.Body>
                <h5>{selectedService.name}</h5>
                <p className="mb-1">{selectedService.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <Badge bg="secondary">{selectedService.category}</Badge>
                  <h5 className="text-primary mb-0">{formatPrice(selectedService.price)}</h5>
                </div>
              </Card.Body>
            </Card>
          )}
          <p>
            <strong>Thời gian:</strong> {selectedDate?.toLocaleDateString("vi-VN")} lúc {bookingData.time}
          </p>
          <p>
            <strong>Cửa hàng:</strong> {selectedShop?.name}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleConfirmBooking}>
            Xác nhận đặt dịch vụ
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
