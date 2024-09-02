import React from "react";
import PropTypes from "prop-types";

const StarRating = ({ rating, starRatedColor = "gold", numberOfStars = 5, starDimension = "24px", starSpacing = "3px" }) => {
  const stars = [];

  for (let i = 1; i <= numberOfStars; i++) {
    stars.push(
      <span
        key={i}
        style={{
          color: i <= rating ? starRatedColor : "#e4e5e9",
          fontSize: starDimension,
          marginRight: starSpacing,
        }}
      >
        &#9733;
      </span>
    );
  }

  return <div>{stars}</div>;
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  starRatedColor: PropTypes.string,
  numberOfStars: PropTypes.number,
  starDimension: PropTypes.string,
  starSpacing: PropTypes.string,
};

export default StarRating;
