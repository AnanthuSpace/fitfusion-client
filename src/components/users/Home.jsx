import React from "react";
import "../../assets/styles/Home.css";
import WhyChooseUs from "./WhyChooseUs";
import TrainerContainer from "./TrainerContainer";
import ReviewList from "./ReviewList";
import Membership from "./Membership";

function Home() {
  return (
    <>
      <div className="home-container">
        <div className="enrty-container">
          <div className="signup-nav-bar">
            <div className="signup-logo">
              <h1>FitFusion</h1>
            </div>
            <div className="signup-nav-list">
              <ul>
                <li>Home</li>
                <li>Class</li>
                <li>Trainers</li>
                <li>Conatct</li>
              </ul>
            </div>
            <div className="signinButtn">
              <button>Sign in</button>
            </div>
          </div>
        </div>

        <div className="progress">
          <div className="count-div">
            <div className="progress-count">
              <h1>500+</h1>
              <p>
                Happy Members <br />
                Our Community is growing fast!
              </p>
            </div>
            <div className="progress-count">
              <h1>30+</h1>
              <p>
                Weekly Classes <br />
                Pics from various workouts
              </p>
            </div>
            <div className="progress-count">
              <h1>10+</h1>
              <p>
                Certified Trainers <br />
                Guidance at every step
              </p>
            </div>
            <div className="progress-count">
              <h1>99%</h1>
              <p>
                Customer Satisfaction <br />
                We ensure your progress satisfaction
              </p>
            </div>
          </div>
        </div>

        <WhyChooseUs />
        <TrainerContainer />
        <ReviewList />
        <Membership />
      </div>
    </>
  );
}

export default Home;
