"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, Row, Col, Card, Button, InputGroup, Alert } from "react-bootstrap"
import { MapPin, Clock, CheckCircle2 } from "lucide-react"

const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  route_length: z.coerce.number().min(1, { message: "Distance must be at least 1 km" }),
  estimated_time: z.coerce.number().min(0.5, { message: "Estimated time should be at least 0.5 hour" }),
  difficulty: z.string({ required_error: "Please select difficulty" }),
  start_location: z.string().min(3, { message: "The starting point is required" }),
  destination: z.string().min(3, { message: "Destination is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  route_type: z.string({ required_error: "Please select route type" }),
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
        <p className="mb-0 mt-2">Your route has been successfully created and is ready to share.</p>
      </Alert>
    )
  }

  return (
    <Card className="mt-4">
      <Card.Header>
        <Card.Title>Create new route</Card.Title>
        <Card.Text className="text-muted">Share your favorite cycling routes with the community</Card.Text>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
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
                <Form.Label>Type of path</Form.Label>
                <Form.Select isInvalid={!!errors.route_type} {...register("route_type")}>
                  <option value="">Select route type</option>
                  <option value="Nhanh nhất">Fastest (highway)</option>
                  <option value="Ven biển">Coastal (most beautiful)</option>
                  <option value="Ít xe cộ">Less traffic</option>
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
                <Form.Label>Starting point</Form.Label>
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
                <Form.Label>Destination</Form.Label>
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
                <Form.Label>Distance (km)</Form.Label>
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
                <Form.Label>Estimated time (hours)</Form.Label>
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
                  <InputGroup.Text>hour</InputGroup.Text>
                </InputGroup>
                {errors.estimated_time && (
                  <Form.Control.Feedback type="invalid">{errors.estimated_time.message}</Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
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
                <Form.Label>Difficulty</Form.Label>
                <Form.Select isInvalid={!!errors.difficulty} {...register("difficulty")}>
                  <option value="">Select difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Difficult</option>
                </Form.Select>
                {errors.difficulty && (
                  <Form.Control.Feedback type="invalid">{errors.difficulty.message}</Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title className="mb-3">GPS coordinate data (path_data)</Card.Title>
              <div className="bg-light border rounded p-3" style={{ maxHeight: "200px", overflow: "auto" }}>
                <pre className="mb-0">{JSON.stringify(pathData, null, 2)}</pre>
              </div>
              <div className="mt-3 d-flex gap-2">
                <Button variant="outline-primary" onClick={addRandomPoint}>
                  Add random points
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => setPathData(pathData.slice(0, -1))}
                  disabled={pathData.length <= 2}
                >
                  Delete endpoint
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title className="mb-3">Route map</Card.Title>
              <div
                className="bg-light border rounded"
                style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <p className="text-muted">The map interface will be displayed here.</p>
              </div>
              <div className="mt-3">
                <Form.Group>
                  <Form.Label>Upload GPX file</Form.Label>
                  <Form.Control type="file" accept=".gpx" />
                </Form.Group>
              </div>
            </Card.Body>
          </Card>

          <div className="d-grid gap-2 mt-4">
            <Button variant="primary" type="submit">
              Create Route
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

