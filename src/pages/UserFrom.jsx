import { Card, Form, InputGroup } from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import { GeneralInfoForm } from "../components/Forms";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import moment from "moment-timezone";
function UserFrom() {
  const [birthday, setBirthday] = useState("");
  return (
    <div>
      <GeneralInfoForm />
    </div>
  );
}

export default UserFrom;
