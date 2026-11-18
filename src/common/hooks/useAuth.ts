import { useGetProfile } from '../queries';

const useAuth = () => {
  const { data, isLoading, isError, refetch, isRefetching } = useGetProfile();

  return {
    isLoading,
    isError,
    isAuthenticated: !!data,
    user: data!,
    refetch,
    isRefetching,
  };
};

export default useAuth;
