import React from "react";
import { Image } from "@themesberg/react-bootstrap";

import ReactLogo from "../assets/img/technologies/Ghost.gif";

function Preloader(props) {
  const { show } = props;

  return (
    <div
      className={`preloader  flex-column justify-content-center align-items-center  ${
        show ? "" : "show"
      }`}
    >
      <Image
        className="loader-element animate__animated animate__jackInTheBox"
        src={ReactLogo}
        height={60}
      />
    </div>
  );
}
export default Preloader;
