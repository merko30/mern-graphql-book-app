import React from "react";
import { useQuery } from "react-apollo";
import { loader } from "graphql.macro";

const query = loader("../graphql/books.graphql");

const List = ({
  match: {
    params: { listname }
  }
}) => {
  const { data, loading, error } = useQuery(query);
  return <div>{listname}</div>;
};

export default List;
