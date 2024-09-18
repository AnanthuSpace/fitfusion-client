import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/users/TrainerProfileView.css";
import SubscribeButton from "./SubscribeButton";
import TrainerDeits from "./TrainerDeits";
import ReviewModal from "./ReviewModal";
import StarRating from "./StarRating";
import TrainerReviews from "./TrainerReviews";

function TrainerProfileView() {
  const [TrainerId, setTrainerId] = useState("");
  const [allReview, setAllReview] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const trainersData = useSelector((state) => state.user.trainersData);
  const navigate = useNavigate();
  const location = useLocation();

  const trainerDetails = trainersData.find(
    (trainer) => trainer.trainerId === TrainerId
  );

  useEffect(() => {
    setTrainerId(location.state.trainerId);
  }, [location.state]);

  const handleChat = () => {
    navigate("/user-chat", {
      state: { trainerId: TrainerId, trainerName: trainerDetails.name },
    });
  };

  const handleReviewClick = () => {
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  if (!trainerDetails) {
    return <div className="text-center mt-5">Trainer not found</div>;
  }

  return (
    <div className="container-div">
      <div className="background-container">
        <Image
          src="/purple.jpg"
          alt="Background"
          className="background-image"
        />
        <img
          src={`${trainerDetails.profileIMG}`}
          alt={trainerDetails.name}
          className="profile-image"
        />
        <Col className="icons-container">
          <button className="glass-button" onClick={handleChat}>
            Message
          </button>
          <button className="glass-button" onClick={handleReviewClick}>
            Review
          </button>
          <button className="glass-button">Follow</button>
        </Col>
      </div>

      <div className="bottom-sections d-flex flex-column glass-effect md-2">
        <div className="row">
          <div className="col-md-4 details-section">
            <h3>Trainer Details</h3>
            <p>Name: {trainerDetails.name}</p>
            <p>Achievements: {trainerDetails.achivements}</p>
            <p>Qualification: {trainerDetails.qualification}</p>
            <p>Experience: {trainerDetails.experience} year</p>
            <p>Gender: {trainerDetails.gender}</p>
            <div>
              <span>Rating:</span>
              <StarRating rating={trainerDetails.rating} />
            </div>
          </div>

          <div className="col-md-8 media-section text-center">
            <div className="subscribe-button-container">
              <SubscribeButton trainerId={TrainerId} />
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-4 diet-plans-section">
            <h3>Diet Plans</h3>
            <TrainerDeits />
          </div>

          <div className="col-md-8 media-section text-center">
            <div className="subscribe-button-container">
              <TrainerReviews trainerId={TrainerId} />
            </div>
          </div>
        </div>
      </div>

      <ReviewModal
        show={showReviewModal}
        handleClose={handleCloseReviewModal}
        trainerDetails={trainerDetails}
        allReview={allReview}
      />
    </div>
  );
}

export default TrainerProfileView;
