import { cva } from "class-variance-authority";

/** Root container variants */
export const stepperRootVariants = cva(
  "relative flex w-full items-start justify-between",
  {
    variants: {
      size: {
        sm: "",
        base: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

/** Track line - absolute positioned behind circles */
export const stepperTrackVariants = cva(
  "absolute h-px overflow-hidden bg-muted",
  {
    variants: {
      size: {
        // top: vertical center of circle container
        // left/right: half the container size (circle center)
        // sm: size-7 (28px) → top 14px, inset 14px
        sm: "top-3.5 right-3.5 left-3.5",
        // base: size-9 (36px) → top 18px, inset 18px
        base: "top-[18px] right-[18px] left-[18px]",
        // lg: size-11 (44px) → top 22px, inset 22px
        lg: "top-[22px] right-[22px] left-[22px]",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

/** Circle container - fixed size with z-index to sit above track */
export const stepperCircleContainerVariants = cva("relative z-10", {
  variants: {
    size: {
      // Fixed size matches largest circle (current/upcoming/disabled)
      sm: "size-7", // 28px
      base: "size-9", // 36px
      lg: "size-11", // 44px
    },
  },
  defaultVariants: {
    size: "base",
  },
});

/** Step circle variants - absolutely positioned to prevent layout shift */
export const stepperCircleVariants = cva(
  "group absolute top-1/2 left-1/2 flex shrink-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-colors",
  {
    variants: {
      size: {
        sm: "",
        base: "",
        lg: "",
      },
      state: {
        completed: "bg-affirmative-accent",
        current:
          "border bg-input hover:border-affirmative-border hover:bg-affirmative-soft",
        upcoming:
          "border bg-input hover:border-affirmative-border hover:bg-affirmative-soft",
        disabled: "border bg-input opacity-50",
      },
    },
    defaultVariants: {
      size: "base",
      state: "upcoming",
    },
  },
);

/** Step icon variants */
export const stepperIconVariants = cva("transition-colors", {
  variants: {
    size: {
      sm: "",
      base: "",
      lg: "",
    },
    state: {
      completed: "text-white",
      current: "text-muted-foreground group-hover:text-affirmative-accent",
      upcoming: "text-muted-foreground group-hover:text-affirmative-accent",
      disabled: "text-muted-foreground opacity-50",
    },
  },
  defaultVariants: {
    size: "base",
    state: "upcoming",
  },
});

/** Step label variants - absolutely positioned to not affect flex layout */
export const stepperLabelVariants = cva(
  "absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-xs",
  {
    variants: {
      size: {
        // top positions label below the circle container height + gap
        sm: "top-9", // h-7 (28px) + 8px gap = 36px
        base: "top-11", // h-9 (36px) + 8px gap = 44px
        lg: "top-[52px]", // h-11 (44px) + 8px gap = 52px
      },
      state: {
        completed: "text-foreground",
        current: "text-foreground",
        upcoming: "text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
      },
    },
    defaultVariants: {
      size: "base",
      state: "upcoming",
    },
  },
);

/** Step state type */
export type StepState = "completed" | "current" | "upcoming" | "disabled";
