import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TrainerIsVerified = ({ children }) => {
  const verified = useSelector((state) => state.trainer.trainerData.verified);
  const navigate = useNavigate();

  useEffect(() => {
    if (verified !== "verified") {
      toast.warning("Please wait for verification", { duration: 3000 });
      navigate("/trainer-profile");
    }
  }, [navigate, verified]);

  if (verified === "verified") {
    return children;
  }

  return null;
};

export default TrainerIsVerified;
