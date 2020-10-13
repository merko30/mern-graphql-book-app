import React from "react";
import Loading from "../../common/Loading";
import Error from "../../common/Error";

import BookList from "./components/BookList";

import { Status, useBooksQuery, useCountsQuery } from "../../generated";

const Dashboard = () => {
  const { data, loading, error } = useBooksQuery({ variables: { input: {} } });
  const { data: countData } = useCountsQuery();

  return (
    <div className="container h-full">
      {loading && <Loading className="mx-auto mt-32" />}
      {error && <Error error={error.message} />}

      {data && countData && (
        <div className="py-10 w-100 h-full">
          <BookList
            books={data.books.books.filter((b) => b.status === Status.Wishlist)}
            count={countData?.counts.wishlist}
            listName={Status.Wishlist}
          />
          <BookList
            books={data.books.books.filter((b) => b.status === Status.Reading)}
            count={countData?.counts.reading}
            listName={Status.Reading}
          />
          <BookList
            books={data.books.books.filter((b) => b.status === Status.Read)}
            count={countData?.counts.read}
            listName={Status.Read}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
