import React, { useRef, useState } from "react";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { useForm } from "react-hook-form";
import DatePicker from "react-date-picker";
import { Routes } from "../../routes";
import { useHistory } from "react-router-dom";

const UserForm = () => {
  const [dob, onChange] = useState(new Date());
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => reset(data);
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">User Details</h5>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  {...register("firstname", { required: "requierd" })}
                  type="text"
                  placeholder="Enter your first name"
                />
                <p className="text-danger">
                  {errors.firstname && errors.firstname.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  {...register("lastname", { required: "requierd" })}
                  type="text"
                  placeholder="Enter your last name"
                />
                <p className="text-danger">
                  {errors.lastname && errors.lastname.message}
                </p>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Birthday</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </InputGroup.Text>
                  <DatePicker
                    className="form-control"
                    onChange={onChange}
                    value={dob}
                    minDate={moment().subtract(150, "years")._d}
                    maxDate={moment().subtract(18, "years")._d}
                  />
                </InputGroup>
                <p className="text-danger">
                  {errors.dob && errors.dob.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="name@company.com"
                  {...register("email", {
                    required: "requierd",
                    pattern: {
                      value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                      message: "Invalid",
                    },
                  })}
                />
                <p className="text-danger">
                  {errors.email && errors.email.message}
                </p>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  name="password"
                  {...register("password", {
                    required: "You must specify a password",
                    pattern: {
                      value:
                        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                      message:
                        "password should contain atleast one number and one special character",
                    },
                    maxLength: {
                      value: 16,
                      message: "Password must have at least 16 characters",
                    },
                    minLength: {
                      value: 4,
                      message: "Password must have at least 4 characters",
                    },
                  })}
                />
                <p className="text-danger">
                  {errors.password && errors.password.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Comfirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Comfirm Password"
                  {...register("comfirmpassword", {
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                />
                <p className="text-danger">
                  {errors.comfirmpassword && errors.comfirmpassword.message}
                </p>
              </Form.Group>
            </Col>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                {...register("file", { required: "requierd" })}
                type="file"
                multiple
                placeholder="Enter your first name"
              />
              <p className="text-danger">
                {errors.file && errors.file.message}
              </p>
            </Form.Group>
          </Row>

          <div className="mt-3">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button
              className="mx-5"
              variant="primary"
              type="submit"
              onClick={() => history.push(Routes.Users.path)}
            >
              Back To HomePage
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserForm;
