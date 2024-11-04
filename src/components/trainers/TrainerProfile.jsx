import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  editTrainer,
  changeTrainerPassword,
  updateProfilePicture,
  fetchTrainerProfile,
} from "../../redux/trainers/trainerThunk";
import { FaEdit } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/trainers/TrainerProfile.css";

function TrainerProfile() {
  const trainer = useSelector((state) => state.trainer.trainerData);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    dispatch(fetchTrainerProfile());
  }, [dispatch]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    gender: Yup.string().required("Gender is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    qualification: Yup.string().required("Qualification is required"),
    achivements: Yup.string().required("achivements are required"),
    feePerMonth: Yup.number().required("Fee per month is required").positive("Fee per month must be positive"),
    experience: Yup.number()
      .required("Experience is required")
      .positive("Experience must be positive"),
  });

  const handleUpdate = (values) => {
    dispatch(editTrainer(values));
  };

  const handleResetPassword = () => {
    dispatch(changeTrainerPassword({ oldPass: oldPassword, newPass: newPassword }));
    setOldPassword("");
    setNewPassword("");
    setShowModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(updateProfilePicture(file));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-center glass-effect text-white">
            <div className="position-relative">
              <img
                src={`${trainer?.profileIMG}`}
                className="card-img-top mx-auto mt-4"
                alt="profileIMG"
                style={{ width: "130px", height: "130px", borderRadius: "50%" }}
              />
              <label htmlFor="profileImageUpload" className="edit-icon">
                <FaEdit size={24} color="white" />
              </label>
              <input
                type="file"
                accept="image/*"
                id="profileImageUpload"
                onChange={handleImageChange}
                className="d-none"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{trainer?.name}</h5>
              <p className="card-text text-muted">{trainer?.role || "Fitness Trainer"}</p>
              <p className="card-text">Address: {trainer?.address}</p>
              <p className="card-text">Level: {trainer?.level || "Advanced"}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card glass-effect text-white">
            <div className="card-body">
              <h5 className="card-title">Profile Information</h5>
              <Formik
                initialValues={{
                  name: trainer?.name || "",
                  gender: trainer?.gender || "",
                  phone: trainer?.phone || "",
                  address: trainer?.address || "",
                  qualification: trainer?.qualification || "",
                  achivements: trainer?.achivements || "",
                  feePerMonth: trainer?.feePerMonth || "",
                  experience: trainer?.experience || "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleUpdate}
                enableReinitialize
              >
                {() => (
                  <Form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <Field
                            type="text"
                            name="name"
                            className="form-control bg-transparent text-white"
                          />
                          <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="gender">Gender</label>
                          <Field
                            type="text"
                            name="gender"
                            className="form-control bg-transparent text-white"
                          />
                          <ErrorMessage name="gender" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="qualification">Qualification</label>
                          <Field
                            type="text"
                            name="qualification"
                            className="form-control bg-transparent text-white"
                          />
                          <ErrorMessage name="qualification" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="experience">Experience in years</label>
                          <Field
                            type="number"
                            name="experience"
                            className="form-control bg-transparent text-white"
                          />
                          <ErrorMessage name="experience" component="div" className="text-danger" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="phone">Phone</label>
                          <Field
                            type="text"
                            name="phone"
                            className="form-control bg-transparent text-white"
                          />
                          <ErrorMessage name="phone" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="address">Address</label>
                          <Field
                            type="text"
                            name="address"
                            className="form-control bg-transparent text-white"
                          />
                          <ErrorMessage name="address" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="achivements">achivements</label>
                          <Field
                            type="text"
                            name="achivements"
                            className="form-control bg-transparent text-white"
                          />
                          <ErrorMessage name="achivements" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="feePerMonth">Fees Per Month</label>
                          <Field
                            type="number"
                            name="feePerMonth"
                            className="form-control bg-transparent text-white"
                          />
                          <ErrorMessage name="feePerMonth" component="div" className="text-danger" />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <button type="submit" className="btn gradient-blue-white text-white mt-4">
                        Save Profile
                      </button>
                      <button
                        type="button"
                        className="btn gradient-blue-white text-white mt-4"
                        onClick={() => setShowModal(true)}
                      >
                        Reset Password
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5 className="text-center text-white mb-4">Reset Password</h5>
            <div className="form-group">
              <label htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                className="form-control bg-black text-white"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                className="form-control bg-black text-white"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn gradient-blue-white text-white"
                onClick={handleResetPassword}
              >
                Submit
              </button>
              <button
                className="btn btn-black text-white"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainerProfile;
