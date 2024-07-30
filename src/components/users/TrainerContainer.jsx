import React from "react";
import "../../assets/styles/TrainerContainer.css";

function TrainerContainer() {
  return (
    <>
      <div className="trainer-container">
        <h1>Meet Our Trainers</h1>
        <p>
          When picking a gym, consider its amenities like guest access, hours,
          location,
          <br />
          and extra benefits to enhance your experience.
        </p>
        <div className="trainer-div">
          <div className="trainer-img">
            <img src="./vladimir-shmondenko-anatoly.webp" alt="Trainer 1" />
            <div className="trainer-name">V S Anatoly</div>
          </div>
          <div className="trainer-img">
            <img src="./georges-st-pierre.webp" alt="Trainer 2" />
            <div className="trainer-name">GSP</div>
          </div>
          <div className="trainer-img">
            <img src="./Cbum.jpg" alt="Trainer 3" />
            <div className="trainer-name">CBum</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrainerContainer;
