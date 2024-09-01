import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { localhostURL } from "../../utils/url";
import "../../assets/styles/users/TrainerProfileView.css";
import SubscribeButton from "./SubscribeButton";
import { fetchChatMessages } from "../../redux/users/userThunk";

function TrainerProfileView() {
  const [trainerId, setTrainerId] = useState("");
  const trainersData = useSelector((state) => state.user.trainersData);
  const user = useSelector((state) => state.user.userData);
  const isSubscribed = user?.subscribeList?.includes(trainerId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()

  const trainerDetails = trainersData.find(
    (trainer) => trainer.trainerId === trainerId
  );

  useEffect(() => {
    setTrainerId(location.state?.trainerId);
  }, [location.state]);

  const handleChat = () => {
    if (trainerDetails) {
      dispatch(
        fetchChatMessages({
          userId: user.userId,
          trainerId: trainerId,
          isSubscribed,
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          const sortedChatMessages = res.payload.sort((a, b) => new Date(b.time) - new Date(a.time));
          navigate("/user-chat", { state: { chatMessages: sortedChatMessages } });
        }
      });
    }
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
          src={`${localhostURL}/${trainerDetails.profileIMG}`}
          alt={trainerDetails.name}
          className="profile-image"
        />

        <Col className="icons-container">
          <button className="glass-button" onClick={handleChat}>
            Message
          </button>
          <button className="glass-button">Follow</button>
          <button className="glass-button">Review</button>
        </Col>
      </div>

      <div className="bottom-sections d-flex">
        {/* Trainer Details Section */}
        <div className="details-section glass-effect">
          <h3>Trainer Details</h3>
          <p>Name: {trainerDetails.name}</p>
          <p>Achievements: {trainerDetails.achivements}</p>
          <p>Qualification: {trainerDetails.qualification}</p>
          <p>Gender: {trainerDetails.gender}</p>
        </div>

        {/* Diet Plans Section */}
        <div className="diet-plans-section glass-effect">
          <h3>Diet Plans</h3>
          {trainerDetails.dietPlans && trainerDetails.dietPlans.length > 0 ? (
            <ul>
              {trainerDetails.dietPlans.map((plan, index) => (
                <li key={index}>
                  <h5>{plan.title}</h5>
                  <p>{plan.description}</p>
                  {/* Add more details as needed */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No diet plans available</p>
          )}
        </div>

        {/* Media Section with Subscription Button */}
        <div className="media-section text-center glass-effect">
          <div className="w-100 contents-div">
            <SubscribeButton trainerId={trainerId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerProfileView;
