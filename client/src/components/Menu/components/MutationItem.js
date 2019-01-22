import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo'
import getUsersBook from '../../../graphql/queries/books';

MutationItem.propTypes = {
    mutation: PropTypes.object.isRequired,
    variables: PropTypes.object,
    afterMutation: PropTypes.func,
    bookStatus: PropTypes.string.isRequired
}

export default function MutationItem({ mutation, variables, afterMutation, bookStatus }) {
    let mutationName = mutation.definitions[0].name.value;
    return (
        <Mutation
            ignoreResults={false}
            mutation={mutation}
            onCompleted={data => console.log(data[0])}>
            {(mutate) => (
                <li
                    className="border-b mt-1 border-gray-dark cursor-pointer"
                    onClick={() => {
                        mutate({
                            variables: variables,
                            update: (store, { data }) => {
                                // read the cache
                                const d = store.readQuery({ query: getUsersBook });

                                // if is addBook, push to cached books
                                if (mutationName === "addBook") {
                                    console.log(data[mutationName].book)
                                    d.me.books.push(data[mutationName].book);
                                    store.writeQuery({ query: getUsersBook, data: d });

                                    // if is changeStatus it finds book and replaces with updated one
                                } else if (mutationName === 'changeStatus') {
                                    let updatedBook = data[mutationName].book;
                                    let bookIndex = d.me.books.findIndex(b => b._id === variables.id)
                                    d.me.books[bookIndex] = updatedBook;

                                    store.writeQuery({ query: getUsersBook, data: d });

                                    // if book deleted removes the book from cache
                                } else if (mutationName === 'deleteBook') {
                                    let books = d.me.books.filter(b => b._id !== variables.id)
                                    d.me.books = books
                                    store.writeQuery({ query: getUsersBook, data: d });
                                }
                            }

                        })

                    }}>{bookStatus}</li>
            )}
        </Mutation>
    )
}
