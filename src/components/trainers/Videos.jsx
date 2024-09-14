import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Videos = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        width: "98%",
        height: "95%",
        maxHeight: "500px",
        overflowY: "scroll",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <Row xs={1} md={4} className="g-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Col key={idx}>
            <Card className="glass-effect" tyle={{ height: "auto" }}>
              <Card.Img variant="top" src="whychooseus.jpg" />
              <Card.Body className="text-white">
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Videos;
