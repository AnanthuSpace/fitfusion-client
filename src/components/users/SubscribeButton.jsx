import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleVideo } from "../../redux/users/userThunk";
import {
  createCheckoutSession,
  fetchVideos,
} from "../../redux/users/userThunk";
import { Spinner } from "react-bootstrap";
import VideoPlayer from "../common/VideoPlayer";
import "../../assets/styles/users/SubscribeButton.css";

function SubscribeButton({ trainerId, trainerName, amount }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const loading = useSelector((state) => state.user.isLoading);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleSubscribeClick = () => {
    dispatch(
      createCheckoutSession({
        trainerId,
        trainerName,
        amount,
        userName: user.name,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchVideos(trainerId)).then((res) => {
      if (res.payload && res.payload.data && res.payload.data.videos) {
        setVideos(res.payload.data.videos);
      } else {
        setVideos([]);
      }
    });
  }, [dispatch, trainerId]);

  const isSubscribed = user?.subscribeList?.includes(trainerId);

  const handleThumbnailClick = (videoUrl) => {
    dispatch(singleVideo(videoUrl)).then((res) =>
      setSelectedVideo(res.payload.data)
    );
  };

  const handleCloseVideoPlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="video-main">
      {selectedVideo && (
        <VideoPlayer
          videoUrl={selectedVideo}
          onClose={handleCloseVideoPlayer}
        />
      )}
      {isSubscribed ? (
        videos.length > 0 ? (
          <div className="video-thumbnails-container mt-1">
            <div className="video-grid">
              {videos.map((video, index) => (
                  <div key={index} className="video-thumbnail bg-transparent">
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
                  </div>
              ))}
            </div>
              {/* <button className="view-more-button">View More</button> */}
          </div>
        ) : (
          <p className="text-white text-center mt-5">
            No videos available at the moment.
          </p>
        )
      ) : isSubscribed ? (
        <p className="text-white text-center">You are already subscribed!</p>
      ) : (
        <button
          className="glass-button"
          style={{ marginTop: "8rem" }}
          onClick={
            amount
              ? handleSubscribeClick
              : () => toast.warning("Service is not started")
          }
          disabled={loading || !amount}
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
          ) : amount ? (
            `Subscribe $ ${amount}`
          ) : (
            "Not provided"
          )}
        </button>
      )}
    </div>
  );
}

export default SubscribeButton;
