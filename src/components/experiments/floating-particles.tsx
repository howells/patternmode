/**
 * @title Floating Particles
 * @description Ambient floating particles with gentle random motion
 * @mechanics time-based, particle, opacity-fade
 * @dependencies motion
 * @approved true
 * @generated 2026-01-09
 */

"use client";

import { motion } from "motion/react";
import { useMemo } from "react";
import { useReducedMotion } from "@/lib/motion";

export default function FloatingParticles() {
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        size: Math.random() * 8 + 4,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 4 + 4,
      })),
    []
  );

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-foreground to-foreground/80">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: "rgb(255 255 255 / 0.3)",
          }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [-10, 10, -10],
                  x: [-5, 5, -5],
                  opacity: [0.2, 0.5, 0.2],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium text-white/80">Ambient</span>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Floating Particles",
  description: "Ambient floating particles with gentle random motion",
  mechanics: ["time-based", "particle", "opacity-fade"],
  dependencies: ["motion"],
  installInstructions: "pnpm add motion",
};
