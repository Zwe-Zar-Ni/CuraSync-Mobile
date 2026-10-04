import { useGetProfile } from "../queries";

const useAuth = () => {
  const { data, isLoading, isError } = useGetProfile();
  return {
    isLoading,
    isError,
    isAuthenticated: !!data,
    user: data
  };
};

export default useAuth;
