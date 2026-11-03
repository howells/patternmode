"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";

import { readRestorableScroll, saveScroll } from "@/lib/shell-store";

type PaneElement = "div" | "main" | "section";

interface ScrollPaneProps extends HTMLAttributes<HTMLElement> {
  as?: PaneElement;
  children: ReactNode;
  /** Identifies the pane in session storage, e.g. "home" or "stacksheet:reference". */
  memoryKey: string;
  onPaneScroll?: (pane: HTMLElement) => void;
}

/** Frames to keep re-applying a restored offset while the router settles on the hash. */
const SETTLE_FRAMES = 6;

/**
 * A region that scrolls on its own and remembers where it was. The offset is
 * saved as the reader scrolls and put back only on back, forward or reload,
 * so a fresh visit starts at the top and a deep link still lands on its
 * anchor.
 */
export const ScrollPane = ({
  as = "div",
  children,
  memoryKey,
  onPaneScroll,
  ...rest
}: ScrollPaneProps) => {
  const paneRef = useRef<HTMLElement | null>(null);
  const setPane = (node: HTMLElement | null) => {
    paneRef.current = node;
  };
  const onPaneScrollRef = useRef(onPaneScroll);

  useEffect(() => {
    onPaneScrollRef.current = onPaneScroll;
  });

  useEffect(() => {
    const pane = paneRef.current;
    if (pane === null) {
      throw new Error(`ScrollPane "${memoryKey}" mounted without its element`);
    }

    let settleFrame = 0;
    const restored = readRestorableScroll(memoryKey);
    if (restored !== null) {
      // The router scrolls to the URL's hash after mount; put the reader's
      // own position back once it has, for a few frames.
      const restore = () => {
        pane.scrollTo({ behavior: "instant", top: restored });
      };
      restore();
      let frames = 0;
      const settle = () => {
        if (Math.abs(pane.scrollTop - restored) > 1) {
          restore();
        }
        frames += 1;
        if (frames < SETTLE_FRAMES) {
          settleFrame = requestAnimationFrame(settle);
        }
      };
      settleFrame = requestAnimationFrame(settle);
    }
    onPaneScrollRef.current?.(pane);

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        saveScroll(memoryKey, pane.scrollTop);
        onPaneScrollRef.current?.(pane);
      });
    };

    pane.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(settleFrame);
      pane.removeEventListener("scroll", onScroll);
    };
  }, [memoryKey]);

  if (as === "main") {
    return (
      <main ref={setPane} {...rest}>
        {children}
      </main>
    );
  }
  if (as === "section") {
    return (
      <section ref={setPane} {...rest}>
        {children}
      </section>
    );
  }
  return (
    <div ref={setPane} {...rest}>
      {children}
    </div>
  );
};
