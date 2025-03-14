import { Link } from "react-router-dom";

import useAuth from "src/auth/useAuth";

import Logo from "src/common/Logo";

const Home = () => {
  const { loggedIn, loading } = useAuth();
  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col items-center justify-center">
      <Logo className="text-3xl mb-4" />
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
  );
};

export default Home;
