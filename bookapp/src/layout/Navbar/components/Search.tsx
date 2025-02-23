import { RefObject, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounceValue, useOnClickOutside } from "usehooks-ts";

import { useSearchQuery, SearchQuery } from "src/generated";

type SearchResults = Pick<SearchQuery, "search">["search"];

const Search = () => {
  const [term, setTerm] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState<SearchResults>([]);

  const ref = useRef<HTMLInputElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(
    [
      ref as RefObject<HTMLInputElement>,
      resultsRef as RefObject<HTMLDivElement>,
    ],
    () => setActive(false)
  );

  const { refetch } = useSearchQuery({ skip: !term });

  const [debouncedValue] = useDebounceValue(term, 1000);

  useEffect(() => {
    refetch({ term: debouncedValue }).then((res) => {
      setResults(res?.data?.search || []);
      setActive(true);
    });
  }, [debouncedValue]);

  return (
    <div className="container w-full flex-1 relative bg-white rounded-md">
      <div className="flex items-center w-full text-foreground rounded-md px-4 py-2">
        <FontAwesomeIcon icon={faSearch} size="1x" />
        <input
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          placeholder="Search books..."
          className="bg-transparent pl-2"
          ref={ref as RefObject<HTMLInputElement>}
        />
      </div>
      {active && (
        <div
          ref={resultsRef}
          className="absolute top-12 w-full bg-white rounded-md shadow-md z-10"
        >
          {results.map((book) => (
            <div key={book.id} className="p-2 border-b border-background">
              <Link to={`/book/${book.id}`} onClick={() => setActive(false)}>
                <p className="text-foreground">{book.volumeInfo.title}</p>
                <div className="flex items-center">
                  {book.volumeInfo.authors?.map((author) => (
                    <span key={author} className="text-xs text-gray-400">
                      {author}
                    </span>
                  ))}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
