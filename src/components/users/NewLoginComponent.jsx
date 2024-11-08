import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { googleLoginUser, userLogin } from "../../redux/users/userThunk";
import BootstrapHeader from "./BootstrapHeader";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../assets/styles/users/NewLogin.css";

function NewLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      //   dispatch(
      //     userLogin({
      //       email: values.email,
      //       password: values.password,
      //       toast,
      //     })
      //   ).then((result) => {
      //     if (result.meta.requestStatus === "fulfilled") {
      //       navigate("/verify-otp");
      //     }
      //   });
      console.log(values);
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
            /*{" "}
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
            <h2 className="gradient-text">Login</h2>
            <form onSubmit={formik.handleSubmit} className="form-style">
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

              {!isLoading ? (
                <button type="submit" className="signup-join">
                  Login
                </button>
              ) : (
                <button className="signup-join" disabled>
                  Loading...
                </button>
              )}
            </form>
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
    </>
  );
}

export default NewLogin;
