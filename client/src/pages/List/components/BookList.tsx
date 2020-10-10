import React from "react";

import { Book as BookI } from "../../../generated";

import Book from "./Book";

interface BookListProps {
  books: BookI[];
}

const BookList = ({ books }: BookListProps) => {
  return (
    <div className="flex flex-wrap justify-center">
      {books.map((b) => (
        <Book book={b} key={b.id} />
      ))}
    </div>
  );
};

export default BookList;
