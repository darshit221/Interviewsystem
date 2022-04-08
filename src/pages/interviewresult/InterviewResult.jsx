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

import { useDispatch } from "react-redux";
import actions from "../../redux/InterviewResult/action";

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  dispatch(actions.getInterviewResult());
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
                <th className="border-bottom">#</th>
                <th className="border-bottom">Bill For</th>
                <th className="border-bottom">Issue Date</th>
                <th className="border-bottom">Due Date</th>
                <th className="border-bottom">Total</th>
                <th className="border-bottom">Status</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Card.Link className="fw-normal"></Card.Link>
                </td>
                <td>
                  <span className="fw-normal"></span>
                </td>

                <td>
                  <span className="fw-normal"></span>
                </td>

                <td>
                  <span className="fw-normal"></span>
                </td>

                <td>
                  <span className="fw-normal"></span>
                </td>

                <td>
                  <span className="fw-normal"></span>
                </td>

                <td>
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle
                      as={Button}
                      split
                      variant="link"
                      className="text-dark m-0 p-0"
                    >
                      <span className="icon icon-sm">
                        <FontAwesomeIcon
                          icon={faEllipsisH}
                          className="icon-dark"
                        />
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {/* <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item> */}
                      <Dropdown.Item>
                        <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                      </Dropdown.Item>
                      <Dropdown.Item className="text-danger">
                        <FontAwesomeIcon icon={faTrashAlt} className="me-2" />{" "}
                        Remove
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
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
