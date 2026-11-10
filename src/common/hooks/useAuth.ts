import { useGetProfile } from '../queries';

const useAuth = () => {
  const { data, isLoading, isError, refetch } = useGetProfile();

  return {
    isLoading,
    isError,
    isAuthenticated: !!data,
    user: data!,
    refetch,
  };
};

export default useAuth;
