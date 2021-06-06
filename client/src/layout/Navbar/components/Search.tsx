import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import Loading from "../../../common/Loading";

import { useSearchLazyQuery } from "../../../generated";
import getBookCover from "../../../utils/getBookCover";

const Search = () => {
  const [term, setTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [runQuery, { data, loading, error }] = useSearchLazyQuery({
    variables: { term },
  });
  const menuRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchActive(true);
      if (term.length > 3) {
        runQuery({ variables: { term } });
      } else {
        setSearchActive(false);
      }

      return () => clearTimeout(timeout);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  const handleBodyClick = (e: MouseEvent) => {
    let m = ReactDOM.findDOMNode(menuRef.current);
    if (m && !m.contains(e.target as any)) {
      setSearchActive(false);
      setTerm("");
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleBodyClick);

    return () => window.removeEventListener("click", handleBodyClick);
  }, []);

  return (
    <div className="container w-full relative px-0 mx-2">
      <div className="flex items-center w-full shadow-sm bg-background_two text-foreground rounded-md px-4 py-2">
        <FontAwesomeIcon icon={faSearch} size="1x" />
        <input
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          placeholder="Search books..."
          className="bg-transparent pl-2 search-input"
        />
      </div>
      {searchActive && (
        <div className="overflow-scroll h-64 bg-white border border-background_two rounded-lg shadow-lg absolute top-0 mt-16 left-0 z-10 w-full flex flex-col">
          {loading && <Loading className="m-auto" />}
          {error && <p>error</p>}
          {data &&
            data.search.length > 0 &&
            data.search.map((book) => {
              return (
                <Link
                  key={book.id}
                  to={`/book/${book.id}`}
                  ref={menuRef}
                  className={`block flex border-b border-background_two p-2 hover:bg-background_two`}
                >
                  <img
                    src={getBookCover(book.volumeInfo.imageLinks ?? null)}
                    alt="book poster"
                    className="object-contain w-12 mr-2"
                  />
                  <h1 className="text-md font-bold">{book.volumeInfo.title}</h1>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Search;
