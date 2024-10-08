import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDeitPlans } from '../../redux/trainers/trainerThunk';

const DietPlanCards = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [ diet, setDiet] = useState([])
  const dispatch = useDispatch();

  const handleClose = () => setSelectedPlan(null);
  const handleShow = (plan) => setSelectedPlan(plan);

  useEffect(() => {
    dispatch(fetchDeitPlans())
    .then((res)=>{
      let arr = res.payload.data.diet
      setDiet(arr)
    }
    )
  }, [dispatch]);

  return (
    <>
      <div className="diet-plan-cards">
        {diet && diet.length > 0 ? (
          diet.map((plan, index) => (
            <Card 
              key={index} 
              className="mb-3 glass-effect" 
              style={{ color: '#fff', borderRadius: '8px' }}
            >
              <Card.Body>
                <Card.Title>{plan.dietName}</Card.Title>
                <Button 
                  className='gradient-blue-white' 
                  onClick={() => handleShow(plan)}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <h3 className="text-center text-white mt-5">
            No diet plans are found. Please add some.
          </h3>
        )}
      </div>

      {selectedPlan && (
        <Modal show onHide={handleClose} centered>
          <Modal.Header closeButton className='text-white'>
            <Modal.Title>{selectedPlan.dietName}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-white" style={{ color: '#fff' }}>
            <p>{selectedPlan.description}</p>
            {selectedPlan.meals.map((meal, index) => (
              <div key={index}>
                <h5>{meal.mealTime.charAt(0).toUpperCase() + meal.mealTime.slice(1)}</h5>
                <ListGroup variant="flush">
                  {meal.items.map((item, itemIndex) => (
                    <ListGroup.Item key={itemIndex} style={{ backgroundColor: 'transparent', color: '#fff' }}>
                      {item}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default DietPlanCards;
