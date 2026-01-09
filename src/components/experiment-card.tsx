"use client";

import { motion } from "motion/react";
import type { ExperimentMetadata } from "@/lib/experiments";
import { cn } from "@/lib/utils";
import { ExperimentPreview } from "./experiment-preview";

interface ExperimentCardProps {
  experiment: ExperimentMetadata;
  size?: "normal" | "large";
  onClick?: () => void;
  index?: number;
}

export function ExperimentCard({
  experiment,
  size = "normal",
  onClick,
  index = 0,
}: ExperimentCardProps) {
  const isLarge = size === "large";

  return (
    <motion.div
      aria-label={`View ${experiment.title} experiment`}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-300",
        "hover:shadow-soft-lg hover:scale-[1.02]",
        isLarge ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      {/* Live experiment preview */}
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden",
          isLarge ? "h-[400px]" : "h-[240px]"
        )}
      >
        <ExperimentPreview
          experimentId={experiment.id}
          className="h-full w-full"
        />
      </div>

      {/* Subtle gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card via-card/80 to-transparent" />

      {/* Card info - always visible at bottom */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-medium text-foreground text-sm">
              {experiment.title}
            </h3>
            <p className="mt-0.5 line-clamp-1 text-muted-foreground text-xs">
              {experiment.description}
            </p>
          </div>

          {/* Mechanics tags - show on hover */}
          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            {experiment.mechanics.slice(0, 2).map((mechanic) => (
              <span
                className="rounded-full bg-accent/10 px-2 py-0.5 text-accent text-xs font-medium"
                key={mechanic}
              >
                {mechanic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover accent border */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-accent/0 transition-all duration-300 group-hover:ring-accent/20" />
    </motion.div>
  );
}
