import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  googleSignUp,
  trainerRegistration,
} from "../../redux/trainers/trainerThunk";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/trainers/TrainerLogin.css";
import { toast } from "sonner";

function TrainerSignup() {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [googleToken, setGoogleToken] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isLoading } = useSelector((state) => state.trainer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      trainerRegistration({
        name,
        email,
        password,
        confirmPass,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/trainer-otp");
      }
    });
  };

  const handleGoogleResponse = (response) => {
    if (response.credential) {
      setGoogleToken(response.credential);
      toggleModal();
    } else {
      toast.error("Google registration failed", response);
    }
  };

  const handlePasswordSubmit = () => {
    dispatch(googleSignUp({ token: googleToken, password, confirmPass })).then(
      (result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/trainer-otp");
        }
      }
    );
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <ToastContainer />
      <div className="admin-login-container trainer-gradient-bg">
        <nav className="navbar navbar-light admin-navbar">
          <div className="container">
            <span className="navbar-brand mx-auto admin-navbar-brand text-white">
              FITFUSION
            </span>
          </div>
        </nav>

        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <div className="card p-4 glass-effect admin-login-card">
            <h3 className="card-title text-center mb-4">Sign Up</h3>
            <form>
              <div className="form-group mb-3">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  className="form-control form-control-glass"
                  id="fullName"
                  placeholder="Enter full name"
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control form-control-glass"
                  id="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control form-control-glass"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="confirmPass">Confirm Password</label>
                <input
                  type="password"
                  className="form-control form-control-glass"
                  id="confirmPass"
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPass(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                className="btn gradient-blue-white w-50 mx-auto d-block"
                style={{
                  border: "none",
                  color: "white",
                }}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <div className="mt-4 d-flex flex-column align-items-center">
              <GoogleLogin
                onSuccess={handleGoogleResponse}
                onError={handleGoogleResponse}
                useOneTap
              />
            </div>

            <u>
              <p
                className="mt-4 text-center"
                onClick={() => navigate("/trainer")}
              >
                Already have an account?
              </p>
            </u>
          </div>
        </div>

        <footer className="text-center admin-footer">
          © 2024 FITFUSION. All rights reserved.
        </footer>
      </div>

      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header className="bg-blac text-white">
          <Modal.Title>Enter Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="confirmPass">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPass"
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={toggleModal}>
            Cancel
          </Button>
          <Button
            className="gradient-blue-white"
            onClick={handlePasswordSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TrainerSignup;
