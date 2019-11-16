import React, { useState, useEffect } from "react";

import GoogleSearch from "../API/search";

import Error from "../common/Error";
import Loading from "../common/Loading";
import BookListItem from "../books/BookListItem";

// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => clearTimeout(handler);
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeout, setTime] = useState(null);

  const searchBooks = async term => {
    setLoading(true);
    try {
      let data = await GoogleSearch.search(term);
      setResults(data.items);
    } catch (error) {
      setError(error);
    }
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setLoading(true);
        searchBooks(debouncedSearchTerm);
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <ul className="container px-4 w-9/12 mx-auto my-4">
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
