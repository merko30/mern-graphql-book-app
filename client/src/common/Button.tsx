import React from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  className?: string;
  border?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
} & (
  | {
      type: "submit";
      onClick?: never;
      to?: never;
    }
  | {
      onClick: () => void;
      to?: never;
    }
  | {
      to: string;
      onClick?: never;
    }
);

const Button = ({
  onClick,
  children,
  type = "button",
  color = "white",
  textColor = "secondary",
  border = true,
  to,
  className,
}: ButtonProps) => {
  const buttonColor = `bg-${color}-300 hover:bg-${color}-400`;
  const buttonText = `text-${textColor}`;
  const borderClass = border && `border border-${textColor}`;
  const classname = `rounded-lg ${buttonColor} ${buttonText} ${borderClass} px-4 py-2 uppercase ${className}`;
  return to ? (
    <Link to={to} className={classname}>
      {children}
    </Link>
  ) : (
    <button className={classname} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
