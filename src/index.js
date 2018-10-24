import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import history from './history';

const options = {
    timeout: 5000,
    position: "bottom center"
};


const httpLink = new HttpLink({
    uri: "http://localhost:8000/graphql",
    headers: {
        "Authorization": localStorage.getItem('token') ? localStorage.getItem('token') : null
    }
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <Router history={history}>
            <Provider template={AlertTemplate} {...options}>
                <App />
            </Provider>
        </Router>
    </ApolloProvider>, document.getElementById('root'));

