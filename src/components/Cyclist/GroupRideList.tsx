import { useState, useEffect } from "react"
import { Row, Col, Card, Badge, Button, Form, InputGroup, Nav, Modal } from "react-bootstrap"
import { Calendar, Clock, MapPin, Users, Search, Lock, Unlock } from "lucide-react"
import axios from "axios"
import { JoinRideForm } from "./JoinRideForm"

export function GroupRideList() {
  const [groupRides, setGroupRides] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRide, setSelectedRide] = useState<any>(null)
  const [joinDialogOpen, setJoinDialogOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [password, setPassword] = useState("")


  useEffect(() => {
    const fetchGroupRides = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/group-rides")
        setGroupRides(response.data)
      } catch (error) {
        console.error("Error fetching group rides:", error)
      }
    }
    fetchGroupRides()
  }, [])



  const filteredRides = groupRides.filter((ride) => {
    const matchesSearch =
      ride.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ride.startPoint.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeFilter === "all") return matchesSearch
    if (activeFilter === "public") return matchesSearch && !ride.isPrivate
    if (activeFilter === "private") return matchesSearch && ride.isPrivate

    return matchesSearch
  })

  return (
    <div className="mt-4">
      {/* Search and Filter UI */}
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

      {/* Display filtered group rides */}
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
                      <small>{new Date(ride.startTime).toLocaleDateString()}</small>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Clock size={16} className="text-muted" />
                      <small>
                        {new Date(ride.startTime).toLocaleTimeString()} - {new Date(ride.finishTime).toLocaleTimeString()}
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
                      <Badge bg="success">{ride.difficulty}</Badge>
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

      {/* Modal for joining a ride */}
      <Modal show={joinDialogOpen} onHide={() => setJoinDialogOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Join {selectedRide?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">Enter the required information to join this group ride.</p>
          {selectedRide && (
            <JoinRideForm
              ride={selectedRide}
              onJoinSuccess={() => setJoinDialogOpen(false)}
              onPasswordChange={(e) => setPassword(e.target.value)}  // Set password if ride is private
              password={password}  // Pass password to the form
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}
