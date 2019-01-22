import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { UserBookList, Loading, Error } from '../../components';
import getUsersBook from '../../graphql/queries/books';

class Dashboard extends Component {



    render() {
        const { data: { loading, error } } = this.props;
        const books = this.props.data && this.props.data.me && this.props.data.me.books

        if (loading) return <Loading />
        if (error) return <Error error={error.message} />


        return <div className="mt-10 container">
            <UserBookList books={books} />
        </div>

    }

}



export default graphql(getUsersBook)(Dashboard)