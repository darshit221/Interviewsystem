import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
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
import { Routes } from "../../routes";
import { useHistory } from "react-router-dom";

const InterviewResultForm = () => {
  const [birthday, setBirthday] = useState("");
  const history = useHistory();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group md="4" className="mb-3">
            <Form.Label>Date</Form.Label>

            <Datetime
              timeFormat={false}
              onChange={setBirthday}
              renderInput={(props, openCalendar) => (
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    {...register("Date", { required: "requierd" })}
                    value={
                      birthday ? moment(birthday).format("MM/DD/YYYY") : ""
                    }
                    placeholder="mm/dd/yyyy"
                    onFocus={openCalendar}
                  />
                </InputGroup>
              )}
            />
            <p className="text-danger">{errors.Date && errors.Date.message}</p>
          </Form.Group>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  {...register("Name", { required: "requierd" })}
                />
                <p className="text-danger">
                  {errors.Name && errors.Name.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>InterviewResult</Form.Label>
                <Form.Select
                  {...register("InterviewResult", { required: "requierd" })}
                >
                  <option value=""></option>
                  <option value="Dhaval">Dhaval</option>
                  <option value="Ridhi">Ridhi</option>
                  <option value="Renish">Renish</option>
                  <option value="Malay">Malay</option>
                </Form.Select>
                <p className="text-danger">
                  {errors.InterviewResult && errors.InterviewResult.message}
                </p>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Technologies</Form.Label>
                <Form.Select
                  required
                  {...register("Technologies", { required: "requierd" })}
                >
                  <option value=""></option>
                  <option value="React">React</option>
                  <option value="Angular">Angular</option>
                  <option value="Vue">Vue</option>
                  <option value="Node">Node</option>
                </Form.Select>
                <p className="text-danger">
                  {errors.Technologies && errors.Technologies.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Experince</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Experince"
                  {...register("Experince", { required: "requierd" })}
                />
                <p className="text-danger">
                  {errors.Experince && errors.Experince.message}
                </p>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Round</Form.Label>
                <Form.Select
                  required
                  {...register("Round", { required: "requierd" })}
                >
                  <option value=""></option>
                  <option value="practical">practical</option>
                  <option value="Technical">Technical</option>
                </Form.Select>
                <p className="text-danger">
                  {errors.Round && errors.Round.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Communication</Form.Label>
                <Form.Select
                  required
                  {...register("Communication", { required: "requierd" })}
                >
                  <option value=""></option>
                  <option value="Expert">Expert</option>
                  <option value="Good">Good</option>
                  <option value="Poor">Poor</option>
                </Form.Select>
                <p className="text-danger">
                  {errors.Communication && errors.Communication.message}
                </p>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Practical Completion (1-100%)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Practical Completion"
                  {...register("Practical", {
                    required: "requierd",
                    min: {
                      value: 1,
                      message: "enter only 1 to 100",
                    },
                    max: {
                      value: 100,
                      message: "enter only 1 to 100",
                    },
                  })}
                />
                <p className="text-danger">
                  {errors.Practical && errors.Practical.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Coding Standard (1-100%)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Coding"
                  {...register("Coding", {
                    required: "requierd",
                    min: {
                      value: 1,
                      message: "enter only 1 to 100",
                    },
                    max: {
                      value: 100,
                      message: "enter only 1 to 100",
                    },
                  })}
                />
                <p className="text-danger">
                  {errors.Coding && errors.Coding.message}
                </p>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Technical Round (1-100%)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Technical Round"
                  {...register("Technical", {
                    required: "requierd",
                    min: {
                      value: 1,
                      message: "enter only 1 to 100",
                    },
                    max: {
                      value: 100,
                      message: "enter only 1 to 100",
                    },
                  })}
                />
                <p className="text-danger">
                  {errors.Technical && errors.Technical.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>
                  Note (Please Add Done And Not Done Points)
                </Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="Your Answer"
                  {...register("Note", {
                    required: "requierd",
                  })}
                />
                <p className="text-danger">
                  {errors.Note && errors.Note.message}
                </p>
              </Form.Group>
            </Col>
          </Row>

          <div className="mt-3">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button
              className="mx-5"
              variant="primary"
              type="submit"
              onClick={() => history.push(Routes.InterviewResult.path)}
            >
              Back To HomePage
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default InterviewResultForm;
