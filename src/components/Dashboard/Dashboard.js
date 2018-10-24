import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { UserBookList, Loading } from '../../components';

import { USER_BOOKS } from '../../queries';

class Dashboard extends Component {


    componentDidUpdate(prevP, prevS, snap) {
        if (prevP.me !== this.props.me)
            this.props.data.refetch();
    }

    render() {
        const { data: { me, error, loading } } = this.props;
        if (loading) return <Loading />
        if (error) return (
            <div className="center">
                {error.graphQLErrors.map((err, i) => {
                    return <h3 key={i} style={{ color: "crismon" }}>{err.message}</h3>
                })}
            </div>)

        if (me) return (<div className="center">
            <UserBookList books={me.books} />

        </div>)

    }
}

export default graphql(USER_BOOKS)(Dashboard);