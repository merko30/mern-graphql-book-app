import { useEffect } from "react";
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
    "text-sm text-foreground font-medium tracking-widest uppercase hover:opacity-80";
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
