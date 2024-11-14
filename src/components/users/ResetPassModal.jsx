import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const ResetPassModal = ({ show, handleClose, handlePasswordSubmit }) => {
  const passwordStrengthCriteria = {
    minLength: 8,
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasNumber: /[0-9]/,
  };

  const passValidationSchema = Yup.object({
    newPassword: Yup.string()
      .min(
        passwordStrengthCriteria.minLength,
        `Password must be at least ${passwordStrengthCriteria.minLength} characters`
      )
      .matches(
        passwordStrengthCriteria.hasUpperCase,
        "Password must contain at least one uppercase letter"
      )
      .matches(
        passwordStrengthCriteria.hasLowerCase,
        "Password must contain at least one lowercase letter"
      )
      .matches(
        passwordStrengthCriteria.hasNumber,
        "Password must contain at least one number"
      )
      .required("Please enter a new password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords do not match")
      .required("Please confirm your new password"),
  });

  const passFormik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: passValidationSchema,
    onSubmit: (values) => {
      handlePasswordSubmit(values);
    },
  });

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      contentClassName="p-0"
      className="text-white"
    >
      <Modal.Header style={{ backgroundColor: "black", borderBottom: "none" }}>
        <Modal.Title className="w-100 text-center text-white">
          Reset Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "black", color: "white" }}>
        <Form
          onSubmit={passFormik.handleSubmit}
          style={{ borderBottom: "none" }}
        >
          <Form.Group>
            <Form.Control
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              className="custom-placeholder"
              value={passFormik.values.newPassword}
              onChange={passFormik.handleChange}
              onBlur={passFormik.handleBlur}
              isInvalid={
                passFormik.touched.newPassword && passFormik.errors.newPassword
              }
            />
            <Form.Control.Feedback type="invalid">
              {passFormik.errors.newPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              className="custom-placeholder"
              value={passFormik.values.confirmPassword}
              onChange={passFormik.handleChange}
              onBlur={passFormik.handleBlur}
              isInvalid={
                passFormik.touched.confirmPassword &&
                passFormik.errors.confirmPassword
              }
            />
            <Form.Control.Feedback type="invalid">
              {passFormik.errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "black", borderTop: "none" }}>
        <Button className="gradient-red-white me-1" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          className="gradient-blue-white"
          onClick={passFormik.handleSubmit}
          type="submit"
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResetPassModal;
