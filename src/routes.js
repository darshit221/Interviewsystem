import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// pages

import InterviewResult from "./pages/interviewresult/InterviewResult";
import Users from "./pages/Users/Users";
import Signin from "./pages/login/Signin";

// components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import InterviewResultForm from "./pages/interviewresult/InterviewResultForm";
import UserForm from "./pages/Users/UserForm";
import { useSelector } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? (
        <>
          <Sidebar />
          <main className="content">
            <Navbar />
            <Component {...props} />
          </main>
        </>
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const UnRestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/interviewresult",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export const Routes = ({ history }) => {
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  console.log(isLoggedIn);
  return (
    // console.log(isLoggedIn)
    <ConnectedRouter history={history}>
      <Switch>
        <UnRestrictedRoute
          exact
          path="/"
          component={Signin}
          isLoggedIn={isLoggedIn}
        />
        {/* pages */}
        <RestrictedRoute
          exact
          path={routes.InterviewResult.path}
          component={InterviewResult}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute
          exact
          path={routes.InterviewResultForm.path}
          component={InterviewResultForm}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute
          exact
          path={routes.Users.path}
          component={Users}
          isLoggedIn={isLoggedIn}
        />

        <RestrictedRoute
          exact
          path={routes.UserForm.path}
          component={UserForm}
          isLoggedIn={isLoggedIn}
        />

        <Redirect to={routes.NotFound.path} />
      </Switch>
    </ConnectedRouter>
  );
};

export const routes = {
  // pages

  Signin: { path: "/" },
  InterviewResult: { path: "/interviewresult" },
  Users: { path: "/users" },
  InterviewResultForm: { path: "/interviewresult/interviewresultform" },
  UserForm: { path: "/userform" },
  Billing: { path: "/examples/billing" },
  Invoice: { path: "/examples/invoice" },
  Signup: { path: "/examples/sign-up" },
  ForgotPassword: { path: "/examples/forgot-password" },
  ResetPassword: { path: "/examples/reset-password" },
  Lock: { path: "/examples/lock" },
  NotFound: { path: "/examples/404" },
  ServerError: { path: "/examples/500" },
};
