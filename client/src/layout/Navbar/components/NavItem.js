import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NavItem = ({ button, onClick, show, to, children }) => {
  useEffect(() => {}, [show]);

  return show ? (
    <li className="list-reset">
      {button ? (
        <button
          onClick={onClick}
          className="hover:text-gray-800 no-underline text-gray-700 text-sm uppercase mx-3"
        >
          {children}
        </button>
      ) : (
        <Link
          to={to}
          className="px-3 md:px-5 text-sm uppercase text-gray-700 hover:text-gray-800 no-underline"
        >
          {children}
        </Link>
      )}
    </li>
  ) : null;
};

export default NavItem;
