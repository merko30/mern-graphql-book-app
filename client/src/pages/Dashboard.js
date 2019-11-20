import React from "react";
import { useQuery } from "react-apollo";
import { loader } from "graphql.macro";

import Loading from "../common/Loading";
import Error from "../common/Error";

import UserBookList from "../books/UserBookList";
import BookTable from "../books/BookTable";

const query = loader("../graphql/me.graphql");

const Dashboard = () => {
  const { data, loading, error } = useQuery(query);

  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;

  if (data) {
    return (
      <div className="mt-10 container">
        <UserBookList books={data.me.books} listName="Wishlist" />
        <UserBookList books={data.me.books} listName="Currently reading" />
        <UserBookList books={data.me.books} listName="Read" />
      </div>
    );
  }
  return <p>hello</p>;
};

export default Dashboard;
