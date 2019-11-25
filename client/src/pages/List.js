import React, { useState, useEffect } from "react";
import { useQuery } from "react-apollo";
import { loader } from "graphql.macro";
import capitalize from "../utils/capitalize";
import Pagination from "../common/Pagination";
import BookTable from "../books/BookTable";
import Loading from "../common/Loading";
import Error from "../common/Error";

const query = loader("../graphql/books.graphql");

const List = ({
  match: {
    params: { listname }
  }
}) => {
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useQuery(query, {
    variables: {
      status: capitalize(listname),
      perPage: 10
    }
  });

  useEffect(() => {
    refetch({ status: capitalize(listname), perPage: 10, page });
  }, [page]);

  if (data) {
    return (
      <div className="container">
        {error && <Error error={error.message} />}
        <BookTable books={data.books.books} />
        {data.books.totalPages > 1 && (
          <Pagination
            pagesCount={data.books.totalPages}
            onClick={p => setPage(p)}
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
