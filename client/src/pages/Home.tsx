import React from "react";
import { Link } from "react-router-dom";

import Button from "../common/Button";

import useAuth from "../auth/useAuth";
import Logo from "../common/Logo";

const Home = () => {
  const { loggedIn, loading } = useAuth();
  return (
    <div className="h-full relative">
      {!loggedIn && !loading && (
        <Button to="/login" className="absolute top-0 right-0 mr-10 mt-5">
          Sign In
        </Button>
      )}
      <div className="h-screen flex justify-center items-center flex-col">
        <Logo size="4xl" />
        <h4
          className="text-xl text-secondary"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 200,
          }}
        >
          Keep track of your reading activities
        </h4>
        {!loggedIn && !loading ? (
          <Link
            to="/register"
            className="py-1 px-8 border border-secondary text-secondary rounded-lg mt-3 uppercase"
          >
            Join today
          </Link>
        ) : (
          <>
            <h4
              className="text-xl text-secondary"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 200,
              }}
            >
              Welcome back
            </h4>
            <Link
              to="/dashboard"
              className="py-1 px-8 border border-secondary text-secondary rounded-lg mt-3 uppercase"
            >
              Go to my books
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
