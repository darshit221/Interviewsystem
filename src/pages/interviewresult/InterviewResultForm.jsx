import React, { useEffect, useState } from "react";

import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { useForm } from "react-hook-form";
import { routes } from "../../routes";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/InterviewResult/action";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const InterviewResultForm = (props) => {
  const { location } = useHistory();
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { interview, interviewer, technologies } = useSelector(
    (state) => state.interviewResult
  );

  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [technology, setTechnology] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);

    setTechnology(typeof value === "string" ? value.split(",") : value);
  };
  const {
    register,
    handleSubmit,

    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    location.pathname === `/interviewresult/edit/interviewresultform/${_id}` &&
      dispatch(actions.getSingleInterviewResultRequest(_id));
  }, [_id, dispatch, location.pathname]);

  useEffect(() => {
    if (
      interview &&
      location.pathname === `/interviewresult/edit/interviewresultform/${_id}`
    ) {
      setValue("date", interview.date);
      setValue("name", interview.name);
      setValue("interviewer", interview.rounds);
      setValue("technology", interview.technology);
      setValue("experience", interview.experience);
      setValue("rounds", interview.rounds);
      setValue("codingStandard", interview.codingStandard);
      setValue("communication", interview.communication);
      setValue("practicalCompletion", interview.practicalCompletion);
      setValue("technicalRound", interview.technicalRound);
      setValue("notes", interview.notes);
    }
  }, [_id, interview, location.pathname, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    if (location.pathname === "/interviewresult/add/interviewresultform") {
      console.log("add");

      dispatch(actions.createInterviewResultRequest(data));
    }
    if (
      location.pathname === `/interviewresult/edit/interviewresultform/${_id}`
    ) {
      console.log("upadte");
      dispatch(
        actions.updateInterviewResultRequest({
          interviewData: data,
          interviewId: _id,
        })
      );
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Interview Result </h5>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group md="4" className="mb-3">
            <TextField
              fullWidth
              id="outlined-basic"
              label=" Date"
              type="date"
              variant="outlined"
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
                  variant="outlined"
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
              <Form.Group className="mb-3">
                <TextField
                  fullWidth
                  label="Experience"
                  variant="outlined"
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
                <InputLabel id="demo-simple-select-outlined-label">
                  Technology
                </InputLabel>

                <Select
                  fullWidth
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  label="Technology"
                  variant="outlined"
                  {...register("tecnology", { required: "requierd" })}
                  error={Boolean(errors.tecnology)}
                  value={technology}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {technologies.map((name) => (
                    <MenuItem
                      key={name.id}
                      value={name.technology}
                      style={getStyles(name.id, technology, theme)}
                    >
                      {name.technology}
                    </MenuItem>
                  ))}
                </Select>
                <p className="text-danger">
                  {errors.tecnology && errors.tecnology.message}
                </p>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <InputLabel id="demo-simple-select-outlined-label">
                  Interviewer
                </InputLabel>

                <Select
                  fullWidth
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  label="interviewer"
                  {...register("interviewer", { required: "requierd" })}
                  error={Boolean(errors.interviewer)}
                  variant="outlined"
                  value={personName}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {interviewer.map((name) => (
                    <MenuItem
                      key={name.id}
                      value={name.interviwer}
                      style={getStyles(name.id, personName, theme)}
                    >
                      {name.interviwer}
                    </MenuItem>
                  ))}
                </Select>
                <p className="text-danger">
                  {errors.interviewer && errors.interviewer.message}
                </p>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <InputLabel id="demo-simple-select-outlined-label">
                  Round
                </InputLabel>

                <Select
                  label="Round"
                  variant="outlined"
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
                  variant="outlined"
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
                  variant="outlined"
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
                  {...register("practicalCompletion", {
                    required: "requierd",
                  })}
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
                  variant="outlined"
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
                  variant="outlined"
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
                  variant="outlined"
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
              type="reset"
              as={Link}
              to={routes.InterviewResult.path}
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
