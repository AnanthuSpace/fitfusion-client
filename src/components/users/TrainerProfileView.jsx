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
import { fetchSingleTrainer } from "../../redux/users/userThunk";
import { toast } from "sonner";

function TrainerProfileView() {
  const [trainerId, setTrainerId] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [trainerDetails, setTrainerDetails] = useState("");
  const [reviewAdded, setReviewAdded] = useState(false);
  const [allReview, setAllReview] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false); 
  const userData = useSelector((state)=>state.user.userData)
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setTrainerId(location.state.trainerId);
  }, [location.state]);

  useEffect(() => {
    dispatch(fetchSingleTrainer({ trainerId: location.state.trainerId })).then((res) =>
      setTrainerDetails(res.payload.data)
    );
  }, [trainerId, dispatch]);

  const handleChat = () => {
    navigate("/user-chat", {
      state: { trainerId: trainerId, trainerName: trainerDetails.name },
    });
  };

  const handleReviewClick = () => {
    console.log(trainerId);
    console.log(userData.subscribeList);
  
    if (userData.subscribeList.includes(trainerId)) {
      setShowReviewModal(true);
    } else {
      toast.warning("You need to subscribe to this trainer before leaving a review.");
    }
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  const onReviewAdded = () => {
    setReviewAdded(!reviewAdded);
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
          src={`${trainerDetails?.profileIMG}`}
          alt={trainerDetails?.name}
          className="profile-image"
        />
        <Col className="icons-container">
          <button className="glass-button" onClick={handleChat}>
            Message
          </button>
          <button className="glass-button" onClick={handleReviewClick}>
            Review
          </button>
        </Col>
      </div>

      <div className="bottom-sections d-flex flex-column glass-effect md-2">
        <div className="row">
          <div className="col-md-4 details-section">
            <h3>Trainer Details</h3>
            <p>Name: {trainerDetails?.name}</p>
            <p>Achievements: {trainerDetails?.achivements}</p>
            <p>Qualification: {trainerDetails?.qualification}</p>
            <p>Experience: {trainerDetails?.experience} year</p>
            <p>Gender: {trainerDetails?.gender}</p>
            <div>
              <span>Rating:</span>
              <StarRating rating={trainerDetails?.rating} />
            </div>
          </div>

          <div className="col-md-8 media-section text-center">
            <div className="subscribe-button-container">
              <SubscribeButton
                trainerId={trainerId}
                trainerName={trainerDetails?.name}
                amount={trainerDetails?.feePerMonth}
                setIsSubscribed={setIsSubscribed} 
              />
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-4 diet-plans-section">
            <h3>Diet Plans</h3>
            <TrainerDeits trainerId={trainerId}/>
          </div>

          <div className="col-md-8 media-section text-center">
            <div className="subscribe-button-container">
              <TrainerReviews trainerId={trainerId} reviewAdded={reviewAdded} />
            </div>
          </div>
        </div>
      </div>

      <ReviewModal
        show={showReviewModal}
        handleClose={handleCloseReviewModal}
        trainerDetails={trainerDetails}
        onReviewAdded={onReviewAdded}
        allReview={allReview}
      />
    </div>
  );
}

export default TrainerProfileView;
