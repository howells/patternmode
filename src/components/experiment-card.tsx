"use client";

import { type ExperimentMetadata } from "@/lib/experiments";
import { cn } from "@/lib/utils";

interface ExperimentCardProps {
  experiment: ExperimentMetadata;
  size?: "normal" | "large";
  onClick?: () => void;
}

export function ExperimentCard({
  experiment,
  size = "normal",
  onClick,
}: ExperimentCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-card cursor-pointer transition-all hover:border-foreground/20",
        size === "large" ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
      )}
    >
      {/* Experiment preview */}
      <div className="relative flex h-full min-h-[240px] items-center justify-center p-8">
        <div className="w-full">
          {/* Dynamic import will go here */}
          <div className="text-muted-foreground text-sm">
            {experiment.title}
          </div>
        </div>
      </div>

      {/* Metadata overlay on hover */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-card-dark/90 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <h3 className="text-card-dark-foreground font-semibold">
          {experiment.title}
        </h3>
        <p className="text-card-dark-foreground/70 text-sm line-clamp-2">
          {experiment.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {experiment.mechanics.map((mechanic) => (
            <span
              key={mechanic}
              className="rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent-foreground"
            >
              {mechanic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
