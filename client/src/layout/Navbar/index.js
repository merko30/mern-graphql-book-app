import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApolloClient, useQuery } from "react-apollo";
import { loader } from "graphql.macro";

import NavItem from "./components/NavItem";
import Logo from "../../common/Logo";
import MenuButton from "./components/MenuButton";
import Search from "./components/Search";

const query = loader("../../graphql/me.graphql");

const Navbar = ({ blacklist }) => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const { data, loading } = useQuery(query);
  const client = useApolloClient();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    await client.resetStore();
    await client.clearStore();
    client.writeQuery({ query, data: { me: null } });
  };
  const loggedIn = data && data.me;
  const menuClass = show ? "flex" : "hidden";

  const handleMenu = () => {
    if (window.innerWidth > 768) {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleMenu);

    return () => window.removeEventListener("resize", handleMenu);
  }, []);

  return !blacklist.includes(pathname) ? (
    <div className="container flex flex-col md:flex-row items-center justify-between pt-2 mb-10">
      <Link to="/">
        <Logo size="xl" />
      </Link>

      <MenuButton onClick={() => setShow(!show)} />

      {!loading && (
        <ul
          className={`${menuClass} border-b border-primary md:border-0 w-full md:flex items-center justify-end flex-col md:flex-row`}
        >
          <NavItem show={!loggedIn} to="/register">
            Register
          </NavItem>

          <NavItem show={!loggedIn} to="/login">
            Login
          </NavItem>

          <Search />

          <NavItem show={loggedIn} to="/dashboard">
            My books
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
