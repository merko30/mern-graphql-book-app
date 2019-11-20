import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../auth/useAuth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loggedIn, loading } = useAuth();
  console.log("loading", loading, "loggedIn", loggedIn);
  return !loading ? (
    <Route
      {...rest}
      render={props => {
        return loggedIn ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  ) : null;
};

export default ProtectedRoute;
