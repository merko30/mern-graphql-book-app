import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Pagination from "src/common/Pagination";
import Loading from "src/common/Loading";
import Error from "src/common/Error";

import capitalize from "src/utils/capitalize";

import { Status, useBooksQuery } from "src/generated/index";

import BookList from "./components/BookList";

const List = () => {
  const { listname } = useParams();
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useBooksQuery({
    variables: {
      input: {
        status: listname as Status,
        page,
        perPage: 10,
      },
    },
  });

  useEffect(() => {
    refetch({ input: { status: listname as Status, perPage: 10, page } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (data) {
    return (
      <div className="container h-full w-full md:w-2/3 my-5">
        {error && <Error error={error.message} />}
        {listname && (
          <h1 className="text-2xl my-4 tracking-wider uppercase text-foreground">
            {capitalize(listname)}
          </h1>
        )}
        <BookList books={data.books.books} />
        {data.books.totalPages > 1 && (
          <Pagination
            pagesCount={data.books.totalPages}
            onClick={(p: number) => setPage(p)}
            active={page}
          />
        )}
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  return null;
};

export default List;
