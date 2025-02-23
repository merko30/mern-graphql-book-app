import { Link } from "react-router-dom";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "positive" | "negative" | "neutral";
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

const VARIANT_MAP = {
  primary: "bg-foreground text-white",
  positive: "bg-positive hover:bg-white text-white hover:text-positive",
  negative: "bg-negative hover:bg-white text-white hover:text-negative",
  neutral: "bg-neutral hover:bg-white text-white hover:text-neutral",
};

const Button = ({
  onClick,
  children,
  type = "button",
  to,
  variant = "primary",
  className,
}: ButtonProps) => {
  const variantClass = VARIANT_MAP[variant] ?? "";
  const classname = `rounded-lg px-4 py-2 uppercase cursor-pointer ${variantClass} ${className}`;
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
