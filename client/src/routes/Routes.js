import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Home, Login, Register, Search, BookDetails, Dashboard } from '../pages';
import GuestRoute from './GuestRoute';
import AuthRoute from './AuthRoute'

class Routes extends React.Component {

    render() {
        return (
            <Switch>
                <GuestRoute exact path="/" component={Home} />
                <GuestRoute path="/login" component={Login} />
                <GuestRoute path="/register" component={Register} />
                <AuthRoute path="/dashboard" component={Dashboard} />
                <AuthRoute path="/search" component={Search} />
                <Route path="/book/details/:id" component={BookDetails} />
                <Redirect from='*' to='/' />
            </Switch>
        );
    }
}

export default Routes;