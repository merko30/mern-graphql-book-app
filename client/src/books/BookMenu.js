import React, { useEffect } from "react";
import { useQuery } from "react-apollo";
import { loader } from "graphql.macro";

import Menu from "../common/Menu";
import MutationItem from "./MutationItem";

const meQuery = loader("../graphql/me.graphql");
const addBook = loader("../graphql/addBook.graphql");
const updateBook = loader("../graphql/updateBook.graphql");
const deleteBook = loader("../graphql/deleteBook.graphql");

const statuses = ["Currently Reading", "Read", "Wishlist"];

const BookMenu = ({ handleMenu, alert, show, book, classes }) => {
  const { data, refetch } = useQuery(meQuery);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const showMessage = data => {
    handleMenu();
    // alert.show(data.message);
  };

  const determineStatusesToRender = currentStatus => {
    switch (currentStatus) {
      case "Wishlist":
        return ["Currently Reading", "Read"];
      case "Currently Reading":
        return ["Read"];
      default:
        return [];
    }
  };

  const books = data && data.me && data.me.books;
  return (
    <div className={`absolute top-0 right-0 ${classes}`}>
      {books && !books.filter(b => b.bookID === book.bookID).length > 0 && (
        <Menu>
          {statuses.map((status, i) => {
            return (
              <MutationItem
                key={i}
                mutation={addBook}
                afterMutation={showMessage}
                variables={{ ...book, status }}
                bookStatus={status}
              />
            );
          })}
        </Menu>
      )}
      {books && books.filter(b => b.bookID === book.bookID).length > 0 && (
        <Menu>
          {determineStatusesToRender(
            books.find(b => b.bookID === book.bookID).status
          ).map((status, i) => {
            let bookIDfromArray = books.find(b => b.bookID === book.bookID)._id;
            return (
              <MutationItem
                key={i}
                mutation={updateBook}
                afterMutation={showMessage}
                variables={{ id: bookIDfromArray, status }}
                bookStatus={status}
              />
            );
          })}

          <MutationItem
            mutation={deleteBook}
            afterMutation={showMessage}
            variables={{ id: book._id }}
            bookStatus={"Delete"}
          />
        </Menu>
      )}
    </div>
  );
};

export default BookMenu;
