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

export const GeneralInfoForm = () => {
  const [birthday, setBirthday] = useState("");
  const {
    register,
    handleSubmit,
    watch,
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
                    value={
                      birthday ? moment(birthday).format("MM/DD/YYYY") : ""
                    }
                    placeholder="mm/dd/yyyy"
                    onFocus={openCalendar}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              )}
            />
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
                <p className="danger">{errors.Name && "sfadfsadfasdf"}</p>
              </Form.Group>
            </Col>
            {/* <Col md={6} className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Interviewer</Form.Label>
                <Form.Select required isInvalid defaultValue="Interviewer">
                  <option value="Dhaval">Dhaval</option>
                  <option value="Ridhi">Ridhi</option>
                  <option value="Renish">Renish</option>
                  <option value="Malay">Malay</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </Form.Group>
            </Col> */}
          </Row>

          <div className="mt-3">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
