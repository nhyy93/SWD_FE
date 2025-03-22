"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, Button, Alert } from "react-bootstrap"
import { CheckCircle2, AlertCircle } from "lucide-react"

const formSchema = z.object({
  password: z.string().optional(),
})

interface JoinRideFormProps {
  ride: any
  onJoinSuccess: () => void
}

export function JoinRideForm({ ride, onJoinSuccess }: JoinRideFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Reset error state
    setError(null)

    // Check if the ride is private and requires a password
    if (ride.isPrivate) {
      // In a real app, you would validate this against the backend
      // For this demo, we'll just check if any password was provided
      if (!values.password) {
        setError("Password is required for private rides")
        return
      }

      // Simulate password validation (in a real app, this would be done on the server)
      if (values.password !== "password123") {
        // Just a dummy check
        setError("Incorrect password")
        return
      }
    }

    // If we get here, the join was successful
    console.log("Joining ride:", ride.id)
    setIsSubmitted(true)

    // Close the dialog after a delay
    setTimeout(() => {
      onJoinSuccess()
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <Alert variant="success" className="mt-3">
        <div className="d-flex align-items-center gap-2">
          <CheckCircle2 size={16} />
          <strong>Success!</strong>
        </div>
        <p className="mb-0 mt-2">You have successfully joined the ride. Check your profile for details.</p>
      </Alert>
    )
  }

  return (
    <div className="py-2">
      {error && (
        <Alert variant="danger" className="mb-3">
          <div className="d-flex align-items-center gap-2">
            <AlertCircle size={16} />
            <strong>Error</strong>
          </div>
          <p className="mb-0 mt-1">{error}</p>
        </Alert>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        {ride.isPrivate && (
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter the ride password"
              isInvalid={!!errors.password}
              {...register("password")}
            />
            <Form.Text className="text-muted">This is a private ride. You need the password to join.</Form.Text>
            {errors.password && <Form.Control.Feedback type="invalid">{errors.password.message}</Form.Control.Feedback>}
          </Form.Group>
        )}

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="outline-secondary" onClick={onJoinSuccess}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Join Ride
          </Button>
        </div>
      </Form>
    </div>
  )
}

