"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";

export function NuqsProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
