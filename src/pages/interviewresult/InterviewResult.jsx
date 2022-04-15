import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Table } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirm } from "react-confirm-box";
import { routes } from "../../routes";
import actions from "../../redux/InterviewResult/action";

function InterviewResult() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getInterviewResultRequest());
  }, [dispatch]);

  const { interviewerList } = useSelector((state) => state.interviewResult);

  const interviewResultDeleteHandler = async (_id) => {
    const result = await confirm("Are you sure?");
    if (result) {
      dispatch(actions.deleteInterviewResultRequest(_id));
      return;
    }
    console.log("You click No!");
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Button
          as={Link}
          variant="secondary"
          size="xm"
          to={routes.AddInterviewResultForm.path}
          className="text-dark"
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Interview Result
        </Button>
      </div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">#</th>
                <th className="border-bottom">User Name</th>
                <th className="border-bottom">Interviwer Name</th>
                <th className="border-bottom">Round</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {interviewerList.map((value, index) => {
                console.log("......", value);
                const { _id, name, interviewer, rounds } = value;
                return (
                  <tr key={_id}>
                    <td>
                      <span className="fw-normal">{index + 1}</span>
                    </td>
                    <td>
                      <span className="fw-normal">{name}</span>
                    </td>
                    <td>
                      <span className="fw-normal">
                        {interviewer.map((val) => (
                          <span>{val}</span>
                        ))}
                      </span>
                    </td>
                    <td>
                      <span className="fw-normal">{rounds}</span>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="light"
                        className="me-3 text-info"
                        as={Link}
                        to={`/interviewresult/edit/interviewresultform/${_id}`}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>

                      <Button
                        size="sm"
                        variant="light"
                        className="me-3 text-danger"
                        onClick={() => interviewResultDeleteHandler(_id)}
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

export default InterviewResult;
