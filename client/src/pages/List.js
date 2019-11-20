import React from "react";

const List = ({
  match: {
    params: { listname }
  }
}) => {
  return <div>{listname}</div>;
};

export default List;
