import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NavItem = ({ button, onClick, show, to, children }) => {
  useEffect(() => {}, [show]);

  return show ? (
    <li className="list-reset">
      {button ? (
        <button
          onClick={onClick}
          className="hover:text-teal-dark no-underline text-teal bg-gray-light font-bold m-3"
        >
          {children}
        </button>
      ) : (
        <Link
          to={to}
          className="p-3 md:p-5 font-bold text-teal hover:text-teal-dark no-underline"
        >
          {children}
        </Link>
      )}
    </li>
  ) : null;
};

export default NavItem;
