/**
 * @title Morphing Shape
 * @description Organic shape that morphs between states on hover
 * @mechanics hover-reactive, morphing, color-shift
 * @dependencies motion
 * @approved true
 * @generated 2026-01-09
 */

"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useReducedMotion } from "@/lib/motion";

export default function MorphingShape() {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const paths = {
    blob1: "M44.5,-51.3C57.7,-41.6,68.5,-27.4,71.6,-11.4C74.7,4.6,70.1,22.4,60.2,36.4C50.3,50.4,35.2,60.5,18.3,65.9C1.4,71.3,-17.2,72,-32.9,65.1C-48.6,58.2,-61.4,43.7,-68.1,26.6C-74.8,9.5,-75.4,-10.2,-68.5,-26.5C-61.6,-42.8,-47.2,-55.7,-32,-63.2C-16.8,-70.7,-0.8,-72.8,13.3,-69.4C27.4,-66,31.2,-57.1,44.5,-51.3Z",
    blob2: "M39.3,-46.2C50.9,-36.8,60.3,-24.4,64.2,-9.9C68.1,4.6,66.5,21.2,58.5,34.1C50.5,47,36.1,56.2,20.3,61.1C4.5,66,-12.7,66.6,-27.8,61.1C-42.9,55.6,-56,44,-63.3,29.3C-70.6,14.6,-72.1,-3.2,-67.2,-19C-62.3,-34.8,-51,-48.6,-37.5,-57.5C-24,-66.4,-8.3,-70.4,3.5,-74.7C15.3,-79,27.7,-55.5,39.3,-46.2Z",
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.div
        className="cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      >
        <svg width="160" height="160" viewBox="0 0 200 200">
          <motion.path
            d={isHovered && !prefersReducedMotion ? paths.blob2 : paths.blob1}
            transform="translate(100 100)"
            fill="url(#gradient)"
            animate={{
              d: isHovered && !prefersReducedMotion ? paths.blob2 : paths.blob1,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <motion.stop
                offset="0%"
                animate={{
                  stopColor: isHovered ? "rgb(255 107 74)" : "rgb(255 154 139)",
                }}
                transition={{ duration: 0.5 }}
              />
              <motion.stop
                offset="100%"
                animate={{
                  stopColor: isHovered ? "rgb(255 154 139)" : "rgb(255 107 74)",
                }}
                transition={{ duration: 0.5 }}
              />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}

export const metadata = {
  title: "Morphing Shape",
  description: "Organic shape that morphs between states on hover",
  mechanics: ["hover-reactive", "morphing", "color-shift"],
  dependencies: ["motion"],
  installInstructions: "pnpm add motion",
};
