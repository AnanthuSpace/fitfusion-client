import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { verifyTrainer } from "../../redux/admin/adminThunk";

const RejectionModal = ({ show, onClose, trainerId }) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const { isLoading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const onSubmit = () => {
    if (!rejectionReason.trim()) {
      setError("Rejection reason is required");
      return;
    }

    dispatch(
      verifyTrainer({
        trainerId,
        isVerified: "rejected",
        reason: rejectionReason,
      })
    ).then((res) => {
      if (res.payload && res.payload.data.success) {
        setRejectionReason("");
        setError("");
        onClose();
      } else {
        setError("Failed to reject the trainer.");
      }
    });
  };

  return (
    <Modal show={show} centered onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-white">Reject Trainer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          className="form-control"
          placeholder="Enter rejection reason"
          value={rejectionReason}
          onChange={(e) => {
            setRejectionReason(e.target.value);
            setError("");
          }}
          rows={3}
        />
        {error && <p className="text-danger mt-2">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          className="gradient-red-white"
          onClick={onSubmit}
          disabled={!rejectionReason.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RejectionModal;
