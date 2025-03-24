"use client"

import { useState } from "react"
import { Row, Col, Card, Badge, Button, Form, InputGroup, Alert } from "react-bootstrap"
import { MapPin, Clock, TrendingUp, Search, Lock, Unlock, Share, Eye, Heart, MessageSquare } from "lucide-react"
import { RouteDetailsModal } from "./RouteDetailModal"
import { ShareRouteModal } from "./ShareRouteMModal"

// Mock data for routes
const mockRoutes = [
  {
    id: "route1",
    name: "Downtown Loop",
    description: "A scenic ride through the heart of downtown with minimal traffic",
    distance: 15,
    estimatedTime: "45 min",
    elevation: 120,
    difficulty: "Easy",
    startLocation: "Central Park",
    destination: "Downtown Square",
    createdBy: {
      id: "user1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 24,
    comments: 5,
    isPublic: true,
    tags: ["Urban", "Scenic", "Beginner-friendly"],
    createdAt: "2025-02-15T10:30:00",
  },
  {
    id: "route2",
    name: "Mountain Challenge",
    description: "Challenging mountain trails with steep climbs and technical descents",
    distance: 35,
    estimatedTime: "3 hours",
    elevation: 850,
    difficulty: "Hard",
    startLocation: "Mountain Base Station",
    destination: "Summit Viewpoint",
    createdBy: {
      id: "user2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 42,
    comments: 12,
    isPublic: false,
    tags: ["Mountain", "Challenging", "Technical"],
    createdAt: "2025-02-10T08:15:00",
  },
  {
    id: "route3",
    name: "Coastal Route",
    description: "Beautiful coastal ride with ocean views and gentle hills",
    distance: 20,
    estimatedTime: "1 hour 15 min",
    elevation: 250,
    difficulty: "Medium",
    startLocation: "Beach Parking Lot",
    destination: "Lighthouse Point",
    createdBy: {
      id: "user3",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 36,
    comments: 8,
    isPublic: true,
    tags: ["Coastal", "Scenic", "Moderate"],
    createdAt: "2025-02-20T14:45:00",
  },
  {
    id: "route4",
    name: "City Lights Tour",
    description: "Evening ride through the city's most beautiful illuminated landmarks",
    distance: 18,
    estimatedTime: "1 hour",
    elevation: 150,
    difficulty: "Easy",
    startLocation: "City Hall",
    destination: "Riverside Park",
    createdBy: {
      id: "user4",
      name: "Sam Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 29,
    comments: 7,
    isPublic: true,
    tags: ["Urban", "Night", "Leisure"],
    createdAt: "2025-02-25T19:30:00",
  },
  {
    id: "route5",
    name: "Forest Trail Adventure",
    description: "Peaceful ride through dense forest trails with wildlife spotting opportunities",
    distance: 25,
    estimatedTime: "2 hours",
    elevation: 320,
    difficulty: "Medium",
    startLocation: "Forest Entrance",
    destination: "Lake Viewpoint",
    createdBy: {
      id: "user5",
      name: "Emily Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 18,
    comments: 3,
    isPublic: true,
    tags: ["Forest", "Nature", "Peaceful"],
    createdAt: "2025-03-05T09:20:00",
  },
]

export function RoutesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRoute, setSelectedRoute] = useState<any>(null)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [activeDifficulty, setActiveDifficulty] = useState("all")

  const filteredRoutes = mockRoutes.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.startLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesVisibility =
      activeFilter === "all" ||
      (activeFilter === "public" && route.isPublic) ||
      (activeFilter === "private" && !route.isPublic)

    const matchesDifficulty =
      activeDifficulty === "all" || route.difficulty.toLowerCase() === activeDifficulty.toLowerCase()

    return matchesSearch && matchesVisibility && matchesDifficulty
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleViewDetails = (route: any) => {
    setSelectedRoute(route)
    setDetailsModalOpen(true)
  }

  const handleShareRoute = (route: any) => {
    setSelectedRoute(route)
    setShareModalOpen(true)
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
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>
              <Search size={16} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search routes by name, description, location or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select value={activeFilter} onChange={(e) => setActiveFilter(e.target.value)}>
            <option value="all">All Routes</option>
            <option value="public">Public Routes</option>
            <option value="private">Private Routes</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={activeDifficulty} onChange={(e) => setActiveDifficulty(e.target.value)}>
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Form.Select>
        </Col>
      </Row>

      {filteredRoutes.length === 0 ? (
        <Alert variant="info" className="text-center py-4">
          <p className="mb-0">No routes found matching your search criteria.</p>
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredRoutes.map((route) => (
            <Col key={route.id}>
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Title>{route.name}</Card.Title>
                    <div className="d-flex gap-1 mt-1">
                      {route.tags.map((tag, index) => (
                        <Badge key={index} bg="secondary" pill className="me-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {route.isPublic ? (
                    <Badge bg="info" className="d-flex align-items-center gap-1">
                      <Unlock size={12} />
                      Public
                    </Badge>
                  ) : (
                    <Badge bg="secondary" className="d-flex align-items-center gap-1">
                      <Lock size={12} />
                      Private
                    </Badge>
                  )}
                </Card.Header>
                <Card.Body>
                  <Card.Text className="text-truncate mb-3">{route.description}</Card.Text>
                  <div className="mb-3">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <MapPin size={16} className="text-muted" />
                      <small>
                        {route.startLocation} → {route.destination}
                      </small>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Clock size={16} className="text-muted" />
                      <small>{route.estimatedTime}</small>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <TrendingUp size={16} className="text-muted" />
                      <small>{route.elevation} m elevation</small>
                    </div>
                    <div className="d-flex gap-2 mt-3">
                      <Badge bg={getBadgeVariant(route.difficulty)}>{route.difficulty}</Badge>
                      <Badge bg="primary">{route.distance} km</Badge>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={route.createdBy.avatar || "/placeholder.svg"}
                        alt={route.createdBy.name}
                        className="rounded-circle"
                        width={24}
                        height={24}
                      />
                      <small className="text-muted">{route.createdBy.name}</small>
                    </div>
                    <small className="text-muted">{formatDate(route.createdAt)}</small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-3">
                      <div className="d-flex align-items-center gap-1">
                        <Heart size={16} className="text-danger" />
                        <small>{route.likes}</small>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <MessageSquare size={16} className="text-primary" />
                        <small>{route.comments}</small>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <Button size="sm" variant="outline-primary" onClick={() => handleViewDetails(route)}>
                        <Eye size={16} />
                      </Button>
                      <Button size="sm" variant="outline-success" onClick={() => handleShareRoute(route)}>
                        <Share size={16} />
                      </Button>
                    </div>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {selectedRoute && (
        <>
          <RouteDetailsModal show={detailsModalOpen} onHide={() => setDetailsModalOpen(false)} route={selectedRoute} />
          <ShareRouteModal show={shareModalOpen} onHide={() => setShareModalOpen(false)} route={selectedRoute} />
        </>
      )}
    </div>
  )
}

