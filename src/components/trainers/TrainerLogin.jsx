import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  googleLogin,
  trainerLogin,
  forgotOtp,
  forgotEmailSubmit,
  passwordSubmit,
} from "../../redux/trainers/trainerThunk";
import { GoogleLogin } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal, Button, Form } from "react-bootstrap";
import "../../assets/styles/trainers/TrainerLogin.css";
import ResetPasswordModal from "./ResetPasswordModal";

function TrainerLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otpSent, setOtpSent] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { isLoading } = useSelector((state) => state.trainer);
  const [email, setEmail] = useState("");

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
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const emailId = values.email.toLowerCase();
      dispatch(
        trainerLogin({ email: emailId, password: values.password })
      ).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/trainer-console");
        }
      });
    },
  });

  const handleGoogleResponse = (response) => {
    const token = response.credential;
    if (token) {
      dispatch(googleLogin(token)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/trainer-console");
        }
      });
    } else {
      toast.error("Google registration failed");
    }
  };

  const handleForgotPassword = () => {
    handleOpenEmailModal();
  };

  const handleEmailSubmit = () => {
    dispatch(forgotEmailSubmit({ email, otpSent })).then((res) => {
      if (res.payload === true) {
        handleCloseEmailModal();
        handleOpenPasswordModal();
      }
    });
  };

  const handlePasswordSubmit = (values) => {
    dispatch(passwordSubmit({ values, email })).then((res) => {
      if (res.payload.success) {
        toast.success("Reset Password successfully", {
          hideProgressBar: true,
          autoClose: 3000,
        });
        handleClosePasswordModal();
      }
    });
  };

  const handleOtpReq = () => {
    dispatch(forgotOtp(email));
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
            <h3 className="card-title text-center mb-4">Trainer Login</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className={`form-control form-control-glass ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  id="email"
                  placeholder="Enter email"
                  {...formik.getFieldProps("email")}
                  disabled={isLoading}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error-text">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control form-control-glass ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                  id="password"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                  disabled={isLoading}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error-text">{formik.errors.password}</div>
                ) : null}
              </div>
              <p className=" text-end">
                <span
                  onClick={handleForgotPassword}
                  className="text-decoration-underline"
                >
                  Forgot Password?
                </span>{" "}
              </p>

              <button
                type="submit"
                className="btn gradient-blue-white w-50 mx-auto d-block"
                style={{
                  border: "none",
                  color: "white",
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Login"
                )}
              </button>
              <br />
              <div className="d-flex justify-content-center">
                <GoogleLogin
                  onSuccess={handleGoogleResponse}
                  onError={handleGoogleResponse}
                  className="btn"
                />
              </div>
            </form>
            <u className="text-center mt-4" style={{ textDecoration: "none" }}>
              <p>
                <span
                  onClick={() => navigate("/trainer-signup")}
                  style={{ textDecoration: "underline" }}
                >
                  Create an account
                </span>{" "}
                ,{" "}
                <span
                  onClick={() => navigate("/login")}
                  style={{ textDecoration: "underline" }}
                >
                  Login as Client
                </span>
              </p>
            </u>
          </div>
        </div>
        <footer className="text-center admin-footer">
          © 2024 FITFUSION. All rights reserved.
        </footer>

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
              <Form.Group className="mb-3">
                <div className="d-flex">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="custom-placeholder me-2"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Button
                    className="gradient-blue-white-modal"
                    onClick={handleOtpReq}
                  >
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
                  onChange={(e) => setOtpSent(e.target.value)}
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

        <ResetPasswordModal
          show={showPasswordModal}
          handleClose={handleClosePasswordModal}
          handlePasswordSubmit={handlePasswordSubmit}
        />
      </div>
    </>
  );
}

export default TrainerLogin;
