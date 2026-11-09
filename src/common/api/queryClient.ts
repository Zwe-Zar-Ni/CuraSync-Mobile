import { QueryCache, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // console.error('Error', error.message, query);
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, //* 5 minutes
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;
