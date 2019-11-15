import React from "react";
import { Link } from "react-router-dom";
import { useApolloClient, useQuery } from "react-apollo";
import { loader } from "graphql.macro";

import NavItem from "./components/NavItem";

const query = loader("../../graphql/me.graphql");

const Navbar = () => {
  const { data } = useQuery(query);
  const client = useApolloClient();

  const handleLogout = async () => {
    localStorage.clear();
    await client.clearStore();
  };

  const loggedIn = data && data.me;

  return (
    <div className="mx-2 mt-2 w-full flex justify-between items-center flex-row">
      <h1>
        <Link to="/" className="inline my-10 no-underline text-orange">
          BookApp
        </Link>
      </h1>

      {data && (
        <ul className="flex items-center pl-0 justify-start">
          <NavItem show={!loggedIn} to="/register">
            Register
          </NavItem>

          <NavItem show={!loggedIn} to="/login">
            Login
          </NavItem>

          <NavItem show={loggedIn} to="/search">
            Search books
          </NavItem>
          <NavItem show={loggedIn} button={true} onClick={handleLogout}>
            Logout
          </NavItem>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
