import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// pages

import InterviewResult from "./pages/interviewresult/InterviewResult";
import User from "./pages/User/User";
import Signin from "./pages/login/Signin";

// components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import InterviewResultForm from "./pages/interviewresult/InterviewResultForm";
import UserForm from "./pages/User/UserForm";
import { useSelector } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import useRole from "./helper/useRole";
import NotFound from "./pages/ErrorPages/NotFound";

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
  console.log(useRole());
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
  // pages

  Signin: { path: "/" },
  InterviewResult: { path: "/interviewresult" },
  User: { path: "/user" },
  AddInterviewResultForm: {
    path: "/interviewresult/add/interviewresultform",
  },
  EditInterviewResultForm: {
    path: "/interviewresult/edit/interviewresultform/:_id",
  },
  AddUserForm: { path: "/user/add/userform" },
  EditUserForm: { path: "/user/edit/userform/:_id" },
  Signup: { path: "/examples/sign-up" },
  NotFound: { path: "*" },
};
