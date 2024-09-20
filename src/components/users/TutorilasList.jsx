import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVideos } from "../../redux/users/userThunk";
import VideoPlayerModal from "../common/VideoPlayer";

const TutorilasList = () => {
  const dispatch = useDispatch();
  const subscriptionList = useSelector(
    (state) => state.user.userData.subscribeList
  );
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (subscriptionList && subscriptionList.length > 0) {
      dispatch(fetchAllVideos(subscriptionList))
        .then((res) => {
          if (res.payload && res.payload.data) {
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

  const handleThumbnailClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const handleCloseVideoPlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {videos && videos.length > 0 ? (
          videos.map((video, index) => (
            <div
              className="col-md-4 mb-4"
              key={index}
              onClick={() => handleThumbnailClick(video.videoUrl)}
              style={{ cursor: "pointer" }}
            >
              <div className="card glass-effect text-white">
                <img
                  src={video.thumbnail}
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
      {selectedVideo && (
        <VideoPlayerModal
          videoUrl={selectedVideo}
          onClose={handleCloseVideoPlayer}
        />
      )}
    </div>
  );
};

export default TutorilasList;
