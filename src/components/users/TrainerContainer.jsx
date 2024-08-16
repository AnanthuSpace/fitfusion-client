import { useState, useEffect } from "react";
import "../../assets/styles/users/TrainerContainer.css";
import { localhostURL } from "../../utils/url";
import axios from "axios";

function TrainerContainer() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(`${localhostURL}/fetch-trainers`);
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <div className="trainer-container">
      <h1>Meet Our Trainers</h1>
      <p>
        When picking a gym, consider its amenities like guest access, hours,
        location,
        <br />
        and extra benefits to enhance your experience.
      </p>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="trainer-div">
          {trainers.slice(0, 3).map((trainer, index) => (
            <div className="trainer-img" key={index}>
              <img src={`${localhostURL}/${trainer.profileIMG}`} alt={trainer.name} />
              <div className="trainer-name">{trainer.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrainerContainer;
