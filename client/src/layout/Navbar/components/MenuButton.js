import React from "react";

const MenuButton = ({ onClick }) => {
  return (
    <button
      className="block md:hidden absolute top-0 right-0 mx-4 my-2 w-8"
      onClick={onClick}
    >
      <span className="block h-1 w-full bg-secondary my-1"></span>
      <span className="block h-1 w-full bg-secondary my-1"></span>
      <span className="block h-1 w-full bg-secondary my-1"></span>
    </button>
  );
};

export default MenuButton;
