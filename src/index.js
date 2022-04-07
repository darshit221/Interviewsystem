import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

import App from "./App";
import { Provider } from "react-redux";
import { history, store } from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
