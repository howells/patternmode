/**
 * React Query Client Configuration
 *
 * Optimized client configuration for the entire application.
 */

import { QueryClient } from "@tanstack/react-query";

/**
 * React Query configuration optimized for icon selection and general data fetching.
 */
const queryClientConfig = {
  defaultOptions: {
    queries: {
      // Stale time: How long data stays fresh (5 minutes)
      staleTime: 5 * 60 * 1000,
      // Cache time: How long unused data stays in cache (10 minutes)
      gcTime: 10 * 60 * 1000, // Updated from cacheTime in v5
      // Retry failed requests 3 times with exponential backoff
      retry: 3,
      retryDelay: (attemptIndex: number) =>
        Math.min(1000 * 2 ** attemptIndex, 30000),
      // Enable background refetching for better UX
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      // Disable refetch on mount if data is fresh
      refetchOnMount: true,
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
    },
  },
};

/**
 * Create a new React Query client instance.
 * Use this for testing or when you need a fresh client.
 */
export function createQueryClient() {
  return new QueryClient(queryClientConfig);
}

// Global query client instance
let queryClient: QueryClient | undefined;

/**
 * Get the global React Query client instance.
 * Creates one if it doesn't exist (singleton pattern).
 */
export function getQueryClient() {
  if (!queryClient) {
    queryClient = createQueryClient();
  }
  return queryClient;
}
