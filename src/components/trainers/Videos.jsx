import { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getPersonalVideos,
  toggleVideoListing,
} from "../../redux/trainers/trainerThunk";
import VideoPlayerModal from "../common/VideoPlayer";
import EditVideoModal from "./EditVideoModal";

const Videos = () => {
  const dispatch = useDispatch();

  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  useEffect(() => {
    loadVideos(1);
  }, []);

  const loadVideos = async (page) => {
    dispatch(getPersonalVideos({ newPage: page })).then((res) =>
      setVideos(res.payload)
    );
    setCurrentPage(page);
  };

  const handleThumbnailClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const handleCloseVideoPlayer = () => {
    setSelectedVideo(null);
  };

  const handleVideoEdit = (video) => {
    setVideoToEdit(video);
    setShowEditModal(true);
  };

  const handleSaveEditedVideo = (updatedVideo) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.videoId === updatedVideo.videoId ? updatedVideo : video
      )
    );
  };

  const handleToggleListing = (videoId, listed) => {
    dispatch(toggleVideoListing({ videoId, listed: !listed })).then(() => {
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.videoId === videoId
            ? { ...video, listed: !video.listed }
            : video
        )
      );
    });
  };

  const handlePageChange = (newPage) => {
    loadVideos(newPage);
  };

  return (
    <div className="text-white h-100 w-100 glass-effect">
      {selectedVideo && (
        <VideoPlayerModal
          videoUrl={selectedVideo}
          onClose={handleCloseVideoPlayer}
        />
      )}
      <Table className="w-100">
        <thead>
          <tr>
            <th
              className="text-white"
              style={{ backgroundColor: "transparent", width: "150px" }}
            >
              Video
            </th>
            <th
              className="text-white"
              style={{ backgroundColor: "transparent", width: "200px" }}
            >
              Title
            </th>
            <th
              className="text-white"
              style={{ backgroundColor: "transparent", width: "400px" }}
            >
              Description
            </th>
            <th
              className="text-white"
              style={{ backgroundColor: "transparent", width: "300px" }}
            >
              Upload Date
            </th>
            <th
              className="text-white"
              style={{ backgroundColor: "transparent", width: "250px" }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {videos.length >= 0 ? (
            videos.map((video, idx) => (
              <tr key={idx}>
                <td
                  style={{
                    width: "150px",
                    backgroundColor: "transparent",
                    border: "none",
                    paddingRight: "15px",
                    verticalAlign: "middle", 
                    textAlign: "center", 
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={video.thumbnail || "default-thumbnail.jpg"}
                    alt="Thumbnail"
                    onClick={() => handleThumbnailClick(video.videoUrl)}
                    style={{
                      width: "150px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </td>
                <td
                  style={{
                    width: "200px",
                    backgroundColor: "transparent",
                    color: "#fff",
                    border: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    verticalAlign: "middle", 
                    textAlign: "center", 
                  }}
                >
                  {truncateText(video.title || "No Title", 50)}
                </td>
                <td
                  style={{
                    width: "400px",
                    backgroundColor: "transparent",
                    color: "#fff",
                    border: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    verticalAlign: "middle",
                    textAlign: "center", 
                  }}
                >
                  {truncateText(
                    video.description || "No Description available.",
                    40
                  )}
                </td>
                <td
                  style={{
                    width: "400px",
                    backgroundColor: "transparent",
                    color: "#fff",
                    border: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    verticalAlign: "middle", 
                    textAlign: "center", 
                  }}
                >
                  {video.uploadDate
                    ? new Date(video.uploadDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "No Date."}
                </td>
                <td
                  style={{
                    width: "150px",
                    backgroundColor: "transparent",
                    border: "none",
                    verticalAlign: "middle",
                    textAlign: "center", 
                  }}
                >
                  <button
                    className="me-2 gradient-blue-white"
                    onClick={() => handleThumbnailClick(video.videoUrl)}
                  >
                    View
                  </button>
                  <button
                    className="me-2 gradient-blue-white"
                    onClick={() => handleVideoEdit(video)}
                  >
                    Edit
                  </button>
                  <button
                    className={`me-2 ${
                      video.listed
                        ? "gradient-blue-white"
                        : "gradient-red-white"
                    }`}
                    onClick={() =>
                      handleToggleListing(video.videoId, video.listed)
                    }
                  >
                    {video.listed ? "Unlist" : "List"}{" "}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center text-muted py-5"
                style={{
                  width: "150px",
                  backgroundColor: "transparent",
                  border: "none",
                  verticalAlign: "middle", 
                  textAlign: "center", 
                }}
              >
                <div className="d-flex flex-column align-items-center">
                  <i
                    className="bi bi-folder-x"
                    style={{ fontSize: "3rem" }}
                  ></i>
                  <h3 className="mt-3 text-white">No videos available</h3>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {videos.length < 4 ? (
          <button className="btn btn-secondary">End</button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>

      {/* Edit Video Modal */}
      {videoToEdit && (
        <EditVideoModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          video={videoToEdit}
          onSave={handleSaveEditedVideo}
        />
      )}
    </div>
  );
};

export default Videos;
