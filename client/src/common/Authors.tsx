import getInitials from "utils/getInitials";

interface AuthorsProps {
  authors: string[];
  className?: string;
}

const Authors = ({ authors, className }: AuthorsProps) => {
  const textSize = authors.length > 2 ? "text-sm" : "";
  return (
    <div className={`block ${className}`}>
      {authors.map((author, i) => {
        return (
          <h3 key={author} className={`inline ${textSize}`}>
            {authors.length - 1 === i
              ? getInitials(author)
              : `${getInitials(author)} | `}
          </h3>
        );
      })}
    </div>
  );
};

export default Authors;
