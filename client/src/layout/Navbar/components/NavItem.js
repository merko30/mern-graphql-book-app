import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NavItem = ({ button, onClick, show, to, children }) => {
  useEffect(() => {}, [show]);

  return show ? (
    <li>
      {button ? (
        <button
          onClick={onClick}
          className="whitespace-no-wrap block text-left px-3 my-1 py-4 md:py-0 md:my-0 md:px-0 w-full text-lg hover:text-orange-900 no-underline text-secondary md:text-sm uppercase md:mx-3"
        >
          {children}
        </button>
      ) : (
        <Link
          to={to}
          className="whitespace-no-wrap block md:my-0 my-1 text-left py-4 md:py-0 w-full text-lg px-3 md:px-0 md:text-sm uppercase text-secondary hover:text-orange-900 no-underline md:mx-3"
        >
          {children}
        </Link>
      )}
    </li>
  ) : null;
};

export default NavItem;
