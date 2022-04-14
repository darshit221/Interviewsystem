import React, { useEffect, useRef } from "react";
import moment from "moment-timezone";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "@mui/lab/DatePicker";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/lab";
import { routes } from "../../routes";
import roleActions from "../../redux/Role/action";
import actions from "../../redux/User/action";

const passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const emailReg =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const schema = yup.object().shape({
  role: yup.string().required("required"),
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  email: yup
    .string()
    .matches(emailReg, "Must be a valid email!")
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
      passwordReg,
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
    .test("required", "image is required", (value) => value.length > 0),
});

function UserForm() {
  const { location } = useHistory();
  const { _id } = useParams();
  const dispatch = useDispatch();

  const roles = useSelector((state) => state.role.role);
  const { singleUser } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const password = useRef({});
  password.current = watch("password", "");

  useEffect(() => {
    dispatch(roleActions.getRoleRequest());
  }, [dispatch]);

  useEffect(() => {
    location.pathname === `/user/edit/userform/${_id}` &&
      dispatch(actions.getSingleUserRequest(_id));
  }, [dispatch, _id, location.pathname]);

  useEffect(() => {
    if (singleUser && location.pathname === `/user/edit/userform/${_id}`) {
      for (const key in singleUser) {
        setValue(key, singleUser[key]);
      }
    }
  }, [_id, singleUser, location.pathname, setValue]);

  const onSubmit = (data) => {
    const addFormData = new FormData();
    addFormData.append("role", data.role);
    addFormData.append("first_name", data.first_name);
    addFormData.append("last_name", data.last_name);
    addFormData.append("email", data.email);
    addFormData.append("password", data.password);
    addFormData.append("dateOfBirth", data.dateOfBirth);
    addFormData.append("image", data.image);

    const editFormData = new FormData();
    editFormData.append("role", data.role);
    editFormData.append("first_name", data.first_name);
    editFormData.append("last_name", data.last_name);
    editFormData.append("email", data.email);
    editFormData.append("password", data.password);
    editFormData.append("dateOfBirth", data.dateOfBirth);
    editFormData.append("image", data.image);

    if (location.pathname === "/user/add/userform") {
      dispatch(actions.createUserRequest(addFormData));
    }

    dispatch(
      actions.updateUserRequest({
        userData: editFormData,
        userId: _id,
      })
    );
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">User Registration</h5>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Select your Role</Form.Label>
              <Form.Select {...register("role", { required: "requierd" })}>
                <option value="">Role...</option>
                {roles.map((role) => {
                  const { roleType } = role;
                  return (
                    <React.Fragment key={role._id}>
                      <option value={role._id}>{roleType}</option>
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
                  sx={{ width: "100%" }}
                  label="firstName"
                  variant="outlined"
                  type="text"
                  {...register("first_name")}
                  error={!!errors.first_name}
                />
                <p className="text-danger">
                  {errors.first_name && errors.first_name.message}
                </p>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <TextField
                  sx={{ width: "100%" }}
                  label="lastName"
                  variant="outlined"
                  type="text"
                  {...register("last_name")}
                  error={!!errors.last_name}
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
                            error={!!errors.dateOfBirth}
                            id="dateOfBirth"
                            variant="outlined"
                            margin="dense"
                            sx={{ width: "100%" }}
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
                  label="Email"
                  sx={{ width: "100%" }}
                  variant="outlined"
                  error={!!errors.email}
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
                <TextField
                  type="password"
                  label="password"
                  sx={{ width: "100%" }}
                  variant="outlined"
                  error={!!errors.password}
                  {...register("password")}
                />
                <p className="text-danger">
                  {errors.password && errors.password.message}
                </p>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group>
                <TextField
                  type="password"
                  sx={{ width: "100%" }}
                  variant="outlined"
                  label="Comfirm Password"
                  error={!!errors.confirmPassword}
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
              <Form.Label>Profile Picture</Form.Label>
              <input
                type="file"
                label="profile picture"
                sx={{ width: "100%" }}
                multiple
                variant="outlined"
                accept={["image/jpeg", "image/png", "image/bmp"]}
                {...register("image")}
                placeholder="Enter your first name"
                error={!!errors.image}
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
              type="reset"
              as={Link}
              to={routes.User.path}
            >
              Back To HomePage
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserForm;
