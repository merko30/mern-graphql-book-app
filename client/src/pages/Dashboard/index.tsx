import React from "react";
import Loading from "../../common/Loading";
import Error from "../../common/Error";

import BookList from "./components/BookList";

import { Status, useBooksQuery, useCountsQuery } from "../../generated";

const Dashboard = () => {
  const { data, loading, error } = useBooksQuery({ variables: { input: {} } });
  const { data: countData } = useCountsQuery();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  if (error) return <Error error={error.message} />;

  if (data && countData) {
    const {
      books: { books },
    } = data;
    return (
      <div className="container">
        <div className="py-10 w-100 h-full">
          <BookList
            books={books.filter((b) => b.status === Status.Wishlist)}
            count={countData?.counts.wishlist}
            listName={Status.Wishlist}
          />
          <BookList
            books={books.filter((b) => b.status === Status.Reading)}
            count={countData?.counts.reading}
            listName={Status.Reading}
          />
          <BookList
            books={books.filter((b) => b.status === Status.Read)}
            count={countData?.counts.read}
            listName={Status.Read}
          />
        </div>
      </div>
    );
  }
  return null;
};

export default Dashboard;
