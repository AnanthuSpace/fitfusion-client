import React from "react";
import { FaFlag } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export function Error404() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 text-center bg-white">
      <div>
        <FaFlag className="mb-4" size={80} />
        <h1 className="mt-4 text-dark display-4">
          Error 404 <br /> It looks like something went wrong.
        </h1>
        <p className="mt-4 mb-5 text-muted">
          Don't worry, our team is already on it. Please try refreshing the page
          or come back later.
        </p>
        <button onClick={handleGoBack} className="btn btn-secondary px-4">
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Error404;
