/**
 * @title Draggable Chip
 * @description Chip that can be dragged and snaps back with spring physics
 * @mechanics drag-based, spring, magnetic
 * @dependencies motion
 * @approved true
 * @generated 2026-01-09
 */

"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/lib/motion";

export default function DraggableChip() {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.div
        className="cursor-grab rounded-full bg-accent px-6 py-3 text-sm font-medium text-white active:cursor-grabbing"
        style={{
          x: prefersReducedMotion ? 0 : springX,
          y: prefersReducedMotion ? 0 : springY,
          boxShadow: "0 4px 20px rgb(255 107 74 / 0.3)",
        }}
        drag={!prefersReducedMotion}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.5}
        whileDrag={{ scale: 1.1 }}
        onDrag={(_, info) => {
          x.set(info.offset.x);
          y.set(info.offset.y);
        }}
        onDragEnd={() => {
          x.set(0);
          y.set(0);
        }}
      >
        Drag me
      </motion.div>
    </div>
  );
}

export const metadata = {
  title: "Draggable Chip",
  description: "Chip that can be dragged and snaps back with spring physics",
  mechanics: ["drag-based", "spring", "magnetic"],
  dependencies: ["motion"],
  installInstructions: "pnpm add motion",
};
