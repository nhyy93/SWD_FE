"use client"

import { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Badge,
  Pagination,
  ListGroup,
  Tab,
  Nav,
} from "react-bootstrap"
import { Search, MapPin, Star, Phone, Clock, Filter, Bike, PenToolIcon as Tools, ShoppingBag } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom"

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
  products: string[]
  description: string
  image: string
  distance: number
}

// Dữ liệu mẫu cho cửa hàng
const mockShops: Shop[] = [
  {
    id: 1,
    name: "Cửa hàng Xe đạp Hà Nội",
    address: "123 Đường Láng",
    district: "Đống Đa",
    city: "Hà Nội",
    phone: "024-1234-5678",
    rating: 4.8,
    reviewCount: 124,
    openHours: "08:00 - 19:00",
    services: ["Sửa chữa", "Bảo dưỡng", "Cho thuê xe"],
    products: ["Xe đạp", "Phụ kiện", "Phụ tùng"],
    description: "Cửa hàng xe đạp chuyên nghiệp với đầy đủ dịch vụ sửa chữa, bảo dưỡng và phụ kiện cao cấp.",
    image: "/placeholder.svg?height=200&width=300",
    distance: 1.2,
  },
  {
    id: 2,
    name: "Xe đạp Thể thao Pro",
    address: "45 Trần Duy Hưng",
    district: "Cầu Giấy",
    city: "Hà Nội",
    phone: "024-8765-4321",
    rating: 4.6,
    reviewCount: 98,
    openHours: "07:30 - 20:00",
    services: ["Sửa chữa", "Bảo dưỡng", "Tư vấn chuyên sâu"],
    products: ["Xe đạp thể thao", "Phụ kiện chuyên nghiệp", "Quần áo"],
    description: "Chuyên xe đạp thể thao, phụ kiện chuyên nghiệp và dịch vụ bảo dưỡng cho người đam mê đạp xe.",
    image: "/placeholder.svg?height=200&width=300",
    distance: 2.5,
  },
  {
    id: 3,
    name: "Xe đạp Gia đình",
    address: "78 Lê Văn Lương",
    district: "Thanh Xuân",
    city: "Hà Nội",
    phone: "024-2468-1357",
    rating: 4.3,
    reviewCount: 76,
    openHours: "08:30 - 18:30",
    services: ["Sửa chữa", "Bảo dưỡng", "Lắp ráp"],
    products: ["Xe đạp gia đình", "Xe đạp trẻ em", "Phụ kiện"],
    description: "Cửa hàng xe đạp cho cả gia đình với nhiều mẫu mã đa dạng, giá cả phải chăng và dịch vụ thân thiện.",
    image: "/placeholder.svg?height=200&width=300",
    distance: 3.8,
  },
  {
    id: 4,
    name: "Xe đạp Điện Xanh",
    address: "56 Nguyễn Chí Thanh",
    district: "Đống Đa",
    city: "Hà Nội",
    phone: "024-1357-2468",
    rating: 4.5,
    reviewCount: 87,
    openHours: "08:00 - 19:30",
    services: ["Sửa chữa xe điện", "Bảo dưỡng", "Thay pin"],
    products: ["Xe đạp điện", "Pin", "Phụ kiện xe điện"],
    description: "Chuyên xe đạp điện, dịch vụ sửa chữa và bảo dưỡng xe điện chuyên nghiệp.",
    image: "/placeholder.svg?height=200&width=300",
    distance: 2.1,
  },
  {
    id: 5,
    name: "Xe đạp Vintage",
    address: "34 Tô Hiệu",
    district: "Hà Đông",
    city: "Hà Nội",
    phone: "024-9753-1246",
    rating: 4.2,
    reviewCount: 65,
    openHours: "09:00 - 18:00",
    services: ["Sửa chữa", "Phục chế", "Trang trí"],
    products: ["Xe đạp vintage", "Phụ kiện cổ điển", "Đồ trang trí"],
    description: "Chuyên xe đạp phong cách vintage, phục chế xe cũ và phụ kiện theo phong cách cổ điển.",
    image: "/placeholder.svg?height=200&width=300",
    distance: 5.7,
  },
]

