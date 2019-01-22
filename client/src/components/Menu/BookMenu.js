import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { withAlert } from 'react-alert';

import getUsersBooks from '../../graphql/queries/books';
import addBook from '../../graphql/mutations/addBook';
import updateBook from '../../graphql/mutations/updateBook'
import deleteBook from '../../graphql/mutations/deleteBook'

import Menu from './';
import MutationItem from './components/MutationItem';

class BookMenu extends Component {


    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.props.data.refetch();
        }
    }

    showMessage = (data) => {
        const { handleMenu, alert } = this.props;
        handleMenu();
        alert.show(data.message);
    }

    determineStatusesToRender(currentStatus) {
        switch (currentStatus) {
            case "Wishlist":
                return ['Currently Reading', 'Read']
            case "Currently Reading":
                return ['Read']
            default:
                return []
        }
    }

    render() {
        const { handleMenu, show, book, data } = this.props;
        let statuses = ['Currently Reading', 'Read', 'Wishlist'];
        let books = data && data.me && data.me.books;
        return (
            <div>
                {/* if book doesn't exist in users books it renders all options*/}
                {books && !books.filter(b => b.bookID === book.bookID).length > 0 &&
                    <Menu handleMenu={handleMenu} show={show}>

                        {statuses.map((status, i) => {
                            return <MutationItem
                                key={i}
                                mutation={addBook}
                                afterMutation={this.showMessage}
                                variables={{ ...book, status }}
                                bookStatus={status}
                            />
                        })}
                    </Menu>
                }
                {/* if book exists in users books it renders the rest options */}
                {books && books.filter(b => b.bookID === book.bookID).length > 0 &&

                    <Menu handleMenu={handleMenu} show={show}>
                        {/* 
                        since status could be changed I pass book status found in books array,
                        otherwise it wouldn't show any status but delete since book prop has no status property
                    */}
                        {this.determineStatusesToRender(books.find(b => b.bookID === book.bookID).status).map((status, i) => {
                            let bookIDfromArray = books.find(b => b.bookID === book.bookID)._id
                            return <MutationItem
                                key={i}
                                mutation={updateBook}
                                afterMutation={this.showMessage}
                                variables={{ id: bookIDfromArray, status }}
                                bookStatus={status}
                            />
                        })}

                        <MutationItem
                            mutation={deleteBook}
                            afterMutation={this.showMessage}
                            variables={{ id: book._id }}
                            bookStatus={"Delete"}
                        />
                    </Menu>

                }


            </div>
        )
    }
}


export default withAlert(graphql(getUsersBooks)(BookMenu));
