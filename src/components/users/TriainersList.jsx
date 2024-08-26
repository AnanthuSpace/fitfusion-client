import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form, InputGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { localhostURL } from "../../utils/url";

function TrainersList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const trainersData = useSelector((state) => state.user.trainersData);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleCardClick = (trainerId) => {
    navigate(`/trainer-view`, {state: {trainerId: trainerId}});
  };

  const filteredTrainers = trainersData.filter((trainer) =>
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
        <h2 className="gradient-text">Meet Our Trainers</h2>
        <Form className="d-flex justify-content-center mt-3">
          <InputGroup  style={{ border: "1px solid #b249f8", borderRadius: "1rem"}}>
            <Form.Control
              type="text"
              placeholder="Search Trainers"
              value={searchTerm}
              onChange={handleSearch}
              className="text-white ms-2 me-2"
            />
          </InputGroup>
        </Form>
      </div>
      <div
        style={{
          maxHeight: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <Row>
          {filteredTrainers.map((trainer) => (
            <Col md={4} lg={3} className="mb-4" key={trainer.trainerId}>
              <Card
                className="h-100 text-center glass-card"
                onClick={() => handleCardClick(trainer.trainerId)}
              >
                <Card.Img
                  variant="top"
                  src={`${localhostURL}/${trainer.profileIMG}`}
                  alt={trainer.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src = "/path/to/default/profile-icon.jpg";
                  }}
                />
                <Card.Body>
                  <Card.Title className="text-white">{trainer.name}</Card.Title>
                  <Card.Text className="text-white">
                    {trainer.achivements || "No specialization"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <style>{`
  /* WebKit browsers (Chrome, Safari) */
  div::-webkit-scrollbar {
    width: 12px;
    background-color: transparent;
  }

  div::-webkit-scrollbar-thumb {
    background-color: #b249f8;
    border-radius: 10px;
  }

  /* Firefox */
  div {
    scrollbar-width: thin;
    scrollbar-color: #b249f8 transparent;
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`}</style>
    </div>
  );
}

export default TrainersList;
