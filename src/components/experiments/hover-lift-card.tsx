/**
 * @title Hover Lift Card
 * @description Card that lifts and tilts subtly on hover with soft shadow
 * @mechanics hover-reactive, scaling, rotation
 * @dependencies motion
 * @approved true
 * @generated 2026-01-09
 */

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotion } from "@/lib/motion";

export default function HoverLiftCard() {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-50, 50], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-6" style={{ perspective: "1000px" }}>
      <motion.div
        className="relative w-full max-w-[200px] rounded-2xl bg-white p-6"
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mb-3 h-3 w-3 rounded-full bg-accent" />
        <div className="mb-2 h-2 w-24 rounded-full bg-foreground/80" />
        <div className="h-2 w-16 rounded-full bg-foreground/40" />
        <div
          className="absolute inset-0 -z-10 rounded-2xl"
          style={{
            boxShadow: "0 4px 12px rgb(0 0 0 / 0.08), 0 16px 40px rgb(0 0 0 / 0.08)",
          }}
        />
      </motion.div>
    </div>
  );
}

export const metadata = {
  title: "Hover Lift Card",
  description: "Card that lifts and tilts subtly on hover with soft shadow",
  mechanics: ["hover-reactive", "scaling", "rotation"],
  dependencies: ["motion"],
  installInstructions: "pnpm add motion",
};
