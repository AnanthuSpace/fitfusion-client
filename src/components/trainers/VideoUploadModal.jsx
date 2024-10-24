import React from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

function VideoUploadModal({
  show,
  handleClose,
  videoData,
  handleChange,
  handleVideoUpload,
}) {
  const { isLoading } = useSelector((state) => state.trainer);

  return (
    <Modal
      show={show}
      centered
      onHide={handleClose}
      backdrop="static"
      className="glass-effect"
    >
      {isLoading ? (
        <Modal.Body className="p-0 m-0">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100%", width: "100%" }}
          >
            <Spinner animation="border" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="text-white ms-3">Uploading your video...</p>
          </div>
        </Modal.Body>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title className="text-white">Upload Video</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0">
            <Form onSubmit={handleVideoUpload} style={{ padding: "20px" }}>
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
                  name="videoFile"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Upload Thumbnail</Form.Label>
                <Form.Control
                  type="file"
                  name="thumbnail"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Modal.Footer style={{ borderTop: "none" }}>
                <Button
                  className="gradient-red-white"
                  onClick={handleClose}
                  style={{ width: "30%" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="gradient-blue-white"
                  style={{ width: "30%" }}
                >
                  Upload
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
}

export default VideoUploadModal;
