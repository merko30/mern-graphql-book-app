import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";

// TODO: create guest and protected route

import { Home, Login, Register, Dashboard, BookDetail, List } from "./pages";

export const link = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || "http://localhost:4000/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(localStorage.getItem("token")
        ? { authorization: `Bearer ${localStorage.getItem("token")}` }
        : {}),
    },
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: ApolloLink.from([authLink, link]),
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lists/:listname" element={<List />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  </ApolloProvider>
);

export default App;
