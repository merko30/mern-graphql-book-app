interface PaginationProps {
  pagesCount: number;
  onClick: (page: number) => void;
  active: number;
}

const Pagination = ({ pagesCount, onClick, active }: PaginationProps) => {
  const pages = Array(pagesCount).fill(1);

  return (
    <div className="w-full flex justify-center my-2">
      {pages.length > 1 &&
        pages.map((_, i) => {
          const activeClass = active === i + 1 ? "bg-background_two" : "";
          return (
            <span
              className={`cursor-pointer text-foreground p-2 border border-background_two ${activeClass} hover:bg-background_two`}
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
