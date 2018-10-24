import React from 'react';

import { Mutation, Query } from 'react-apollo';

import { withAlert } from "react-alert";

import { ADD_BOOK, CHECK, CHANGE_STATUS, USER_BOOKS, DELETE_BOOK } from '../../queries';

class OptionsMenu extends React.Component {

    showPopup(message) {
        this.props.alert.show(message);
        this.props.handleClose();
    }



    renderChangeMutation = (id, status, bookID) => {
        return <Mutation mutation={CHANGE_STATUS} onCompleted={data => this.showPopup(data.changeStatus.message)}>
            {(mutate) => (
                <li onClick={() => {
                    mutate({
                        variables: { id: id, status: status },
                        refetchQueries: [
                            { query: CHECK, variables: { bookID } },
                            { query: USER_BOOKS }
                        ]
                    });

                }}>{status}</li>
            )}
        </Mutation>
    }

    renderAddMutation = (title, bookID, status, authors, cover) => {
        return <Mutation mutation={ADD_BOOK} onCompleted={data => this.showPopup(data.addBook.message)}>
            {(mutate) => (
                <li onClick={() => {
                    mutate({
                        variables: { title, bookID, authors, status, cover },
                        refetchQueries: [
                            { query: CHECK, variables: { bookID } },
                            { query: USER_BOOKS }
                        ]
                    })

                }}>{status}</li>
            )}
        </Mutation>
    }

    renderDeleteMutation = (id) => {
        return <Mutation mutation={DELETE_BOOK} onCompleted={data => this.showPopup(data.deleteBook.message)}>
            {(mutate) => (
                <li onClick={() => {
                    mutate({
                        variables: { id },
                        refetchQueries: [
                            { query: USER_BOOKS }
                        ]
                    })

                }}>Delete</li>
            )}
        </Mutation>
    }

    displayChangeStatus = (id, currentStatus, bookID) => {
        return <div>

            {currentStatus === 'Currently Reading' ?
                <ul className="menu">
                    {this.renderChangeMutation(id, "Read", bookID)}
                    {this.renderDeleteMutation(id)}

                </ul> :
                currentStatus === 'Wishlist' ?
                    <ul className="menu">
                        {this.renderChangeMutation(id, "Currently Reading", bookID)}
                        {this.renderChangeMutation(id, "Read", bookID)}
                        {this.renderDeleteMutation(id)}
                    </ul>

                    :
                    <ul className="menu">
                        {this.renderDeleteMutation(id)}
                    </ul>
            }



        </div>

    }
    render() {
        const { book: { title, bookID, authors, cover }, show } = this.props;
        return (
            <div >
                {show &&
                    <Query query={CHECK} variables={{ bookID: bookID }} >
                        {({ loading, error, data, refetch }) => {
                            if (loading) return null;
                            if (error) return `Error!: ${error}`;

                            return !data.existsInBooks.exists ? <ul className="menu">
                                {this.renderAddMutation(title, bookID, "Currently Reading", authors, cover)}
                                {this.renderAddMutation(title, bookID, "Read", authors, cover)}
                                {this.renderAddMutation(title, bookID, "Wishlist", authors, cover)}
                            </ul>
                                : <ul>
                                    {this.displayChangeStatus(data.existsInBooks.id, data.existsInBooks.status, bookID)}
                                </ul>

                        }}

                    </Query>}
            </div>
        )
    }
}

export default withAlert(OptionsMenu);
