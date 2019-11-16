import React from "react";
import { useQuery } from "react-apollo";
import { loader } from "graphql.macro";

import Loading from "../common/Loading";
import Error from "../common/Error";

const query = loader("../graphql/me.graphql");

const Dashboard = () => {
  const { data, loading, error } = useQuery(query);

  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;

  if (data) {
    console.log(data);
    return (
      <div className="mt-10 container">
        <p className="text-secondary">books loaded</p>
        {/* <UserBookList books={books} /> */}
      </div>
    );
  }
  return <p>hello</p>;
};

export default Dashboard;
