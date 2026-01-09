/**
 * @title Ripple Button
 * @description Button with expanding ripple effect on click
 * @mechanics click-reactive, scaling, opacity-fade
 * @dependencies motion
 * @approved true
 * @generated 2026-01-09
 */

"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useReducedMotion } from "@/lib/motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function RippleButton() {
  const prefersReducedMotion = useReducedMotion();
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        onClick={handleClick}
        className="relative overflow-hidden rounded-xl bg-foreground px-8 py-4 font-medium text-background transition-transform active:scale-95"
      >
        <span className="relative z-10">Click me</span>
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full bg-white/30"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 10,
                height: 10,
                marginLeft: -5,
                marginTop: -5,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 20, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </button>
    </div>
  );
}

export const metadata = {
  title: "Ripple Button",
  description: "Button with expanding ripple effect on click",
  mechanics: ["click-reactive", "scaling", "opacity-fade"],
  dependencies: ["motion"],
  installInstructions: "pnpm add motion",
};
