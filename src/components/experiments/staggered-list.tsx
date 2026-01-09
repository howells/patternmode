/**
 * @title Staggered List
 * @description List items that animate in with staggered delay
 * @mechanics time-based, opacity-fade, spring
 * @dependencies motion
 * @approved true
 * @generated 2026-01-09
 */

"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useReducedMotion } from "@/lib/motion";

const items = [
  { label: "Design", color: "bg-accent" },
  { label: "Develop", color: "bg-foreground" },
  { label: "Deploy", color: "bg-muted-foreground" },
  { label: "Iterate", color: "bg-accent/60" },
];

export default function StaggeredList() {
  const prefersReducedMotion = useReducedMotion();
  const [key, setKey] = useState(0);

  const replay = () => setKey((k) => k + 1);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
      <motion.ul key={key} className="space-y-2 w-full max-w-[180px]">
        {items.map((item, i) => (
          <motion.li
            key={item.label}
            className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-soft"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: prefersReducedMotion ? 0 : i * 0.1,
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <span className={`h-2 w-2 rounded-full ${item.color}`} />
            <span className="text-sm font-medium">{item.label}</span>
          </motion.li>
        ))}
      </motion.ul>
      <button
        onClick={replay}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        Replay
      </button>
    </div>
  );
}

export const metadata = {
  title: "Staggered List",
  description: "List items that animate in with staggered delay",
  mechanics: ["time-based", "opacity-fade", "spring"],
  dependencies: ["motion"],
  installInstructions: "pnpm add motion",
};
