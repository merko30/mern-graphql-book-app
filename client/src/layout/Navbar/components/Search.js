import React, { useState, useEffect, useContext, useRef } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import apiContext from "../../../books/context/api";

import { useDebounce } from "../../../hooks/useDebounce";
import Loading from "../../../common/Loading";

const Search = () => {
  const api = useContext(apiContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);

  const searchBooks = async term => {
    setLoading(true);
    try {
      let data = await api.search(term);
      setResults(data.items);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleBodyClick = e => {
    let m = ReactDOM.findDOMNode(menuRef.current);
    if (m && !m.contains(e.target)) {
      setResults(null);
      setSearchTerm("");
    }
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    window.addEventListener("click", handleBodyClick);

    return () => window.removeEventListener("click", handleBodyClick);
  }, []);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setResults(null);
        setLoading(true);
        searchBooks(debouncedSearchTerm);
      } else {
        setResults(null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm]
  );

  return (
    <div className="container w-1/2 relative px-0 mx-2">
      <input
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
        placeholder="Search books..."
        className="px-4 py-2 w-full bg-primary rounded-lg shadow-inner my-2 search-input"
      />
      {(loading || error || results) && (
        <div className="bg-white border border-primary rounded-lg shadow-lg absolute top-0 mt-16 left-0 z-10 w-full">
          {loading && <Loading />}
          {error && <p>error</p>}
          {results &&
            results.length > 0 &&
            results.map(book => {
              return (
                <Link
                  key={book.id}
                  to={`/book/${book.id}`}
                  ref={menuRef}
                  className="block border-b border-primary p-2 hover:bg-primary"
                >
                  {book.volumeInfo.title}
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Search;
