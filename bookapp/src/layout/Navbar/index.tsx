import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

import NavItem from "./components/NavItem";
import Logo from "src/common/Logo";
import MenuButton from "./components/MenuButton";
import Search from "./components/Search";

import { useMeQuery } from "src/generated/index";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { data, loading } = useMeQuery();
  const { clearStore, resetStore } = useApolloClient();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    await resetStore();
    await clearStore();
  };
  const loggedIn = !!(data && data.me);

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

  return (
    <div className="container flex flex-col md:flex-row md:items-center justify-between pt-2 mb-5">
      <Link to="/dashboard" className="flex-1">
        <Logo size="xl" />
      </Link>

      <MenuButton onClick={() => setShow(!show)} />

      {!loading && (
        <ul
          className={`${menuClass} flex-1 pt-4 md:pt-0 border-b border-background_two md:border-b-0 md:flex items-center justify-end flex-col md:flex-row`}
        >
          <NavItem show={!loggedIn} to="/register">
            Register
          </NavItem>

          <NavItem show={!loggedIn} to="/login">
            Login
          </NavItem>

          <Search />

          <NavItem show={loggedIn} isButton={true} onClick={handleLogout}>
            Logout
          </NavItem>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
