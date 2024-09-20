import { useEffect, useState } from "react";
import { Card, Button, Modal, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const TrainerDeits = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const deit = useSelector((state) => state.user.trainerDiet);
  const handleClose = () => setSelectedPlan(null);
  const handleShow = (plan) => setSelectedPlan(plan);

  return (
    <>
      <div className="diet-plan-cards">
        {deit && deit.length > 0 ? (
          deit.map((plan, index) => (
            <Card
            key={index}
            className="mb-3 text-white"
            style={{ border: "1px solid white", borderRadius: "8px", background: "transparent" }}
          >
            <Card.Body>
              <Card.Title>{plan.dietName}</Card.Title>
              <Button
                className="gradient-blue-white"
                onClick={() => handleShow(plan)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
          
          ))
        ) : (
          <h5 className="text-center text-white mt-5">
            No diet plans are available
          </h5>
        )}
      </div>

      {selectedPlan && (
        <Modal show onHide={handleClose} centered>
          <Modal.Header closeButton className="text-white">
            <Modal.Title>{selectedPlan.dietName}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-white" style={{ color: "#fff" }}>
            <p>{selectedPlan.description}</p>
            {selectedPlan.meals.map((meal, index) => (
              <div key={index}>
                <h5>
                  {meal.mealTime.charAt(0).toUpperCase() +
                    meal.mealTime.slice(1)}
                </h5>
                <ListGroup variant="flush">
                  {meal.items.map((item, itemIndex) => (
                    <ListGroup.Item
                      key={itemIndex}
                      style={{ backgroundColor: "transparent", color: "#fff" }}
                    >
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

export default TrainerDeits;
