import React from "react";
import { useSelector } from "react-redux";

function useRole() {
  const { user } = useSelector((state) => state.auth);
  const { role } = user;
  if ((role && role.name === "admin") || (role && role.name === "hr")) {
    return true;
  } else {
    return false;
  }
}

export default useRole;
