/**
 * Query Keys for Consistent Cache Management
 *
 * Centralized query key definitions to ensure consistent cache usage across the app.
 */

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
