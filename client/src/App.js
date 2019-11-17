import React from "react";
import { Router, Switch, Redirect, Route } from "react-router-dom";

import Navbar from "./layout/Navbar";

import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import BookDetail from "./pages/BookDetail";

import history from "./history";

const blacklist = ["/login", "/register", "/"];

const App = () => (
  <Router history={history}>
    <Navbar blacklist={blacklist} />
    <div className="page">
      <Switch>
        <GuestRoute path="/login" component={Login} />
        <GuestRoute path="/register" component={Register} />
        <GuestRoute exact path="/" component={Home} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/search" component={Search} />
        <Route path="/book/:id" component={BookDetail} />
        <Redirect from="*" to="/dashboard" />
      </Switch>
    </div>
  </Router>
);

export default App;
