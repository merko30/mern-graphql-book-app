import React from "react";

interface LogoProps {
  size: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

const Logo = ({ size = "lg" }: LogoProps) => {
  const fontSize = `text-${size}`;

  return (
    <h1
      className={`${fontSize} text-secondary`}
      style={{ fontFamily: "Calistoga, sans-serif" }}
    >
      Booker
    </h1>
  );
};

export default Logo;
