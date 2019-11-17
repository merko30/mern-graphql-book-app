import React from "react";
import { Link } from "react-router-dom";

export default function Button({
  onClick,
  children,
  type,
  color,
  textColor,
  to,
  borderColor,
  border,
  additionalClasses
}) {
  const buttonColor = color
    ? `bg-${color}-300 hover:bg-${color}-400`
    : "bg-white hover:bg-secondary";
  const buttonText = textColor
    ? `text-${textColor}`
    : "text-secondary hover:text-white";
  const buttonBorder = border
    ? borderColor
      ? `border border-${borderColor}-300 hover:border-${borderColor}-400`
      : "border border-secondary"
    : "";
  const classname = `${buttonBorder} rounded-lg ${buttonColor} ${buttonText} px-4 py-2 uppercase ${additionalClasses}`;
  return to ? (
    <Link to={to} className={classname}>
      {children}
    </Link>
  ) : (
    <button className={classname} type={type || "button"} onClick={onClick}>
      {children}
    </button>
  );
}
