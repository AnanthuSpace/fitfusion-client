import React, { useState } from "react";
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

  const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024; 
  const MAX_VIDEO_SIZE = 90 * 1024 * 1024; 

  const [fileErrors, setFileErrors] = useState({ thumbnail: "", videoFile: "" });

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const file = files[0];

    setFileErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    if (file) {
      if (name === "thumbnail" && file.size > MAX_THUMBNAIL_SIZE) {
        setFileErrors((prevErrors) => ({
          ...prevErrors,
          thumbnail: "Thumbnail file size exceeds the 2 MB limit.",
        }));
        return;
      }
      if (name === "videoFile" && file.size > MAX_VIDEO_SIZE) {
        setFileErrors((prevErrors) => ({
          ...prevErrors,
          videoFile: "Video file size exceeds the 50 MB limit.",
        }));
        return;
      }
    }

    handleChange(event);
  };

  return (
    <Modal
      show={show}
      centered
      onHide={handleClose}
      contentClassName="p-0"
      backdrop="static"
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
          <Modal.Header
            style={{ backgroundColor: "black", borderBottom: "none" }}
          >
            <Modal.Title className="text-white">Upload Video</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0" style={{ backgroundColor: "black" }}>
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
                <Form.Label className="text-white">Category</Form.Label>
                <Form.Select
                  className="bg-black text-white"
                  name="category"
                  value={videoData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Upper Body">Upper Body</option>
                  <option value="Lower Body">Lower Body</option>
                  <option value="Core & Abs">Core & Abs</option>
                  <option value="Cardio & Conditioning">
                    Cardio & Conditioning
                  </option>
                  <option value="Mobility & Flexibility">
                    Mobility & Flexibility
                  </option>
                  <option value="Functional Training">
                    Functional Training
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Upload Thumbnail</Form.Label>
                <Form.Control
                  type="file"
                  name="thumbnail"
                  onChange={handleFileChange}
                  required
                />
                {fileErrors.thumbnail && (
                  <Form.Text className="text-danger">
                    {fileErrors.thumbnail}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-white">Upload Video</Form.Label>
                <Form.Control
                  type="file"
                  name="videoFile"
                  onChange={handleFileChange}
                  required
                />
                {fileErrors.videoFile && (
                  <Form.Text className="text-danger">
                    {fileErrors.videoFile}
                  </Form.Text>
                )}
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
