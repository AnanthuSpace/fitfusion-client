import React from 'react'

const AdminLoginProtector = ({ children}) => {
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
}

export default AdminLoginProtector