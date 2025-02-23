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

import Layout from "src/layout/Layout";

export const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => {
    return {
      headers: {
        ...headers,
        ...(localStorage.getItem("token")
          ? { Authorization: localStorage.getItem("token") }
          : {}),
      },
    };
  });

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lists/:listname" element={<List />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Route>
      </Routes>
    </Router>
  </ApolloProvider>
);

export default App;
