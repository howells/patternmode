/**
 * @title Elastic Toggle
 * @description Toggle switch with bouncy elastic animation
 * @mechanics click-reactive, spring, elastic
 * @dependencies motion
 * @approved true
 * @generated 2026-01-09
 */

"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useReducedMotion } from "@/lib/motion";

export default function ElasticToggle() {
  const prefersReducedMotion = useReducedMotion();
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <button
        onClick={() => setIsOn(!isOn)}
        className="relative h-10 w-20 rounded-full p-1 transition-colors duration-300"
        style={{
          backgroundColor: isOn ? "rgb(255 107 74)" : "rgb(225 225 225)",
        }}
        aria-label={isOn ? "Turn off" : "Turn on"}
      >
        <motion.div
          className="h-8 w-8 rounded-full bg-white"
          style={{
            boxShadow: "0 2px 8px rgb(0 0 0 / 0.15)",
          }}
          animate={{
            x: isOn ? 40 : 0,
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0.15 }
              : {
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                }
          }
        />
      </button>
      <span className="text-sm text-muted-foreground">
        {isOn ? "On" : "Off"}
      </span>
    </div>
  );
}

export const metadata = {
  title: "Elastic Toggle",
  description: "Toggle switch with bouncy elastic animation",
  mechanics: ["click-reactive", "spring", "elastic"],
  dependencies: ["motion"],
  installInstructions: "pnpm add motion",
};
