import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAndTrainer } from "../../redux/users/userThunk"

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trainerId = useSelector((state) => state.user.temperoryData || "");
  const handleSubmit = () => {
    dispatch(fetchUserAndTrainer()).then((res) => {
      if(res.meta.requestStatus === "fulfilled"){    
        navigate(`/trainer-view`, {state: {trainerId: trainerId}});
      }
    });
  };
  return (
    <div className="background-gradient-main d-flex align-items-center h-100">
      <div className="w-100">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="text-center glass-effect">
              <div className="card-body">
                <h1 className="card-title mb-4 gradient-text">
                  Payment Successful
                </h1>
                <p className="card-text text-white">
                  Your payment was successful. Thank you for your purchase!
                </p>
                <a
                  onClick={handleSubmit}
                  className="btn gradient-button-global mt-3"
                >
                  Continue
                </a>
                {/* <a onClick={()=>navigate(-3)} className="btn gradient-button-global mt-3">
                  Continue
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
