import React from "react";

const Logo = ({ size }) => {
  const fontSize = `text-${size}` || "text-lg";

  return (
    <h1
      className={`${fontSize} text-secondary`}
      style={{ fontFamily: "Calistoga, sans-serif" }}
    >
      Readify
    </h1>
  );
};

export default Logo;
