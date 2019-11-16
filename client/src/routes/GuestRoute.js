import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "react-apollo";
import { loader } from "graphql.macro";

const query = loader("../graphql/me.graphql");

const GuestRoute = ({ component: Component, ...rest }) => {
  const { data, loading } = useQuery(query);
  if (!loading) {
    return (
      <Route
        {...rest}
        render={props => {
          return !(data && data.me && !loading) ? (
            <Component {...props} />
          ) : (
            <Redirect to="/dashboard" />
          );
        }}
      />
    );
  }
  return null;
};

export default GuestRoute;
