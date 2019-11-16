import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useApolloClient, useQuery } from "react-apollo";
import { loader } from "graphql.macro";

import NavItem from "./components/NavItem";
import Logo from "../../common/Logo";

const query = loader("../../graphql/me.graphql");

const Navbar = ({ blacklist }) => {
  const { pathname } = useLocation();
  const { data, loading } = useQuery(query);
  const client = useApolloClient();

  const handleLogout = async () => {
    localStorage.clear();
    await client.clearStore();
  };

  const loggedIn = data && data.me;

  return !blacklist.includes(pathname) ? (
    <div className="container mx-auto flex items-center justify-between my-2 px-4">
      <Link to="/">
        <Logo size="xl" />
      </Link>

      {!loading && (
        <ul className="flex items-center justify-start">
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
  ) : null;
};

export default Navbar;
