import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Image, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { localhostURL } from "../../utils/url";
import "../../assets/styles/users/TrainerProfileView.css";
import SubscribeButton from "./SubscribeButton";
import TrainerDeits from "./TrainerDeits";

function TrainerProfileView() {
  const [TrainerId, setTrainerId] = useState("");
  const trainersData = useSelector((state) => state.user.trainersData);
  const navigate = useNavigate();
  const location = useLocation()

  const trainerDetails = trainersData.find(
    (trainer) => trainer.trainerId === TrainerId
  );

  useEffect(() => {  
    setTrainerId(location.state.trainerId);
  }, [location.state]);

  const handleChat = () => {
    navigate("/user-chat", { state: {trainerId: TrainerId, trainerName: trainerDetails.name }});
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
          <button className="glass-button" onClick={()=>handleChat({trainerId: TrainerId, trainerName: trainerDetails.name })}>
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

        <div className="diet-plans-section glass-effect">
          <h3>Diet Plans</h3>
          <TrainerDeits/>
        </div>

        <div className="media-section text-center glass-effect">
          <div className="w-100 contents-div">
            <SubscribeButton trainerId={TrainerId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerProfileView;
