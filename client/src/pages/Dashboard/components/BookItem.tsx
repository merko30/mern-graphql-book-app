import { Link } from "react-router-dom";

import { Book } from "generated/index";

interface BookItemProps {
  book: Omit<Book, "user">;
}

const BookItem = ({ book: { id, thumbnail, title } }: BookItemProps) => {
  return (
    <li className="list-reset my-5 relative mx-10 scale-hover inline-block">
      <Link to={`/book/${id}`} className="no-underline text-black">
        <div className="w-16 h-24">
          <img
            src={thumbnail}
            alt={title}
            className="object-contain w-full h-full"
          />
        </div>
      </Link>
    </li>
  );
};

export default BookItem;
