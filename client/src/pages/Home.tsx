import React from "react";
import { Link } from "react-router-dom";

import useAuth from "../auth/useAuth";

import Logo from "../common/Logo";

const Home = () => {
  const { loggedIn, loading } = useAuth();
  return (
    <div className="h-full relative">
      <div className="h-screen flex justify-center items-center flex-col">
        <Logo size="4xl" />
        <h4 className="text-lg text-foreground">
          Keep track of your reading activities
        </h4>
        {!loggedIn && !loading ? (
          <Link
            to="/register"
            className="py-1 px-8 border border-foreground text-foreground rounded-lg mt-3 uppercase"
          >
            Get started
          </Link>
        ) : (
          <>
            <h4
              className="text-xl text-foreground"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 200,
              }}
            >
              Welcome back
            </h4>
            <Link
              to="/dashboard"
              className="py-1 px-8 border border-foreground text-foreground rounded-lg mt-3 uppercase"
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
