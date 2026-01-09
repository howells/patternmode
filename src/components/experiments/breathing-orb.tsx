/**
 * @title Breathing Orb
 * @description Gentle pulsing orb with organic breathing animation
 * @mechanics time-based, scaling, glow
 * @dependencies motion
 * @approved true
 * @generated 2026-01-09
 */

"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/motion";

export default function BreathingOrb() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.div
        className="relative h-24 w-24 rounded-full"
        style={{
          background: "linear-gradient(135deg, rgb(255 107 74) 0%, rgb(255 154 139) 100%)",
          boxShadow: "0 0 60px rgb(255 107 74 / 0.4), 0 0 120px rgb(255 107 74 / 0.2)",
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.08, 1],
                opacity: [0.9, 1, 0.9],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgb(255 255 255 / 0.4) 0%, transparent 60%)",
          }}
        />
      </motion.div>
    </div>
  );
}

export const metadata = {
  title: "Breathing Orb",
  description: "Gentle pulsing orb with organic breathing animation",
  mechanics: ["time-based", "scaling", "glow"],
  dependencies: ["motion"],
  installInstructions: "pnpm add motion",
};
