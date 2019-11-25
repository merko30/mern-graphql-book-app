import React from "react";

const Pagination = ({ pagesCount, onClick, active }) => {
  let pages = Array(pagesCount).fill(1);

  return (
    <div className="w-full flex justify-center">
      {pages.length > 1 &&
        pages.map((p, i) => {
          const activeClass = active === i + 1 ? "bg-primary" : "";
          return (
            <span
              className={`text-secondary p-2 border border-primary ${activeClass}`}
              onClick={() => onClick(i + 1)}
            >
              {i + 1}
            </span>
          );
        })}
    </div>
  );
};

export default Pagination;
