import React, { Suspense } from "react";

import { Routes } from "./Routes";

import Boot from "./Helper/boot";

import Preloader from "./Components/Preloader";
import { history } from "./Redux/store";

function App() {
  return (
    <Suspense fallback={<Preloader />}>
      <Routes history={history} />
    </Suspense>
  );
}

Boot()
  .then(() => App())
  .catch((error) => error);

export default App;
