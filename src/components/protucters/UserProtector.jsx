import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtector = ({ children }) => {
  const navigate = useNavigate();
  const userToken = sessionStorage.getItem("userAccessToken");

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, [navigate, userToken]);

  if (userToken) {
    return children;
  }

  return null;
};

export default UserProtector;
