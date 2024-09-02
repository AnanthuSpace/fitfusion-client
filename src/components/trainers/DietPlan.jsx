import React, { useState } from 'react';
import DietPlanCards from './DietPlanCards';
import AddDietForm from './AddDietForm';
import { Container, Row, Col } from 'react-bootstrap';

const DietPlan = () => {
  const [dietPlans, setDietPlans] = useState([]);

  const handleAddDietPlan = (newDietPlan) => {
    setDietPlans([...dietPlans, newDietPlan]);
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Row>
        <Col md={8}>
          <DietPlanCards dietPlans={dietPlans} />
        </Col>
        <Col md={4}>
          <AddDietForm onAddDietPlan={handleAddDietPlan} />
        </Col>
      </Row>
    </Container>
  );
};

export default DietPlan;
