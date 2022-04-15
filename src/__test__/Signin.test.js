import React from "react";
import { render, screen } from "@testing-library/react";
import Signin from "../pages/login/Signin";

test("lgoin page ", () => {
  const component = render(<Signin />);
  console.log(component);
});
