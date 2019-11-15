import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Search from "../pages/Search";
import BookDetail from "../pages/BookDetail";

const Routes = () => {
  return (
    <Switch>
      <GuestRoute exact path="/" component={Home} />
      <GuestRoute path="/login" component={Login} />
      <GuestRoute path="/register" component={Register} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/search" component={Search} />
      <Route path="/book/:id" component={BookDetail} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default Routes;
