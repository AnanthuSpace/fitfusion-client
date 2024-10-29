import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, trainerLogin } from "../../redux/trainers/trainerThunk";
import { GoogleLogin } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../assets/styles/trainers/TrainerLogin.css";

function TrainerLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.trainer);

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
      dispatch(trainerLogin({ email: emailId, password: values.password })).then((result) => {
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
                    formik.touched.email && formik.errors.email ? "is-invalid" : ""
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
                    formik.touched.password && formik.errors.password ? "is-invalid" : ""
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
            <u>
              <p
                className="mt-4 text-center"
                onClick={() => navigate("/trainer-signup")}
              >
                Create an account
              </p>
              <p
                className="mt-4 text-center"
                onClick={() => navigate("/trainer-signup")}
              >
                Login as Client
              </p>
            </u>
          </div>
        </div>
        <footer className="text-center admin-footer">
          © 2024 FITFUSION. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default TrainerLogin;
