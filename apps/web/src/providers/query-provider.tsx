"use client";

/**
 * React Query Provider Component
 *
 * Provider component that wraps the application with React Query functionality.
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

/**
 * Props for the ReactQueryProvider component.
 */
type ReactQueryProviderProps = {
  children: React.ReactNode;
  /** Optional custom query client (uses global instance by default) */
  client?: QueryClient;
  /** Show React Query DevTools in development (default: true) */
  showDevtools?: boolean;
};

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
 *   const customClient = new QueryClient();
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
  const [queryClient] = React.useState(
    () => client || new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000,
          gcTime: 10 * 60 * 1000,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* eslint-disable-next-line node/no-process-env */}
      {showDevtools && process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  );
}
