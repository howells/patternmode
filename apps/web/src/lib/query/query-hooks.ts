"use client";

/**
 * Custom React Query Hooks
 *
 * Utility hooks for common query operations like prefetching and cache invalidation.
 */

import React from "react";

import { getQueryClient } from "./query-client";
import { QueryKeys } from "./query-keys";

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
        getNextPageParam: (lastPage: { hasMore: boolean; nextPage?: number }) =>
          lastPage.hasMore ? lastPage.nextPage ?? 1 : undefined,
        pages: 1, // Only prefetch first page
      });
    },
    [queryClient],
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
    [queryClient],
  );

  const invalidateAllIcons = React.useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: ["icons"],
    });
  }, [queryClient]);

  return { invalidateIcons, invalidateAllIcons };
}
