import React from "react";
import { graphql } from "react-apollo";

import { UserBookList, Loading, Error } from "../components";
import getUsersBook from "../graphql/queries/books";

const Dashboard = ({ data, loading, error }) => {
  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;

  if (data) {
    console.log(data);
    return (
      <div className="mt-10 container">
        <p>books loaded</p>
        {/* <UserBookList books={books} /> */}
      </div>
    );
  }
};

export default graphql(getUsersBook)(Dashboard);
