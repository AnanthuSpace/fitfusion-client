import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckoutSession } from '../../redux/users/userThunk';
import { Spinner } from 'react-bootstrap';
import '../../assets/styles/users/SubscribeButton.css'

function SubscribeButton({ trainerId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const loading = useSelector((state) => state.user.isLoading);

  const handleSubscribeClick = () => {
    dispatch(createCheckoutSession({ trainerId, amount: 100 }));
  };

  const isSubscribed = user?.subscribeList?.includes(trainerId);

  return (
    <div className='video-main'>
      {isSubscribed ? (
        <div className="video-thumbnails-container mt-5">
          <div className="video-grid">
            <div className="video-thumbnail">
              <img src="https://via.placeholder.com/150" alt="Video 1" />
              <p>Video 1</p>
            </div>
            <div className="video-thumbnail">
              <img src="https://via.placeholder.com/150" alt="Video 2" />
              <p>Video 2</p>
            </div>
            <div className="video-thumbnail">
              <img src="https://via.placeholder.com/150" alt="Video 3" />
              <p>Video 3</p>
            </div>
            <div className="video-thumbnail">
              <img src="https://via.placeholder.com/150" alt="Video 4" />
              <p>Video 4</p>
            </div>
            <div className="video-thumbnail">
              <img src="https://via.placeholder.com/150" alt="Video 5" />
              <p>Video 5</p>
            </div>
            <div className="video-thumbnail">
              <img src="https://via.placeholder.com/150" alt="Video 6" />
              <p>Video 6</p>
            </div>
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
              />{' '}
              Processing...
            </>
          ) : (
            'Subscribe $100'
          )}
        </button>
      )}
    </div>
  );
}

export default SubscribeButton;
