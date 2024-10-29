import React, { useState } from "react";
import DietPlanCards from "./DietPlanCards";
import AddDietForm from "./AddDietForm";
import { Container, Row, Col } from "react-bootstrap";

const DietPlan = () => {
  const [newPlan, setNewPlan] = useState(false);

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col md={8}>
          <DietPlanCards newplan={newPlan} />
        </Col>
        <Col md={4}>
          <AddDietForm setNewPlan={setNewPlan}/>
        </Col>
      </Row>
    </Container>
  );
};

export default DietPlan;
