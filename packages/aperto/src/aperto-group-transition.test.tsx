// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type * as MotionModule from "motion/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Aperto } from "./index";
import { ApertoRoot } from "./aperto-root";
import { ApertoThumbnail } from "./Aperto/aperto-thumbnail";
import { ApertoGroupContext, useApertoGroup } from "./aperto-group-context";
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

  it("flies video transitions using the thumbnail image instead of mounting a duplicate video", () => {
    cloneAnimation.manual = true;
    const videoMedia: ApertoMediaItem[] = [
      {
        alt: "Slow interior pan",
        poster: "/poster.jpg",
        src: "/clip.mp4",
        thumbnailSrc: "/clip-thumb.jpg",
        title: "Room study",
        type: "video",
      },
    ];
    render(
      <Aperto.Group media={videoMedia}>
        <Aperto.Thumbnail index={0} />
      </Aperto.Group>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open Room study" }));

    const clone = getClone();
    expect(clone).toBeInTheDocument();
    expect(clone?.querySelector("video")).toBeNull();
    expect(clone?.querySelector("img")).toHaveAttribute("src", "/clip-thumb.jpg");
  });

  it("skips a degenerate equal-rect opening flight instead of stranding the phase", () => {
    cloneAnimation.manual = true;
    const rectSpy = vi
      .spyOn(Element.prototype, "getBoundingClientRect")
      .mockReturnValue(new DOMRect(40, 40, 200, 150));
    try {
      render(renderGroup());
      fireEvent.click(screen.getByRole("button", { name: "Open Studio table" }));
      expect(getClone()).not.toBeInTheDocument();
      expect(getContent()).not.toHaveAttribute("data-aperto-transition");
    } finally {
      rectSpy.mockRestore();
    }
  });

  it("wraps Aperto single expanded media in data-slot='aperto-media' with aspect ratio vars", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem = {
      alt: "Tall portrait",
      height: 1600,
      src: "/portrait.jpg",
      title: "Portrait",
      type: "image",
      width: 900,
    };
    render(<Aperto media={media} />);

    await user.click(screen.getByRole("button", { name: "Open Portrait" }));

    expect(document.querySelector('[data-slot="aperto-media"]')).toHaveStyle({
      "--aperto-expanded-aspect-ratio": "900 / 1600",
    });
  });

  it("clamps an out-of-range group index into the media bounds", async () => {
    const user = userEvent.setup();
    render(renderGroup({ index: 99 }));

    await user.click(screen.getByRole("button", { name: "Open Studio table" }));

    expect(screen.getByRole("dialog", { name: "Soft afternoon" })).toBeInTheDocument();
    expect(screen.getByText("2 / 2")).toBeInTheDocument();
  });

  it("skips a degenerate equal-rect closing flight instead of stranding the phase", async () => {
    cloneAnimation.manual = true;
    render(renderGroup());
    fireEvent.click(screen.getByRole("button", { name: "Open Studio table" }));
    completeFlight();

    const rectSpy = vi
      .spyOn(Element.prototype, "getBoundingClientRect")
      .mockReturnValue(new DOMRect(40, 40, 200, 150));
    try {
      fireEvent.click(screen.getByRole("button", { name: "Close" }));
      expect(getClone()).not.toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    } finally {
      rectSpy.mockRestore();
    }
  });

  it("flies the active media when the controlled index changes mid-flight", () => {
    cloneAnimation.manual = true;
    const view = render(renderGroup({ index: 0 }));
    fireEvent.click(screen.getByRole("button", { name: "Open Studio table" }));
    expect(getClone()?.querySelector("img")).toHaveAttribute("src", "/first-large.jpg");

    view.rerender(renderGroup({ index: 1 }));

    expect(getClone()?.querySelector("img")).toHaveAttribute("src", "/second-large.jpg");
  });

  it("keeps the group context value stable across unrelated parent renders", () => {
    const onRender = vi.fn<() => void>();
    const Probe = () => {
      useApertoGroup();
      onRender();
      return null;
    };
    const probe = <Probe />;
    const view = render(<Aperto.Group media={MEDIA}>{probe}</Aperto.Group>);
    view.rerender(<Aperto.Group media={MEDIA}>{probe}</Aperto.Group>);

    expect(onRender).toHaveBeenCalledOnce();
  });

  it("registers a thumbnail ref once, not on every render", () => {
    const registerThumbnail = vi.fn<(index: number, node: HTMLButtonElement | null) => void>();
    const value = {
      index: 0,
      media: MEDIA,
      openAtIndex: () => {},
      registerThumbnail,
    };
    const tree = () => (
      // oxlint-disable-next-line react/jsx-no-constructed-context-values -- the value is built once outside the render function; the rule cannot see that.
      <ApertoGroupContext.Provider value={value}>
        <ApertoRoot>
          <ApertoThumbnail index={0} />
        </ApertoRoot>
      </ApertoGroupContext.Provider>
    );
    const view = render(tree());
    view.rerender(tree());

    expect(registerThumbnail).toHaveBeenCalledOnce();
  });
});
