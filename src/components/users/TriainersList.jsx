import React, { useEffect, useState, useRef, useCallback } from "react";
import { Card, Row, Col, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { localhostURL } from "../../utils/url";
import { fetchDeitPlans } from "../../redux/users/userThunk";
import userAxiosInstance from "../../config/axiosConfig";
import StarRating from "./StarRating";

function TrainersList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true); // To check if there are more trainers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const observer = useRef();
  const containerRef = useRef();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const response = await userAxiosInstance.get(
          `${localhostURL}/fetchTrainerScroll`,
          { params: { page } }
        );

        // If response has no trainers, set hasMore to false
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
      if (loading || fetching || !hasMore) return; // Prevent fetching if no more data

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setFetching(true);
          setTimeout(() => {
            setPage((prevPage) => prevPage + 1);
            setFetching(false);
          }, 1000); // 2-second delay
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
            if (filteredTrainers.length === index + 1) {
              return (
                <Col
                  ref={lastTrainerElementRef}
                  md={4}
                  lg={3}
                  className="mb-4"
                  key={trainer.trainerId}
                >
                  <Card
                    className="h-100 text-center glass-card"
                    onClick={() => handleCardClick(trainer.trainerId)}
                  >
                    <Card.Img
                      variant="top"
                      src={`${localhostURL}/${trainer.profileIMG}`}
                      alt={trainer.name}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.src = "/Trainer-profile.jpg";
                      }}
                    />
                    <Card.Body>
                      <Card.Title className="text-white">
                        {trainer.name}
                      </Card.Title>
                      <Card.Text className="text-white">
                        {trainer.achivements || "No specialization"}
                        <StarRating rating={trainer.rating} />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            } else {
              return (
                <Col md={4} lg={3} className="mb-4" key={trainer.trainerId}>
                  <Card
                    className="h-100 text-center glass-card"
                    onClick={() => handleCardClick(trainer.trainerId)}
                  >
                    <Card.Img
                      variant="top"
                      src={`${localhostURL}/${trainer.profileIMG}`}
                      alt={trainer.name}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.src = "/Trainer-profile.jpg";
                      }}
                    />
                    <Card.Body>
                      <Card.Title className="text-white">
                        {trainer.name}
                      </Card.Title>
                      <Card.Text className="text-white">
                        {trainer.achivements || "No specialization"}
                        <StarRating rating={trainer.rating} />
                      </Card.Text>
                    </Card.Body>
                  </Card>
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

      <style>{`
        /* WebKit browsers (Chrome, Safari) */
        div::-webkit-scrollbar {
          width: 12px;
          background-color: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background-color: #b249f8;
          border-radius: 10px;
        }
        /* Firefox */
        div {
          scrollbar-width: thin;
          scrollbar-color: #b249f8 transparent;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .loading-spinner-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
          width: 100%;
          position: absolute;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7); /* Optional background */
          border-top: 1px solid #b249f8;
        }
        .loading-spinner {
          text-align: center;
        }
        .loading-spinner .spinner-border {
          width: 3rem;
          height: 3rem;
          border-width: 0.5rem;
          border-color: white transparent white transparent; /* White spinner */
        }
        .loading-spinner p {
          color: white; /* Text color for the "Loading more trainers..." message */
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export default TrainersList;
