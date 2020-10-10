import React, { useState, useEffect } from "react";

import Pagination from "../../common/Pagination";

import Loading from "../../common/Loading";
import Error from "../../common/Error";
import { RouteComponentProps } from "react-router-dom";
import { Status, useBooksQuery } from "../../generated";

import BookList from "./components/BookList";

import capitalize from "../../utils/capitalize";

const List = ({
  match: {
    params: { listname },
  },
}: RouteComponentProps<{ listname: Status }>) => {
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useBooksQuery({
    variables: {
      input: {
        status: listname,
        page,
        perPage: 10,
      },
    },
  });

  useEffect(() => {
    refetch({ input: { status: listname, perPage: 10, page } });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (data) {
    return (
      <div className="container h-full w-full md:w-2/3 my-5">
        {error && <Error error={error.message} />}
        <h1 className="text-2xl my-4 tracking-wider uppercase text-secondary">
          {capitalize(listname)}
        </h1>
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
