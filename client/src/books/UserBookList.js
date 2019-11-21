import React from "react";
import { Link } from "react-router-dom";

import UserBookItem from "./UserBookItem";

const UserBookList = ({ books, listName }) => {
  return (
    <>
      <div className="w-1/2 flex mx-auto">
        <h1
          className="text-sm mb-1 uppercase"
          style={{ letterSpacing: "0.1em" }}
        >
          {listName}
        </h1>
        <Link
          to={`/lists/${listName}`}
          className="text-xs text-gray-600 hover:text-gray-700 inline-block ml-auto"
        >
          See all
        </Link>
      </div>
      <hr style={{ height: "1px" }} className="w-1/2 mx-auto" />
      <div className="flex flex-col overflow-x-scroll">
        <ul className="flex">
          {books.slice(0, 5).map(b => (
            <UserBookItem book={b} key={b._id} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserBookList;
