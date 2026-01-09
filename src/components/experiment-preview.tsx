"use client";

import dynamic from "next/dynamic";
import { Suspense, useMemo } from "react";

interface ExperimentPreviewProps {
  experimentId: string;
  className?: string;
}

// Map of experiment IDs to their dynamic imports
const experimentModules: Record<string, ReturnType<typeof dynamic>> = {
  "magnetic-button": dynamic(
    () => import("@/components/experiments/example-button"),
    { ssr: false }
  ),
  "breathing-orb": dynamic(
    () => import("@/components/experiments/breathing-orb"),
    { ssr: false }
  ),
  "hover-lift-card": dynamic(
    () => import("@/components/experiments/hover-lift-card"),
    { ssr: false }
  ),
  "ripple-button": dynamic(
    () => import("@/components/experiments/ripple-button"),
    { ssr: false }
  ),
  "morphing-shape": dynamic(
    () => import("@/components/experiments/morphing-shape"),
    { ssr: false }
  ),
  "staggered-list": dynamic(
    () => import("@/components/experiments/staggered-list"),
    { ssr: false }
  ),
  "elastic-toggle": dynamic(
    () => import("@/components/experiments/elastic-toggle"),
    { ssr: false }
  ),
  "floating-particles": dynamic(
    () => import("@/components/experiments/floating-particles"),
    { ssr: false }
  ),
  "draggable-chip": dynamic(
    () => import("@/components/experiments/draggable-chip"),
    { ssr: false }
  ),
};

function LoadingPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
    </div>
  );
}

export function ExperimentPreview({
  experimentId,
  className,
}: ExperimentPreviewProps) {
  const ExperimentComponent = useMemo(
    () => experimentModules[experimentId],
    [experimentId]
  );

  if (!ExperimentComponent) {
    return (
      <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
        Unknown experiment
      </div>
    );
  }

  return (
    <div className={className}>
      <Suspense fallback={<LoadingPlaceholder />}>
        <ExperimentComponent />
      </Suspense>
    </div>
  );
}
