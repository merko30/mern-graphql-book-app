import React from "react";
import PropTypes from "prop-types";

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.any,
  type: PropTypes.string.isRequired
};

export default function TextInput({
  name,
  label,
  id,
  placeholder,
  onChange,
  value,
  type
}) {
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
