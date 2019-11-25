import React from "react";

import Logo from "../common/Logo";

const Footer = () => {
  return (
    <div className="bg-primary p-6 text-center">
      <Logo size="lg" />
      <h3
        className="text-lg ml-1 text-secondary"
        style={{ fontFamily: "Calistoga, sans-serif" }}
      >
        merko &copy; 2019
      </h3>
    </div>
  );
};

export default Footer;
