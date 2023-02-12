import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { GoogleBook } from "generated/index";

import getBookCover from "utils/getBookCover";

interface BookSuggestionsProps {
  books: Partial<GoogleBook>[];
}

const BookSuggestions = ({ books }: BookSuggestionsProps) => {
  const [active, setActive] = useState(0);

  const onBack = () => {
    if (active === 0) {
      return;
    } else {
      setActive((p) => (p -= 1));
    }
  };

  const onNext = () => {
    if (active === books.length - 1) {
      return;
    } else {
      setActive((p) => (p += 1));
    }
  };

  return (
    <div className="my-2 pb-4 w-full my-2 pb-4 w-full row-start-3 row-end-4 md:row-start-2 md:row-end-3 col-start-1 col-end-2">
      <h1 className="text-sm my-3 text-foreground tracking-widest uppercase">
        You might like:
      </h1>
      <div className="flex items-center justify-around">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="mx-1 cursor-pointer"
          size="2x"
          onClick={onBack}
        />
        <Link to={`/book/${books[active].id}`}>
          <img
            src={getBookCover(books[active].volumeInfo?.imageLinks)}
            alt="book poster"
            className="object-contain rounded-md"
            style={{ height: "250px" }}
          />
        </Link>
        <FontAwesomeIcon
          icon={faChevronRight}
          className="mx-1 cursor-pointer"
          size="2x"
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default BookSuggestions;
