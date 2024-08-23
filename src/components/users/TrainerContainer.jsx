import { useEffect } from "react";
import "../../assets/styles/users/TrainerContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainersData } from "../../redux/users/userThunk";
import { localhostURL } from "../../utils/url";

function TrainerContainer() {
  const dispatch = useDispatch();
  const { trainersData = [], loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchTrainersData());
  }, [dispatch]);

  return (
    <div className="trainer-container">
      <h1 className="gradient-text">Meet Our Trainers</h1>
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
          {trainersData.slice(0, 3).map((trainer, index) => (
            <div className="trainer-img" key={index}>
              <img
                src={`${localhostURL}/${trainer.profileIMG}`}
                alt={trainer.name}
              />
              <div className="trainer-name">{trainer.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default TrainerContainer;