export default function FindShopsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("distance")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)
  const [activeTab, setActiveTab] = useState("info")

  // Danh sách quận/huyện
  const districts = ["Đống Đa", "Cầu Giấy", "Thanh Xuân", "Hà Đông", "Hoàn Kiếm"]

  // Danh sách dịch vụ
  const services = [
    "Sửa chữa",
    "Bảo dưỡng",
    "Cho thuê xe",
    "Tư vấn chuyên sâu",
    "Lắp ráp",
    "Sửa chữa xe điện",
    "Phục chế",
  ]

  // Danh sách sản phẩm
  const products = [
    "Xe đạp",
    "Xe đạp thể thao",
    "Xe đạp gia đình",
    "Xe đạp trẻ em",
    "Xe đạp điện",
    "Phụ kiện",
    "Phụ tùng",
    "Quần áo",
  ]

  // Lọc cửa hàng theo các tiêu chí
  const filteredShops = mockShops.filter((shop) => {
    // Lọc theo tìm kiếm
    const matchesSearch =
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Lọc theo quận/huyện
    const matchesDistrict = selectedDistrict === "all" || shop.district === selectedDistrict

    // Lọc theo dịch vụ
    const matchesServices =
      selectedServices.length === 0 || selectedServices.every((service) => shop.services.includes(service))

    // Lọc theo sản phẩm
    const matchesProducts =
      selectedProducts.length === 0 || selectedProducts.some((product) => shop.products.includes(product))

    return matchesSearch && matchesDistrict && matchesServices && matchesProducts
  })

  // Sắp xếp cửa hàng
  const sortedShops = [...filteredShops].sort((a, b) => {
    if (sortBy === "distance") {
      return a.distance - b.distance
    } else if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    }
    return 0
  })

  // Xử lý chọn/bỏ chọn dịch vụ
  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service))
    } else {
      setSelectedServices([...selectedServices, service])
    }
  }

  // Xử lý chọn/bỏ chọn sản phẩm
  const toggleProduct = (product: string) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== product))
    } else {
      setSelectedProducts([...selectedProducts, product])
    }
  }

  // Xử lý khi chọn một cửa hàng
  const handleSelectShop = (shop: Shop) => {
    setSelectedShop(shop)
  }

  // Xử lý đặt dịch vụ
  const handleBookService = (shopId: number) => {
    navigate(`/book-services?shop=${shopId}`)
  }

  // Xử lý mua sản phẩm
  const handleBuyProducts = (shopId: number) => {
    navigate(`/buy-products?shop=${shopId}`)
  }

  // Hiển thị đánh giá bằng sao
  const renderStars = (rating: number) => {
    return (
      <div className="d-flex align-items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= Math.round(rating) ? "text-warning" : "text-muted"}
            fill={star <= Math.round(rating) ? "currentColor" : "none"}
          />
        ))}
        <span className="ms-1">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="fw-bold">Tìm cửa hàng</h1>
          <p className="text-muted">Tìm kiếm cửa hàng xe đạp gần bạn để đặt dịch vụ hoặc mua sắm</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text>
              <Search size={16} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Tìm kiếm theo tên, địa chỉ hoặc dịch vụ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="primary">Tìm kiếm</Button>
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="d-flex align-items-center">
            <option value="distance">Sắp xếp theo: Khoảng cách</option>
            <option value="rating">Sắp xếp theo: Đánh giá</option>
            <option value="name">Sắp xếp theo: Tên cửa hàng</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Header className="d-flex align-items-center">
              <Filter size={16} className="me-2" />
              <span>Bộ lọc</span>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Quận/Huyện</Form.Label>
                <Form.Select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
                  <option value="all">Tất cả quận/huyện</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Dịch vụ</Form.Label>
                {services.map((service) => (
                  <Form.Check
                    key={service}
                    type="checkbox"
                    id={`service-${service}`}
                    label={service}
                    checked={selectedServices.includes(service)}
                    onChange={() => toggleService(service)}
                    className="mb-2"
                  />
                ))}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sản phẩm</Form.Label>
                {products.map((product) => (
                  <Form.Check
                    key={product}
                    type="checkbox"
                    id={`product-${product}`}
                    label={product}
                    checked={selectedProducts.includes(product)}
                    onChange={() => toggleProduct(product)}
                    className="mb-2"
                  />
                ))}
              </Form.Group>

              <div className="d-grid gap-2">
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setSelectedDistrict("all")
                    setSelectedServices([])
                    setSelectedProducts([])
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="mb-0">Kết quả tìm kiếm</h5>
                  <small className="text-muted">{sortedShops.length} cửa hàng được tìm thấy</small>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "primary" : "outline-primary"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    Lưới
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "primary" : "outline-primary"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    Danh sách
                  </Button>
                </div>
              </div>

              {sortedShops.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">Không tìm thấy cửa hàng nào phù hợp với tiêu chí tìm kiếm.</p>
                </div>
              ) : viewMode === "grid" ? (
                <Row xs={1} md={2} lg={3} className="g-3">
                  {sortedShops.map((shop) => (
                    <Col key={shop.id}>
                      <Card className="h-100">
                        <Card.Img variant="top" src={shop.image} />
                        <Card.Body>
                          <Card.Title>{shop.name}</Card.Title>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <MapPin size={16} className="text-muted" />
                            <small>
                              {shop.address}, {shop.district}
                            </small>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <div>{renderStars(shop.rating)}</div>
                            <Badge bg="info">{shop.distance} km</Badge>
                          </div>
                          <div className="mb-3">
                            {shop.services.slice(0, 2).map((service) => (
                              <Badge key={service} bg="secondary" className="me-1">
                                {service}
                              </Badge>
                            ))}
                            {shop.services.length > 2 && (
                              <Badge bg="light" text="dark">
                                +{shop.services.length - 2}
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="w-100"
                            onClick={() => handleSelectShop(shop)}
                          >
                            Xem chi tiết
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <ListGroup variant="flush">
                  {sortedShops.map((shop) => (
                    <ListGroup.Item key={shop.id} className="p-3">
                      <Row>
                        <Col md={3}>
                          <img src={shop.image || "/placeholder.svg"} alt={shop.name} className="img-fluid rounded" />
                        </Col>
                        <Col md={9}>
                          <div className="d-flex justify-content-between align-items-start">
                            <h5>{shop.name}</h5>
                            <Badge bg="info">{shop.distance} km</Badge>
                          </div>
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <MapPin size={16} className="text-muted" />
                            <small>
                              {shop.address}, {shop.district}
                            </small>
                          </div>
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <div className="d-flex align-items-center">
                              <Phone size={16} className="text-muted me-1" />
                              <small>{shop.phone}</small>
                            </div>
                            <div className="d-flex align-items-center">
                              <Clock size={16} className="text-muted me-1" />
                              <small>{shop.openHours}</small>
                            </div>
                          </div>
                          <div className="mb-2">
                            {renderStars(shop.rating)}{" "}
                            <small className="text-muted">({shop.reviewCount} đánh giá)</small>
                          </div>
                          <div className="mb-2">
                            {shop.services.map((service) => (
                              <Badge key={service} bg="secondary" className="me-1">
                                {service}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-muted small mb-2">{shop.description}</p>
                          <div className="d-flex gap-2">
                            <Button variant="outline-primary" size="sm" onClick={() => handleSelectShop(shop)}>
                              Xem chi tiết
                            </Button>
                            <Button variant="outline-success" size="sm" onClick={() => handleBookService(shop.id)}>
                              Đặt dịch vụ
                            </Button>
                            <Button variant="outline-secondary" size="sm" onClick={() => handleBuyProducts(shop.id)}>
                              Mua sắm
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}

              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.Prev />
                  <Pagination.Item active>{1}</Pagination.Item>
                  <Pagination.Item>{2}</Pagination.Item>
                  <Pagination.Item>{3}</Pagination.Item>
                  <Pagination.Next />
                </Pagination>
              </div>
            </Card.Body>
          </Card>

          {selectedShop && (
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{selectedShop.name}</h5>
                <Button variant="close" onClick={() => setSelectedShop(null)} />
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <img
                      src={selectedShop.image || "/placeholder.svg"}
                      alt={selectedShop.name}
                      className="img-fluid rounded mb-3"
                    />
                    <ListGroup variant="flush" className="border rounded mb-3">
                      <ListGroup.Item className="d-flex align-items-center gap-2">
                        <MapPin size={16} className="text-muted" />
                        <div>
                          {selectedShop.address}, {selectedShop.district}, {selectedShop.city}
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center gap-2">
                        <Phone size={16} className="text-muted" />
                        <div>{selectedShop.phone}</div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center gap-2">
                        <Clock size={16} className="text-muted" />
                        <div>{selectedShop.openHours}</div>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <Star size={16} className="text-warning" fill="currentColor" />
                          <div>
                            <strong>{selectedShop.rating.toFixed(1)}</strong> ({selectedShop.reviewCount} đánh giá)
                          </div>
                        </div>
                        <div>{renderStars(selectedShop.rating)}</div>
                      </ListGroup.Item>
                    </ListGroup>
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        onClick={() => handleBookService(selectedShop.id)}
                        className="d-flex align-items-center justify-content-center gap-2"
                      >
                        <Tools size={16} />
                        Đặt dịch vụ
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => handleBuyProducts(selectedShop.id)}
                        className="d-flex align-items-center justify-content-center gap-2"
                      >
                        <ShoppingBag size={16} />
                        Mua sắm
                      </Button>
                    </div>
                  </Col>
                  <Col md={8}>
                    <Tab.Container activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
                      <Nav variant="tabs" className="mb-3">
                        <Nav.Item>
                          <Nav.Link eventKey="info">Thông tin</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="services">Dịch vụ</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="products">Sản phẩm</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="reviews">Đánh giá</Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="info">
                          <h5>Giới thiệu</h5>
                          <p>{selectedShop.description}</p>
                          <h5>Vị trí</h5>
                          <div
                            className="bg-light border rounded"
                            style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <p className="text-muted">Bản đồ vị trí cửa hàng sẽ hiển thị ở đây</p>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="services">
                          <h5>Dịch vụ cung cấp</h5>
                          <Row xs={1} md={2} className="g-3">
                            {selectedShop.services.map((service) => (
                              <Col key={service}>
                                <Card>
                                  <Card.Body>
                                    <div className="d-flex align-items-center gap-2">
                                      <Tools size={20} className="text-primary" />
                                      <h6 className="mb-0">{service}</h6>
                                    </div>
                                    <p className="text-muted small mt-2">
                                      Chi tiết về dịch vụ {service.toLowerCase()} tại {selectedShop.name}
                                    </p>
                                  </Card.Body>
                                </Card>
                              </Col>
                            ))}
                          </Row>
                          <div className="d-grid mt-3">
                            <Button variant="primary" onClick={() => handleBookService(selectedShop.id)}>
                              Đặt dịch vụ ngay
                            </Button>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="products">
                          <h5>Sản phẩm cung cấp</h5>
                          <Row xs={1} md={2} className="g-3">
                            {selectedShop.products.map((product) => (
                              <Col key={product}>
                                <Card>
                                  <Card.Body>
                                    <div className="d-flex align-items-center gap-2">
                                      <Bike size={20} className="text-primary" />
                                      <h6 className="mb-0">{product}</h6>
                                    </div>
                                    <p className="text-muted small mt-2">
                                      Chi tiết về sản phẩm {product.toLowerCase()} tại {selectedShop.name}
                                    </p>
                                  </Card.Body>
                                </Card>
                              </Col>
                            ))}
                          </Row>
                          <div className="d-grid mt-3">
                            <Button variant="success" onClick={() => handleBuyProducts(selectedShop.id)}>
                              Mua sắm ngay
                            </Button>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="reviews">
                          <h5>Đánh giá từ khách hàng</h5>
                          <div className="mb-3">
                            <div className="d-flex align-items-center gap-2">
                              <h2 className="mb-0">{selectedShop.rating.toFixed(1)}</h2>
                              <div>
                                <div>{renderStars(selectedShop.rating)}</div>
                                <small className="text-muted">{selectedShop.reviewCount} đánh giá</small>
                              </div>
                            </div>
                          </div>
                          <ListGroup variant="flush">
                            {[1, 2, 3].map((i) => (
                              <ListGroup.Item key={i} className="px-0">
                                <div className="d-flex gap-2">
                                  <img
                                    src="/placeholder.svg?height=40&width=40"
                                    alt="User"
                                    className="rounded-circle"
                                    width={40}
                                    height={40}
                                  />
                                  <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <strong>Khách hàng {i}</strong>
                                      <small className="text-muted">2 ngày trước</small>
                                    </div>
                                    <div>{renderStars(4 + (i % 2))}</div>
                                    <p className="mb-0 mt-1">
                                      Dịch vụ rất tốt, nhân viên nhiệt tình và chuyên nghiệp. Sẽ quay lại lần sau.
                                    </p>
                                  </div>
                                </div>
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

