import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVideos } from "../../redux/users/userThunk";

const TutorilasList = () => {
  const dispatch = useDispatch();
  const subscriptionList = useSelector(
    (state) => state.user.userData.subscribeList
  );
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (subscriptionList && subscriptionList.length > 0) {
      dispatch(fetchAllVideos(subscriptionList))
        .then((res) => {
          if (res.payload && res.payload.data ) {
            setVideos(res.payload.data);
          } else {
            setVideos([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching videos:", error);
          setVideos([]);
        });
    }
  }, [dispatch, subscriptionList]);

  return (
    <div className="container mt-4">
      <div className="row">
        {console.log(videos)}
        {videos && videos.length > 0 ? (
          videos.map((video, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card bg-dark text-white">
                <img
                  src={video.thumbnail || "https://via.placeholder.com/300x200"}
                  className="card-img-top"
                  alt={video.title || "Video thumbnail"}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{video.title || "Video Title"}</h5>
                  <p className="card-text">
                    {video.description || "No description available."}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      {video.views || "Unknown views"} •{" "}
                      {video.duration || "Unknown duration"}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center text-white">No videos available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorilasList;
