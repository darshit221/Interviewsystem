import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import { TransactionsTable } from "../../components/Tables";

export default () => {
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
      <TransactionsTable />
    </>
  );
};
