import React, { useState, useEffect, useContext } from "react";

import apiContext from "../books/context/api";

import Error from "../common/Error";
import Loading from "../common/Loading";
import BookListItem from "../books/BookListItem";
import { useDebounce } from "../hooks/useDebounce";

const Search = () => {
  const api = useContext(apiContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchBooks = async term => {
    setLoading(true);
    try {
      let data = await api.search(term);
      setResults(data.items);
    } catch (error) {
      setError(error);
    }
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setLoading(true);
        searchBooks(debouncedSearchTerm);
      } else {
        setResults([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm]
  );

  return (
    <ul className="container w-9/12 my-4">
      <input
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
        placeholder="Search books..."
        className="p-4 w-full bg-primary rounded-lg shadow-inner my-2"
      />
      {error && <Error error={error.message} />}
      {loading && <Loading />}
      {results &&
        results.map(book => {
          return <BookListItem book={book} key={book.id} />;
        })}
    </ul>
  );
};

export default Search;
