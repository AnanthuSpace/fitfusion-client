import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../../redux/users/userThunk";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/users/UserDetailsForm.css";

function UserDetailsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [medicalHistory, setMedicalHistory] = useState(false);

  const initialValues = {
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
    dietary: "",
    goals: "",
    medicalDetails: "",
  };

  const validationSchema = Yup.object({
    age: Yup.number().required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    weight: Yup.number().required("Weight is required"),
    height: Yup.number().required("Height is required"),
    activityLevel: Yup.string().required("Activity level is required"),
    dietary: Yup.string().required("Dietary preference is required"),
    goals: Yup.string().required("Please select a goal"),
    medicalDetails: Yup.string().when("medicalHistory", {
      is: true,
      then: Yup.string().required("Please provide medical details"),
    }),
  });

  const handleSubmit = (values) => {
    dispatch(addUserDetails(values)).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="text-center mb-4">Personal Details</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="p-4 border rounded shadow-sm bg-light">
                <div className="form-group mb-3">
                  <label>Age</label>
                  <Field
                    type="number"
                    name="age"
                    className="form-control input-transparent"
                  />
                  <ErrorMessage name="age" component="div" className="text-danger" />
                </div>

                <div className="form-group mb-3">
                  <label>Gender</label>
                  <Field
                    as="select"
                    name="gender"
                    className="form-select"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" className="text-danger" />
                </div>

                <div className="form-group mb-3">
                  <label>Weight (kg)</label>
                  <Field
                    type="number"
                    name="weight"
                    className="form-control input-transparent "
                  />
                  <ErrorMessage name="weight" component="div" className="text-danger" />
                </div>

                <div className="form-group mb-3">
                  <label>Height (cm)</label>
                  <Field
                    type="number"
                    name="height"
                    className="form-control input-transparent"
                  />
                  <ErrorMessage name="height" component="div" className="text-danger" />
                </div>

                <div className="form-group mb-3">
                  <label>Activity Level</label>
                  <Field
                    as="select"
                    name="activityLevel"
                    className="form-select"
                  >
                    <option value="">Select activity level</option>
                    <option value="sedentary">Sedentary</option>
                    <option value="moderately active">Moderately Active</option>
                    <option value="very active">Very Active</option>
                  </Field>
                  <ErrorMessage name="activityLevel" component="div" className="text-danger" />
                </div>

                <div className="form-group mb-3">
                  <label>Any Medical Problems</label>
                  <div className="form-check">
                    <Field
                      type="checkbox"
                      name="medicalHistory"
                      className="form-check-input"
                      onChange={() => setMedicalHistory(!medicalHistory)}
                    />
                    <label className="form-check-label">Yes</label>
                  </div>
                  <ErrorMessage name="medicalHistory" component="div" className="text-danger" />
                  {medicalHistory && (
                    <div className="form-group mt-2">
                      <label>Please provide details</label>
                      <Field
                        type="text"
                        name="medicalDetails"
                        className="form-control input-transparent"
                      />
                      <ErrorMessage name="medicalDetails" component="div" className="text-danger" />
                    </div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label>Dietary Preference</label>
                  <Field
                    as="select"
                    name="dietary"
                    className="form-select"
                  >
                    <option value="">Select dietary preference</option>
                    <option value="veg">Veg</option>
                    <option value="nonveg">Non-Veg</option>
                    <option value="both">Both</option>
                  </Field>
                  <ErrorMessage name="dietary" component="div" className="text-danger" />
                </div>

                <div className="form-group mb-4">
                  <label>Goals</label>
                  <div className="form-check">
                    <Field
                      type="radio"
                      name="goals"
                      value="weight gain"
                      className="form-check-input"
                    />
                    <label className="form-check-label">Weight Gain</label>
                  </div>
                  <div className="form-check">
                    <Field
                      type="radio"
                      name="goals"
                      value="weight loss"
                      className="form-check-input"
                    />
                    <label className="form-check-label">Weight Loss</label>
                  </div>
                  <div className="form-check">
                    <Field
                      type="radio"
                      name="goals"
                      value="maintenance"
                      className="form-check-input"
                    />
                    <label className="form-check-label">Maintenance</label>
                  </div>
                  <div className="form-check">
                    <Field
                      type="radio"
                      name="goals"
                      value="muscle gain"
                      className="form-check-input"
                    />
                    <label className="form-check-label">Muscle Gain</label>
                  </div>
                  <div className="form-check">
                    <Field
                      type="radio"
                      name="goals"
                      value="toning"
                      className="form-check-input"
                    />
                    <label className="form-check-label">Toning</label>
                  </div>
                  <ErrorMessage name="goals" component="div" className="text-danger" />
                </div>

                <button type="submit" className="btn gradient-blue-white text-white w-100">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default UserDetailsForm;
