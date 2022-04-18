import React, { Suspense } from "react";

import { Routes } from "./routes";

import Boot from "./helper/boot";

import Preloader from "./components/Preloader";
import { history } from "./redux/store";

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
