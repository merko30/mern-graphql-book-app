import { useMeQuery } from "src/generated/index";

const useAuth = () => {
  const { data, loading } = useMeQuery();

  return {
    loggedIn: !!(data && data.me),
    loading,
  };
};

export default useAuth;
