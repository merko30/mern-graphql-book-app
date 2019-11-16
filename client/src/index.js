import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";

import { Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-boost";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import history from "./history";

const options = {
  timeout: 5000,
  position: "bottom center"
};

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql"
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `${localStorage.getItem("token")}`
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <Provider template={AlertTemplate} {...options}>
        <App />
      </Provider>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
