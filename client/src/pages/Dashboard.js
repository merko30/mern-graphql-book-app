import React from "react";
import { useQuery } from "react-apollo";
import { loader } from "graphql.macro";

import Loading from "../common/Loading";
import Error from "../common/Error";

import UserBookList from "../books/UserBookList";
import ReadingInfo from "../books/ReadingInfo";

const query = loader("../graphql/books.graphql");

const Dashboard = () => {
  const { data, loading, error } = useQuery(query);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  if (error) return <Error error={error.message} />;

  if (data) {
    const {
      books: { books }
    } = data;
    return (
      <div className="container">
        <div className="py-10 w-100 h-full flex flex-col lg:flex-row justify-between">
          <ReadingInfo
            wishlistCount={data.books.counts.wishlist}
            readCount={data.books.counts.read}
            readingCount={data.books.counts.reading}
          />
          <div className="w-full">
            <UserBookList
              books={books.filter(b => b.status === "Wishlist")}
              listName="Wishlist"
            />
            <UserBookList
              books={books.filter(b => b.status === "Currently Reading")}
              listName="Currently reading"
            />
            <UserBookList
              books={books.filter(b => b.status === "Read")}
              listName="Read"
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Dashboard;
