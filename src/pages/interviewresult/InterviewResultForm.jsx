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
import { routes } from "../../routes";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import actions from "../../redux/InterviewResult/action";

const InterviewResultForm = () => {
  const [Day, setDay] = useState(new Date());
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(actions.createInterviewResult(data));
  };
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group md="4" className="mb-3">
            <Form.Label>Date</Form.Label>

            <Datetime
              timeFormat={false}
              onChange={setDay}
              renderInput={(props, openCalendar) => (
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    {...register("date", { required: "requierd" })}
                    value={Day ? moment(Day).format("MM/DD/YYYY") : ""}
                    placeholder="mm/dd/yyyy"
                    onFocus={openCalendar}
                  />
                </InputGroup>
              )}
            />
            <p className="text-danger">{errors.date && errors.date.message}</p>
          </Form.Group>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: "requierd" })}
                />
                <p className="text-danger">
                  {errors.name && errors.name.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Interviewer</Form.Label>
                <Form.Select
                  {...register("interviewer", { required: "requierd" })}
                >
                  <option value="">Interviewer...</option>
                  <option value="Dhaval">Dhaval</option>
                  <option value="Ridhi">Ridhi</option>
                  <option value="Renish">Renish</option>
                  <option value="Malay">Malay</option>
                </Form.Select>
                <p className="text-danger">
                  {errors.interviewer && errors.interviewer.message}
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
                  {...register("technology", { required: "requierd" })}
                >
                  <option value="">Technologies...</option>
                  <option value="React">React</option>
                  <option value="Angular">Angular</option>
                  <option value="Vue">Vue</option>
                  <option value="Node">Node</option>
                </Form.Select>
                <p className="text-danger">
                  {errors.technology && errors.technology.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Experince</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Experince"
                  {...register("experience", { required: "requierd" })}
                />
                <p className="text-danger">
                  {errors.experience && errors.experience.message}
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
                  {...register("rounds", { required: "requierd" })}
                >
                  <option value="">round Type...</option>
                  <option value="practical">practical</option>
                  <option value="Technical">Technical</option>
                </Form.Select>
                <p className="text-danger">
                  {errors.rounds && errors.rounds.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Communication</Form.Label>
                <Form.Select
                  required
                  {...register("communication", { required: "requierd" })}
                >
                  <option value="">communication Skill..</option>
                  <option value="Expert">Expert</option>
                  <option value="Good">Good</option>
                  <option value="Poor">Poor</option>
                </Form.Select>
                <p className="text-danger">
                  {errors.communication && errors.communication.message}
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
                  {...register("practicalCompletion", {
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
                  {errors.practicalCompletion &&
                    errors.practicalCompletion.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Coding Standard (1-100%)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Coding"
                  {...register("codingStandard", {
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
                  {errors.codingStandard && errors.codingStandard.message}
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
                  {...register("technicalRound", {
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
                  {errors.technicalRound && errors.technicalRound.message}
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
                  {...register("notes", {
                    required: "requierd",
                  })}
                />
                <p className="text-danger">
                  {errors.notes && errors.notes.message}
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
              onClick={() => history.push(routes.InterviewResult.path)}
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
