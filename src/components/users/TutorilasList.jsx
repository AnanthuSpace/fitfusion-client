import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Form, InputGroup } from "react-bootstrap";
import { fetchFilteredVideos } from "../../redux/users/userThunk";
import VideoPlayerModal from "../common/VideoPlayer";
import Reveal from "../common/animationConfig";

const TutorialsList = () => {
  const dispatch = useDispatch();
  const subscriptionList = useSelector(
    (state) => state.user.userData.subscribeList
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [tempSelectedCategories, setTempSelectedCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("AtoZ");

  const fetchVideos = () => {
    setLoading(true);
    const payload = {
      subscriptionList: subscriptionList,
      searchTerm: debouncedSearchTerm,
      categories: selectedCategories,
      sortOption,
    };
    dispatch(fetchFilteredVideos(payload))
      .then((res) => {
        const videoData = res.payload?.data || [];
        setVideos(videoData);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (subscriptionList?.length > 0) {
      fetchVideos();
    } else {
      setLoading(false);
    }
  }, [subscriptionList, debouncedSearchTerm, selectedCategories, sortOption]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleThumbnailClick = (videoUrl) => {
    dispatch(singleVideo(videoUrl)).then((res) =>
      setSelectedVideo(res.payload.data)
    );
  };

  const handleCloseVideoPlayer = () => {
    setSelectedVideo(null);
  };

  const truncateText = (text, limit) =>
    text?.length > limit ? `${text.substring(0, limit)}...` : text;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleTempCategoryChange = (category) => {
    setTempSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const applyFilters = () => {
    setSelectedCategories(tempSelectedCategories);
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <div className="d-flex justify-content-center mt-3 gap-2">
          <InputGroup
            style={{ border: "1px solid #b249f8", borderRadius: "1rem" }}
          >
            <Form.Control
              type="text"
              placeholder="Search by Title"
              value={searchTerm}
              onChange={handleSearch}
              className="text-white ms-2 me-2"
            />
          </InputGroup>
          <Form.Select value={sortOption} className="sorted" onChange={handleSortChange}>
            <option value="AtoZ">A to Z</option>
            <option value="ZtoA">Z to A</option>
            <option value="Latest">Latest Videos</option>
            <option value="Oldest">Old Videos</option>
          </Form.Select>
        </div>
      </div>

      <Reveal>
        <div
          className="d-flex"
          style={{
            maxHeight: "550px",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          <div style={{ flex: 1 }}>
            <Row>
              <Col md={9}>
                <Row>
                  {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                      <Col md={4} className="mb-4" key={index}>
                        <Card className="glass-effect text-white">
                          <div
                            className="skeleton-loader"
                            style={{ height: "200px", backgroundColor: "#ccc" }}
                          ></div>
                          <Card.Body>
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
                              style={{
                                height: "1rem",
                                backgroundColor: "#ccc",
                              }}
                            ></div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  ) : videos.length > 0 ? (
                    videos.map((video, index) => (
                      <Col
                        md={4}
                        className="mb-4"
                        key={video.videoId || index}
                        onClick={() => handleThumbnailClick(video.videoUrl)}
                        style={{ cursor: "pointer" }}
                      >
                        <Card className="glass-effect text-white">
                          <Card.Img
                            src={video.thumbnail}
                            alt={video.title || "Video thumbnail"}
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                          <Card.Body>
                            <Card.Title>
                              {truncateText(video.title, 50)}
                            </Card.Title>
                            <Card.Text>
                              {truncateText(
                                video.description ||
                                  "No description available.",
                                35
                              )}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <Col className="text-center text-white">
                      No videos available.
                    </Col>
                  )}
                </Row>
              </Col>
              <Col md={3}>
                <div
                  className="ms-3"
                  style={{
                    position: "sticky",
                    top: "0",
                    maxHeight: "550px",
                    overflowY: "auto",
                  }}
                >
                  <Card className="p-3 glass-effect">
                    <Card.Title className="text-white">
                      Filter Videos
                    </Card.Title>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-white">Category</Form.Label>
                      <div>
                        {[
                          "Upper Body",
                          "Lower Body",
                          "Core & Abs",
                          "Cardio & Conditioning",
                          "Mobility & Flexibility",
                          "Functional Training",
                        ].map((category) => (
                          <Form.Check
                            key={category}
                            type="checkbox"
                            id={category}
                            label={category}
                            checked={tempSelectedCategories.includes(category)}
                            onChange={() => handleTempCategoryChange(category)}
                            className="mb-2 text-white"
                          />
                        ))}
                      </div>
                      <button
                        className="gradient-button-global mt-2"
                        onClick={applyFilters}
                      >
                        Apply
                      </button>
                    </Form.Group>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
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

export default TutorialsList;
