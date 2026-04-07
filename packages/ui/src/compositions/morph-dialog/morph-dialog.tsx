"use client";

import { durations, springs } from "@patternmode/motion";
import { radii } from "@patternmode/ui/lib/radii";
import { shadows } from "@patternmode/ui/lib/shadows";
import { cn } from "@patternmode/ui/utils/cn";
import {
  Content as DialogContent,
  Description as DialogDescription,
  Portal as DialogPortal,
  Root as DialogRoot,
  Title as DialogTitle,
  Trigger as DialogTrigger,
} from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { createContext, useContext, useId, useState } from "react";

/**
 * Shared spring config for layout animations.
 * Using subtle spring - high damping for minimal bounce, professional feel.
 */
const LAYOUT_SPRING = springs.subtle;

interface MorphDialogContextValue {
  layoutId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MorphDialogContext = createContext<MorphDialogContextValue | null>(null);

function useMorphDialog() {
  const ctx = useContext(MorphDialogContext);
  if (!ctx) {
    throw new Error("useMorphDialog must be used within MorphDialog");
  }
  return ctx;
}

interface MorphDialogProps {
  children: React.ReactNode;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Controlled open state */
  open?: boolean;
}

function MorphDialog({
  children,
  open: controlledOpen,
  onOpenChange,
}: MorphDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const layoutId = useId();

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <MorphDialogContext.Provider value={{ layoutId, open, setOpen }}>
      <DialogRoot onOpenChange={setOpen} open={open}>
        {children}
      </DialogRoot>
    </MorphDialogContext.Provider>
  );
}

interface MorphDialogTriggerProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Style props for the layoutId element (the one that morphs).
   * Motion can only auto-correct borderRadius and boxShadow distortion
   * if they're set via style prop, not className.
   * Pass matching values from your trigger children here.
   * @example style={{ borderRadius: radii["2xl"], boxShadow: shadows.none }}
   */
  style?: React.CSSProperties;
}

function MorphDialogTrigger({
  children,
  className,
  style,
}: MorphDialogTriggerProps) {
  const { layoutId, open } = useMorphDialog();

  return (
    <DialogTrigger asChild disabled={open}>
      <motion.div
        className={cn(className, open && "invisible")}
        layoutId={layoutId}
        style={style}
        transition={{ layout: LAYOUT_SPRING }}
      >
        {/* Child with layout="position" prevents text/image distortion during scale */}
        <motion.div layout="position" transition={{ layout: LAYOUT_SPRING }}>
          {children}
        </motion.div>
      </motion.div>
    </DialogTrigger>
  );
}

interface MorphDialogContentProps {
  children: React.ReactNode;
  className?: string;
  /** Test ID for E2E testing */
  "data-testid"?: string;
  /** Position of the dialog. "center" (default) centers in viewport, "bottom" anchors near bottom for thumb reach */
  position?: "center" | "bottom";
}

function MorphDialogContent({
  children,
  className,
  position = "center",
  "data-testid": testId,
}: MorphDialogContentProps) {
  const { layoutId, open, setOpen } = useMorphDialog();

  // Base width: 100% - spacing.12 (24px padding each side), max ~384px
  const baseClasses =
    "fixed left-1/2 z-50 -translate-x-1/2 w-[calc(100%-theme(spacing.12))] max-w-sm";

  const positionClasses =
    position === "bottom"
      ? `${baseClasses} top-1/2 -translate-y-1/4`
      : `${baseClasses} top-1/2 -translate-y-1/2`;

  return (
    <AnimatePresence>
      {open && (
        <DialogPortal forceMount>
          <motion.div
            animate={{ opacity: 1 }}
            className="glass-scrim fixed inset-0 z-40"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            transition={{ duration: durations.normal }}
          />

          <DialogContent asChild>
            <motion.div
              className={cn(
                positionClasses,
                "overflow-hidden bg-white",
                position === "bottom" && "max-h-[calc(100vh-3rem)]",
                className,
              )}
              data-testid={testId}
              layoutId={layoutId}
              style={{
                borderRadius: radii["4xl"],
                boxShadow: shadows["2xl"],
              }}
              transition={{ layout: LAYOUT_SPRING }}
            >
              {/* Content fades in after morph settles */}
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                layout="position"
                transition={{
                  layout: LAYOUT_SPRING,
                  opacity: {
                    delay: durations.moderate,
                    duration: durations.normal,
                  },
                }}
              >
                {children}
              </motion.div>
            </motion.div>
          </DialogContent>
        </DialogPortal>
      )}
    </AnimatePresence>
  );
}

interface MorphDialogTitleProps {
  children: React.ReactNode;
  className?: string;
  /** Visually hide but keep accessible to screen readers */
  visuallyHidden?: boolean;
}

/**
 * Title for the dialog. Required for accessibility.
 * Use visuallyHidden prop to hide visually while keeping accessible.
 */
function MorphDialogTitle({
  children,
  className,
  visuallyHidden,
}: MorphDialogTitleProps) {
  if (visuallyHidden) {
    return <DialogTitle className="sr-only">{children}</DialogTitle>;
  }

  return (
    <DialogTitle asChild>
      <span className={className}>{children}</span>
    </DialogTitle>
  );
}

interface MorphDialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
  /** Visually hide but keep accessible to screen readers */
  visuallyHidden?: boolean;
}

/**
 * Description for the dialog. Provides accessible description.
 * Use visuallyHidden prop to hide visually while keeping accessible.
 */
function MorphDialogDescription({
  children,
  className,
  visuallyHidden,
}: MorphDialogDescriptionProps) {
  if (visuallyHidden) {
    return (
      <DialogDescription className="sr-only">{children}</DialogDescription>
    );
  }

  return (
    <DialogDescription className={className}>{children}</DialogDescription>
  );
}

export {
  MorphDialog,
  MorphDialogContent,
  MorphDialogDescription,
  MorphDialogTitle,
  MorphDialogTrigger,
  useMorphDialog,
};
