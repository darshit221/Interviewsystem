import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { useForm } from "react-hook-form";
import { routes } from "../../routes";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import actions from "../../redux/InterviewResult/action";

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

function getStyles(name, filed, theme) {
  return {
    fontWeight:
      filed.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function InterviewResultForm() {
  const [personName, setPersonName] = useState([]);
  const [technology, setTechnology] = useState([]);
  const { location } = useHistory();
  const { _id } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { interview, interviewer, technologies } = useSelector(
    (state) => state.interviewResult
  );

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;

    name === "interviewer" &&
      setPersonName(typeof value === "string" ? value.split(",") : value);

    name === "technologies" &&
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
      for (const key in interview) {
        setValue(key, interview[key]);
      }
    }
  }, [_id, interview, location.pathname, setValue]);

  const onSubmit = (data) => {
    if (location.pathname === "/interviewresult/add/interviewresultform") {
      dispatch(actions.createInterviewResultRequest(data));
    }
    if (
      location.pathname === `/interviewresult/edit/interviewresultform/${_id}`
    ) {
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
              sx={{ width: "100%" }}
              id="outlined-basic"
              label=" Date"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("date", { required: "requierd" })}
              error={!!errors.date}
            />
            <p className="text-danger">{errors.date && errors.date.message}</p>
          </Form.Group>

          <Row>
            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <TextField
                  sx={{ width: "100%" }}
                  label="name"
                  variant="outlined"
                  type="text"
                  {...register("name", { required: "requierd" })}
                  error={!!errors.name}
                />
                <p className="text-danger">
                  {errors.name && errors.name.message}
                </p>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <TextField
                  sx={{ width: "100%" }}
                  label="Experience"
                  variant="outlined"
                  type="number"
                  {...register("experience", { required: "requierd" })}
                  error={!!errors.experience}
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
                  sx={{ width: "100%" }}
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  label="Technology"
                  variant="outlined"
                  {...register("technologies", { required: "requierd" })}
                  error={!!errors.technologies}
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
                  {errors.technologies && errors.technologies.message}
                </p>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group>
                <InputLabel id="demo-simple-select-outlined-label">
                  Interviewer
                </InputLabel>

                <Select
                  sx={{ width: "100%" }}
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  label="interviewer"
                  {...register("interviewer", { required: "requierd" })}
                  error={!!errors.interviewer}
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
                  sx={{ width: "100%" }}
                  {...register("rounds", { required: "requierd" })}
                  error={!!errors.rounds}
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
                  sx={{ width: "100%" }}
                  label="communication"
                  variant="outlined"
                  {...register("communication", { required: "requierd" })}
                  error={!!errors.communication}
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
                  sx={{ width: "100%" }}
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
                  error={!!errors.practicalCompletion}
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
                  sx={{ width: "100%" }}
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
                  error={!!errors.codingStandard}
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
                  sx={{ width: "100%" }}
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
                  error={!!errors.technicalRound}
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
                  sx={{ width: "100%" }}
                  variant="outlined"
                  label="Your Answer"
                  {...register("notes", {
                    required: "requierd",
                  })}
                  error={!!errors.notes}
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
}

export default InterviewResultForm;
