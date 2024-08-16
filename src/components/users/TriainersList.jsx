import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, InputGroup, Spinner } from "react-bootstrap";
import axios from "axios";
import { localhostURL } from "../../utils/url";

function TrainersList() {
  const [trainers, setTrainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(`${localhostURL}/fetch-trainers`);
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
        setError("Failed to load trainers");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTrainers = trainers.filter((trainer) =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-4 text-danger">{error}</div>;
  }

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
            <Card
              className="h-100 text-center"
              style={{ backgroundColor: "#1c1c1e" }}
            >
              <Card.Img
                variant="top"
                src={`${localhostURL}/${trainer.profileIMG}`}
                alt={trainer.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
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
