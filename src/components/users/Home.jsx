import React from "react";
import "../../assets/styles/users/Home.css";
import WhyChooseUs from "./WhyChooseUs";
import TrainerContainer from "./TrainerContainer";
import ReviewList from "./ReviewList";
import Membership from "./Membership";
import CountingDiv from "./CountingDiv";
import Reveal from "../common/animationConfig";

function Home() {
  return (
    <>
      <div className="home-container homepage-gradient-main ">
        <div className="enrty-container">
          <div className="home-div">
            <p>THE BEST FITNESS ONLINE PLATFORM</p>
            <div className="home-heading">
              <h1 className="gradient-text">
                IMPROVE YOUR <br /> FITNESS LEVEL FOR <br /> THE BEST
              </h1>
              <div className="buttons">
                <div className="empty ">
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
              <img src="/home-page-big.png" alt="img" />
            </div>
          </div>
        </div>
        <div className="background-gradient-main">
          <Reveal>
            <CountingDiv />
          </Reveal>
          <WhyChooseUs />
          <Reveal>
            <TrainerContainer />
          </Reveal>
          {/* <Reveal>
            <ReviewList />
          </Reveal> */}
          <Reveal>
            <Membership />
          </Reveal>
        </div>
        <footer className="home-footer">
          © 2024 FITFUSION. All rights reserved.
        </footer>
      </div>
    </>
  );
}

export default Home;
