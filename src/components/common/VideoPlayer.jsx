import React, { useEffect, useState } from "react";
// import { getVideos } from "../../utils/awsConfig";


function VideoPlayerModal({ videoUrl, onClose }) {

  return (
    <div className="video-modal-overlay">
      <div className="video-modal-content">
        <button className="video-player-close-button" onClick={onClose}>
          &times;
        </button>
        <video controls autoPlay controlsList="nodownload">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default VideoPlayerModal;
