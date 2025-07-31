"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

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

/**
 * Props for the ReactQueryProvider component.
 */
interface ReactQueryProviderProps {
  children: React.ReactNode;
  /** Optional custom query client (uses global instance by default) */
  client?: QueryClient;
  /** Show React Query DevTools in development (default: true) */
  showDevtools?: boolean;
}

/**
 * React Query provider component.
 *
 * Provides React Query functionality to the entire app with optimized
 * configuration for icon selection and general data fetching.
 *
 * @example
 * ```tsx
 * // Basic usage
 * function App() {
 *   return (
 *     <ReactQueryProvider>
 *       <YourApp />
 *     </ReactQueryProvider>
 *   );
 * }
 *
 * // With custom client
 * function App() {
 *   const customClient = createQueryClient();
 *
 *   return (
 *     <ReactQueryProvider client={customClient}>
 *       <YourApp />
 *     </ReactQueryProvider>
 *   );
 * }
 *
 * // Disable devtools
 * function App() {
 *   return (
 *     <ReactQueryProvider showDevtools={false}>
 *       <YourApp />
 *     </ReactQueryProvider>
 *   );
 * }
 * ```
 */
export function ReactQueryProvider({
  children,
  client,
  showDevtools = true,
}: ReactQueryProviderProps) {
  const queryClient = client || getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {showDevtools && process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
}

/**
 * Query keys for consistent cache management.
 * Use these constants to ensure consistent query key usage across the app.
 */
export const QueryKeys = {
  // Icon-related queries
  icons: (search?: string) => ["icons", search] as const,
  iconSearch: (search: string) => ["icons", search] as const,

  // Add other query keys as needed
  // users: (filters?: UserFilters) => ['users', filters] as const,
  // posts: (userId?: string) => ['posts', userId] as const,
} as const;

/**
 * Utility hook to prefetch icons data.
 * Useful for preloading data before user interaction.
 */
export function usePrefetchIcons() {
  const queryClient = getQueryClient();

  const prefetchIcons = React.useCallback(
    async (search?: string) => {
      await queryClient.prefetchInfiniteQuery({
        queryKey: QueryKeys.icons(search),
        queryFn: async ({ pageParam = 0, queryKey, signal }) => {
          const [, searchTerm] = queryKey;
          const params = new URLSearchParams({
            page: pageParam.toString(),
            limit: "50",
            ...(searchTerm && { search: searchTerm }),
          });

          const response = await fetch(`/api/icons?${params}`, { signal });

          if (!response.ok) {
            throw new Error(`Failed to fetch icons: ${response.statusText}`);
          }

          const data = await response.json();

          return {
            items: data.icons,
            totalCount: data.totalCount,
            hasMore: data.hasMore,
            nextPage: data.hasMore ? pageParam + 1 : undefined,
          };
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage: any) =>
          lastPage.hasMore ? lastPage.nextPage ?? 1 : undefined,
        pages: 1, // Only prefetch first page
      });
    },
    [queryClient]
  );

  return { prefetchIcons };
}

/**
 * Hook to invalidate and refetch icons data.
 * Useful for manual cache invalidation.
 */
export function useInvalidateIcons() {
  const queryClient = getQueryClient();

  const invalidateIcons = React.useCallback(
    async (search?: string) => {
      await queryClient.invalidateQueries({
        queryKey: QueryKeys.icons(search),
      });
    },
    [queryClient]
  );

  const invalidateAllIcons = React.useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: ["icons"],
    });
  }, [queryClient]);

  return { invalidateIcons, invalidateAllIcons };
}
