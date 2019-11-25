import React from "react";
import { Router, Switch, Redirect, Route } from "react-router-dom";

import Navbar from "./layout/Navbar";

import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BookDetail from "./pages/BookDetail";

import history from "./history";
import List from "./pages/List";

const blacklist = ["/login", "/register", "/"];

const App = () => (
  <Router history={history}>
    <Navbar blacklist={blacklist} />
    <div className="page">
      <Switch>
        <GuestRoute path="/login" component={Login} />
        <GuestRoute path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/lists/:listname" component={List} />
        <Route path="/book/:id" component={BookDetail} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  </Router>
);

export default App;
