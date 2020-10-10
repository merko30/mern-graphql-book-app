import React from "react";

interface ErrorProps {
  error: string;
}

const Error = ({ error }: ErrorProps) => {
  return <p className="text-red-600 font-bold">{error}</p>;
};

export default Error;
