/* eslint-disable react/jsx-props-no-spreading */
/**
 * These eslint exceptions must be there because we are rendering a generic
 * component with the PrivateRoute component, therefore we don't know the specifics props that component has.
 */
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import isAuthenticated from "./auth";

/**
 * This custom component is a wrapper to ensure the user can only access certain routes if
 * he's / she's authenticated.
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <h1>Login</h1>} />
      <PrivateRoute path="/home" component={() => <h1>Home Page</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
