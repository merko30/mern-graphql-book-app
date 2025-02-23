import { useEffect, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounceValue } from "usehooks-ts";

import { useSearchQuery } from "src/generated";

const Search = () => {
  const [term, setTerm] = useState("");

  const { refetch, ...data } = useSearchQuery({ skip: !term });

  const [debouncedValue] = useDebounceValue(term, 1000);

  useEffect(() => {
    refetch({ term: debouncedValue });
  }, [debouncedValue]);

  console.log(data);

  return (
    <div className="container w-full flex-1 relative bg-white rounded-md">
      <div className="flex items-center w-full text-foreground rounded-md px-4 py-2">
        <FontAwesomeIcon icon={faSearch} size="1x" />
        <input
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          placeholder="Search books..."
          className="bg-transparent pl-2"
        />
      </div>
    </div>
  );
};

export default Search;
