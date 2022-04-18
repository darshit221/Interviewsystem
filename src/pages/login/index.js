import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

import {
  Col,
  Row,
  Form,
  Button,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";

import BgImage from "../../assets/img/illustrations/signin.svg";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authActions from "../../redux/Auth/action";

function Signin() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(authActions.loginRequest(data));
  };
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        type="email"
                        placeholder="example@company.com"
                        {...register("email", {
                          required: "requierd",
                          pattern: {
                            value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                            message: "Invalid",
                          },
                        })}
                      />
                    </InputGroup>
                    <p className="text-danger">
                      {errors.email && errors.email.message}
                    </p>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          {...register("password", {
                            required: "You must specify a password",

                            minLength: {
                              value: 4,
                              message:
                                "Password must have at least 4 characters",
                            },
                            maxLength: {
                              value: 16,
                              message:
                                "Password must have at least 16 characters",
                            },
                          })}
                        />
                      </InputGroup>
                      <p className="text-danger">
                        {errors.password && errors.password.message}
                      </p>
                    </Form.Group>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default Signin;
