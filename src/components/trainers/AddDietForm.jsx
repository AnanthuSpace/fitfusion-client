import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AddDietPlan } from "../../redux/trainers/trainerThunk"; 

const AddDietForm = ({ trainerId }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        dietName: "",
        description: "",
        meals: [{ mealTime: "", items: [""] }],
      }}
      validationSchema={Yup.object({
        dietName: Yup.string().required("Diet Name is required"),
        description: Yup.string().required("Description is required"),
        meals: Yup.array().of(
          Yup.object().shape({
            mealTime: Yup.string().required("Meal Time is required"),
            items: Yup.array().of(Yup.string().required("Item is required")),
          })
        ),
      })}
      onSubmit={(values, { resetForm }) => {
        dispatch(AddDietPlan({ dietPlan: values }));
        resetForm();
      }}
    >
      {({ values }) => (
        <Form className="glass-effect">
          <div className="form-group mb-3">
            <label htmlFor="dietName" className="text-white">Diet Name</label>
            <Field
              name="dietName"
              type="text"
              className="form-control glass-input"
            />
            <ErrorMessage name="dietName" component="div" className="text-danger" />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="description" className="text-white">Description</label>
            <Field
              name="description"
              as="textarea"
              className="form-control glass-input"
            />
            <ErrorMessage name="description" component="div" className="text-danger" />
          </div>

          <FieldArray name="meals">
            {({ remove, push }) => (
              <div>
                {values.meals.map((meal, index) => (
                  <div key={index} className="meal-section">
                    <div className="form-group mb-3">
                      <label htmlFor={`meals.${index}.mealTime`} className="text-white">Meal Time</label>
                      <Field
                        as="select"
                        name={`meals.${index}.mealTime`}
                        className="form-control glass-input"
                      >
                        <option value="">Select Meal Time</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="midDay">Mid-Day Snack</option>
                        <option value="lunch">Lunch</option>
                        <option value="afternoon">Afternoon Snack</option>
                        <option value="dinner">Dinner</option>
                      </Field>
                      <ErrorMessage
                        name={`meals.${index}.mealTime`}
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <FieldArray name={`meals.${index}.items`}>
                      {({ remove, push }) => (
                        <div>
                          {meal.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="form-group mb-3 d-flex align-items-center">
                              <Field
                                name={`meals.${index}.items.${itemIndex}`}
                                type="text"
                                className="form-control glass-input"
                              />
                              <ErrorMessage
                                name={`meals.${index}.items.${itemIndex}`}
                                component="div"
                                className="text-danger"
                              />
                              <Button
                                type="button"
                                onClick={() => remove(itemIndex)}
                                className="ml-2 gradient-red-white"
                              >
                                <FaMinus />
                              </Button>
                              <Button
                                type="button"
                                onClick={() => push("")}
                                className="ml-2 gradient-blue-white"
                              >
                                <FaPlus />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </FieldArray>

                    <div className="d-flex">
                      <Button
                        variant="danger"
                        type="button"
                        onClick={() => remove(index)}
                        className="mb-3 gradient-red-white mr-auto"
                      >
                        Remove List
                      </Button>

                      <Button
                        type="button"
                        onClick={() => push({ mealTime: "", items: [""] })}
                        className="gradient-blue-white"
                        style={{ height: "2.3rem" }}
                      >
                        Add List
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </FieldArray>
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              className="gradient-blue-white"
              style={{ marginTop: "20px" }}
            >
              Add Diet Plan
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddDietForm;
