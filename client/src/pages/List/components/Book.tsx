import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { Book as BookI } from "../../../generated";

interface BookProps {
  book: BookI;
}

const Book = ({ book }: BookProps) => {
  return (
    <div className="w-full md:w-1/2 px-1">
      <div className="flex bg-white shadow-sm my-2 rounded-md p-4">
        <img
          src={book.thumbnail}
          style={{ maxWidth: "100px" }}
          className="object-contain rounded-md"
          alt="book cover"
        />
        <div className="ml-2 flex flex-col w-full">
          <h1 className="text-gray-900">{book.title}</h1>
          {book.authors.map((author, i) => (
            <h2 key={i} className="text-gray-700 text-sm">
              {author}
            </h2>
          ))}

          <Link
            to={`/book/${book.id}`}
            className="text-foreground self-end mt-auto"
          >
            See more
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Book;
