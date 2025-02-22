import { useEffect } from "react";
import { Link } from "react-router-dom";

type NavItemProps = {
  show: boolean;
  className?: string;
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

const NavItem = ({
  isButton,
  onClick,
  show,
  to,
  children,
  className: _className = "",
}: NavItemProps) => {
  useEffect(() => {}, [show]);

  const className =
    "whitespace-no-wrap text-lg md:text-sm uppercase font-bold text-foreground hover:text-orange-900 no-underline " +
    _className;
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
