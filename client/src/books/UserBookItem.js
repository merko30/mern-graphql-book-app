import React from "react";
import { Link } from "react-router-dom";

import BookMenu from "./BookMenu";
import Authors from "./Authors";

const UserBookItem = ({ book }) => {
  const { title, bookID, cover, authors } = book;
  return (
    <li className="list-reset flex my-5 md:w-1/2 lg:w-1/3 min-h-12 relative pr-12">
      <Link to={`/book/${bookID}`} className="no-underline text-black">
        <div className="flex flex-col md:flex-row">
          <div>
            <img src={cover} alt={title} className="object-cover" />
          </div>
          <div className="mx-1 md:mx-4 w-32">
            <h4 className="text-grey-darkest">{title}</h4>
            <Authors authors={authors} />
          </div>
        </div>
      </Link>
      <BookMenu book={book} />
    </li>
  );
};

export default UserBookItem;
