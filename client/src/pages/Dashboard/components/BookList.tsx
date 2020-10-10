import React from "react";
import { Link } from "react-router-dom";

import BookItem from "./BookItem";

import { Book, Status } from "../../../generated";

interface BookListProps {
  books: Omit<Book, "user">[];
  listName: Status;
  count: number;
}

const BookList = ({ books, listName, count }: BookListProps) => {
  return (
    <div className="my-4 md:w-1/2 w-full mx-auto">
      <div className="flex">
        <h1
          className="text-sm mb-1 uppercase"
          style={{ letterSpacing: "0.1em" }}
        >
          {listName}({count})
        </h1>
        <Link
          to={`/lists/${listName.toLowerCase()}`}
          className="text-xs text-gray-600 hover:text-gray-700 inline-block ml-auto"
        >
          See all
        </Link>
      </div>
      <hr style={{ height: "1px" }} className="text-primary" />
      <div className="flex flex-col overflow-x-scroll w-full hideScrollBar">
        <ul className="flex">
          {books && books.length > 0 ? (
            books.map((b) => <BookItem book={b} key={b._id} />)
          ) : (
            <h1 className="text-gray-400 text-xl text-center mx-auto font-thin my-2">
              You have no books on {listName.toLowerCase()} list
            </h1>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BookList;
