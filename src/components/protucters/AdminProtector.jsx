import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtector = ({ children }) => {
  const navigate = useNavigate();
  const adminToken = sessionStorage.getItem("adminAccessToken");

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin");
    }
  }, [navigate, adminToken]);

  if (adminToken) {
    return children;
  }
  return null;
};

export default AdminProtector;
