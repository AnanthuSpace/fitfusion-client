import React from "react";
import "../../assets/styles/ReviewList.css";

function ReviewList() {
  return (
    <>
      <div className="reviewlist-container">
        <div className="review-div">
          <div className="heading">
            <p>DONT' TAKE OUR WORDS</p>
            <h1>
              Listen from our <br />
              Happy Clients
            </h1>
          </div>
          <div className="review">
            <p>
              I have been a proud member of this incredible platform for over a
              year now, and the <br />
              experience has been nothing short of amazing. The state-of-the-art
              equiped,
              <br />
              knowledgeable staff, and diverse group classes have made my
              fitness journey not <br />
              only effective but truly enjoyable
            </p>
            <div className="user-review">
              <img src="/reviewr-pf.jpg" alt="user" />
              <h3>Eleanor pena <span> -Athletes</span></h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewList;
