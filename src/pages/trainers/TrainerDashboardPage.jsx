import React, { useEffect, useState } from "react";
import TrainerNavbar from "../../components/trainers/TrainerNavbar";
import TrainerSideBar from "../../components/trainers/TrainerSideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerConsole.css";
import TrainerDashboard from "../../components/trainers/TrainerDashobord";
import { trainerDataCount } from "../../redux/trainers/trainerThunk";
import { useDispatch } from "react-redux";
import TrainerPieChart from "../../components/trainers/TrainerPieChart";

function TrainerDashboardPage() {
  const [countData, setCountData] = useState({
    videosCount: 0,
    totalReview: 0,
    totalRevenue: 0,
    newReviews: [],
  });
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(trainerDataCount()).then((res) => {
      setCountData(res.payload || countData);
    });
  }, [dispatch]);

  const truncateFeedback = (text, maxLength = 50) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <div className="d-flex vh-100">
        {/* Sidebar */}
        <TrainerSideBar />

        <div className="flex-grow-1 d-flex flex-column trainer-gradient-bg">
          <TrainerNavbar />
          <h4 className="text-white m-3">Hi, Welcome back</h4>

          <div className="flex-grow-1 overflow-auto">
            <div className="container-fluid h-100">
              <div className="row h-100">
                <div className="col-lg-9 col-md-8 col-12 d-flex flex-column p-4">
                  <div
                    className="flex-grow-1"
                    style={{ backgroundColor: "#212529" }}
                  >
                    <TrainerDashboard />
                  </div>
                </div>

                <div className="col-lg-3 col-md-4 col-12 d-flex flex-column p-4">
            
                  <div className="d-flex flex-column h-50">
                    <div className="row g-3">
                
                      <div className="col-12">
                        <div
                          className="card text-white"
                          style={{ backgroundColor: "#343a40" }}
                        >
                          <div className="card-header text-center">
                            Total Videos
                          </div>
                          <div className="card-body text-center">
                            <p className="card-text fs-1">
                              {countData?.videosCount || 0}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Total Reviews */}
                      <div className="col-12">
                        <div
                          className="card text-white"
                          style={{ backgroundColor: "#343a40" }}
                        >
                          <div className="card-header text-center">
                            Total Reviews
                          </div>
                          <div className="card-body text-center">
                            <p className="card-text fs-1">
                              {countData?.totalReview || 0}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Total Revenue */}
                      <div className="col-12">
                        <div
                          className="card text-white"
                          style={{ backgroundColor: "#343a40" }}
                        >
                          <div className="card-header text-center">
                            Total Revenue
                          </div>
                          <div className="card-body text-center">
                            <p className="card-text fs-1">
                              ${countData?.totalRevenue || 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-grow-1 flex-column flex-lg-row mt-3">
              {/* Pie Chart Section */}
              <div
                className="w-100 w-lg-50 p-3"
                style={{ backgroundColor: "#343a40", borderRadius: "5px" }}
              >
                <h5 className="text-white">Summary</h5>
                <TrainerPieChart
                  videosCount={countData.videosCount}
                  reviewCount={countData.totalReview}
                  revenue={countData.totalRevenue}
                />
              </div>

              {/* Latest Reviews Section */}
              <div
                className="w-100 w-lg-50 p-3 mt-3 mt-lg-0 ms-lg-3"
                style={{ backgroundColor: "#343a40", borderRadius: "5px" }}
              >
                <h5 className="text-white">Latest Reviews</h5>
                <ul className="list-group">
                  {countData?.newReviews?.length ? (
                    [...countData.newReviews]
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by 'createdAt'
                      .slice(0, 5) // Show only the latest 5 reviews
                      .map((review, index) => (
                        <li
                          key={index}
                          className="list-group-item text-white"
                          style={{ backgroundColor: "#212529", border: "none" }}
                        >
                          <strong>{review.userName}</strong>:{" "}
                          {truncateFeedback(review.feedback)} <br />
                          <small>Rating: {review.rating}</small>
                        </li>
                      ))
                  ) : (
                    <li
                      className="list-group-item text-white"
                      style={{ backgroundColor: "#212529", border: "none" }}
                    >
                      No new reviews
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrainerDashboardPage;
