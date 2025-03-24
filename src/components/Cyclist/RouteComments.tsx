"use client"

import type React from "react"

import { useState } from "react"
import { Form, Button, ListGroup } from "react-bootstrap"
import { Send } from "lucide-react"

interface Comment {
  id: string
  user: {
    id: string
    name: string
    avatar: string
  }
  text: string
  createdAt: string
}

interface RouteCommentsProps {
  routeId: number
  comments: Comment[]
}

export function RouteComments({ routeId, comments: initialComments }: RouteCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim()) return

    // Trong ứng dụng thực tế, bạn sẽ gửi dữ liệu này đến API
    const comment: Comment = {
      id: `comment${Date.now()}`,
      user: {
        id: "currentUser",
        name: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      text: newComment,
      createdAt: new Date().toISOString(),
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  return (
    <div>
      <ListGroup variant="flush">
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id} className="px-0">
            <div className="d-flex gap-2">
              <img
                src={comment.user.avatar || "/placeholder.svg"}
                alt={comment.user.name}
                className="rounded-circle"
                width={40}
                height={40}
              />
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>{comment.user.name}</strong>
                  <small className="text-muted">{formatDate(comment.createdAt)}</small>
                </div>
                <p className="mb-0 mt-1">{comment.text}</p>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Form onSubmit={handleSubmitComment} className="mt-3">
        <Form.Group className="mb-3">
          <Form.Label>Thêm bình luận</Form.Label>
          <div className="d-flex gap-2">
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Viết bình luận của bạn tại đây..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button variant="primary" type="submit" className="align-self-end" disabled={!newComment.trim()}>
              <Send size={16} />
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  )
}

