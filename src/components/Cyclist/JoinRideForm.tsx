"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, Button, Alert } from "react-bootstrap"
import { CheckCircle2, AlertCircle } from "lucide-react"
import axios from "axios"

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

  const joinGroupRide = async (groupRideId: number, password?: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/group-ride-joiners/join/${groupRideId}`,
        null,
        { params: { password } }
      )
      console.log("Successfully joined the group ride:", response.data)
      setIsSubmitted(true)

      setTimeout(() => {
        onJoinSuccess()
      }, 2000)
    } catch (error) {
      console.error("Error joining group ride:", error)
      setError("There was an error joining the ride. Please try again.")
    }
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {

    setError(null)


    if (ride.isPrivate) {

      if (!values.password) {
        setError("Password is required for private rides")
        return
      }


      if (values.password !== "password123") {

        setError("Incorrect password")
        return
      }
    }


    joinGroupRide(ride.id, values.password)
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

