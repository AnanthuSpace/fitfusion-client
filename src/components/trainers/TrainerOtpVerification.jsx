import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/trainers/TrainerOtpVerification.css";
import { trainerVerification } from "../../redux/trainers/trainerThunk";
import { toast } from "react-toastify";

function TrainerOtpVerification() {
  // const [otp, setOtp] = useState(["", "", "", ""]);
  // const inputRefs = useRef([]);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { isLoading, temperoryEmail } = useSelector((state) => state.trainer);

  // const handleChange = (e, index) => {
  //   const value = e.target.value;
  //   setOtp((prevOtp) => {
  //     const newOtp = [...prevOtp];
  //     newOtp[index] = value;
  //     return newOtp;
  //   });

  //   if (value && index < inputRefs.current.length - 1) {
  //     inputRefs.current[index + 1].focus();
  //   }
  // };

  // const handleSubmit = async () => {
  //   const completeOtp = otp.join("");
  //   dispatch(
  //     trainerVerification({
  //       completeOtp,
  //       toast,
  //       temperoryEmail,
  //     })
  //   ).then((result) => {
  //     if (result.meta.requestStatus === "fulfilled") {
  //       navigate("/trainer");
  //     }
  //   });
  // };

  const [otp, setOtp] = useState(["", "", "", ""]);
  const regex = /^[a-zA-Z0-9]$/;
  const { isLoading, temperoryEmail } = useSelector((state) => state.user);
  const [timer, setTimer] = useState(localStorage.getItem("timer"));
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer(timer - 1);
      localStorage.setItem("timer", timer);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, dispatch]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (regex.test(value) || value === "") {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });

      if (value !== "") {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.code === "Backspace" && otp[index] === "") {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async () => {
    const completeOtp = otp.join("");
    dispatch(
      signupVerification({
        completeOtp,
        temperoryEmail,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/user-data");
      }
    });
  };

  const handleResendOtp = async () => {
    setLoad(true)
    dispatch(resendOtp(temperoryEmail)).then((res) => {
      if (res.payload.message) {
        setLoad(false)
        setTimer(res.payload.validity);
      }
    });
  };

  return (
    <>
      <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ background: "#08001e" }}
    >
      <Form
        className="p-4 shadow-lg rounded"
        style={{
          background: "linear-gradient(45deg, #160024 25%, #001925 75%)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2
          className="text-center text-white"
          style={{ fontSize: "25px", textShadow: "3px 3px 4px #883aea" }}
        >
          Email Verification
        </h2>
        <p className="text-white">
          <strong>For your security</strong>, you should change your account's
          default password <strong>right now</strong>. Keep your information
          protected at all times.
        </p>
        <p className="text-white">
          A <strong>code</strong> has been sent to the <strong>email</strong>:
        </p>
        <h3
          className="text-center text-truncate"
          style={{
            background:
              "linear-gradient(15deg, #63e, #883aea 30%, #e0ccfa 90%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {temperoryEmail}
        </h3>

        <InputGroup className="d-flex justify-content-center gap-2 mt-3">
          {otp.map((digit, index) => (
            <Form.Control
              id={`otp-input-${index}`}
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="bg-transparent"
              placeholder="_"
              style={{
                width: "3rem",
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                borderBottom: "2px solid #883aea",
                backgroundColor: "transparent",
                color: "#fff",
                caretColor: "#883aea",
              }}
            />
          ))}
        </InputGroup>
        <span className="d-block text-white text-center mt-2">
          Enter the code that was sent to your email.
        </span>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="d-block text-center mt-2">
            {timer > 0 ? (
              <span
                className="text-white"
                style={{ textDecoration: "underline" }}
              >
                Resend code in: {Math.floor(timer / 60)}:
                {String(timer % 60).padStart(2, "0")}
              </span>
            ) : (
              <Button
                variant="link"
                className="text-white"
                style={{ textDecoration: "underline" }}
                onClick={handleResendOtp}
              >
                {load ? "Loading" : "Didn't receive code?"}
              </Button>
            )}
          </span>

          <Button
            className="btn btn-primary"
            onClick={handleSubmit}
            style={{
              backgroundColor: "#310a65",
              borderColor: "#883aea",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Verify Account →"}
          </Button>
        </div>
      </Form>
    </div>
    </>
  );
}

export default TrainerOtpVerification;
