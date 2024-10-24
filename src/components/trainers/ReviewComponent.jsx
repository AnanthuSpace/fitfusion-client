import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap"; 
import { useDispatch } from "react-redux";
import { fetchAllReview } from "../../redux/trainers/trainerThunk";

const ReviewComponent = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const reviewsPerPage = 5;

  useEffect(() => {
    dispatch(fetchAllReview()).then((res) => {
      setReviews(res.payload.reviews || []);
    });
  }, [dispatch]);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <div className="glass-effect p-3" style={{ width: "95%", height: "90%" }}>
          <h3 className="text-white m-0 mb-3">Transaction History</h3>
          <Table responsive bordered hover className="table-dark text-white">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Feedback</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.length > 0 ? (
                currentReviews.map((review) => (
                  <tr key={review._id}>
                    <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                    <td>{review.userName}</td>
                    <td>{review.feedback}</td>
                    <td>{review.rating}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No reviews available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {/* Pagination Controls */}
          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || reviews.length < reviewsPerPage} 
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewComponent;
