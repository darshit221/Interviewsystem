import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Table } from "@themesberg/react-bootstrap";
import { confirm } from "react-confirm-box";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import actions from "../../redux/User/action";
import Preloader from "../../Components/Preloader";

function User() {
  const dispatch = useDispatch();
  const { userList, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(actions.getUserRequest());
  }, [dispatch]);

  const UserDeleteHandler = async (_id) => {
    const result = await confirm("Are you sure?");
    if (result) {
      dispatch(actions.deleteUserRequest(_id));
      return;
    }
  };

  return (
    <>
      <Preloader show={loading ? true : false} />
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Button
          as={Link}
          variant="secondary"
          size="xm"
          to={routes.AddUserForm.path}
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
                <th className="border-bottom">First Name</th>
                <th className="border-bottom">Last Name</th>
                <th className="border-bottom">Birth Date</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((value, index) => {
                const { _id, first_name, last_name, dateOfBirth } = value;
                return (
                  <tr key={_id}>
                    <td>
                      <span className="fw-normal">{index + 1}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{first_name}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{last_name}</span>
                    </td>
                    <td>
                      <span className="fw-normal">
                        {dateOfBirth.slice(0, 10)}
                      </span>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="light"
                        className="me-3 text-info"
                        as={Link}
                        to={`/user/edit/${_id}`}
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
        </Card.Body>
      </Card>
    </>
  );
}
export default User;
