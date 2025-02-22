import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = () => {
  const [term, setTerm] = useState("");

  return (
    <div className="container w-full flex-1 relative px-0 mx-2">
      <div className="flex items-center w-full text-foreground rounded-md px-4 py-2">
        <FontAwesomeIcon icon={faSearch} size="1x" />
        <input
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          placeholder="Search books..."
          className="bg-transparent pl-2 search-input"
        />
      </div>
    </div>
  );
};

export default Search;
