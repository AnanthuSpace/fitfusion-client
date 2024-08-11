import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TrainerProtector = ({ children }) => {
  const navigate = useNavigate();
  const trainerToken = sessionStorage.getItem("trainerAccessToken");
  useEffect(() => {
    if (!trainerToken) {
      navigate("/trainer");
    }
  }, [navigate, trainerToken]);

  if (trainerToken) {
    return children;
  }

  return null;
};

export default TrainerProtector;
