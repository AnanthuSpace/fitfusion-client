import React from 'react';
import { useDispatch } from 'react-redux';
import { createCheckoutSession } from '../../redux/users/userThunk';

function SubscribeButton({ trainerId }) {
  const dispatch = useDispatch();

  const handleSubscribeClick = () => {
    dispatch(createCheckoutSession({ trainerId, amount: 100 }));
  };

  return (
    <button className="glass-button" onClick={handleSubscribeClick}>
      Subscribe $100
    </button>
  );
}

export default SubscribeButton;
