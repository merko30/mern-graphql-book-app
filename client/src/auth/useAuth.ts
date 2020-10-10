import { useMeQuery } from "../generated";

const useAuth = () => {
  const { data, loading } = useMeQuery();

  return {
    loggedIn: !!(data && data.me),
    loading,
  };
};

export default useAuth;
