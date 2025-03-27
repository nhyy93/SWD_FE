"use client"

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, Row, Col, Card, Button, InputGroup, Alert } from "react-bootstrap";
import { CalendarIcon, Clock, MapPin, Users, Lock, CheckCircle2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import styles from "./GroupRide.module.css";

// Form validation schema
const formSchema = z.object({
  startPoint: z.string().min(3, { message: "Start point is required" }),
  endPoint: z.string().min(3, { message: "End point is required" }),
  startTime: z.string().min(5, { message: "Start time is required" }),
  finishTime: z.string().min(5, { message: "Finish time is required" }),
  location: z.string().min(3, { message: "Location is required" }),
  matchType: z.enum(["PUBLIC", "PRIVATE"], { required_error: "Match type is required" }),
  matchPassword: z.string().optional(),
});

export function CreateRideForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startPoint: "",
      endPoint: "",
      location: "Vietnam",
      matchType: "PUBLIC",
      matchPassword: "",
    },
  });

  const matchType = watch("matchType");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitted Ride:", values);
  
    try {
      const token = localStorage.getItem("token"); 
      const response = await axios.post(
        "http://localhost:8080/api/group-rides",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Group Ride created successfully:", response.data);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Error creating Group Ride:", error);
      alert("An error occurred while creating the group ride.");
    }
  };  

  return (
    <Card className={styles.card}>
      <Card.Header className={styles.cardHeader}>
        <h2>Create a New Group Ride</h2>
      </Card.Header>
      <Card.Body>
        {isSubmitted && (
          <Alert variant="success">
            <CheckCircle2 size={20} /> Group ride created successfully!
          </Alert>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Start Point</Form.Label>
                <InputGroup>
                  <InputGroup.Text><MapPin size={16} /></InputGroup.Text>
                  <Form.Control {...register("startPoint")} placeholder="Enter start point" isInvalid={!!errors.startPoint} />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>End Point</Form.Label>
                <InputGroup>
                  <InputGroup.Text><MapPin size={16} /></InputGroup.Text>
                  <Form.Control {...register("endPoint")} placeholder="Enter end point" isInvalid={!!errors.endPoint} />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Start Time</Form.Label>
                <InputGroup>
                  <InputGroup.Text><Clock size={16} /></InputGroup.Text>
                  <Form.Control type="time" {...register("startTime")} isInvalid={!!errors.startTime} />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Finish Time</Form.Label>
                <InputGroup>
                  <InputGroup.Text><Clock size={16} /></InputGroup.Text>
                  <Form.Control type="time" {...register("finishTime")} isInvalid={!!errors.finishTime} />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control {...register("location")} placeholder="Enter location" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Match Type</Form.Label>
                <Form.Select {...register("matchType")}>
                  <option value="PUBLIC">Public</option>
                  <option value="PRIVATE">Private</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          {matchType === "PRIVATE" && (
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><Lock size={16} /></InputGroup.Text>
                    <Form.Control type="password" {...register("matchPassword")} placeholder="Enter password" />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          )}
          <Button className={styles.submitButton} type="submit">Create Ride</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
