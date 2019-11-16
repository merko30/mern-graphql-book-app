import React from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const Home = () => {
  return (
    <div className="h-full relative">
      <Button
        to="/login"
        additionalClasses="absolute top-0 right-0 mr-10 mt-5"
        border={true}
      >
        Sign In
      </Button>
      <div className="h-screen flex justify-center items-center flex-col">
        <h1
          className="text-5xl text-secondary"
          style={{ fontFamily: "Calistoga, sans-serif", lineHeight: "1.2em" }}
        >
          readify
        </h1>
        <h4
          className="text-xl text-secondary"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 200
          }}
        >
          Keep track of your reading activities
        </h4>
        <Link
          to="/register"
          className="py-1 px-8 border border-secondary text-secondary rounded-lg mt-3 uppercase"
        >
          Join today
        </Link>
      </div>
    </div>
  );
};

export default Home;
