"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

import { ScrollPane } from "@/components/scroll-pane";
import type { HomeSectionId } from "@/lib/home-sections";
import { homeSections } from "@/lib/home-sections";
import { setActiveSection } from "@/lib/shell-store";

/** How far down the pane a section's top must pass before it counts as current. */
const READING_LINE = 0.35;

const sectionInView = (pane: HTMLElement): HomeSectionId | null => {
  const atEnd = pane.scrollTop + pane.clientHeight >= pane.scrollHeight - 2;
  if (atEnd) {
    return homeSections.at(-1) ?? null;
  }
  const line = pane.scrollTop + pane.clientHeight * READING_LINE;
  let current: HomeSectionId | null = null;
  for (const id of homeSections) {
    const section = pane.querySelector<HTMLElement>(`#${id}`);
    if (section !== null && section.offsetTop <= line) {
      current = id;
    }
  }
  return current;
};

const isHomeSection = (value: string): value is HomeSectionId =>
  homeSections.some((id) => id === value);

/** Inputs that mean the reader, not the page, moved the pane. */
const READER_INPUTS = ["wheel", "touchmove", "keydown", "pointerdown"] as const;

/**
 * Home's one scrolling region. It reports the section in view to the header
 * and keeps the address bar's hash in step, so a copied link opens where the
 * reader was. The hero clears the hash.
 */
export const HomePane = ({ children }: { children: ReactNode }) => {
  const readerMoved = useRef(false);

  const onPaneScroll = (pane: HTMLElement) => {
    const current = sectionInView(pane);
    setActiveSection(current);

    // Only the reader's own scrolling rewrites the URL. Loading a deep link,
    // restoring a position or following a contents link leaves it as it is.
    if (!readerMoved.current) {
      return;
    }
    const hash = current === null ? "" : `#${current}`;
    if (hash !== window.location.hash) {
      history.replaceState(history.state, "", `${window.location.pathname}${hash}`);
    }
  };

  useEffect(() => {
    const pane = document.querySelector<HTMLElement>("#content");
    if (pane === null) {
      throw new Error("Home pane is missing");
    }

    // A deep link opened in a new document lands on its section explicitly;
    // the browser's own fragment scroll can run before the pane has its height.
    const target = window.location.hash.slice(1);
    if (isHomeSection(target) && pane.scrollTop === 0) {
      pane.querySelector<HTMLElement>(`#${target}`)?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }

    const markReader = () => {
      readerMoved.current = true;
    };
    const markLink = (event: MouseEvent) => {
      // A contents link or the masthead sets its own URL; don't fight it on the way there.
      if (
        event.target instanceof Element &&
        event.target.closest("a[href^='/'], a[href^='#']") !== null
      ) {
        readerMoved.current = false;
      }
    };
    // Back and forward between Home's own entries keep the document, so
    // nothing remounts and the router doesn't scroll. Move the pane to the
    // entry's section, at once, as the browser does for a traversal.
    let traverseFrame = 0;
    const followTraversal = () => {
      if (window.location.pathname !== "/") {
        return;
      }
      readerMoved.current = false;
      cancelAnimationFrame(traverseFrame);
      traverseFrame = requestAnimationFrame(() => {
        const id = window.location.hash.slice(1);
        const section = isHomeSection(id) ? pane.querySelector<HTMLElement>(`#${id}`) : null;
        if (section === null) {
          pane.scrollTo({ behavior: "instant", top: 0 });
          return;
        }
        section.scrollIntoView({ behavior: "instant", block: "start" });
      });
    };

    const listening = new AbortController();
    const { signal } = listening;
    for (const input of READER_INPUTS) {
      pane.addEventListener(input, markReader, { passive: true, signal });
    }
    document.addEventListener("click", markLink, { capture: true, signal });
    window.addEventListener("popstate", followTraversal, { signal });

    return () => {
      cancelAnimationFrame(traverseFrame);
      listening.abort();
      setActiveSection(null);
    };
  }, []);

  return (
    <ScrollPane
      as="main"
      className="home-pane"
      id="content"
      memoryKey="home"
      onPaneScroll={onPaneScroll}
      tabIndex={-1}
    >
      {children}
    </ScrollPane>
  );
};
