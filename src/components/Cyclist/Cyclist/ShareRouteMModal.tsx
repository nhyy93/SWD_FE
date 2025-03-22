"use client"

import { useState } from "react"
import { Modal, Button, Form, InputGroup, ListGroup, Badge } from "react-bootstrap"
import { Copy, Facebook, Twitter, Mail, Check, Users } from "lucide-react"

interface ShareRouteModalProps {
  show: boolean
  onHide: () => void
  route: any
}

export function ShareRouteModal({ show, onHide, route }: ShareRouteModalProps) {
  const [copied, setCopied] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  // Mock users for sharing
  const users = [
    { id: "user1", name: "John Doe", email: "john@example.com", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "user2", name: "Jane Smith", email: "jane@example.com", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "user3", name: "Alex Johnson", email: "alex@example.com", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "user4", name: "Sam Wilson", email: "sam@example.com", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "user5", name: "Emily Chen", email: "emily@example.com", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const shareUrl = `https://cyclingapp.example.com/routes/${route.id}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleUserSelection = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const shareWithUsers = () => {
    console.log("Sharing route with users:", selectedUsers)
    // Here you would implement the actual sharing logic
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Share Route: {route.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Share Link</h6>
        <InputGroup className="mb-3">
          <Form.Control value={shareUrl} readOnly />
          <Button variant="outline-secondary" onClick={copyToClipboard}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </Button>
        </InputGroup>

        <div className="d-flex gap-2 mb-4">
          <Button variant="outline-primary" className="d-flex align-items-center gap-2">
            <Facebook size={16} />
            Facebook
          </Button>
          <Button variant="outline-info" className="d-flex align-items-center gap-2">
            <Twitter size={16} />
            Twitter
          </Button>
          <Button variant="outline-secondary" className="d-flex align-items-center gap-2">
            <Mail size={16} />
            Email
          </Button>
        </div>

        <h6 className="d-flex align-items-center gap-2 mb-3">
          <Users size={16} />
          Share with Specific Users
        </h6>
        <ListGroup className="mb-3">
          {users.map((user) => (
            <ListGroup.Item
              key={user.id}
              className="d-flex justify-content-between align-items-center"
              action
              onClick={() => toggleUserSelection(user.id)}
              active={selectedUsers.includes(user.id)}
            >
              <div className="d-flex align-items-center gap-2">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="rounded-circle"
                  width={32}
                  height={32}
                />
                <div>
                  <div>{user.name}</div>
                  <small className="text-muted">{user.email}</small>
                </div>
              </div>
              {selectedUsers.includes(user.id) && <Check size={16} />}
            </ListGroup.Item>
          ))}
        </ListGroup>

        {selectedUsers.length > 0 && (
          <div className="mb-3">
            <h6>Selected Users:</h6>
            <div className="d-flex flex-wrap gap-2">
              {selectedUsers.map((userId) => {
                const user = users.find((u) => u.id === userId)
                return (
                  <Badge key={userId} bg="primary" className="d-flex align-items-center gap-1 p-2">
                    {user?.name}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Add a message (optional)</Form.Label>
          <Form.Control as="textarea" rows={2} placeholder="Check out this cycling route I found!" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={shareWithUsers} disabled={selectedUsers.length === 0}>
          Share with Selected Users
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

