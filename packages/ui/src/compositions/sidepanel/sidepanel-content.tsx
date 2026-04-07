"use client";

import { springs } from "@patternmode/motion";
import { cn } from "@patternmode/ui/utils/cn";
import { Content, Portal, Title } from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import type { ComponentProps } from "react";

type SidepanelSize = "default" | "full";

type SidepanelContentProps = Omit<
  ComponentProps<typeof Content>,
  "forceMount"
> & {
  /** Whether the sidepanel is open (required for exit animations) */
  open?: boolean;
  /** Panel size: "default" (440px inset) or "full" (full viewport) */
  size?: SidepanelSize;
  /** Accessible title for screen readers */
  title?: string;
  /** Whether to show the backdrop overlay (default: true) */
  showOverlay?: boolean;
  /** Whether a nested panel is currently open (triggers scale/shift effect) */
  hasNestedOpen?: boolean;
};

/**
 * Main content area of the sidepanel.
 * Includes portal and overlay automatically.
 *
 * - `size="default"`: Fixed 440px width, inset from edges with rounded corners
 * - `size="full"`: Full viewport coverage with safe area padding (mobile-first)
 *
 * When `hasNestedOpen` is true, the panel shifts left and scales down
 * to create a stacking effect (only applies to default size).
 */
function SidepanelContent({
  className,
  children,
  open = true,
  size = "default",
  title = "Side panel",
  showOverlay = true,
  hasNestedOpen = false,
  ...props
}: SidepanelContentProps) {
  const isFullSize = size === "full";
  return (
    <Portal forceMount>
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: showOverlay ? 1 : 0 }}
            className={cn(
              "fixed inset-0 z-50 bg-black/40",
              !showOverlay && "pointer-events-none",
            )}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key="overlay"
            transition={springs.subtle}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <Content
            forceMount
            onInteractOutside={(e) => {
              if (!showOverlay) {
                e.preventDefault();
              }
            }}
            {...props}
          >
            <motion.div
              animate={{
                x: hasNestedOpen && !isFullSize ? -32 : 0,
                scale: hasNestedOpen && !isFullSize ? 0.96 : 1,
              }}
              className={cn(
                "fixed z-50",
                "flex flex-col overflow-hidden bg-card",
                isFullSize
                  ? "inset-0 pt-safe"
                  : [
                      "top-6 right-6 bottom-6",
                      "w-[440px]",
                      "origin-right",
                      "rounded-4xl border shadow-xl",
                    ],
                className,
              )}
              data-component="sidepanel-content"
              data-sidepanel-wrapper=""
              data-slot="sidepanel-content"
              exit={{ x: "calc(100% + 1.5rem)" }}
              initial={{ x: "calc(100% + 1.5rem)" }}
              key="content"
              transition={springs.subtle}
            >
              <Title className="sr-only">{title}</Title>
              {children}
            </motion.div>
          </Content>
        )}
      </AnimatePresence>
    </Portal>
  );
}

export { SidepanelContent, type SidepanelContentProps, type SidepanelSize };
