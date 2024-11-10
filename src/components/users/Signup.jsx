import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { GoogleLogin } from "@react-oauth/google";
import { googleSignUpUser, registration } from "../../redux/users/userThunk";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../assets/styles/users/Signup.css";

function Signup() {
  const [googleToken, setGoogleToken] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
      confirmPass: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      dispatch(
        registration({
          name: values.name,
          email: values.email,
          password: values.password,
          confirmPass: values.confirmPass,
          toast,
        })
      ).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/verify-otp");
        }
      });
    },
  });

  const handleGoogleResponse = (response) => {
    if (response.credential) {
      setGoogleToken(response.credential);
      toggleModal();
    } else {
      toast.error("Google registration failed");
    }
  };

  const handlePasswordSubmit = () => {
    dispatch(googleSignUpUser({ token: googleToken, password: formik.values.password, confirmPass: formik.values.confirmPass }))
      .then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/");
        }
      });
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
            <div className="signup-signup-btn" onClick={() => navigate("/login")}>
              Sign in
            </div>
            <div className="new-signin-btn" onClick={() => navigate("/signup")}>
              Sign Up
            </div>
          </div>
        </div>

        <div className="signup-body-container">
          <div className="signup-heading">
            <span className="gradient-text">
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
            <form onSubmit={formik.handleSubmit} className="form-style">
              <input
                type="text"
                className="signup-input-text"
                placeholder="Full Name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}

              <input
                type="text"
                className="signup-input-text"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}

              <input
                type="password"
                className="signup-input-text"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}

              <input
                type="password"
                className="signup-input-text"
                placeholder="Confirm Password"
                {...formik.getFieldProps("confirmPass")}
              />
              {formik.touched.confirmPass && formik.errors.confirmPass ? (
                <div className="error">{formik.errors.confirmPass}</div>
              ) : null}

              {!isLoading ? (
                <button type="submit" className="signup-join">Join</button>
              ) : (
                <button className="signup-join" disabled>Loading...</button>
              )}
            </form>
            <p>By continuing, you agree to accept our privacy policy & Terms of Service.</p>
            OR
            <div className="mt-4 d-flex flex-column align-items-center">
              <GoogleLogin onSuccess={handleGoogleResponse} onError={handleGoogleResponse} useOneTap />
            </div>
            <p className="signup-allready" onClick={() => navigate("/login")}>Already have an account?</p>
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
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="confirmPass">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPass"
              placeholder="Confirm Password"
              {...formik.getFieldProps("confirmPass")}
            />
            {formik.touched.confirmPass && formik.errors.confirmPass ? (
              <div className="error">{formik.errors.confirmPass}</div>
            ) : null}
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={toggleModal}>Cancel</Button>
          <Button className="gradient-button-global" onClick={handlePasswordSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Signup;
