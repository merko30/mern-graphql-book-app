import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const GuestRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={(props) => {
        return localStorage.getItem('token') ? <Component {...props} /> : <Redirect to="/login" />
    }} />
}

export default GuestRoute;