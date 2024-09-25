import { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getPersonalVideos } from "../../redux/trainers/trainerThunk";
import VideoPlayerModal from "../common/VideoPlayer";

const Videos = () => {
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleVideoEdit = () => {
    console.log("wrkng");
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
      {console.log(videos)}

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
              style={{ backgroundColor: "transparent", width: "400px" }}
            >
              uploadDate
            </th>
            <th
              className="text-white"
              style={{ backgroundColor: "transparent", width: "150px" }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {videos ? (
            videos.map((video, idx) => (
              <tr key={idx}>
                <td
                  style={{
                    width: "150px",
                    backgroundColor: "transparent",
                    border: "none",
                    paddingRight: "15px",
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
                  }}
                >
                  {video.title || "No Title"}
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
                  }}
                >
                  {video.description || "No Description available."}
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
                  {/* <button variant="danger">Delete</button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-white">
                Loading videos...
              </td>
            </tr>
          )}
        </tbody>
      </Table>
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
    </div>
  );
};

export default Videos;
