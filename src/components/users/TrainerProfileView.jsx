import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Col, Tab, Tabs } from "react-bootstrap";
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
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setTrainerId(location.state.trainerId);
  }, [location.state]);

  useEffect(() => {
    dispatch(fetchSingleTrainer({ trainerId })).then((res) =>
      setTrainerDetails(res.payload.data)
    );
  }, [trainerId, dispatch]);

  const handleChat = () => {
    navigate("/user-chat", {
      state: { trainerId, trainerName: trainerDetails.name },
    });
  };

  const handleReviewClick = () => {
    if (userData?.subscribeList) {
      if (userData?.subscribeList.includes(trainerId)) {
        setShowReviewModal(true);
      } else {
        toast.warning(
          "You need to subscribe to this trainer before leaving a review."
        );
      }
    } else {
      toast.warning(
        "You need to subscribe to this trainer before leaving a review."
      );
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

      <div className="bottom-sections d-flex flex-column md-2">
        <div className="row">
          <div className="col-md-3 details-section">
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

          <div className="col-md-9 media-section text-center">
            <Tabs defaultActiveKey="videos" id="trainer-profile-tabs">
              <Tab eventKey="videos" title="Videos">
                <div className="subscribe-button-container">
                  <SubscribeButton
                    trainerId={trainerId}
                    trainerName={trainerDetails?.name}
                    amount={trainerDetails?.feePerMonth}
                  />
                </div>
              </Tab>

              <Tab
                eventKey="diets"
                title="Diets"
                className="mt-5 diet-main-div"
              >
                <TrainerDeits trainerId={trainerId} />
              </Tab>

              <Tab eventKey="feedback" title="Feedback">
                <TrainerReviews
                  trainerId={trainerId}
                  reviewAdded={reviewAdded}
                />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>

      <ReviewModal
        show={showReviewModal}
        handleClose={handleCloseReviewModal}
        trainerDetails={trainerDetails}
        onReviewAdded={onReviewAdded}
      />
    </div>
  );
}

export default TrainerProfileView;
