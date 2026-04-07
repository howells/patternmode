"use client";

const LOCAL_HOSTNAMES = new Set(["127.0.0.1", "::1", "0.0.0.0", "localhost"]);

/**
 * Restrict noisy development-only UI warnings to local browser sessions.
 *
 * Shared UI packages should not read process.env directly. The components that
 * use this helper only need a lightweight browser-side signal to avoid
 * surfacing accessibility warnings to end users in deployed environments.
 */
export function isDevelopmentBrowser(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const { hostname, protocol } = window.location;

  return (
    protocol === "file:" ||
    LOCAL_HOSTNAMES.has(hostname) ||
    hostname.endsWith(".local")
  );
}
