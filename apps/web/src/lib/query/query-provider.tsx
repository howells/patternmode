"use client";

/**
 * React Query Provider Component
 *
 * Provider component that wraps the application with React Query functionality.
 */

import type { QueryClient } from "@tanstack/react-query";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

import { getQueryClient } from "./query-client";

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
