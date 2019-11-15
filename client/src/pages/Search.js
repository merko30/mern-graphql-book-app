import React, { useState } from "react";

import GoogleSearch from "../API/search";

import { BookListItem, Error, Loading } from "../components";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeout, setTime] = useState(0);

  const searchBooks = async () => {
    try {
      let data = await GoogleSearch.search(this.state.searchTerm);
      setResults(data.items);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const handleChange = e => {
    setSearchTerm(e.target.value);
    clearTimeout(timeout);
    setResults(null);
    setLoading(true);
    setTime(
      setTimeout(() => {
        searchBooks();
      }, 300)
    );
  };

  return (
    <ul className="p-0 mx-3">
      <input
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search books..."
        className="block p-4 w-full bg-grey-lighter rounded-lg shadow-inner my-2"
      />
      {error && <Error error={error.message} />}
      {loading && <Loading />}
      {results &&
        results.map(book => {
          return (
            <div key={book.id}>
              <BookListItem book={book} />
            </div>
          );
        })}
    </ul>
  );
};

export default Search;
