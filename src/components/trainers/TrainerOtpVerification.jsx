import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/trainers/TrainerOtpVerification.css";
import { trainerVerification } from "../../redux/trainers/trainerThunk";
import { toast } from "react-toastify";

function TrainerOtpVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, temperoryEmail } = useSelector((state) => state.trainer);

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
    dispatch(
      trainerVerification({
        completeOtp,
        toast,
        temperoryEmail,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/trainer");
      }
    });
  };

  return (
    <>
      <div className="trainer-otp-container trainer-gradient-bg">
        <div className="trainer-otp-div glass-effect">
          <h1 className="text-white">Verify OTP</h1>
          <div className="verify mt-5">
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
          <div className="trainer-verify-btn">
            {!isLoading ? (
              <button onClick={handleSubmit} className=" gradient-blue-white">
                Verify
              </button>
            ) : (
              <button disabled className=" gradient-blue-white">
                Loading...
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TrainerOtpVerification;
