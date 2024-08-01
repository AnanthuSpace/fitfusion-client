import React from "react";
import "../../assets/styles/users/whyChooseUs.css";

function WhyChooseUs() {
  return (
    <>
      <div className="why-container">
        <h1>Why Choose Us</h1>
        <p>
          When picking a gym , consider its amenities Like guest access, hours,
          location , <br />
          and extra benefits to enhance your experience.
        </p>
        <div className="service">
          <div className="service-list">
            <div className="service-div">
              <div className="service-content">
                <h2>Facility Amenities</h2>
                <p>
                  Best training dolor sit amet consectetur. <br />
                  Cras eros molestie habitasse sed proin. <br />
                  Volutpat sollicitudin adipiscing.
                </p>
              </div>
              <div className="service-content">
                <h2>Membership Cost</h2>
                <p>
                  Experience Trainers dolor sit amet volutput <br />
                  Cras eros molestie habitasse sed proin. <br />
                  Volutpat sollicitudin adipiscing.
                </p>
              </div>
            </div>
            <div className="service-div">
              <div className="service-content">
                <h2>Trainer Qualifications</h2>
                <p>
                  Experience Trainers dolor sit amet volutput <br />
                  Cras eros molestie habitasse sed proin. <br />
                  Volutpat sollicitudin adipiscing.
                </p>
              </div>
              <div className="service-content">
                <h2>Operating Hours</h2>
                <p>
                  Experience Trainers dolor sit amet volutput <br />
                  Cras eros molestie habitasse sed proin. <br />
                  Volutpat sollicitudin adipiscing.
                </p>
              </div>
            </div>
          </div>
          <div className="image">
            <img src="/whychooseus.jpg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default WhyChooseUs;
