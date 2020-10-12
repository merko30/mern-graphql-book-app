import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/link-context";

import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

import { Home, Login, Register, Dashboard, BookDetail, List } from "./pages";
import { Navbar, Footer } from "./layout";

import history from "./history";

export const link = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: localStorage.getItem("token")
      ? `${localStorage.getItem("token")}`
      : "",
  },
}));

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
  connectToDevTools: true,
});

const App = () => (
  <ApolloProvider client={client}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <GuestRoute path="/login" component={Login} />
        <GuestRoute path="/register" component={Register} />
        <>
          <Navbar />
          <div className="flex-1">
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/lists/:listname" component={List} />
            <Route path="/book/:id" component={BookDetail} />
          </div>
          <Footer />
        </>
      </Switch>
    </Router>
  </ApolloProvider>
);

export default App;
