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
import actions from "../../redux/User/action";
import { confirm } from "react-confirm-box";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getUserRequest());
  }, [dispatch]);
  const UserDeleteHandler = async (_id) => {
    const result = await confirm("Are you sure?");
    if (result) {
      dispatch(actions.deleteUserRequest(_id));
      return;
    }
    console.log("You click No!");
  };
  const { userList } = useSelector((state) => state.user);
  console.log(userList);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Button
          as={Link}
          variant="secondary"
          size="xm"
          to={routes.AddUserForm.path}
          className="text-dark"
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Details
        </Button>
      </div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">First Name</th>
                <th className="border-bottom">Last Name</th>
                <th className="border-bottom">Email</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((value) => {
                const { _id, first_name, last_name, dateOfBirth } = value;
                return (
                  <tr key={_id}>
                    <td>
                      <span className="fw-normal">{first_name}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{last_name}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{dateOfBirth}</span>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="light"
                        className="me-3 text-info"
                        as={Link}
                        to={`/user/edit/userform/${_id}`}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>

                      <Button
                        size="sm"
                        variant="light"
                        className="me-3 text-danger"
                        onClick={() => UserDeleteHandler(_id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
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
export default User;
