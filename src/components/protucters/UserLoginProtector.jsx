import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLoginProtector = ({ children }) => {
  const navigate = useNavigate();
  const userToken = sessionStorage.getItem("userAccessToken");

  useEffect(() => {
    if (!userToken) {
      navigate("/");
    }
  }, [navigate, userToken]);

  if (userToken) {
    return children;
  }

  return null;
};

export default UserLoginProtector;
