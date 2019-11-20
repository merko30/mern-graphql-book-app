import React from "react";
import BookRow from "./components/BookRow";

export default function BookTable({ books }) {
  return (
    <table className="table-fixed overflow-x-scroll">
      <thead>
        <tr>
          <th className="hidden sm:block">Cover</th>
          <th>Book name</th>
          <th>Authors</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, i) => {
          return <BookRow key={i} book={book} />;
        })}
      </tbody>
    </table>
  );
}
