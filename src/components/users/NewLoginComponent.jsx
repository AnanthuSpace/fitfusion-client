import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import "../../assets/styles/users/NewLogin.css";
import { forgotEmailSubmit, googleLoginUser, userLogin } from "../../redux/users/userThunk";
import { Modal, Button, Form } from "react-bootstrap";

const NewLoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleOpenEmailModal = () => setShowEmailModal(true);
  const handleCloseEmailModal = () => setShowEmailModal(false);
  const handleOpenPasswordModal = () => setShowPasswordModal(true);
  const handleClosePasswordModal = () => setShowPasswordModal(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const emailId = values.email.toLowerCase();
      try {
        const result = await dispatch(
          userLogin({ email: emailId, password: values.password })
        );
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleGoogleResponse = (response) => {
    const token = response.credential;
    if (token) {
      dispatch(googleLoginUser(token)).then((response) => {
        if (response.meta.requestStatus !== "rejected") {
          navigate("/");
        }
      });
    }
  };

  const handleForgotPassword = () => {
    handleOpenEmailModal();
  };

  const handleEmailSubmit = () => {
    dispatch(forgotEmailSubmit())
    handleCloseEmailModal();
    handleOpenPasswordModal();
  };

  const handlePasswordSubmit = () => {
    handleClosePasswordModal();
    // Process the new password submission
  };

  return (
    <div className="new-page background-gradient-main">
      <div className="new-nav-bar">
        <div className="new-logo">
          <h1 className="gradient-text">FitFusion</h1>
        </div>
        <div className="new-nav-list">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="new-btns">
          <div className="new-signin-btn" onClick={() => navigate("/login")}>
            Sign in
          </div>
          <div className="new-new-btn" onClick={() => navigate("/signup")}>
            Sign Up
          </div>
        </div>
      </div>

      <div className="new-body-container">
        <div className="new-heading ">
          <span className="gradient-text fw-bold">Welcome Back</span>
          <h2 className="pt-4">Perfect Fitness App</h2>
          <p>
            Let's continue your fitness journey! Log in to access personalized{" "}
            <br /> plans and track your progress.
          </p>
        </div>
        <div className="new-newform">
          <h2 className="gradient-text">Log In</h2>
          <form onSubmit={formik.handleSubmit} className="form-style pt-1">
            <input
              type="text"
              className="new-input-text"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}

            <input
              type="password"
              className="new-input-text"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}

            {!isLoading ? (
              <button type="submit" className="new-join">
                Login
              </button>
            ) : (
              <button className="new-join" disabled>
                Loading...
              </button>
            )}
          </form>
          <p className="pt-2">
            By continuing, you agree to accept our privacy policy & Terms of
            Service.
          </p>
          OR
          <div className="mt-2 d-flex flex-column align-items-center">
            <GoogleLogin
              onSuccess={handleGoogleResponse}
              onFailure={handleGoogleResponse}
              useOneTap
            />
          </div>
          <p className="new-allready pt-3">
            Don't have an account?{" "}
            <span className="text-decoration-underline" onClick={() => navigate("/signup")}>Sign Up </span>
            {" "} ,{" "}
            <span
              onClick={handleForgotPassword}
              className="text-decoration-underline"
            >
              Forgot Password?
            </span>
          </p>
          <p className="new-allready pt-1" onClick={() => navigate("/trainer")}>
            Are you a Trainer? <span>Sign in</span>
          </p>
        </div>
      </div>

      {/* Email and OTP Modal */}
      <Modal
  show={showEmailModal}
  onHide={handleCloseEmailModal}
  centered
  contentClassName="p-0"
  className="text-white"
>
  <Modal.Header
    style={{ backgroundColor: "black", borderBottom: "none" }}
  >
    <Modal.Title className="w-100 text-center text-white">
      Forgot Password
    </Modal.Title>
  </Modal.Header>
  <Modal.Body style={{ backgroundColor: "black", color: "white" }}>
    <Form style={{ borderBottom: "none" }}>
      {/* Email input and Send button on the same row */}
      <Form.Group className="mb-3">
        <div className="d-flex">
          <Form.Control
            type="email"
            placeholder="Enter your email"
            required
            className="custom-placeholder me-2"
          />
          <Button className="gradient-blue-white-modal">
            Send
          </Button>
        </div>
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the OTP"
          required
          className="custom-placeholder"
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer style={{ backgroundColor: "black", borderTop: "none" }}>
    <Button
      className="gradient-red-white me-1"
      onClick={handleCloseEmailModal}
    >
      Cancel
    </Button>
    <Button className="gradient-blue-white" onClick={handleEmailSubmit}>
      Submit
    </Button>
  </Modal.Footer>
</Modal>


      {/* New Password Modal */}
      <Modal
        show={showPasswordModal}
        onHide={handleClosePasswordModal}
        centered
        contentClassName="p-0"
        className="text-white"
        z
      >
        <Modal.Header
          style={{ backgroundColor: "black", borderBottom: "none" }}
        >
          <Modal.Title className="w-100 text-center text-white">
            Reset Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "black", color: "white" }}>
          <Form style={{ borderBottom: "none" }}>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                required
                className="custom-placeholder"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                required
                className="custom-placeholder"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "black", borderTop: "none" }}>
          <Button
            className="gradient-red-white me-1"
            onClick={handleClosePasswordModal}
          >
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
    </div>
  );
};

export default NewLoginComponent;
