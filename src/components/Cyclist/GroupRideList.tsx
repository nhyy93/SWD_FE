"use client"

import { useState } from "react"
import { Row, Col, Card, Badge, Button, Form, InputGroup, Nav, Modal } from "react-bootstrap"
import { Calendar, Clock, MapPin, Users, Search, Lock, Unlock } from "lucide-react"
import { JoinRideForm } from "./JoinRideForm"

// Mock data for group rides
const mockGroupRides = [
  {
    id: "1",
    title: "Morning City Ride",
    description: "A casual ride through downtown, perfect for beginners",
    startTime: "2025-03-25T07:30:00",
    finishTime: "2025-03-25T09:30:00",
    startPoint: "Central Park",
    endPoint: "Downtown Square",
    distance: 15,
    difficulty: "Easy",
    createdBy: {
      id: "user1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    participants: 8,
    maxParticipants: 15,
    isPrivate: false,
    route: {
      id: "route1",
      name: "Downtown Loop",
    },
  },
  {
    id: "2",
    title: "Weekend Mountain Trail",
    description: "Challenging mountain trails for experienced riders",
    startTime: "2025-03-27T09:00:00",
    finishTime: "2025-03-27T14:00:00",
    startPoint: "Mountain Base Station",
    endPoint: "Summit Viewpoint",
    distance: 35,
    difficulty: "Hard",
    createdBy: {
      id: "user2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    participants: 5,
    maxParticipants: 10,
    isPrivate: true,
    route: {
      id: "route2",
      name: "Mountain Challenge",
    },
  },
  {
    id: "3",
    title: "Sunset Beach Cruise",
    description: "Relaxing ride along the coastline with beautiful sunset views",
    startTime: "2025-03-26T17:00:00",
    finishTime: "2025-03-26T19:30:00",
    startPoint: "Beach Parking Lot",
    endPoint: "Lighthouse Point",
    distance: 20,
    difficulty: "Medium",
    createdBy: {
      id: "user3",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    participants: 12,
    maxParticipants: 20,
    isPrivate: false,
    route: {
      id: "route3",
      name: "Coastal Route",
    },
  },
  {
    id: "4",
    title: "City Night Ride",
    description: "Explore the city lights on this evening group ride",
    startTime: "2025-03-28T20:00:00",
    finishTime: "2025-03-28T22:00:00",
    startPoint: "City Hall",
    endPoint: "Riverside Park",
    distance: 18,
    difficulty: "Easy",
    createdBy: {
      id: "user4",
      name: "Sam Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    participants: 15,
    maxParticipants: 25,
    isPrivate: false,
    route: {
      id: "route4",
      name: "City Lights Tour",
    },
  },
]

export function GroupRideList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRide, setSelectedRide] = useState<any>(null)
  const [joinDialogOpen, setJoinDialogOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredRides = mockGroupRides.filter((ride) => {
    const matchesSearch =
      ride.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.startPoint.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeFilter === "all") return matchesSearch
    if (activeFilter === "public") return matchesSearch && !ride.isPrivate
    if (activeFilter === "private") return matchesSearch && ride.isPrivate

    return matchesSearch
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleJoinRide = (ride: any) => {
    setSelectedRide(ride)
    setJoinDialogOpen(true)
  }

  const getBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "success"
      case "Medium":
        return "warning"
      case "Hard":
        return "danger"
      default:
        return "secondary"
    }
  }

  return (
    <div className="mt-4">
      <Row className="mb-4">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text>
              <Search size={16} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search rides by name, description or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Nav variant="pills" className="w-100">
            <Nav.Item className="flex-grow-1">
              <Nav.Link active={activeFilter === "all"} onClick={() => setActiveFilter("all")} className="text-center">
                All
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="flex-grow-1">
              <Nav.Link
                active={activeFilter === "public"}
                onClick={() => setActiveFilter("public")}
                className="text-center"
              >
                Public
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="flex-grow-1">
              <Nav.Link
                active={activeFilter === "private"}
                onClick={() => setActiveFilter("private")}
                className="text-center"
              >
                Private
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>

      {filteredRides.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No group rides found matching your search criteria.</p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredRides.map((ride) => (
            <Col key={ride.id}>
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-start">
                  <Card.Title>{ride.title}</Card.Title>
                  {ride.isPrivate ? (
                    <Badge bg="secondary" className="d-flex align-items-center gap-1">
                      <Lock size={12} />
                      Private
                    </Badge>
                  ) : (
                    <Badge bg="info" className="d-flex align-items-center gap-1">
                      <Unlock size={12} />
                      Public
                    </Badge>
                  )}
                </Card.Header>
                <Card.Body>
                  <Card.Text>{ride.description}</Card.Text>
                  <div className="mb-3">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Calendar size={16} className="text-muted" />
                      <small>{formatDate(ride.startTime)}</small>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Clock size={16} className="text-muted" />
                      <small>
                        {formatTime(ride.startTime)} - {formatTime(ride.finishTime)}
                      </small>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <MapPin size={16} className="text-muted" />
                      <small>
                        {ride.startPoint} → {ride.endPoint}
                      </small>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Users size={16} className="text-muted" />
                      <small>
                        {ride.participants}/{ride.maxParticipants} participants
                      </small>
                    </div>
                    <div className="d-flex gap-2 mt-3">
                      <Badge bg={getBadgeVariant(ride.difficulty)}>{ride.difficulty}</Badge>
                      <Badge bg="secondary">{ride.distance} km</Badge>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={ride.createdBy.avatar || "/placeholder.svg"}
                      alt={ride.createdBy.name}
                      className="rounded-circle"
                      width={24}
                      height={24}
                    />
                    <small className="text-muted">{ride.createdBy.name}</small>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleJoinRide(ride)}
                    disabled={ride.participants >= ride.maxParticipants}
                  >
                    Join Ride
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={joinDialogOpen} onHide={() => setJoinDialogOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Join {selectedRide?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">Enter the required information to join this group ride.</p>
          {selectedRide && <JoinRideForm ride={selectedRide} onJoinSuccess={() => setJoinDialogOpen(false)} />}
        </Modal.Body>
      </Modal>
    </div>
  )
}

