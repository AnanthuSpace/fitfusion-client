import React from "react";
import { useSelector } from "react-redux";
import { Container, Image, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { localhostURL } from "../../utils/url";
import "../../assets/styles/users/TrainerProfileView.css";

function TrainerProfileView() {
  const { trainerId } = useParams();
  const trainersData = useSelector((state) => state.user.trainersData);

  const trainerDetails = trainersData.find(
    (trainer) => trainer.trainerId === trainerId
  );

  if (!trainerDetails) {
    return <div className="text-center mt-5">Trainer not found</div>;
  }

  return (
    <Container fluid className="container">
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
          <button className="glass-button">Comment</button>
          <button className="glass-button">Like</button>
          <button className="glass-button">Rate</button>
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
          <u><h3 className="underlined-heading">Videos & Classes</h3></u>
          <div className="w-100 contents-div">
          <button class="glass-button">Subscribe for the Content</button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default TrainerProfileView;
