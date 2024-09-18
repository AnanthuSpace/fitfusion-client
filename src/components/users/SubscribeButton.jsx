import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCheckoutSession, fetchVideos } from "../../redux/users/userThunk";
import { Spinner } from "react-bootstrap";
import VideoPlayer from "../common/VideoPlayer";
import "../../assets/styles/users/SubscribeButton.css";

function SubscribeButton({ trainerId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const loading = useSelector((state) => state.user.isLoading);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleSubscribeClick = () => {
    dispatch(createCheckoutSession({ trainerId, amount: 100 }));
  };

  useEffect(() => {
    dispatch(fetchVideos(trainerId)).then((res) =>
      setVideos(res.payload.data.videos)
    );
  }, [dispatch, trainerId]);

  const isSubscribed = user?.subscribeList?.includes(trainerId);

  const handleThumbnailClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const handleCloseVideoPlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="video-main">
      {selectedVideo && (
        <VideoPlayer videoUrl={selectedVideo} onClose={handleCloseVideoPlayer} />
      )}
      {isSubscribed ? (
        <div className="video-thumbnails-container mt-5">
          <div className="video-grid">
            {videos.map((video, index) => (
              <div key={index} className="video-thumbnail">
                <img
                  src={video.thumbnail}
                  alt={
                    typeof video.videoUrl === "string" &&
                    video.videoUrl.includes("-")
                      ? video.videoUrl.split("-")[1]
                      : "Video"
                  }
                  onClick={() => handleThumbnailClick(video.videoUrl)}
                />
                {/* <p>
                  {typeof video.videoUrl === "string" &&
                  video.videoUrl.includes("-")
                    ? video.videoUrl.split("-")[1]
                    : "Unnamed Video"}
                </p> */}
              </div>
            ))}
          </div>
          <button className="view-more-button">View More</button>
        </div>
      ) : (
        <button
          className="glass-button"
          onClick={handleSubscribeClick}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Processing...
            </>
          ) : (
            "Subscribe $100"
          )}
        </button>
      )}
    </div>
  );
}

export default SubscribeButton;
