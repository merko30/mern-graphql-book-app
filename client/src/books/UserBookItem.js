import React from "react";
import { Link } from "react-router-dom";

import BookMenu from "./BookMenu";
import Authors from "./Authors";

const UserBookItem = ({ book }) => {
  const { title, bookID, cover, authors } = book;
  return (
    <li className="list-reset my-5 relative mx-10 scale-hover inline-block">
      <Link to={`/book/${bookID}`} className="no-underline text-black">
        <div className="w-16 h-24">
          <img
            src={cover}
            alt={title}
            className="object-contain w-full h-full"
          />
        </div>
      </Link>
    </li>
  );
};

export default UserBookItem;
