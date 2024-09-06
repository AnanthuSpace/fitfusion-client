import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function VideoUploadModal({ show, handleClose, videoData, handleChange, handleVideoUpload }) {
  return (
    <Modal show={show} centered onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="text-white">Upload Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleVideoUpload}>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Video Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={videoData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={videoData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-white">Upload Video</Form.Label>
            <Form.Control
              type="file"
              name="file"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Modal.Footer style={{ borderTop: "none" }}>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ width: "30%" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              style={{ width: "30%" }}
            >
              Upload
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default VideoUploadModal;
