import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Pages

import InterviewResult from "./Pages/InterviewResult/index";
import User from "./Pages/User/index";
import Signin from "./Pages/login";

// components
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import InterviewResultForm from "./Pages/InterviewResult/AddUpdate";
import UserForm from "./Pages/User/AddUpdate";
import { useSelector } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import useRole from "./Helper/useRole";
import NotFound from "./Pages/ErrorPages";

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

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <UnRestrictedRoute
          exact
          path="/"
          component={Signin}
          isLoggedIn={isLoggedIn}
        />

        <RestrictedRoute
          exact
          path={routes.InterviewResult.path}
          component={InterviewResult}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute
          exact
          path={routes.AddInterviewResultForm.path}
          component={InterviewResultForm}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute
          exact
          path={routes.EditInterviewResultForm.path}
          component={InterviewResultForm}
          isLoggedIn={isLoggedIn}
        />
        {useRole() && (
          <RestrictedRoute
            exact
            path={routes.User.path}
            component={User}
            isLoggedIn={isLoggedIn}
          />
        )}

        <RestrictedRoute
          exact
          path={routes.AddUserForm.path}
          component={UserForm}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute
          exact
          path={routes.EditUserForm.path}
          component={UserForm}
          isLoggedIn={isLoggedIn}
        />

        <Route path={routes.NotFound.path} component={NotFound} />
      </Switch>
    </ConnectedRouter>
  );
};

export const routes = {
  // Pages

  Signin: { path: "/" },
  InterviewResult: { path: "/interviewresult" },
  User: { path: "/user" },
  AddInterviewResultForm: {
    path: "/interviewresult/add",
  },
  EditInterviewResultForm: {
    path: "/interviewresult/edit/:_id",
  },
  AddUserForm: { path: "/user/add" },
  EditUserForm: { path: "/user/edit/:_id" },
  Signup: { path: "/examples/sign-up" },
  NotFound: { path: "*" },
};
