import React from "react";

import UserBookItem from "./UserBookItem";

const UserBookList = ({ books }) => {
  return (
    <ul className="mt-10 flex md:flex-row flex-col flex-wrap items-center">
      {books.length > 0 &&
        books.map(b => {
          return <UserBookItem book={b} key={b._id} />;
        })}
    </ul>
  );
};

export default UserBookList;
