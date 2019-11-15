import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-full flex items-center justify-center flex-col">
      <h1>BookApp</h1>
      <h3>Hi, BookApp helps you track your bookshelves</h3>
      <h3>
        To get started,{" "}
        <Link to="/register" className="underline">
          sign in
        </Link>
      </h3>
    </div>
  );
};

export default Home;
