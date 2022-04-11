import React, { useEffect, useState } from "react";
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
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/InterviewResult/action";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
let intialvalue = {
  date: "",
  name: "",
  interviewer: [],
  technology: [],
  experience: "",
  rounds: "",
  communication: "",
  practicalCompletion: "",
  codingStandard: "",
  technicalRound: "",
  notes: "",
};

const InterviewResultForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useParams();
  const { interview } = useSelector((state) => state.interviewResult);
  console.log("update data", id);

  useEffect(() => {
    dispatch(actions.getSingleInterviewResultRequest(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (interview) {
      intialvalue = interview;
    }
  }, []);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    defaultValues: intialvalue,
  });
  const onSubmit = (data) => {
    console.log(data);
    dispatch(actions.createInterviewResultRequest(data));
  };
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group md="4" className="mb-3">
            <TextField
              fullWidth
              id="standard-basic"
              label=" Date"
              type="date"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("date", { required: "requierd" })}
              error={Boolean(errors.date)}
            />
            <p className="text-danger">{errors.date && errors.date.message}</p>
          </Form.Group>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <TextField
                  fullWidth
                  label="name"
                  variant="standard"
                  type="text"
                  {...register("name", { required: "requierd" })}
                  error={Boolean(errors.name)}
                />
                <p className="text-danger">
                  {errors.name && errors.name.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">multiselect</Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">multiselect</Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <TextField
                  fullWidth
                  label="Experience"
                  variant="standard"
                  type="number"
                  {...register("experience", { required: "requierd" })}
                  error={Boolean(errors.experience)}
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
                <InputLabel id="demo-simple-select-standard-label">
                  Round
                </InputLabel>

                <Select
                  label="Round"
                  variant="standard"
                  fullWidth
                  {...register("rounds", { required: "requierd" })}
                  error={Boolean(errors.rounds)}
                >
                  <MenuItem value={"practical"}>practical</MenuItem>
                  <MenuItem value={"Technical"}>Technical</MenuItem>
                </Select>
                <p className="text-danger">
                  {errors.rounds && errors.rounds.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <InputLabel>Communication</InputLabel>
                <Select
                  fullWidth
                  label="communication"
                  variant="standard"
                  {...register("communication", { required: "requierd" })}
                  error={Boolean(errors.communication)}
                >
                  <MenuItem value={"Expert"}>Expert</MenuItem>
                  <MenuItem value={"Good"}>Good</MenuItem>
                  <MenuItem value={"Poor"}>Poor</MenuItem>
                </Select>
                <p className="text-danger">
                  {errors.communication && errors.communication.message}
                </p>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <TextField
                  fullWidth
                  label="Practical Completion"
                  variant="standard"
                  type="number"
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
                  {...register("practicalCompletion", { required: "requierd" })}
                  error={Boolean(errors.practicalCompletion)}
                />

                <p className="text-danger">
                  {errors.practicalCompletion &&
                    errors.practicalCompletion.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <TextField
                  fullWidth
                  label="Coding Standard"
                  variant="standard"
                  type="number"
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
                  {...register("codingStandard", { required: "requierd" })}
                  error={Boolean(errors.codingStandard)}
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
                <TextField
                  fullWidth
                  label="Technical Round"
                  variant="standard"
                  type="number"
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
                  {...register("technicalRound", { required: "requierd" })}
                  error={Boolean(errors.technicalRound)}
                />

                <p className="text-danger">
                  {errors.technicalRound && errors.technicalRound.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <TextField
                  type="Text"
                  fullWidth
                  variant="standard"
                  label="Your Answer"
                  {...register("notes", {
                    required: "requierd",
                  })}
                  error={Boolean(errors.notes)}
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
