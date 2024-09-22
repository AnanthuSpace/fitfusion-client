import { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getPersonalVideos } from "../../redux/trainers/trainerThunk";

const Videos = () => {
  const dispatch = useDispatch();
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    dispatch(getPersonalVideos()).then((res) => setVideos(res.payload));
  }, [dispatch]);

  return (
    <div className="text-white h-100 w-100 glass-effect">
      <Table className="w-100">
        <thead>
          <tr>
            <th className="text-white" style={{ backgroundColor: "transparent", width: "150px" }}>Video</th>
            <th className="text-white" style={{ backgroundColor: "transparent", width: "200px" }}>Title</th>
            <th className="text-white" style={{ backgroundColor: "transparent", width: "400px" }}>Description</th>
            <th className="text-white" style={{ backgroundColor: "transparent", width: "150px" }}>Actions</th>
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
                    whiteSpace: "nowrap", // Prevent text wrapping
                    overflow: "hidden",
                    textOverflow: "ellipsis", // Show ellipsis for overflowing text
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
                    whiteSpace: "nowrap", // Prevent text wrapping
                    overflow: "hidden",
                    textOverflow: "ellipsis", // Show ellipsis for overflowing text
                  }}
                >
                  {video.description || "No Description available."}
                </td>
                <td
                  style={{
                    width: "150px",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  <button variant="info" className="me-2">View</button>
                  <button variant="warning" className="me-2">Edit</button>
                  <button variant="danger">Delete</button>
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
    </div>
  );
};

export default Videos;
