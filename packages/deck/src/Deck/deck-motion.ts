import type { AdvanceDirection } from "../types";
import { EXIT_ROTATION } from "./deck-constants";

export const cardExitVariants = {
  exit: (custom: { velocity: number; direction: AdvanceDirection | null }) => {
    const speed = Math.abs(custom?.velocity ?? 0);
    const dir = custom?.direction;
    return {
      opacity: 0,
      rotate: dir === "left" ? -EXIT_ROTATION : EXIT_ROTATION,
      scale: 0.96,
      transition: {
        damping: speed > 600 ? 32 : 25,
        opacity: { duration: 0.15, ease: "easeIn" as const },
        stiffness: speed > 600 ? 280 : 180,
        type: "spring" as const,
      },
      x: dir === "left" ? "-120%" : "120%",
    };
  },
};
