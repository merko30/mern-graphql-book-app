import React from "react";

const shorten = name => {
  const splited = name.split(" ");

  const newArr = splited.slice(0, splited.length - 1).map(a => {
    return a.slice(0, 1) + ". ";
  });

  return newArr.join(" ") + splited[splited.length - 1];
};

const Authors = ({ authors, classes }) => {
  return (
    <div className={`block ${classes}`}>
      {authors.map((author, i) => {
        return (
          <h3 key={author} className="inline text-orange-900">
            {authors.length - 1 === i
              ? shorten(author)
              : `${shorten(author)} | `}
          </h3>
        );
      })}
    </div>
  );
};

export default Authors;
