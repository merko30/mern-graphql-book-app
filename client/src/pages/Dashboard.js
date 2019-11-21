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

  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;

  if (data) {
    const {
      books: { books }
    } = data;
    return (
      <div className="container">
        <div className="py-10 h-full flex flex-col md:flex-row justify-center">
          {/* <ReadingInfo
            wishlistCount={data.me.wishlistCount}
            readCount={data.me.readCount}
            readingCount={data.me.readingCount}
          /> */}
          <div>
            <UserBookList
              books={books.filter(b => b.status === "Wishlist")}
              listName="Wishlist"
            />
            <UserBookList
              books={books.filter(b => b.status === "Currently reading")}
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
  return <p>hello</p>;
};

export default Dashboard;
