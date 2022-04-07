import React, { useMemo, lazy, useEffect, useState } from "react";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';


import { Card, Col, Row } from "@themesberg/react-bootstrap";
import Preloader from "./components/Preloader";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";




const NoMatchPage = () => {
    return (
        <Row className="margin-top">
            <Col xs={{ span: 12, offset: 6 }}>
                <Card>
                    <div className="card-body">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <h2>Page not found</h2>
                            <Link to="/members">back to member</Link>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    );
};


const RestrictedRoutewithSilder = ({ component: Component, isLoggedIn, ...rest }) => {
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 500);
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
              {/* <Component {...props} /> */}
              {!isLoggedIn ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { from: props.location },
                  }}
                />
              )}
            </main>
          </>
        )}
      />
    );
  };

const UnrestrictedRouteWithSidebar = ({ component: Component, isLoggedIn, ...rest }) => {
    const [loaded, setLoaded] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 500);
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
              {/* <Component {...props} /> */}
              {isLoggedIn ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/interviewresult",
                    state: { from: props.location },
                  }}
                />
              )}
            </main>
          </>
        )}
      />
    );
  };

const Router = ({ history, isLoggedIn }) => {

    return (
        <ConnectedRouter history={history}>
            <Switch>
                <UnRestrictedRoute
                    exact
                    path="/"
                    component={Login}
                    isLoggedIn={isLoggedIn}
                />
                <RestrictedRoute
                    path="/system-settings"
                    component={SystemAdmin}
                    isLoggedIn={isLoggedIn}
                />
                <RestrictedRoute
                    path={memberRoutes}
                    component={Member}
                    isLoggedIn={isLoggedIn}
                />
                <RestrictedRoute
                    path={statistiquesRoutes}
                    component={Statistiques}
                    isLoggedIn={isLoggedIn}
                />
                <RestrictedRoute
                    path={activityRoutes}
                    component={activity}
                    isLoggedIn={isLoggedIn}
                />
                <RestrictedRoute
                    path={environmentRoutes}
                    component={environments}
                    isLoggedIn={isLoggedIn}
                />
                <RestrictedRoute
                    path={teamMeetingRoutes}
                    component={teamMeeting}
                    isLoggedIn={isLoggedIn}
                />
                <Route path="*" component={NoMatchPage} />
            </Switch>
        </ConnectedRouter>
    )
}

export default connect((state: any) => ({
    isLoggedIn: state.auth.token !== null
}))(Router);