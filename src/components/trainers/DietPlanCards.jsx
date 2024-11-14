import React, { useState, useEffect } from "react";
import { Card, Button, Modal, ListGroup, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchDeitPlans, deletDiet, updateDietPlan } from "../../redux/trainers/trainerThunk";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";

const DietPlanCards = ({ newplan, setNewPlan }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [diet, setDiet] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const dispatch = useDispatch();

  const handleClose = () => setSelectedPlan(null);
  const handleCloseDelete = () => setShowDeleteModal(false);
  const handleCloseEdit = () => setShowEdit(false);

  const handleShow = (plan) => setSelectedPlan(plan);

  useEffect(() => {
    dispatch(fetchDeitPlans()).then((res) => {
      let arr = res.payload.data.diet;
      setDiet(arr);
      setNewPlan(false);
    });
  }, [dispatch, newplan]);

  const handleDelete = (dietId) => {
    dispatch(deletDiet(dietId)).then((res) => {
      if (res.payload.success) {
        setDiet((prevDiet) => prevDiet.filter((plan) => plan._id !== dietId));
        setShowDeleteModal(false);
      }
    });
  };

  const handleDeleteClick = (plan) => {
    setPlanToDelete(plan);
    setShowDeleteModal(true);
  };

  const handleEditClick = (plan) => {
    setSelectedPlan(plan);
    setShowEdit(true);
  };

  const validationSchema = Yup.object({
    dietName: Yup.string().required("Diet Name is required"),
    description: Yup.string().required("Description is required"),
    meals: Yup.array().of(
      Yup.object({
        mealTime: Yup.string().required("Meal time is required"),
        items: Yup.array().of(Yup.string().required("Item is required")),
      })
    ),
  });

  const handleEditSave = (values) => {
    dispatch(updateDietPlan(values)).then((res) => {
      if (res.payload.success) {
        setDiet((prevDiet) =>
          prevDiet.map((plan) => (plan._id === values._id ? values : plan))
        );
        setShowEdit(false);
      }
    });
  };

  return (
    <>
      <div className="diet-plan-cards">
        {diet && diet.length > 0 ? (
          diet.map((plan) => (
            <Card
              key={plan._id}
              className="mb-3 glass-effect"
              style={{ color: "#fff", borderRadius: "8px" }}
            >
              <Card.Body>
                <Card.Title>{plan.dietName}</Card.Title>
                <Card.Text>{plan.description.substring(0, 100)}...</Card.Text>
                <Button className="gradient-blue-white" onClick={() => handleShow(plan)}>
                  View Details
                </Button>
                <Button
                  className="gradient-red-white"
                  onClick={() => handleDeleteClick(plan)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </Button>
                <Button
                  className="gradient-red-white"
                  onClick={() => handleEditClick(plan)}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
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
        <Modal show onHide={handleClose} centered backdrop="static" contentClassName="p-0" className="text-white">
          <Modal.Header style={{ backgroundColor: "black", borderBottom: "none" }}>
            <Modal.Title>{selectedPlan.dietName}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-white" style={{ backgroundColor: "black", borderBottom: "none" }}>
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
          <Modal.Footer style={{ backgroundColor: "black", borderTop: "none" }}>
            <Button className="gradient-red-white" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} centered onHide={handleCloseDelete} backdrop="static">
        <Modal.Header style={{ backgroundColor: "black", borderBottom: "none" }}>
          <Modal.Title className="w-100 text-center text-white">Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "black", color: "white" }}>
          Are you sure you want to delete this diet plan?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "black", borderTop: "none", justifyContent: "space-between" }}>
          <Button variant="secondary" onClick={handleCloseDelete} className="gradient-blue-white">
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(planToDelete._id)} className="gradient-red-white">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal with Formik and Yup */}
      {showEdit && selectedPlan && (
        <Modal show={showEdit} centered onHide={handleCloseEdit} backdrop="static">
          <Modal.Header>
            <Modal.Title className="text-white">Edit Diet Plan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={selectedPlan}
              validationSchema={validationSchema}
              onSubmit={handleEditSave}
            >
              {({ values }) => (
                <FormikForm>
                  <Form.Group>
                    <Form.Label>Diet Name</Form.Label>
                    <Field name="dietName" className="form-control" />
                    <ErrorMessage name="dietName" component="div" className="text-danger" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Field name="description" as="textarea" rows={3} className="form-control" />
                    <ErrorMessage name="description" component="div" className="text-danger" />
                  </Form.Group>
                  {values.meals.map((meal, mealIndex) => (
                    <div key={mealIndex} className="mb-3">
                      <h5>{meal.mealTime.charAt(0).toUpperCase() + meal.mealTime.slice(1)}</h5>
                      <Field name={`meals[${mealIndex}].mealTime`} className="form-control" />
                      <ErrorMessage name={`meals[${mealIndex}].mealTime`} component="div" className="text-danger" />
                      {meal.items.map((item, itemIndex) => (
                        <Form.Group key={itemIndex}>
                          <Field name={`meals[${mealIndex}].items[${itemIndex}]`} className="form-control" />
                          <ErrorMessage
                            name={`meals[${mealIndex}].items[${itemIndex}]`}
                            component="div"
                            className="text-danger"
                          />
                        </Form.Group>
                      ))}
                    </div>
                  ))}
                  <Modal.Footer>
                    <Button className="gradient-red-white" onClick={handleCloseEdit}>
                      Cancel
                    </Button>
                    <Button type="submit" className="gradient-blue-white">
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </FormikForm>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default DietPlanCards;
