import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: 1500,
      staleTime: 5 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
      throwOnError: true,
    },
    mutations: {
      throwOnError: true,
    },
  },
});
