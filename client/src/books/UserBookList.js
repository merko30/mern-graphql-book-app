import React from "react";
import { Link } from "react-router-dom";

import UserBookItem from "./UserBookItem";

const UserBookList = ({ books, listName }) => {
  return (
    <div className="my-4">
      <div className="w-100 md:w-1/2 flex mx-auto">
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
      <hr style={{ height: "1px" }} className="w-100 md:w-1/2 mx-auto" />
      <div className="flex flex-col overflow-x-scroll w-full">
        <ul className="flex md:justify-center">
          {books && books.length > 0 ? (
            books.slice(0, 5).map(b => <UserBookItem book={b} key={b._id} />)
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

export default UserBookList;
