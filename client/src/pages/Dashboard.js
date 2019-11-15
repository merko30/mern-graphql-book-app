import React from "react";
import { useQuery } from "react-apollo";
import { loader } from "graphql.macro";

import { UserBookList, Loading, Error } from "../components";

const query = loader("../graphql/me.graphql");

const Dashboard = () => {
  const { data, loading, error } = useQuery(query);

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

export default Dashboard;
