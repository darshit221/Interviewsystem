import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisH,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Card,
  Button,
  Table,
  Dropdown,
  Pagination,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { routes } from "../../routes";

import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/InterviewResult/action";

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getInterviewResult());
  }, []);

  const { interviewerList } = useSelector((state) => state.interviewResult);
  console.log(interviewerList);

  const interviewResultDeleteHandler = (_id) => {
    dispatch(actions.deleteInterviewResult(_id));
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Button
          as={Link}
          variant="secondary"
          size="xm"
          to={routes.InterviewResultForm.path}
          className="text-dark"
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add User
        </Button>
      </div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">User Name</th>
                <th className="border-bottom">Interviwer Name</th>
                <th className="border-bottom">Round</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {interviewerList.map((value) => {
                const { _id, name, interviewer, rounds } = value;
                return (
                  <tr key={_id}>
                    <td>
                      <span className="fw-normal">{name}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{interviewer}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{rounds}</span>
                    </td>
                    <td>
                      <Button>
                        Edit <FontAwesomeIcon icon={faEdit} className="me-2" />
                      </Button>
                      <Button onClick={() => interviewResultDeleteHandler(_id)}>
                        Remove
                        <FontAwesomeIcon icon={faTrashAlt} className="me-2" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev>Previous</Pagination.Prev>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Item>4</Pagination.Item>
                <Pagination.Item>5</Pagination.Item>
                <Pagination.Next>Next</Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{234}</b> out of <b>25</b> entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
};
