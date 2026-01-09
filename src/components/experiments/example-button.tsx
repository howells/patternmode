/**
 * @title Magnetic Button
 * @description Button that follows cursor within magnetic field, snapping back on mouse leave
 * @mechanics magnetic, spring
 * @dependencies motion, @/lib/motion
 * @approved true
 * @generated 2026-01-08
 */

"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { springs, useReducedMotion } from "@/lib/motion";

const MAGNETIC_RADIUS = 80;

export default function MagneticButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springs.magnetic);
  const springY = useSpring(y, springs.magnetic);

  useEffect(() => {
    const button = ref.current;
    if (!button || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < MAGNETIC_RADIUS) {
        const strength = 1 - distance / MAGNETIC_RADIUS;
        x.set(distanceX * strength * 0.5);
        y.set(distanceY * strength * 0.5);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, prefersReducedMotion]);

  return (
    <motion.button
      className="relative rounded-lg bg-accent px-6 py-3 font-medium text-accent-foreground text-sm transition-colors hover:bg-accent/90"
      ref={ref}
      style={{ x: springX, y: springY }}
    >
      Hover Me
    </motion.button>
  );
}

export const metadata = {
  title: "Magnetic Button",
  description:
    "Button that follows cursor within magnetic field, snapping back on mouse leave",
  mechanics: ["magnetic", "spring"],
  dependencies: ["motion", "@/lib/motion"],
  installInstructions: "pnpm add motion",
};
