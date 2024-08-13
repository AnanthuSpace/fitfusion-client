import React, { useEffect, useState } from "react";
import "../../assets/styles/users/CountingDiv.css";

function CountingDiv() {
  const [counts, setCounts] = useState({
    members: 0,
    classes: 0,
    trainers: 0,
    satisfaction: 0,
  });

  useEffect(() => {
    const incrementValues = {
      members: 100,
      classes: 30,
      trainers: 10,
      satisfaction: 99,
    };

    const incrementSpeed = 60; 

    const counters = Object.keys(incrementValues).map((key) => ({
      key,
      interval: setInterval(() => {
        setCounts((prevCounts) => {
          const currentValue = prevCounts[key];
          if (currentValue < incrementValues[key]) {
            return { ...prevCounts, [key]: currentValue + 1 };
          } else {
            clearInterval(counters.find((counter) => counter.key === key).interval);
            return prevCounts;
          }
        });
      }, incrementSpeed),
    }));

    return () => counters.forEach((counter) => clearInterval(counter.interval));
  }, []);

  return (
    <div className="progress-div">
      <div className="progress-count-div">
        <div className="progress-div-count">
          <h1>{counts.members}+</h1>
          <p>
            Happy Members <br />
            Our Community is growing fast!
          </p>
        </div>
        <div className="progress-div-count">
          <h1>{counts.classes}+</h1>
          <p>
            Weekly Classes <br />
            Pics from various workouts
          </p>
        </div>
        <div className="progress-div-count">
          <h1>{counts.trainers}+</h1>
          <p>
            Certified Trainers <br />
            Guidance at every step
          </p>
        </div>
        <div className="progress-div-count">
          <h1>{counts.satisfaction}%</h1>
          <p>
            Customer Satisfaction <br />
            We ensure your progress satisfaction
          </p>
        </div>
      </div>
    </div>
  );
}

export default CountingDiv;
