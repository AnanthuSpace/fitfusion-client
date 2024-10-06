import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Rating from "react-rating";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { addReview, fetchUserAndTrainer } from "../../redux/users/userThunk";

const ReviewModal = ({ show, handleClose, trainerDetails, allReview }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const userName = useSelector((state) => state.user.userData.name);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review submitted:", review, "Rating:", rating);
    let reviewDetails = {
      userName: userName,
      rating: rating,
      feedback: review,
    };
    dispatch(addReview({ trainerId: trainerDetails.trainerId, reviewDetails, curruntRating: trainerDetails.rating, reviewCount: allReview.length }))
      .then((res) => {
        setRating(res.payload);
        dispatch(fetchUserAndTrainer());
      });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-white">
          Review {trainerDetails.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="reviewForm">
            <Form.Label>Write your review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group
            controlId="ratingForm"
            className="mt-3 d-flex flex-column align-items-center"
          >
            <Form.Label>Rating</Form.Label>
            <Rating
              initialRating={rating}
              emptySymbol={<span className="star">&#9734;</span>}  
              fullSymbol={<span className="star" style={{ color: '#FFD700' }}>&#9733;</span>} 
              onChange={(value) => setRating(value)} 
              style={{ fontSize: "30px" }}
            />
          </Form.Group>
          <Button type="submit" className="mt-3 gradient-button-global">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewModal;
