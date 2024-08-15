import React, { useState } from "react";
import { Card, Row, Col, Form, InputGroup } from "react-bootstrap";

const trainers = [
  {
    name: "John Doe",
    specialization: "Strength Training",
    image: "/trainer1.jpg", // Replace with the actual image path
  },
  {
    name: "Jane Smith",
    specialization: "Yoga",
    image: "/trainer2.jpg", // Replace with the actual image path
  },
  {
    name: "Michael Johnson",
    specialization: "Cardio",
    image: "/trainer3.jpg", // Replace with the actual image path
  },
  {
    name: "Emily Davis",
    specialization: "Pilates",
    image: "/trainer4.jpg", // Replace with the actual image path
  },
];

function TrainersList() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTrainers = trainers.filter((trainer) =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2 className="text-white">Meet Our Trainers</h2>
        <Form className="d-flex justify-content-center mt-3">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search Trainers"
              value={searchTerm}
              onChange={handleSearch}
              className="bg-dark text-white"
            />
          </InputGroup>
        </Form>
      </div>
      <Row>
        {filteredTrainers.map((trainer, index) => (
          <Col md={4} lg={3} className="mb-4" key={index}>
            <Card className="h-100 text-center" style={{ backgroundColor: "#1c1c1e" }}>
              <Card.Img variant="top" src={trainer.image} alt={trainer.name} />
              <Card.Body>
                <Card.Title className="text-white">{trainer.name}</Card.Title>
                <Card.Text className="text-muted">
                  {trainer.specialization}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default TrainersList;
