import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVideos } from "../../redux/users/userThunk";
import VideoPlayerModal from "../common/VideoPlayer";
import { singleVideo } from "../../redux/users/userThunk";
import Reveal from "../common/animationConfig";

const TutorilasList = () => {
  const dispatch = useDispatch();
  const subscriptionList = useSelector(
    (state) => state.user.userData.subscribeList
  );
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (subscriptionList && subscriptionList.length > 0) {
      setLoading(true);
      dispatch(fetchAllVideos(subscriptionList))
        .then((res) => {
          if (res.payload && res.payload.data) {
            setVideos(res.payload.data);
          } else {
            setVideos([]);
          }
        })
        .catch((error) => {
          setVideos([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, subscriptionList]);

  const handleThumbnailClick = (videoUrl) => {
    dispatch(singleVideo(videoUrl)).then((res) =>
      setSelectedVideo(res.payload.data)
    );
  };

  const handleCloseVideoPlayer = () => {
    setSelectedVideo(null);
  };

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  return (
    <div className="container mt-4">
      <Reveal>
        <div className="row">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card glass-effect text-white">
                  <div
                    className="skeleton-loader"
                    style={{ height: "200px", backgroundColor: "#ccc" }}
                  ></div>
                  <div className="card-body">
                    <div
                      className="skeleton-loader"
                      style={{
                        height: "1.5rem",
                        backgroundColor: "#ccc",
                        marginBottom: "10px",
                      }}
                    ></div>
                    <div
                      className="skeleton-loader"
                      style={{ height: "1rem", backgroundColor: "#ccc" }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          ) : videos && videos.length > 0 ? (
            videos.map((video, index) => (
              <div
                className="col-md-4 mb-4"
                key={video.videoId || index}
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
                    <h5 className="card-title">
                      {truncateText(video.title || "Video Title", 50)}
                    </h5>
                    <p className="card-text">
                      {truncateText(
                        video.description || "No description available.",
                        60
                      )}
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
      </Reveal>
    </div>
  );
};

export default TutorilasList;
