import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckoutSession } from '../../redux/users/userThunk';
import { Spinner } from 'react-bootstrap';

function SubscribeButton({ trainerId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const loading = useSelector((state) => state.user.isLoading); 

  const handleSubscribeClick = () => {
    dispatch(createCheckoutSession({ trainerId, amount: 100 }));
  };

  const isSubscribed = user?.subscribeList?.includes(trainerId);

  return (
    <div>
      {isSubscribed ? (
        <div className="tutorial-videos">
          <h3>Tutorial Videos</h3>
          <ul>
            <li><a href="#video1">Video 1</a></li>
            <li><a href="#video2">Video 2</a></li>
            <li><a href="#video3">Video 3</a></li>
          </ul>
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
