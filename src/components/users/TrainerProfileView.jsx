import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Image, Col } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import { localhostURL } from '../../utils/url';
import '../../assets/styles/users/TrainerProfileView.css';
import SubscribeButton from './SubscribeButton';

function TrainerProfileView() {
 const [ trainerId, setTrainerId ] = useState('')
  const trainersData = useSelector((state) => state.user.trainersData);

  const trainerDetails = trainersData.find(
    (trainer) => trainer.trainerId === trainerId
  );

  const location = useLocation()
  useEffect(()=> {
    setTrainerId(location.state?.trainerId)
  },[location.state])

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
          <button className="glass-button">Contact</button>
          <button className="glass-button">Follow</button>
          <button className="glass-button">Review</button>
        </Col>
      </div>
      <div className="bottom-sections d-flex">
        <div className="details-section">
          <h3>Trainer Details</h3>
          <p>Name: {trainerDetails.name}</p>
          <p>Achievements: {trainerDetails.achievements}</p>
          <p>Qualification: {trainerDetails.qualification}</p>
          <p>Gender: {trainerDetails.gender}</p>
        </div>
        <div className="media-section text-center">
          <u>
            <h3 className="underlined-heading">Videos & Classes</h3>
          </u>
          <div className="w-100 contents-div">
            <SubscribeButton trainerId={trainerId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerProfileView;
