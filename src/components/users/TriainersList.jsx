import React, { useEffect, useState, useRef, useCallback } from "react";
import { Card, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { localhostURL } from "../../utils/url";
import { fetchDeitPlans } from "../../redux/users/userThunk";
import StarRating from "./StarRating";
import "../../assets/styles/users/TrainersList.css";
import axios from "axios";

function TrainersList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const observer = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${localhostURL}/fetchTrainerScroll`,
          { params: { page } }
        );
        if (response.data.length === 0) {
          setHasMore(false);
        } else {
          setTrainers((prevTrainers) => [...prevTrainers, ...response.data]);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load trainers.");
        setLoading(false);
      }
    };

    fetchTrainers();
  }, [page]);

  const lastTrainerElementRef = useCallback(
    (node) => {
      if (loading || fetching || !hasMore) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setFetching(true);
          setTimeout(() => {
            setPage((prevPage) => prevPage + 1);
            setFetching(false);
          }, 1000);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, fetching, hasMore]
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCardClick = (trainerId) => {
    dispatch(fetchDeitPlans({ trainerId })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate(`/trainer-view`, { state: { trainerId } });
      }
    });
  };

  const handleImageLoad = (trainerId) => {
    setImageLoaded((prev) => ({ ...prev, [trainerId]: true }));
  };

  const filteredTrainers = trainers.filter((trainer) =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return <div className="text-center mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4" ref={containerRef}>
      <div className="text-center mb-4">
        <h2 className="gradient-text">Meet Our Trainers</h2>
        <Form className="d-flex justify-content-center mt-3">
          <InputGroup
            style={{ border: "1px solid #b249f8", borderRadius: "1rem" }}
          >
            <Form.Control
              type="text"
              placeholder="Search Trainers"
              value={searchTerm}
              onChange={handleSearch}
              className="text-white ms-2 me-2"
            />
          </InputGroup>
        </Form>
      </div>
      <div
        style={{
          maxHeight: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <Row>
          {filteredTrainers.map((trainer, index) => {
            const isImageLoaded = imageLoaded[trainer?.trainerId];
            const trainerCard = (
              <Card
                className="h-100 text-center glass-card"
                onClick={() => handleCardClick(trainer?.trainerId)}
              >
                {!isImageLoaded && <div className="skeleton-loader"></div>}
                <Card.Img
                  variant="top"
                  src={`${trainer?.profileIMG}`}
                  alt={trainer?.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    display: isImageLoaded ? "block" : "none", 
                  }}
                  onLoad={() => handleImageLoad(trainer?.trainerId)}
                  onError={(e) => {
                    e.target.src = "/Trainer-profile.jpg";
                    handleImageLoad(trainer?.trainerId); 
                  }}
                />
                <Card.Body>
                  <Card.Title className="text-white">
                    {trainer?.name}
                  </Card.Title>
                  <Card.Text className="text-white">
                    {trainer?.achivements || "No specialization"}
                  </Card.Text>
                  <div className="star-rating-wrapper">
                    <StarRating rating={trainer?.rating} />
                  </div>
                </Card.Body>
              </Card>
            );

            if (filteredTrainers.length === index + 1) {
              return (
                <Col
                  ref={lastTrainerElementRef}
                  xs={12} sm={6} md={4} lg={3}
                  className="mb-4"
                  key={trainer?.trainerId}
                >
                  {trainerCard}
                </Col>
              );
            } else {
              return (
                <Col
                  xs={12} sm={6} md={4} lg={3}
                  className="mb-4"
                  key={trainer?.trainerId}
                >
                  {trainerCard}
                </Col>
              );
            }
          })}
        </Row>
        {(loading || fetching) && (
          <div className="loading-spinner-wrapper">
            <div className="loading-spinner">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mt-2 text-white">Loading more trainers...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrainersList;
