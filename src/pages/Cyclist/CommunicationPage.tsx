"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge, ListGroup, Tab, Nav, Modal } from "react-bootstrap"
import { Search, Phone, Video, Send, Image, Paperclip, Mic, MessageCircle } from "lucide-react"

// Định nghĩa interface cho tin nhắn
interface Message {
  id: number
  senderId: number
  receiverId: number
  text: string
  timestamp: string
  isRead: boolean
  attachments?: string[]
}

// Định nghĩa interface cho người dùng
interface UserType {
  id: number
  name: string
  avatar: string
  status: "online" | "offline" | "away"
  lastSeen?: string
  unreadCount?: number
  isShop?: boolean
}

// Dữ liệu mẫu cho người dùng
const mockUsers: UserType[] = [
  {
    id: 1,
    name: "Cửa hàng Xe đạp Hà Nội",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    isShop: true,
  },
  {
    id: 2,
    name: "Xe đạp Thể thao Pro",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    isShop: true,
  },
  {
    id: 3,
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    unreadCount: 3,
  },
  {
    id: 4,
    name: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastSeen: "2 giờ trước",
  },
  {
    id: 5,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    lastSeen: "5 phút trước",
    unreadCount: 1,
  },
]

// Dữ liệu mẫu cho tin nhắn
const mockMessages: Message[] = [
  {
    id: 1,
    senderId: 1,
    receiverId: 0, // current user
    text: "Xin chào! Chúng tôi có thể giúp gì cho bạn?",
    timestamp: "2025-03-22T09:30:00",
    isRead: true,
  },
  {
    id: 2,
    senderId: 0, // current user
    receiverId: 1,
    text: "Tôi muốn hỏi về dịch vụ bảo dưỡng xe đạp của cửa hàng",
    timestamp: "2025-03-22T09:32:00",
    isRead: true,
  },
  {
    id: 3,
    senderId: 1,
    receiverId: 0, // current user
    text: "Chúng tôi cung cấp dịch vụ bảo dưỡng cơ bản và toàn diện. Bạn muốn biết thêm chi tiết về dịch vụ nào?",
    timestamp: "2025-03-22T09:35:00",
    isRead: true,
  },
  {
    id: 4,
    senderId: 0, // current user
    receiverId: 1,
    text: "Tôi muốn biết thêm về dịch vụ bảo dưỡng toàn diện",
    timestamp: "2025-03-22T09:37:00",
    isRead: true,
  },
  {
    id: 5,
    senderId: 1,
    receiverId: 0, // current user
    text: "Dịch vụ bảo dưỡng toàn diện bao gồm kiểm tra, vệ sinh, bôi trơn và điều chỉnh tất cả các bộ phận của xe đạp. Giá dịch vụ là 350.000đ và thời gian thực hiện khoảng 2 giờ.",
    timestamp: "2025-03-22T09:40:00",
    isRead: true,
  },
  {
    id: 6,
    senderId: 1,
    receiverId: 0, // current user
    text: "Bạn có thể đặt lịch bảo dưỡng trực tuyến hoặc đến trực tiếp cửa hàng. Bạn muốn đặt lịch không?",
    timestamp: "2025-03-22T09:41:00",
    isRead: false,
  },
]

