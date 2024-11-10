import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "../../assets/styles/users/NewLogin.css";
import { userLogin } from "../../redux/users/userThunk";

const NewLoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

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
        const result = await dispatch(userLogin({ email: emailId, password: values.password }));
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleGoogleResponse = (response) => {
    console.log("Google login response:", response);
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
            Let's continue your fitness journey! Log in to access personalized <br /> plans and track your progress.
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
              <button type="submit" className="new-join">Login</button>
            ) : (
              <button className="new-join" disabled>Loading...</button>
            )}
          </form>
          <p className="pt-3">By continuing, you agree to accept our privacy policy & Terms of Service.</p>
          OR
          <div className="mt-4 d-flex flex-column align-items-center">
            <GoogleLogin onSuccess={handleGoogleResponse} onFailure={handleGoogleResponse} useOneTap />
          </div>
          <p className="new-allready pt-3" onClick={() => navigate("/new")}>Don't have an account? Sign Up</p>
        </div>
      </div>

      <Modal show={showModal} onHide={toggleModal} centered>
        <Modal.Header className="bg-black text-white">
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
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={toggleModal}>Cancel</Button>
          <Button className="gradient-button-global" onClick={formik.handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewLoginComponent;
