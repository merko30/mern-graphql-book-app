import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import MoreIcon from "./components/MoreIcon";

const Menu = ({ show, handleMenu, children }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleBodyClick);

    return () => document.removeEventListener("click", handleBodyClick);
  }, []);

  const handleBodyClick = e => {
    let opener = Array.from(document.getElementsByTagName("i"))[1];
    let m = ReactDOM.findDOMNode(menuRef.current);
    if (m && !m.contains(e.target) && e.target !== opener) {
      handleMenu();
    }
  };

  return (
    <div className="absolute pin-r pin-t flex" ref={menuRef}>
      {show ? (
        <ul className="list-reset border border-solid border-grey bg-white p-3 mr-2 mt-4 rounded-lg">
          {children}
        </ul>
      ) : null}
      <MoreIcon handleClick={handleMenu} />
    </div>
  );
};

export default Menu;
