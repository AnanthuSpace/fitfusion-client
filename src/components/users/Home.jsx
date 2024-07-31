import React from "react";
import "../../assets/styles/Home.css";
import WhyChooseUs from "./WhyChooseUs";
import TrainerContainer from "./TrainerContainer";
import ReviewList from "./ReviewList";
import Membership from "./Membership";
import Header from "./Header";

function Home() {
  return (
    <>
      <div className="home-container">
        <div className="enrty-container">
          <Header />
          <div className="home-div">
            <p>THE BEST FITNESS ONLINE PLATFORM</p>
            <div className="home-heading">
              <h1>
                IMPROVE YOUR <br /> FITNESS LEVEL FOR <br /> THE BEST
              </h1>
              <div className="buttons">
                <div className="empty">
                  <button className="beamember">BE A MEMBER</button>
                  <button className="learn">LEARN MORE</button>
                </div>
              </div>
            </div>
          </div>

          <div className="images">
            <div className="small-img">
              <img src="/home-page-small.jpeg" alt="img" />
              <p>
                Gym session or brisk walk can help. physical activity <br />
                stimulates man chemicals that may leave you Gym <br />
                session or brisk walk can help. physical activity <br />
                stimulates many chemical that may leave you
              </p>
            </div>
            <div className="big-img">
              <img src="/home-page-big.jpg" alt="img" />
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
