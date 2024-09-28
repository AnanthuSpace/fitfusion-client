import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { EditVideos } from "../../redux/trainers/trainerThunk";
import { useDispatch } from "react-redux";

const EditVideoModal = ({ show, onHide, video, onSave }) => {
  const [title, setTitle] = useState(video?.title || "");
  const [description, setDescription] = useState(video?.description || "");
  const dispatch = useDispatch(); 

  useEffect(() => {
    if (video) {
      setTitle(video.title);
      setDescription(video.description);
    }
  }, [video]);

  const handleSave = () => {
    const updatedVideo = { ...video, title, description };
    dispatch(EditVideos(updatedVideo));
    onSave(updatedVideo);
    onHide(); 
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditVideoModal;
