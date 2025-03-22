"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, Row, Col, Card, Button, InputGroup, Alert } from "react-bootstrap"
import { CalendarIcon, Clock, MapPin, Users, Lock, CheckCircle2 } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

// Define the type for Route
type Route = {
  id: string
  name: string
  length: number
  difficulty: string
}

// Mock data for routes
const mockRoutes: Route[] = [
  { id: "route1", name: "Downtown Loop", length: 15, difficulty: "Easy" },
  { id: "route2", name: "Mountain Challenge", length: 35, difficulty: "Hard" },
  { id: "route3", name: "Coastal Route", length: 20, difficulty: "Medium" },
  { id: "route4", name: "City Lights Tour", length: 18, difficulty: "Easy" },
  { id: "route5", name: "Forest Trail", length: 25, difficulty: "Medium" },
]

// Form validation schema
const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  date: z.date({ required_error: "A date is required" }),
  startTime: z.string({ required_error: "Start time is required" }),
  finishTime: z.string({ required_error: "Finish time is required" }),
  startPoint: z.string().min(3, { message: "Start point is required" }),
  endPoint: z.string().min(3, { message: "End point is required" }),
  routeId: z.string({ required_error: "Please select a route" }),
  maxParticipants: z.coerce.number().min(2, { message: "At least 2 participants required" }).max(50),
  isPrivate: z.boolean().default(false),
  password: z.string().optional(),
})

export function CreateRideForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  console.log(selectedRoute)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startPoint: "",
      endPoint: "",
      maxParticipants: 10,
      isPrivate: false,
      password: "",
    },
  })

  const isPrivate = watch("isPrivate")

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted Ride:", values)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  const handleRouteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const routeId = e.target.value
    const route = mockRoutes.find((r) => r.id === routeId) || null
    setSelectedRoute(route)
    setValue("routeId", routeId)
  }

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
    if (date) setValue("date", date)
    }
  
    if (isSubmitted) {
      return (
        <Alert variant="success" className="mt-4">
          <div className="d-flex align-items-center gap-2">
            <CheckCircle2 size={20} />
            <strong>Success!</strong>
          </div>
          <p className="mb-0 mt-2">Your group ride has been created successfully. Riders can now join your group.</p>
        </Alert>
      )
    }
  
    return (
      <Card className="mt-4">
        <Card.Header>
          <Card.Title>Create a New Group Ride</Card.Title>
          <Card.Text className="text-muted">
            Set up a new group ride for cyclists to join. Fill in the details below.
          </Card.Text>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Title & Description */}
            <Row className="mb-3">
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Ride Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Morning City Ride"
                    isInvalid={!!errors.title}
                    {...register("title")}
                  />
                  <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Describe your ride..."
                    isInvalid={!!errors.description}
                    {...register("description")}
                  />
                  <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
  
            {/* Date, Time */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><CalendarIcon size={16} /></InputGroup.Text>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      minDate={new Date()}
                      placeholderText="Select date"
                      className="form-control"
                      wrapperClassName="w-100"
                    />
                  </InputGroup>
                  {errors.date && <div className="text-danger mt-1 small">{errors.date.message}</div>}
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><Clock size={16} /></InputGroup.Text>
                    <Form.Control type="time" isInvalid={!!errors.startTime} {...register("startTime")} />
                    </InputGroup>
                <Form.Control.Feedback type="invalid">{errors.startTime?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Finish Time</Form.Label>
                <InputGroup>
                  <InputGroup.Text><Clock size={16} /></InputGroup.Text>
                  <Form.Control type="time" isInvalid={!!errors.finishTime} {...register("finishTime")} />
                </InputGroup>
                <Form.Control.Feedback type="invalid">{errors.finishTime?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Start/End Point */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Start Point</Form.Label>
                <InputGroup>
                  <InputGroup.Text><MapPin size={16} /></InputGroup.Text>
                  <Form.Control type="text" placeholder="Central Park" isInvalid={!!errors.startPoint} {...register("startPoint")} />
                </InputGroup>
                <Form.Control.Feedback type="invalid">{errors.startPoint?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>End Point</Form.Label>
                <InputGroup>
                  <InputGroup.Text><MapPin size={16} /></InputGroup.Text>
                  <Form.Control type="text" placeholder="Downtown Square" isInvalid={!!errors.endPoint} {...register("endPoint")} />
                </InputGroup>
                <Form.Control.Feedback type="invalid">{errors.endPoint?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Route & Participants */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Route</Form.Label>
                <Form.Select onChange={handleRouteChange} isInvalid={!!errors.routeId}>
                  <option value="">Select a route</option>
                  {mockRoutes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.name} ({route.length} km, {route.difficulty})
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errors.routeId?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Max Participants</Form.Label>
                <InputGroup>
                  <InputGroup.Text><Users size={16} /></InputGroup.Text>
                  <Form.Control type="number" placeholder="10" isInvalid={!!errors.maxParticipants} {...register("maxParticipants", { valueAsNumber: true })} />
                </InputGroup>
                <Form.Control.Feedback type="invalid">{errors.maxParticipants?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Privacy & Password */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Make this ride private" {...register("isPrivate")} />
              </Form.Group>
            </Col>
            {isPrivate && (
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><Lock size={16} /></InputGroup.Text>
                    <Form.Control type="text" placeholder="Enter a password" {...register("password")} />
                  </InputGroup>
                </Form.Group>
              </Col>
            )}
          </Row>

          {/* Submit */}
          <div className="d-grid mt-4">
            <Button variant="success" size="lg" type="submit">Create Ride</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}