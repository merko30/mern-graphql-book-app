import React from "react";
import { useMutation } from "react-apollo";
import { loader } from "graphql.macro";

const query = loader("../graphql/me.graphql");

const MutationItem = ({ mutation, variables, afterMutation, bookStatus }) => {
  let mutationName = mutation.definitions[0].name.value;

  const [mutate] = useMutation(mutation, {
    update(store, { data }) {
      // read the cache
      const cached = store.readQuery({ query });

      // if is addBook, push to cached books
      if (mutationName === "addBook") {
        cached.me.books.push(data[mutationName].book);
        store.writeQuery({ query, data: cached });

        // if is changeStatus it finds book and replaces with updated one
      } else if (mutationName === "changeStatus") {
        let updatedBook = data[mutationName].book;
        let bookIndex = cached.me.books.findIndex(b => b._id === variables.id);
        cached.me.books[bookIndex] = updatedBook;

        store.writeQuery({ query, data: cached });

        // if book deleted, removes the book from cache
      } else if (mutationName === "deleteBook") {
        let books = cached.me.books.filter(b => b._id !== variables.id);
        cached.me.books = books;
        store.writeQuery({ query, data: cached });
      }
    }
  });

  return (
    <li
      className="block hover:bg-primary p-2 cursor-pointer w-48"
      onClick={() =>
        mutate({
          variables
        })
      }
    >
      {bookStatus}
    </li>
  );
};

export default MutationItem;
