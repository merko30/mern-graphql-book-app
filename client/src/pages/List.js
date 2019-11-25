import React, { useState, useEffect } from "react";
import { useQuery } from "react-apollo";
import { loader } from "graphql.macro";
import capitalize from "../utils/capitalize";
import Pagination from "../common/Pagination";

const query = loader("../graphql/books.graphql");

const List = ({
  match: {
    params: { listname }
  }
}) => {
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useQuery(query, {
    variables: {
      status: capitalize(listname),
      perPage: 3
    }
  });

  useEffect(() => {
    refetch({ status: capitalize(listname), perPage: 3, page });
  }, [page]);

  if (data) {
    return (
      <>
        <table className="w-full container border border-primary mb-10 text-secondary">
          <thead>
            <tr className="border-b border-primary text-left">
              <th className="px-4 text-center">Cover</th>
              <th className="px-4">Name</th>
            </tr>
          </thead>
          <tbody>
            {data.books.books.map(book => {
              return (
                <tr key={book._id} className="border-b border-primary">
                  <td className="w-18 h-24 py-2">
                    <img
                      className="w-full h-full object-contain"
                      alt={book.title}
                      src={book.cover}
                    />
                  </td>
                  <td className="px-4">{book.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          pagesCount={data.books.totalPages}
          onClick={p => setPage(p)}
          active={page}
        />
      </>
    );
  }
  if (loading) {
    return <p>loading...</p>;
  }
  return null;
};

export default List;