// Dữ liệu mẫu cho cuộc gọi
const mockCalls = [
  {
    id: 1,
    userId: 1,
    type: "incoming",
    duration: "5:23",
    timestamp: "2025-03-21T14:30:00",
    missed: false,
  },
  {
    id: 2,
    userId: 3,
    type: "outgoing",
    duration: "2:45",
    timestamp: "2025-03-20T10:15:00",
    missed: false,
  },
  {
    id: 3,
    userId: 2,
    type: "incoming",
    timestamp: "2025-03-19T16:45:00",
    missed: true,
  },
  {
    id: 4,
    userId: 4,
    type: "outgoing",
    timestamp: "2025-03-18T09:30:00",
    missed: true,
  },
]

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState("chat")
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [showCallModal, setShowCallModal] = useState(false)
  const [callType, setCallType] = useState<"audio" | "video">("audio")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Lọc người dùng theo tìm kiếm
  const filteredUsers = mockUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Lấy tin nhắn của người dùng đã chọn
  useEffect(() => {
    if (selectedUser) {
      const userMessages = mockMessages.filter(
        (message) =>
          (message.senderId === selectedUser.id && message.receiverId === 0) ||
          (message.senderId === 0 && message.receiverId === selectedUser.id),
      )
      setMessages(userMessages)
    }
  }, [selectedUser])

  // Cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Xử lý khi chọn người dùng
  const handleSelectUser = (user: UserType) => {
    setSelectedUser(user)
  }

  // Xử lý khi gửi tin nhắn
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !selectedUser) return

    const newMsg: Message = {
      id: messages.length + 1,
      senderId: 0, // current user
      receiverId: selectedUser.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
      isRead: false,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
  }

  // Xử lý khi bắt đầu cuộc gọi
  const handleStartCall = (type: "audio" | "video") => {
    setCallType(type)
    setShowCallModal(true)
  }

  // Format thời gian
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
  }

  // Format ngày
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Hôm nay"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hôm qua"
    } else {
      return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
    }
  }

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="fw-bold">Liên lạc</h1>
          <p className="text-muted">Trò chuyện và gọi điện với cửa hàng và người dùng khác</p>
        </Col>
      </Row>

      <Card className="overflow-hidden">
        <Row className="g-0">
          <Col md={4} className="border-end">
            <div className="p-3 border-bottom">
              <InputGroup>
                <InputGroup.Text>
                  <Search size={16} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </div>

            <Tab.Container activeKey={activeTab} onSelect={(k) => k && setActiveTab(k)}>
              <Nav variant="tabs" className="nav-fill">
                <Nav.Item>
                  <Nav.Link eventKey="chat" className="rounded-0 py-3">
                    <div className="d-flex flex-column align-items-center">
                      <MessageCircle size={18} />
                      <span>Trò chuyện</span>
                    </div>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="calls" className="rounded-0 py-3">
                    <div className="d-flex flex-column align-items-center">
                      <Phone size={18} />
                      <span>Cuộc gọi</span>
                    </div>
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="chat" className="p-0">
                  <div style={{ height: "calc(100vh - 250px)", overflowY: "auto" }}>
                    <ListGroup variant="flush">
                      {filteredUsers.length === 0 ? (
                        <div className="text-center py-4">
                          <p className="text-muted">Không tìm thấy người dùng nào</p>
                        </div>
                      ) : (
                        filteredUsers.map((user) => (
                          <ListGroup.Item
                            key={user.id}
                            action
                            active={selectedUser?.id === user.id}
                            onClick={() => handleSelectUser(user)}
                            className="py-3"
                          >
                            <div className="d-flex align-items-center">
                              <div className="position-relative me-3">
                                <img
                                  src={user.avatar || "/placeholder.svg"}
                                  alt={user.name}
                                  className="rounded-circle"
                                  width={48}
                                  height={48}
                                />
                                <div
                                  className={`position-absolute bottom-0 end-0 rounded-circle border border-white ${
                                    user.status === "online"
                                      ? "bg-success"
                                      : user.status === "away"
                                        ? "bg-warning"
                                        : "bg-secondary"
                                  }`}
                                  style={{ width: "12px", height: "12px" }}
                                ></div>
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-center">
                                  <h6 className="mb-0">{user.name}</h6>
                                  {user.unreadCount && (
                                    <Badge bg="primary" pill>
                                      {user.unreadCount}
                                    </Badge>
                                  )}
                                </div>
                                <small className="text-muted">
                                  {user.status === "online"
                                    ? "Đang hoạt động"
                                    : user.status === "away"
                                      ? "Đang bận"
                                      : user.lastSeen
                                        ? `Hoạt động ${user.lastSeen}`
                                        : "Ngoại tuyến"}
                                </small>
                              </div>
                            </div>
                          </ListGroup.Item>
                        ))
                      )}
                    </ListGroup>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="calls" className="p-0">
                  <div style={{ height: "calc(100vh - 250px)", overflowY: "auto" }}>
                    <ListGroup variant="flush">
                      {mockCalls.map((call) => {
                        const user = mockUsers.find((u) => u.id === call.userId)
                        if (!user) return null

                        return (
                          <ListGroup.Item key={call.id} className="py-3">
                            <div className="d-flex align-items-center">
                              <div className="me-3">
                                <img
                                  src={user.avatar || "/placeholder.svg"}
                                  alt={user.name}
                                  className="rounded-circle"
                                  width={48}
                                  height={48}
                                />
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-center">
                                  <h6 className="mb-0">{user.name}</h6>
                                  <small className="text-muted">{formatDate(call.timestamp)}</small>
                                </div>
                                <div className="d-flex align-items-center">
                                  {call.type === "incoming" ? (
                                    <Phone size={14} className={call.missed ? "text-danger" : "text-success"} />
                                  ) : (
                                    <Phone size={14} className={call.missed ? "text-danger" : "text-primary"} />
                                  )}
                                  <small className="ms-1">
                                    {call.type === "incoming" ? "Cuộc gọi đến" : "Cuộc gọi đi"}
                                    {call.missed ? " (Nhỡ)" : call.duration ? ` (${call.duration})` : ""}
                                  </small>
                                </div>
                              </div>
                              <div>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  className="rounded-circle p-1"
                                  onClick={() => {
                                    handleSelectUser(user)
                                    handleStartCall("audio")
                                  }}
                                >
                                  <Phone size={16} />
                                </Button>
                              </div>
                            </div>
                          </ListGroup.Item>
                        )
                      })}
                    </ListGroup>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>

          <Col md={8}>
            {!selectedUser ? (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 p-4">
                <MessageCircle size={64} className="text-muted mb-3" />
                <h4>Chọn một cuộc trò chuyện</h4>
                <p className="text-muted text-center">
                  Chọn một người dùng hoặc cửa hàng từ danh sách bên trái để bắt đầu trò chuyện
                </p>
              </div>
            ) : (
              <>
                <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="position-relative me-3">
                      <img
                        src={selectedUser.avatar || "/placeholder.svg"}
                        alt={selectedUser.name}
                        className="rounded-circle"
                        width={48}
                        height={48}
                      />
                      <div
                        className={`position-absolute bottom-0 end-0 rounded-circle border border-white ${
                          selectedUser.status === "online"
                            ? "bg-success"
                            : selectedUser.status === "away"
                              ? "bg-warning"
                              : "bg-secondary"
                        }`}
                        style={{ width: "12px", height: "12px" }}
                      ></div>
                    </div>
                    <div>
                      <h5 className="mb-0">{selectedUser.name}</h5>
                      <small className="text-muted">
                        {selectedUser.status === "online"
                          ? "Đang hoạt động"
                          : selectedUser.status === "away"
                            ? "Đang bận"
                            : selectedUser.lastSeen
                              ? `Hoạt động ${selectedUser.lastSeen}`
                              : "Ngoại tuyến"}
                      </small>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      className="rounded-circle p-2"
                      onClick={() => handleStartCall("audio")}
                    >
                      <Phone size={18} />
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="rounded-circle p-2"
                      onClick={() => handleStartCall("video")}
                    >
                      <Video size={18} />
                    </Button>
                  </div>
                </div>

                <div
                  className="p-3"
                  style={{
                    height: "calc(100vh - 350px)",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {messages.length === 0 ? (
                    <div className="text-center py-4 mt-auto">
                      <p className="text-muted">Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!</p>
                    </div>
                  ) : (
                    <div>
                      {messages.map((message, index) => {
                        const isFirstMessageOfDay =
                          index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp)

                        return (
                          <div key={message.id}>
                            {isFirstMessageOfDay && (
                              <div className="text-center my-3">
                                <Badge bg="light" text="dark" pill className="px-3 py-2">
                                  {formatDate(message.timestamp)}
                                </Badge>
                              </div>
                            )}
                            <div className={`d-flex mb-3 ${message.senderId === 0 ? "justify-content-end" : ""}`}>
                              {message.senderId !== 0 && (
                                <img
                                  src={selectedUser.avatar || "/placeholder.svg"}
                                  alt={selectedUser.name}
                                  className="rounded-circle me-2 align-self-end"
                                  width={32}
                                  height={32}
                                />
                              )}
                              <div
                                className={`p-3 rounded-3 ${
                                  message.senderId === 0 ? "bg-primary text-white" : "bg-light"
                                }`}
                                style={{ maxWidth: "75%" }}
                              >
                                <div>{message.text}</div>
                                <div
                                  className={`text-end mt-1 ${message.senderId === 0 ? "text-white-50" : "text-muted"}`}
                                >
                                  <small>{formatTime(message.timestamp)}</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                <div className="p-3 border-top">
                  <Form onSubmit={handleSendMessage}>
                    <InputGroup>
                      <Button variant="outline-secondary" className="rounded-circle p-2">
                        <Paperclip size={18} />
                      </Button>
                      <Button variant="outline-secondary" className="rounded-circle p-2">
                        <Image size={18} />
                      </Button>
                      <Form.Control
                        placeholder="Nhập tin nhắn..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <Button variant="primary" type="submit" disabled={!newMessage.trim()}>
                        <Send size={18} />
                      </Button>
                    </InputGroup>
                  </Form>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Card>

      {/* Modal cuộc gọi */}
      <Modal show={showCallModal} onHide={() => setShowCallModal(false)} centered>
        <Modal.Body className="text-center py-4">
          {selectedUser && (
            <>
              <div className="position-relative mx-auto mb-4">
                <img
                  src={selectedUser.avatar || "/placeholder.svg"}
                  alt={selectedUser.name}
                  className="rounded-circle"
                  width={96}
                  height={96}
                />
                <div
                  className={`position-absolute bottom-0 end-0 rounded-circle border border-white ${
                    selectedUser.status === "online"
                      ? "bg-success"
                      : selectedUser.status === "away"
                        ? "bg-warning"
                        : "bg-secondary"
                  }`}
                  style={{ width: "16px", height: "16px" }}
                ></div>
              </div>
              <h4>{selectedUser.name}</h4>
              <p className="text-muted mb-4">{callType === "audio" ? "Cuộc gọi thoại" : "Cuộc gọi video"}</p>
              <div className="d-flex justify-content-center gap-3 mb-3">
                <Button variant="danger" className="rounded-circle p-3" onClick={() => setShowCallModal(false)}>
                  <Phone size={24} />
                </Button>
                {callType === "video" && (
                  <Button
                    variant="outline-secondary"
                    className="rounded-circle p-3"
                    onClick={() => setCallType("audio")}
                  >
                    <Video size={24} />
                  </Button>
                )}
                <Button variant="outline-secondary" className="rounded-circle p-3" onClick={() => {}}>
                  <Mic size={24} />
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  )
}

