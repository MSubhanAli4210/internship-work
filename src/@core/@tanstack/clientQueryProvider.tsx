import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const localStoragePersistor = createAsyncStoragePersister({
    storage: window.localStorage,
  });

  const queryClient: any = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        retryDelay: 1500,
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
      },
    },
  });
  persistQueryClient({
    queryClient,
    persister: localStoragePersistor,
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
