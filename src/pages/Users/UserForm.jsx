import React, { useEffect, useRef, useState } from "react";
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
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-date-picker";
import { routes } from "../../routes";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/Role/action";
import { TextField } from "@mui/material";

const UserForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  let intialvalue = {
    comfirmpassword: "",
    dob: new Date(),
    email: "",
    file: { FileList: {} },
    firstname: "",
    lastname: "",
    password: "@123",
    role: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: intialvalue,
  });
  const password = useRef({});
  password.current = watch("password", "");

  useEffect(() => {
    dispatch(actions.getRoleRequest());
  }, []);

  const roles = useSelector((state) => state.role.role);

  const onSubmit = (data) => console.log(data);
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">User Details</h5>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Select your Role</Form.Label>
              <Form.Select {...register("role", { required: "requierd" })}>
                <option value="">Role...</option>
                <option value="HR">HR</option>
                <option value="Interviwer">Interviwer</option>
                {roles.map((role) => {
                  return (
                    <React.Fragment key={role.id}>
                      <option value={role.roleType}>{role.roleType}</option>
                    </React.Fragment>
                  );
                })}
              </Form.Select>
              <p className="text-danger">
                {errors.role && errors.role.message}
              </p>
            </Form.Group>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <TextField
                  fullWidth
                  label="first name"
                  variant="standard"
                  type="text"
                  {...register("firstname", { required: "requierd" })}
                  error={Boolean(errors.firstname)}
                />
                <p className="text-danger">
                  {errors.firstname && errors.firstname.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <TextField
                  fullWidth
                  label="last name"
                  variant="standard"
                  type="text"
                  {...register("lastname", { required: "requierd" })}
                  error={Boolean(errors.lastname)}
                />
                <p className="text-danger">
                  {errors.lastname && errors.lastname.message}
                </p>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group md="4" className="mb-3">
                <Form.Label>Date</Form.Label>

                <Controller
                  control={control}
                  name="dob"
                  render={({ field }) => (
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <DatePicker
                        className="form-control"
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        dateFormat="d MMM yyyy"
                        minDate={moment().subtract(150, "years")._d}
                        maxDate={moment().subtract(18, "years")._d}
                      />
                    </InputGroup>
                  )}
                />
                <p className="text-danger">
                  {errors.date && errors.date.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <TextField
                  type="email"
                  label="name@company.com"
                  fullWidth
                  variant="standard"
                  error={Boolean(errors.email)}
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
                <TextField
                  type="password"
                  label="password"
                  fullWidth
                  variant="standard"
                  error={Boolean(errors.email)}
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
                <TextField
                  type="password"
                  fullWidth
                  variant="standard"
                  label="Comfirm Password"
                  error={Boolean(errors.comfirmpassword)}
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
              <TextField
                type="file"
                label="profile picture"
                fullWidth
                multiple
                variant="standard"
                {...register("file", { required: "requierd" })}
                placeholder="Enter your first name"
                error={Boolean(errors.file)}
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
              onClick={() => history.push(routes.Users.path)}
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
