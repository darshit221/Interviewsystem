import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "./routes";

// pages

import Interviewer from "./pages/Interviewer";
import Users from "./pages/Users";
import Signin from "./pages/examples/Signin";
import Signup from "./pages/examples/Signup";
import ForgotPassword from "./pages/examples/ForgotPassword";
import ResetPassword from "./pages/examples/ResetPassword";
import Lock from "./pages/examples/Lock";
import NotFoundPage from "./pages/examples/NotFound";
import ServerError from "./pages/examples/ServerError";
// components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import UserFrom from "./pages/UserFrom";
import DetailsForm from "./pages/DetailsForm";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Navbar />
            <Component {...props} />
          </main>
        </>
      )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader
      exact
      path={Routes.ForgotPassword.path}
      component={ForgotPassword}
    />
    <RouteWithLoader
      exact
      path={Routes.ResetPassword.path}
      component={ResetPassword}
    />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />

    {/* pages */}
    <RouteWithSidebar
      exact
      path={Routes.Interviewer.path}
      component={Interviewer}
    />
    <RouteWithSidebar exact path={Routes.Users.path} component={Users} />
    <RouteWithSidebar exact path={Routes.UserForm.path} component={UserFrom} />
    <RouteWithSidebar
      exact
      path={Routes.DetailForm.path}
      component={DetailsForm}
    />
    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
