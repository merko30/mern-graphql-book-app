import { ChangeEvent, InputHTMLAttributes } from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

interface TextInputProps {
  name: string;
  onChange: (e: ChangeEvent) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  icon?: FontAwesomeIconProps["icon"];
  error?: string | undefined;
  id?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
}

export default function TextInput({
  name,
  id,
  placeholder,
  onChange,
  onBlur,
  value,
  type,
  icon,
  error,
}: TextInputProps) {
  const color = error ? "negative" : "neutral";
  const border = error ? "negative" : "gray-200";

  return (
    <div>
      <div
        className={`rounded-lg bg-white my-2 px-2 flex items-center text-${color} border border-${border}`}
      >
        {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
        <input
          className={`flex-1 w-full py-2 bg-white`}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
        />
      </div>
      {error && <p className="text-xs text-negative">{error}</p>}
    </div>
  );
}
