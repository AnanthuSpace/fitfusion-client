import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { PublishableKey } from "../../utils/publishKey";

const stripePromise = loadStripe(PublishableKey);

const CheckoutForm = ({ trainerId, amount, handleClose }) => {
  
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const { data: clientSecret } = await axios.post(
        "http://localhost:3000/create-payment-intent",
        { trainerId, amount }
      );

      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Trainer Subscriber",
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
        handleClose();
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div className="text-danger mt-3">{error}</div>}
      <Button type="submit" className="mt-3" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay $100"}
      </Button>
    </Form>
  );
};

const StripeCheckoutModal = ({ show, handleClose, trainerId, amount }) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton style={{ backgroundColor: "white" }}>
      <Modal.Title className="text-black">Checkout</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ backgroundColor: "white" }}>
      <Elements stripe={stripePromise}>
        <CheckoutForm trainerId={trainerId} amount={amount} handleClose={handleClose} />
      </Elements>
    </Modal.Body>
  </Modal>
);

export default StripeCheckoutModal;
