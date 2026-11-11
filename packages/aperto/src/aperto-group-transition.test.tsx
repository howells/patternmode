// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type * as MotionModule from "motion/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Aperto } from "./index";
import { cloneAnimation, resetCloneAnimation } from "./motion-test-double";
import type { ApertoMediaItem } from "./index";

// oxlint-disable-next-line anti-slop/no-module-mocking, vitest/prefer-import-in-mock -- Aperto imports motion/react directly; the double (see motion-test-double) implements only the elements Aperto renders, so the full module type of an import() cannot describe it.
vi.mock("motion/react", async (importOriginal) => {
  const { motionDouble } = await import("./motion-test-double");
  return { ...(await importOriginal<typeof MotionModule>()), ...motionDouble };
});

const MEDIA: ApertoMediaItem[] = [
  {
    alt: "Ceramic vessels on linen",
    src: "/first-large.jpg",
    title: "Studio table",
    type: "image",
  },
  { alt: "A quiet reading nook", src: "/second-large.jpg", title: "Soft afternoon", type: "image" },
];

const getClone = () => document.querySelector('[data-slot="aperto-transition-media"]');
const getContent = () => document.querySelector('[data-slot="aperto-content"]');

/** Plays Motion reporting the clone's animation finished. */
const completeFlight = () => {
  act(() => {
    cloneAnimation.complete?.();
  });
};

const renderGroup = (props: Partial<Parameters<typeof Aperto.Group>[0]> = {}) => (
  <Aperto.Group media={MEDIA} {...props}>
    <Aperto.Thumbnail index={0} />
    <Aperto.Thumbnail index={1} />
  </Aperto.Group>
);

describe("Aperto.Group media transitions", () => {
  afterEach(() => {
    cleanup();
    resetCloneAnimation();
  });

  it("marks the content as opening only until the opening flight completes", async () => {
    cloneAnimation.manual = true;
    render(renderGroup());

    fireEvent.click(screen.getByRole("button", { name: "Open Soft afternoon" }));

    expect(getContent()).toHaveAttribute("data-aperto-transition", "opening");
    expect(getClone()).toBeInTheDocument();

    completeFlight();

    await waitFor(() => {
      expect(getClone()).not.toBeInTheDocument();
    });
    expect(getContent()).not.toHaveAttribute("data-aperto-transition");
  });

  it("marks the content as closing until the closing flight completes, then returns focus", async () => {
    cloneAnimation.manual = true;
    render(renderGroup());
    const opener = screen.getByRole("button", { name: "Open Soft afternoon" });
    fireEvent.click(opener);
    completeFlight();

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(getContent()).toHaveAttribute("data-aperto-transition", "closing");
    expect(document.querySelector('[data-slot="aperto-overlay"]')).toBeInTheDocument();
    expect(getClone()).toBeInTheDocument();

    completeFlight();

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(document.activeElement).toBe(opener);
    });
  });

  it("closes from the middle of an opening flight", async () => {
    cloneAnimation.manual = true;
    render(renderGroup());

    fireEvent.click(screen.getByRole("button", { name: "Open Studio table" }));
    expect(getContent()).toHaveAttribute("data-aperto-transition", "opening");

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(getContent()).toHaveAttribute("data-aperto-transition", "closing");

    completeFlight();

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("reports navigation without moving a controlled index", async () => {
    const user = userEvent.setup();
    const changes: number[] = [];
    render(
      renderGroup({
        index: 0,
        onIndexChange: (nextIndex) => {
          changes.push(nextIndex);
        },
      }),
    );

    await user.click(screen.getByRole("button", { name: "Open Studio table" }));
    await user.click(screen.getByRole("button", { name: "Next media" }));

    expect(changes).toStrictEqual([0, 1]);
    expect(screen.getByRole("dialog", { name: "Studio table" })).toBeInTheDocument();
  });

  it("holds a spring opening until Motion reports it complete, past any fixed duration", () => {
    cloneAnimation.manual = true;
    vi.useFakeTimers();
    try {
      // Each render recreates the onIndexChange identity, mimicking a parent re-render.
      const view = render(renderGroup({ motion: "bouncy", onIndexChange: () => {} }));
      fireEvent.click(screen.getByRole("button", { name: "Open Studio table" }));
      act(() => {
        vi.advanceTimersByTime(300);
      });
      view.rerender(renderGroup({ motion: "bouncy", onIndexChange: () => {} }));
      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(getClone()).toBeInTheDocument();
      expect(getContent()).toHaveAttribute("data-aperto-transition", "opening");

      completeFlight();

      expect(getClone()).not.toBeInTheDocument();
      expect(getContent()).not.toHaveAttribute("data-aperto-transition");
    } finally {
      vi.useRealTimers();
    }
  });

  it("holds a spring closing until Motion reports it complete, past any fixed duration", () => {
    cloneAnimation.manual = true;
    vi.useFakeTimers();
    try {
      render(renderGroup({ motion: "bouncy" }));
      fireEvent.click(screen.getByRole("button", { name: "Open Studio table" }));
      completeFlight();

      fireEvent.click(screen.getByRole("button", { name: "Close" }));
      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(getClone()).toBeInTheDocument();
      expect(screen.getByRole("dialog", { name: "Studio table" })).toBeInTheDocument();

      completeFlight();

      expect(getClone()).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it("unmounts cleanly in the middle of a flight", () => {
    cloneAnimation.manual = true;
    const view = render(renderGroup());
    fireEvent.click(screen.getByRole("button", { name: "Open Studio table" }));
    expect(getClone()).toBeInTheDocument();

    view.unmount();
    completeFlight();

    expect(document.querySelector("[data-aperto-transition]")).not.toBeInTheDocument();
  });
});
