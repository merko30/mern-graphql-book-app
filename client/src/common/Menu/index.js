import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import MoreIcon from "./MoreIcon";

const Menu = ({ children }) => {
  const [show, setShow] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleBodyClick);

    return () => document.removeEventListener("click", handleBodyClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handleBodyClick = e => {
    let opener = Array.from(document.getElementsByTagName("i"))[1];
    let m = ReactDOM.findDOMNode(menuRef.current);
    if (m && !m.contains(e.target) && e.target !== opener) {
      setShow(false);
    }
  };

  return (
    <div className="absolute right-0 top-0 flex" ref={menuRef}>
      {show ? (
        <ul className="list-reset shadow-lg border border-primary bg-white mr-1 mt-4 rounded-lg">
          {children}
        </ul>
      ) : null}
      <MoreIcon handleClick={() => setShow(!show)} />
    </div>
  );
};

export default Menu;
