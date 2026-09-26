import { QueryCache, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error("Error", error, query);
    }
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, //* 5 minutes
      retry: (failureCount, error: any) => {
        //! Stop retrying immediately if the response is a 401
        if (error?.status === 401 || error?.response?.status === 401) {
          return false;
        }
        //! Otherwise, fall back to the default behavior (up to 3 times)
        return failureCount < 2;
      },
      refetchOnWindowFocus: false
    }
  }
});

export default queryClient;
