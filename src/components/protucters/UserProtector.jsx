import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const UserProtector = ({ children }) => {
  const navigate = useNavigate();
  const userToken = sessionStorage.getItem("userAccessToken");

  useEffect(() => {
    if (!userToken) {
      toast.warning("Please log in to access this page.");
      navigate("/login");
    }
  }, [navigate, userToken]);

  if (userToken) {
    return children;
  }

  return (
    <>
      <Toaster />
    </>
  );
};

export default UserProtector;
