import React from "react";
import BootstrapHeader from "../../components/users/BootstrapHeader";
import { useSelector } from "react-redux";
import TutorilasList from "../../components/users/TutorilasList";

const TutorialsPage = () => {
  const user = useSelector((state) => state.user.userData);

  return (
    <>
      <div className="top-0 w-100 background-gradient-main h-auto">
        <BootstrapHeader />
        {user && user.subscribeList && user.subscribeList.length > 0 ? (
          <TutorilasList />
        ) : (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
            <div className="text-center text-white px-3">
              <h4 className="mb-3">No Subscriptions Yet</h4>
              <p className="fs-5">
                You haven't subscribed to any trainers yet. Explore our trainers and subscribe
                to unlock exclusive video tutorials and fitness plans tailored just for you!
              </p>
              <p className="fs-5">Start your fitness journey today!</p>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
        @media (max-width: 768px) {
          .background-gradient-main {
            padding-top: 1rem;
          }

          h4 {
            font-size: 1.5rem;
          }

          p {
            font-size: 1rem;
          }
        }

        @media (max-width: 576px) {
          h4 {
            font-size: 1.25rem;
          }

          p {
            font-size: 0.9rem;
          }

          .d-flex {
            height: 80vh;
          }
        }
      `}
      </style>
    </>
  );
};

export default TutorialsPage;
