import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "react-apollo";
import { loader } from "graphql.macro";

const query = loader("../graphql/me.graphql");

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { data, loading } = useQuery(query);
  if (data) {
    return (
      <Route
        {...rest}
        render={props => {
          return data && data.me && !loading ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      />
    );
  }
  return null;
};

export default ProtectedRoute;
