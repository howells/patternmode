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
  // Sort experiments: featured first, then by date
  const sortedExperiments = [...experiments].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (
      new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
    );
  });

  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {sortedExperiments.map((experiment, index) => (
        <ExperimentCard
          experiment={experiment}
          index={index}
          key={experiment.id}
          onClick={() => onExperimentClick?.(experiment)}
          size={experiment.featured ? "large" : "normal"}
        />
      ))}
    </div>
  );
}
