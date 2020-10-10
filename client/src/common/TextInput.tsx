import React, { ChangeEvent, InputHTMLAttributes } from "react";

interface TextInputProps {
  name: string;
  label: string;
  onChange: (e: ChangeEvent) => void;
  value: string;
  placeholder?: string;
  id?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
}

export default function TextInput({
  name,
  label,
  id,
  placeholder,
  onChange,
  value,
  type,
}: TextInputProps) {
  return (
    <div className="my-2">
      {label && (
        <label
          htmlFor={name}
          className="text-secondary block text-sm uppercase"
        >
          {label}
        </label>
      )}
      <input
        className="w-full py-2 px-4 my-1 rounded-sm bg-gray-200 border border-secondary"
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
