import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { fetchReviewFeedback } from "../../redux/users/userThunk";
import StarRating from "./StarRating";

function TrainerReviews({ trainerId }) {
  const [reviews, setReviews] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviewFeedback({ trainerId })).then((res) => {
      setReviews(res.payload.review || []);
    });
  }, [dispatch, trainerId]);

  return (
    <div className="reviews-container" style={{ width: "100%" }}>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <Card
            key={review.id || index}
            className="review-card glass-effect text-white"
            style={{ height: "auto" }}
          >
            <Card.Body>
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <Card.Title>{review.userName}</Card.Title>
                  <div>
                    <span>Rating:</span> <StarRating rating={review.rating} />
                  </div>
                </div>
                <div className="ms-4 flex-grow-1 text-start">
                  <Card.Text>{review.feedback}</Card.Text>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
}

export default TrainerReviews;