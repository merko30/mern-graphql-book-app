import React from "react";

interface PaginationProps {
  pagesCount: number;
  onClick: (page: number) => void;
  active: number;
}

const Pagination = ({ pagesCount, onClick, active }: PaginationProps) => {
  let pages = Array(pagesCount).fill(1);

  return (
    <div className="w-full flex justify-center my-2">
      {pages.length > 1 &&
        pages.map((_, i) => {
          const activeClass = active === i + 1 ? "bg-primary" : "";
          return (
            <span
              className={`cursor-pointer text-secondary p-2 border border-primary ${activeClass} hover:bg-primary`}
              onClick={() => onClick(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          );
        })}
    </div>
  );
};

export default Pagination;
