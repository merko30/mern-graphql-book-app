import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Home, Login, Register, Results, BookDetails } from '../pages';
import GuestRoute from './GuestRoute';

class Routes extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <GuestRoute exact path="/login" component={Login} />
                <GuestRoute exact path="/register" component={Register} />
                <Route exact path="/results" component={Results} />
                <Route exact path="/book/details/:id" component={BookDetails}></Route>
                <Redirect from='*' to='/' />
            </Switch>
        );
    }
}

export default Routes;