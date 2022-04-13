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
import DatePicker from "@mui/lab/DatePicker";
import { routes } from "../../routes";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/Role/action";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const schema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  email: yup
    .string()
    .matches(emailRegex, "Must be a valid email!")
    .required("required"),
  dateOfBirth: yup
    .string()
    .nullable()
    .test("dateOfBirth", "You must be 18 years or older", function (value) {
      return moment().diff(moment(value, "MM-DD-YYYY"), "years") >= 18;
    }),
  password: yup
    .string()
    .matches(
      passwordRegex,
      "one lowercase, uppercase, number, special character required!"
    )
    .min(8, "Minimun 8 Character Required!")
    .required("Please Enter Password!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must be same!")
    .required("Required Field!"),
  image: yup
    .mixed()
    .test("required", "photo is required", (value) => value.length > 0),
});
const UserForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  let intialvalue = {
    comfirmpassword: "",
    image: "",
    dob: new Date(),
    email: "",
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
    resolver: yupResolver(schema),
  });
  const password = useRef({});
  password.current = watch("password", "");

  useEffect(() => {
    dispatch(actions.getRoleRequest());
  }, []);

  const roles = useSelector((state) => state.role.role);

  const onSubmit = (data) => {
    console.log(data);
  };
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
                  label="first_name"
                  variant="standard"
                  type="text"
                  {...register("first_name")}
                  error={Boolean(errors.first_name)}
                />
                <p className="text-danger">
                  {errors.first_name && errors.first_name.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <TextField
                  fullWidth
                  label="last_name"
                  variant="standard"
                  type="text"
                  {...register("last_name")}
                  error={Boolean(errors.last_name)}
                />
                <p className="text-danger">
                  {errors.last_name && errors.last_name.message}
                </p>
              </Form.Group>
            </Col>
          </Row>

          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group md="4" className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    defaultValue={null}
                    render={({
                      field: { onChange, value },
                      fieldState: { error, invalid },
                    }) => (
                      <DatePicker
                        label="Date of birth"
                        disableFuture
                        value={value}
                        error={true}
                        onChange={(value) =>
                          onChange(moment(value).format("MM-DD-YYYY"))
                        }
                        renderInput={(params) => (
                          <TextField
                            error={Boolean(errors.dateOfBirth)}
                            id="dateOfBirth"
                            variant="standard"
                            margin="dense"
                            fullWidth
                            color="primary"
                            autoComplete="bday"
                            {...params}
                          />
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>

                <p className="text-danger">
                  {errors.dateOfBirth && errors.dateOfBirth.message}
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
                  {...register("email")}
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
                  error={Boolean(errors.password)}
                  {...register("password")}
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
                  error={Boolean(errors.confirmPassword)}
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                />
                <p className="text-danger">
                  {errors.confirmPassword && errors.confirmPassword.message}
                </p>
              </Form.Group>
            </Col>
            <Form.Group>
              <input
                type="file"
                label="profile picture"
                fullWidth
                multiple
                variant="standard"
                accept={["image/jpeg", "image/png", "image/bmp"]}
                {...register("image")}
                placeholder="Enter your first name"
                error={Boolean(errors.image)}
              />
              <p className="text-danger">
                {errors.image && errors.image.message}
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
              onClick={() => history.push(routes.User.path)}
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
