import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { GoogleLogin } from "@react-oauth/google";
import { googleSignUpUser, registration } from "../../redux/users/userThunk";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/users/Signup.css";

function Signup() {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [googleToken, setGoogleToken] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const handleSubmit = async () => {
    dispatch(
      registration({
        name,
        email,
        password,
        confirmPass,
        toast,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/verify-otp");
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
    dispatch(googleSignUpUser({ token: googleToken, password, confirmPass })).then(
      (result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/");
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
      <div className="signup-page background-gradient-main">
        <div className="signup-nav-bar">
          <div className="signup-logo">
            <h1 className="gradient-text">FitFusion</h1>
          </div>
          <div className="signup-nav-list">
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="signup-btns">
            <div
              className="signup-signin-btn"
              onClick={() => navigate("/login")}
            >
              Sign in
            </div>
            <div
              className="signup-signup-btn"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </div>
          </div>
        </div>

        <div className="signup-body-container">
          <div className="signup-heading">
            <span className="gradient-text ">
              Let’s build <br /> the physical you
            </span>
            <h2>Perfect Fitness App</h2>
            <p>
              Why sir end believe uncivil respect. Always get <br />
              adieus nature day course for common. My little <br />
              garret repair to desire he esteem.
            </p>
          </div>
          <div className="signup-signupform">
            <h2 className="gradient-text">Sign Up</h2>
            <input
              type="text"
              className="signup-input-text"
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              className="signup-input-text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="signup-input-text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="signup-input-text"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            {!isLoading ? (
              <button className="signup-join" onClick={handleSubmit}>
                Join
              </button>
            ) : (
              <button className="signup-join" disabled>
                Loading...
              </button>
            )}
            <p>
              By continuing, you agree to accept our <br />
              privacy policy & Terms of Service.
            </p>
            OR
            <div className="mt-4 d-flex flex-column align-items-center">
              <GoogleLogin
                onSuccess={handleGoogleResponse}
                onError={handleGoogleResponse}
                useOneTap
              />
            </div>
            <p className="signup-allready" onClick={() => navigate("/login")}>
              Already have an account?
            </p>
          </div>
        </div>
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
            className="gradient-button-global"
            onClick={handlePasswordSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Signup;
