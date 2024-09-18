import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TrainerLoginProtector({ children }) {
  const navigate = useNavigate(); 
  const trainerToken = sessionStorage.getItem("trainerAccessToken");
  useEffect(() => {
    if (trainerToken) {
      navigate("/trainer-console");
    }
  }, [navigate, trainerToken]);

  if (!trainerToken) {
    return children; 
  }

  return null;
}

export default TrainerLoginProtector;
