import "../../assets/styles/users/Verification.css";
import { useState, useRef } from "react";
import { signupVerification } from "../../redux/users/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function SignUpVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, temperoryEmail } = useSelector((state) => state.user);

  const handleChange = (e, index) => {
    const value = e.target.value;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async () => {
    const completeOtp = otp.join("");
    dispatch(signupVerification({
      completeOtp,
      toast,
      temperoryEmail
    })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/")
      }
    });
  };

  return (
    <div>
      <ToastContainer />
      <div className="signup-nav-bar">
        <div className="signup-logo">
          <h1>FitFusion</h1>
        </div>
        <div className="signup-nav-list">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="verify-container">
        <div className="verify">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              placeholder="0"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
            />
          ))}
        </div>
        <div className="verify-btn">
          {!isLoading ? (
            <button onClick={handleSubmit}>Verify</button>
          ) : (
            <button disabled>Loading...</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUpVerification;
