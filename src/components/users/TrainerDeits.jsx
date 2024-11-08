import { useEffect, useState } from "react";
import { Card, Button, Modal, ListGroup, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeitPlans } from "../../redux/users/userThunk";

const TrainerDeits = ({ trainerId }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [diet, setDiet] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (trainerId) {
      dispatch(fetchDeitPlans({ trainerId })).then((res) =>
        setDiet(res.payload)
      );
    }
  }, [trainerId, dispatch]);

  const handleClose = () => setSelectedPlan(null);
  const handleShow = (plan) => setSelectedPlan(plan);

  const isSubscribed = user?.subscribeList?.includes(trainerId);

  return (
    <>
      {!isSubscribed ? (
        <h5 className="text-center text-white mt-5">
          Please subscribe to access the diet plans.
        </h5>
      ) : (
        <Row className="text-start">
          {diet && diet.length > 0 ? (
            diet.map((plan, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <Card
                  className="text-white h-100 background-gradient-main"
                  style={{
                    border: "1px solid white",
                    borderRadius: "8px",
                    background: "transparent",
                  }}
                >
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{plan?.dietName}</Card.Title>
                    <Card.Text>
                      {plan?.description?.length > 15
                        ? `${plan.description.substring(0, 45)}...`
                        : plan.description}
                    </Card.Text>

                    <p
                      onClick={() => handleShow(plan)}
                      className="mt-2 mb-0 text-decoration-underline small"
                      style={{ cursor: "pointer", alignSelf: "flex-end" }}
                    >
                      View Details
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <h5 className="text-center text-white mt-5">
              No diet plans are available
            </h5>
          )}
        </Row>
      )}

      {selectedPlan && (
        <Modal show onHide={handleClose} centered>
          <Modal.Header
            closeButton
            className="text-white"
            style={{ background: "#333" }}
          >
            <Modal.Title>{selectedPlan.dietName}</Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="text-white"
            style={{
              background: "#222",
              color: "#fff",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            <p>{selectedPlan.description}</p>
            {selectedPlan.meals.map((meal, index) => (
              <div key={index} className="mb-3">
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
          <Modal.Footer style={{ background: "#333" }}>
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
