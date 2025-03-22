"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, Row, Col, Card, Button, InputGroup, Alert } from "react-bootstrap"
import { MapPin, Clock, CheckCircle2 } from "lucide-react"

const formSchema = z.object({
  username: z.string().min(3, { message: "Tên người dùng phải có ít nhất 3 ký tự" }),
  route_length: z.coerce.number().min(1, { message: "Khoảng cách phải ít nhất 1 km" }),
  estimated_time: z.coerce.number().min(0.5, { message: "Thời gian ước tính phải ít nhất 0.5 giờ" }),
  difficulty: z.string({ required_error: "Vui lòng chọn độ khó" }),
  start_location: z.string().min(3, { message: "Điểm xuất phát là bắt buộc" }),
  destination: z.string().min(3, { message: "Điểm đến là bắt buộc" }),
  location: z.string().min(2, { message: "Vị trí là bắt buộc" }),
  route_type: z.string({ required_error: "Vui lòng chọn loại đường đi" }),
})

export function CreateRouteForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [pathData, setPathData] = useState<{ lat: number; lng: number }[]>([
    { lat: 21.0285, lng: 105.8544 }, // Hà Nội
    { lat: 20.951, lng: 107.085 }, // Hạ Long
  ])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      route_length: 150,
      estimated_time: 5,
      difficulty: "",
      start_location: "Hà Nội",
      destination: "Hạ Long",
      location: "Vietnam",
      route_type: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Tạo dữ liệu Routes
    const routeData = {
      ...values,
    }

    // Tạo dữ liệu RouteDetail
    const routeDetailData = {
      route_id: 1, // Giả sử ID mới
      route_type: values.route_type,
      path_data: pathData,
    }

    console.log("Route Data:", routeData)
    console.log("Route Detail Data:", routeDetailData)

    // Đây là nơi bạn sẽ gửi dữ liệu đến API
    setIsSubmitted(true)

    // Reset form sau 3 giây
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  // Giả lập thêm điểm vào path_data
  const addRandomPoint = () => {
    // Tạo một điểm ngẫu nhiên giữa Hà Nội và Hạ Long
    const newLat = 21.0285 - Math.random() * 0.1
    const newLng = 105.8544 + Math.random() * 1.2

    // Thêm vào mảng pathData
    setPathData([...pathData, { lat: newLat, lng: newLng }])
  }

  if (isSubmitted) {
    return (
      <Alert variant="success" className="mt-4">
        <div className="d-flex align-items-center gap-2">
          <CheckCircle2 size={20} />
          <strong>Thành công!</strong>
        </div>
        <p className="mb-0 mt-2">Tuyến đường của bạn đã được tạo thành công và sẵn sàng để chia sẻ.</p>
      </Alert>
    )
  }

  return (
    <Card className="mt-4">
      <Card.Header>
        <Card.Title>Tạo tuyến đường mới</Card.Title>
        <Card.Text className="text-muted">Chia sẻ tuyến đường đạp xe yêu thích của bạn với cộng đồng</Card.Text>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tên người dùng</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="johndoe"
                  isInvalid={!!errors.username}
                  {...register("username")}
                />
                {errors.username && (
                  <Form.Control.Feedback type="invalid">{errors.username.message}</Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Loại đường đi</Form.Label>
                <Form.Select isInvalid={!!errors.route_type} {...register("route_type")}>
                  <option value="">Chọn loại đường đi</option>
                  <option value="Nhanh nhất">Nhanh nhất (đường cao tốc)</option>
                  <option value="Ven biển">Ven biển (đẹp nhất)</option>
                  <option value="Ít xe cộ">Ít xe cộ</option>
                </Form.Select>
                {errors.route_type && (
                  <Form.Control.Feedback type="invalid">{errors.route_type.message}</Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Điểm xuất phát</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <MapPin size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Hà Nội"
                    isInvalid={!!errors.start_location}
                    {...register("start_location")}
                  />
                </InputGroup>
                {errors.start_location && (
                  <Form.Control.Feedback type="invalid">{errors.start_location.message}</Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Điểm đến</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <MapPin size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Hạ Long"
                    isInvalid={!!errors.destination}
                    {...register("destination")}
                  />
                </InputGroup>
                {errors.destination && (
                  <Form.Control.Feedback type="invalid">{errors.destination.message}</Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Khoảng cách (km)</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="150"
                    isInvalid={!!errors.route_length}
                    {...register("route_length")}
                  />
                  <InputGroup.Text>km</InputGroup.Text>
                </InputGroup>
                {errors.route_length && (
                  <Form.Control.Feedback type="invalid">{errors.route_length.message}</Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Thời gian ước tính (giờ)</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <Clock size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    step="0.5"
                    min="0.5"
                    placeholder="5"
                    isInvalid={!!errors.estimated_time}
                    {...register("estimated_time")}
                  />
                  <InputGroup.Text>giờ</InputGroup.Text>
                </InputGroup>
                {errors.estimated_time && (
                  <Form.Control.Feedback type="invalid">{errors.estimated_time.message}</Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Vị trí</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Vietnam"
                  isInvalid={!!errors.location}
                  {...register("location")}
                />
                {errors.location && (
                  <Form.Control.Feedback type="invalid">{errors.location.message}</Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Độ khó</Form.Label>
                <Form.Select isInvalid={!!errors.difficulty} {...register("difficulty")}>
                  <option value="">Chọn độ khó</option>
                  <option value="easy">Dễ</option>
                  <option value="medium">Trung bình</option>
                  <option value="hard">Khó</option>
                </Form.Select>
                {errors.difficulty && (
                  <Form.Control.Feedback type="invalid">{errors.difficulty.message}</Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title className="mb-3">Dữ liệu tọa độ GPS (path_data)</Card.Title>
              <div className="bg-light border rounded p-3" style={{ maxHeight: "200px", overflow: "auto" }}>
                <pre className="mb-0">{JSON.stringify(pathData, null, 2)}</pre>
              </div>
              <div className="mt-3 d-flex gap-2">
                <Button variant="outline-primary" onClick={addRandomPoint}>
                  Thêm điểm ngẫu nhiên
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => setPathData(pathData.slice(0, -1))}
                  disabled={pathData.length <= 2}
                >
                  Xóa điểm cuối
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title className="mb-3">Bản đồ tuyến đường</Card.Title>
              <div
                className="bg-light border rounded"
                style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <p className="text-muted">Giao diện bản đồ sẽ hiển thị ở đây</p>
              </div>
              <div className="mt-3">
                <Form.Group>
                  <Form.Label>Tải lên file GPX</Form.Label>
                  <Form.Control type="file" accept=".gpx" />
                </Form.Group>
              </div>
            </Card.Body>
          </Card>

          <div className="d-grid gap-2 mt-4">
            <Button variant="primary" type="submit">
              Tạo tuyến đường
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

