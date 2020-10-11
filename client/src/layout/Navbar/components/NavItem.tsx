import React, { useEffect } from "react";
import { Link } from "react-router-dom";

type NavItemProps = {
  show: boolean;
  children: React.ReactNode;
} & (
  | {
      isButton: boolean;
      onClick: () => void;
      to?: never;
    }
  | {
      to: string;
      isButton?: never;
      onClick?: never;
    }
);

const NavItem = ({ isButton, onClick, show, to, children }: NavItemProps) => {
  useEffect(() => {}, [show]);

  const className =
    "whitespace-no-wrap w-full md:w-auto text-center block md:my-0 px-3 my-1 py-2 md:py-0 x md:px-0 md:mx-3 w-full text-lg md:text-sm uppercase font-bold text-foreground hover:text-orange-900 no-underline";
  return show ? (
    isButton ? (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    ) : (
      <Link to={to!} className={className}>
        {children}
      </Link>
    )
  ) : null;
};

export default NavItem;
