import { Link } from "react-router-dom";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "positive" | "negative" | "neutral";
  border?: boolean;
  outline?: boolean;
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
  border = true,
  to,
  variant = "primary",
  className,
  outline = false,
}: ButtonProps) => {
  const buttonColor = !outline
    ? `bg-${variant} hover:bg-white`
    : `bg-white hover:bg-${variant}`;
  const buttonText = !outline
    ? `text-white hover:text-${variant}`
    : `text-${variant} hover:text-white`;
  const borderClass = border && `border border-${variant}`;
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
