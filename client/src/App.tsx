import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  concat,
} from "@apollo/client";

// import GuestRoute from "./routes/GuestRoute";
// import ProtectedRoute from "./routes/ProtectedRoute";

// TODO: create guest and protected route

import { Home, Login, Register, Dashboard, BookDetail, List } from "./pages";
import { Navbar, Footer } from "./layout";

export const link = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || "http://localhost:4000/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || null,
    },
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: concat(link, authMiddleware),
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <>
          <Navbar />
          <div className="flex-1 h-full">
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/lists/:listname">
              <List />
            </Route>
            <Route path="/book/:id">
              <BookDetail />
            </Route>
          </div>
          <Footer />
        </>
      </Routes>
    </Router>
  </ApolloProvider>
);

export default App;
