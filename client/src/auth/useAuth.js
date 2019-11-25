import { useState, useEffect } from "react";
import { loader } from "graphql.macro";
import { useQuery } from "react-apollo";

const query = loader("../graphql/me.graphql");

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data, error } = useQuery(query);

  useEffect(() => {
    if (data && data.me) {
      setLoggedIn(true);
      setLoading(false);
    } else if (error) {
      setLoading(false);
      setLoggedIn(false);
    }
  }, [data, error]);

  return {
    loggedIn,
    loading
  };
};

export default useAuth;
