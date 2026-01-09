"use client";

import type { ExperimentMetadata } from "@/lib/experiments";
import { ExperimentCard } from "./experiment-card";

interface ExperimentGridProps {
  experiments: ExperimentMetadata[];
  onExperimentClick?: (experiment: ExperimentMetadata) => void;
}

export function ExperimentGrid({
  experiments,
  onExperimentClick,
}: ExperimentGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {experiments.map((experiment) => (
        <ExperimentCard
          experiment={experiment}
          key={experiment.id}
          onClick={() => onExperimentClick?.(experiment)}
          size={experiment.featured ? "large" : "normal"}
        />
      ))}
    </div>
  );
}
