import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { HIDE_FORM, ON_FORM_SUBMIT } from "../store/action";

import { Formik } from "formik";
import * as Yup from "yup";

export const AddForm = ({ editItem }) => {
  const dispatch = useDispatch();
  const formValues = editItem || { name: "" };

  return (
    <>
      <Formik
        initialValues={formValues}
        enableReinitialize={true}
        onSubmit={async (values) => {
          console.log(values);
          dispatch({ type: ON_FORM_SUBMIT, value: values });
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required("Enter Name")
            .max(50, "Maximum 50 characters are allowed"),
        })}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => {
          return (
            <>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={6}>
                    <Form.Control
                      placeholder="Enter Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      className={`${
                        touched.name && errors.name ? "is-invalid" : ""
                      }`}
                    />
                    {touched.name && errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </Col>
                  <Col lg={3}>
                    <div className="d-grid gap-2">
                      <Button type="submit">Save</Button>
                    </div>
                  </Col>
                  <Col lg={3}>
                    <div className="d-grid gap-2">
                      <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={() => dispatch({ type: HIDE_FORM })}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};
