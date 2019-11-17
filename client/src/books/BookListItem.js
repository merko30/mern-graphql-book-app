import React from "react";

import Button from "../common/Button";
import Authors from "./Authors";
import Rating from "./Rating";

const BookListItem = ({
  book: {
    volumeInfo: { title, authors, imageLinks, description, averageRating },
    id
  }
}) => {
  return (
    <div className="list-reset my-4 flex rounded-lg p-4 shadow flex-col sm:flex-row">
      {imageLinks && imageLinks.smallThumbnail && (
        <div className="w-1/2 sm:w-2/5 md:w-2/12">
          <img
            src={imageLinks.smallThumbnail}
            className="object-contain h-full w-full"
            alt={title}
          />
        </div>
      )}
      <div className="sm:w-3/5 md:w-10/12 ml-0 my-2 md:my-0 sm:ml-4 overflow-hidden">
        {title && (
          <h2 className="text-lg font-bold text-secondary truncate">{title}</h2>
        )}
        {authors && <Authors authors={authors} />}
        {description && (
          <p className="truncate text-sm text-yellow-900">{description}</p>
        )}
        {averageRating && <Rating rating={averageRating} />}
        <Button
          to={`/book/${id}`}
          additionalClasses="inline-block my-2 sm:px-2 sm:py-1"
          border
        >
          Read more
        </Button>
      </div>
    </div>
  );
};

export default BookListItem;
