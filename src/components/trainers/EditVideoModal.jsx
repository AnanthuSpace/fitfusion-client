import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { EditVideos } from "../../redux/trainers/trainerThunk";
import { useDispatch } from "react-redux";

const EditVideoModal = ({ show, onHide, video, onSave }) => {
  const [title, setTitle] = useState(video?.title || "");
  const [description, setDescription] = useState(video?.description || "");
  const [category, setCategory] = useState(video?.category || "");
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
      setThumbnail(null);
      setVideoFile(null);
    }
  }, [video]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData();

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    if (videoFile) {
      formData.append("videoFile", videoFile);
    }

    try {
      await dispatch(
        EditVideos({
          videoId: video.videoId,
          title: title,
          description: description,
          category: category,
          formData: formData,
        })
      );

      const updatedVideo = { ...video, title, description };
      onSave(updatedVideo);
      onHide();
    } catch (error) {
      console.error("Error updating video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      contentClassName="p-0"
      backdrop="static"
    >
      <Modal.Header style={{ backgroundColor: "black", borderBottom: "none" }}>
        <Modal.Title className="text-white">Edit Video</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "black" }}>
        <Form>
          <Form.Group controlId="formVideoTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formVideoDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-white">Category</Form.Label>
            <Form.Select
              className="bg-black text-white"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              <option value="Functional Training">Functional Training</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formThumbnail" className="mt-3">
            <Form.Label>Thumbnail (optional)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
          </Form.Group>

          <Form.Group controlId="formVideoFile" className="mt-3">
            <Form.Label>Video File (optional)</Form.Label>
            <Form.Control
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-black" style={{ borderTop: "none" }}>
        <Button
          className="gradient-red-white"
          onClick={onHide}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          className="gradient-blue-white"
          onClick={handleSave}
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
              />{" "}
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditVideoModal;
