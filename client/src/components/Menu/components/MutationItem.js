import React from "react";
import PropTypes from "prop-types";
import { Mutation, useMutation, useQuery } from "react-apollo";
import { loader } from "graphql.macro";

const query = loader("../../../graphql/me.graphql");

const MutationItem = ({ mutation, variables, afterMutation, bookStatus }) => {
  let mutationName = mutation.definitions[0].name.value;

  return (
    <Mutation
      ignoreResults={false}
      mutation={mutation}
      // onCompleted={data => console.log(data[0])}
    >
      {mutate => (
        <li
          className="border-b mt-1 border-gray-dark cursor-pointer"
          onClick={() => {
            mutate({
              variables,
              update: (store, { data }) => {
                // read the cache
                const d = store.readQuery({ query });

                // if is addBook, push to cached books
                if (mutationName === "addBook") {
                  d.me.books.push(data[mutationName].book);
                  store.writeQuery({ query, data: d });

                  // if is changeStatus it finds book and replaces with updated one
                } else if (mutationName === "changeStatus") {
                  let updatedBook = data[mutationName].book;
                  let bookIndex = d.me.books.findIndex(
                    b => b._id === variables.id
                  );
                  d.me.books[bookIndex] = updatedBook;

                  store.writeQuery({ query, data: d });

                  // if book deleted removes the book from cache
                } else if (mutationName === "deleteBook") {
                  let books = d.me.books.filter(b => b._id !== variables.id);
                  d.me.books = books;
                  store.writeQuery({ query, data: d });
                }
              }
            });
          }}
        >
          {bookStatus}
        </li>
      )}
    </Mutation>
  );
};

export default MutationItem;
