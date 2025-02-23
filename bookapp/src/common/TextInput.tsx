import { InputHTMLAttributes } from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface TextInputProps extends UseFormRegisterReturn {
  name: string;
  placeholder: string;
  icon?: FontAwesomeIconProps["icon"];
  error?: string | undefined;
  id?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  className?: string;
}

export default function TextInput({
  name,
  id,
  placeholder,
  type,
  icon,
  error,
  className = "",
  ...props
}: TextInputProps) {
  const borderClass = error ? "border-negative" : "border-gray-300";
  return (
    <div className={twMerge("mb-2", className)}>
      <div
        className={twMerge(
          `rounded-lg bg-white mb-1 px-2 flex items-center border`,
          borderClass
        )}
      >
        {icon && <FontAwesomeIcon icon={icon} className="mr-2 text-gray-300" />}
        <input
          className={`flex-1 w-full py-2 bg-white`}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-negative">{error}</p>}
    </div>
  );
}
