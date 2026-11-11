// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type * as MotionModule from "motion/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { MockInstance } from "vitest";

import { Aperto } from "./index";
import { rectFromTrigger } from "./media-transition-utils";
import { cloneAnimation, resetCloneAnimation } from "./motion-test-double";
import type { ApertoMediaItem } from "./index";

// oxlint-disable-next-line anti-slop/no-module-mocking, vitest/prefer-import-in-mock -- Aperto imports motion/react directly; the double (see motion-test-double) implements only the elements Aperto renders, so the full module type of an import() cannot describe it.
vi.mock("motion/react", async (importOriginal) => {
  const { motionDouble } = await import("./motion-test-double");
  return { ...(await importOriginal<typeof MotionModule>()), ...motionDouble };
});

describe("Aperto layout projection", () => {
  let consoleErrorSpy: MockInstance<typeof console.error>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    const consoleErrorCalls = consoleErrorSpy.mock.calls.length;
    try {
      if (consoleErrorCalls > 0) {
        throw new Error(`console.error was called ${consoleErrorCalls} times.`);
      }
    } finally {
      consoleErrorSpy.mockRestore();
      cleanup();
      resetCloneAnimation();
    }
  });

  it("centers primitive content by default", () => {
    render(
      <Aperto.Primitive.Root defaultOpen>
        <Aperto.Primitive.Portal>
          <Aperto.Primitive.Content aria-describedby={undefined}>
            <Aperto.Primitive.Title>Centered panel</Aperto.Primitive.Title>
            Centered content
          </Aperto.Primitive.Content>
        </Aperto.Primitive.Portal>
      </Aperto.Primitive.Root>,
    );

    expect(screen.getByRole("dialog", { name: "Centered panel" })).toHaveStyle({
      left: "50%",
      top: "50%",
      translate: "-50% -50%",
    });
  });

  it("can leave primitive content positioning to the caller", () => {
    render(
      <Aperto.Primitive.Root defaultOpen>
        <Aperto.Primitive.Portal>
          <Aperto.Primitive.Content aria-describedby={undefined} placement="none">
            <Aperto.Primitive.Title>Unpositioned panel</Aperto.Primitive.Title>
            Custom content
          </Aperto.Primitive.Content>
        </Aperto.Primitive.Portal>
      </Aperto.Primitive.Root>,
    );

    const content = screen.getByRole("dialog", { name: "Unpositioned panel" });
    expect(content.style.left).toBe("");
    expect(content.style.top).toBe("");
    expect(content.style.translate).toBe("");
  });

  it("allows single media drag dismissal to be disabled", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem = {
      alt: "A mountain at sunrise",
      src: "/large.jpg",
      title: "Morning ridge",
      type: "image",
    };

    render(<Aperto dismissible={false} media={media} />);

    await user.click(screen.getByRole("button", { name: "Open Morning ridge" }));

    expect(screen.getByRole("dialog", { name: "Morning ridge" })).toHaveAttribute(
      "data-drag",
      "false",
    );
  });

  it("allows grouped media drag dismissal to be disabled", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        alt: "Ceramic vessels on linen",
        src: "/first-large.jpg",
        title: "Studio table",
        type: "image",
      },
      {
        alt: "A quiet reading nook",
        src: "/second-large.jpg",
        title: "Soft afternoon",
        type: "image",
      },
    ];

    render(
      <Aperto.Group dismissible={false} media={media}>
        <Aperto.Thumbnail index={0} />
        <Aperto.Thumbnail index={1} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Studio table" }));

    expect(screen.getByRole("dialog", { name: "Studio table" })).toHaveAttribute(
      "data-drag",
      "false",
    );
  });

  it("keeps grouped media draggable when using custom dismissal thresholds", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        alt: "Ceramic vessels on linen",
        src: "/first-large.jpg",
        title: "Studio table",
        type: "image",
      },
    ];

    render(
      <Aperto.Group dismissible={{ threshold: 180, velocity: 900 }} media={media}>
        <Aperto.Thumbnail index={0} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Studio table" }));

    expect(screen.getByRole("dialog", { name: "Studio table" })).toHaveAttribute(
      "data-drag",
      "true",
    );
  });

  it("keeps grouped content mounted while switching media", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        alt: "Ceramic vessels on linen",
        src: "/first-large.jpg",
        title: "Studio table",
        type: "image",
      },
      {
        alt: "A quiet reading nook",
        src: "/second-large.jpg",
        title: "Soft afternoon",
        type: "image",
      },
    ];

    render(
      <Aperto.Group media={media}>
        <Aperto.Thumbnail index={0} />
        <Aperto.Thumbnail index={1} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Studio table" }));
    const openedContent = screen.getByRole("dialog", { name: "Studio table" });

    await user.click(screen.getByRole("button", { name: "Next media" }));
    const navigatedContent = screen.getByRole("dialog", {
      name: "Soft afternoon",
    });

    expect(navigatedContent).toBe(openedContent);
    expect(navigatedContent).not.toHaveAttribute("data-layout-id");
    expect(navigatedContent).toBeVisible();
  });

  it("closes grouped content after navigating to another media item", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        alt: "Ceramic vessels on linen",
        src: "/first-large.jpg",
        title: "Studio table",
        type: "image",
      },
      {
        alt: "A quiet reading nook",
        src: "/second-large.jpg",
        title: "Soft afternoon",
        type: "image",
      },
    ];

    render(
      <Aperto.Group media={media}>
        <Aperto.Thumbnail index={0} />
        <Aperto.Thumbnail index={1} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Studio table" }));

    await user.click(screen.getByRole("button", { name: "Next media" }));
    expect(
      screen.getByRole("button", {
        hidden: true,
        name: "Open Soft afternoon",
      }),
    ).not.toHaveAttribute("data-layout-id");
    await user.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("returns grouped media focus to the opened thumbnail without scrolling", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        alt: "Ceramic vessels on linen",
        src: "/first-large.jpg",
        title: "Studio table",
        type: "image",
      },
      {
        alt: "A quiet reading nook",
        src: "/second-large.jpg",
        title: "Soft afternoon",
        type: "image",
      },
      {
        alt: "A garden passage",
        src: "/third-large.jpg",
        title: "Garden passage",
        type: "image",
      },
    ];
    const focusSpy = vi.spyOn(HTMLElement.prototype, "focus");

    render(
      <Aperto.Group media={media}>
        <Aperto.Thumbnail index={0} />
        <Aperto.Thumbnail index={1} />
        <Aperto.Thumbnail index={2} />
      </Aperto.Group>,
    );

    const openedThumbnail = screen.getByRole("button", {
      name: "Open Studio table",
    });
    const lastThumbnail = screen.getByRole("button", {
      name: "Open Garden passage",
    });

    await user.click(openedThumbnail);
    await user.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.activeElement).toBe(openedThumbnail);
    expect(document.activeElement).not.toBe(lastThumbnail);
    expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });

    focusSpy.mockRestore();
  });

  it("returns focus to the opener thumbnail after navigating to another media item", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        alt: "Ceramic vessels on linen",
        src: "/first-large.jpg",
        title: "Studio table",
        type: "image",
      },
      {
        alt: "A quiet reading nook",
        src: "/second-large.jpg",
        title: "Soft afternoon",
        type: "image",
      },
      {
        alt: "A garden passage",
        src: "/third-large.jpg",
        title: "Garden passage",
        type: "image",
      },
    ];

    render(
      <Aperto.Group media={media}>
        <Aperto.Thumbnail index={0} />
        <Aperto.Thumbnail index={1} />
        <Aperto.Thumbnail index={2} />
      </Aperto.Group>,
    );

    const openerThumbnail = screen.getByRole("button", {
      name: "Open Studio table",
    });

    await user.click(openerThumbnail);
    await user.click(screen.getByRole("button", { name: "Next media" }));
    await user.click(screen.getByRole("button", { name: "Next media" }));
    expect(screen.getByRole("dialog", { name: "Garden passage" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.activeElement).toBe(openerThumbnail);
  });

  it("layers the transition clone above the overlay and content", async () => {
    cloneAnimation.manual = true;
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        alt: "Ceramic vessels on linen",
        src: "/first-large.jpg",
        title: "Studio table",
        type: "image",
      },
    ];

    render(
      <Aperto.Group media={media}>
        <Aperto.Thumbnail index={0} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Studio table" }));

    const clone = document.querySelector('[data-slot="aperto-transition-media"]');
    expect(clone).toBeInTheDocument();
    expect(clone).toHaveStyle({ zIndex: "var(--patternmode-aperto-clone-z, 1002)" });
  });

  it("sizes expanded grouped media from the active item aspect ratio", async () => {
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        alt: "Tall gallery view",
        height: 1600,
        src: "/portrait.jpg",
        title: "Portrait",
        type: "image",
        width: 900,
      },
    ];

    render(
      <Aperto.Group media={media}>
        <Aperto.Thumbnail index={0} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Portrait" }));

    expect(document.querySelector('[data-slot="aperto-media"]')).toHaveStyle({
      "--aperto-expanded-aspect-ratio": "900 / 1600",
      "--aperto-expanded-aspect-ratio-height": "1600",
      "--aperto-expanded-aspect-ratio-width": "900",
    });
  });

  it("uses the supplied media renderer for transition clones", async () => {
    cloneAnimation.manual = true;
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        alt: "Optimized render",
        height: 900,
        src: "/optimized.jpg",
        title: "Optimized",
        type: "image",
        width: 1600,
      },
    ];

    render(
      <Aperto.Group
        media={media}
        renderImage={({ alt, src, variant }) => (
          <svg aria-label={alt ?? ""} data-renderer={variant} data-src={String(src)} />
        )}
      >
        <Aperto.Thumbnail index={0} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Optimized" }));

    await waitFor(() => {
      expect(
        document.querySelector(
          '[data-slot="aperto-transition-media"] [aria-label="Optimized render"]',
        ),
      ).toHaveAttribute("data-renderer", "thumbnail");
    });
  });

  it("flies the transition clone with the thumbnail source, not the unloaded full-size source", async () => {
    cloneAnimation.manual = true;
    const user = userEvent.setup();
    const media: ApertoMediaItem[] = [
      {
        alt: "Swatch",
        height: 1200,
        src: "/swatch-1600.jpg",
        thumbnailSrc: "/swatch-400.jpg",
        title: "Swatch",
        type: "image",
        width: 1200,
      },
    ];

    render(
      <Aperto.Group
        media={media}
        renderImage={({ alt, src, variant }) => (
          <svg aria-label={alt ?? ""} data-renderer={variant} data-src={String(src)} />
        )}
      >
        <Aperto.Thumbnail index={0} />
      </Aperto.Group>,
    );

    await user.click(screen.getByRole("button", { name: "Open Swatch" }));

    // The clone shows the pixels already decoded on screen (the thumbnail);
    // the full-size asset loads in the expanded view underneath it.
    await waitFor(() => {
      expect(
        document.querySelector('[data-slot="aperto-transition-media"] [aria-label="Swatch"]'),
      ).toHaveAttribute("data-src", "/swatch-400.jpg");
    });
  });
});

const stubRect = (element: Element, x: number, y: number, w: number, h: number) => {
  element.getBoundingClientRect = () => new DOMRect(x, y, w, h);
};

describe(rectFromTrigger, () => {
  it("measures the media inside the trigger, not the whole card", () => {
    const trigger = document.createElement("button");
    const figure = document.createElement("div");
    const img = document.createElement("img");
    const caption = document.createElement("div");
    figure.append(img);
    trigger.append(figure);
    trigger.append(caption);

    stubRect(trigger, 0, 0, 120, 160);
    stubRect(img, 4, 8, 120, 120);

    expect(rectFromTrigger(trigger)).toStrictEqual({ height: 120, left: 4, top: 8, width: 120 });
  });

  it("prefers an explicit data-aperto-media-source element", () => {
    const trigger = document.createElement("button");
    const source = document.createElement("div");
    source.dataset.apertoMediaSource = "";
    const decoy = document.createElement("img");
    trigger.append(source);
    trigger.append(decoy);

    stubRect(source, 1, 2, 90, 90);
    stubRect(decoy, 0, 0, 10, 10);

    expect(rectFromTrigger(trigger)).toStrictEqual({ height: 90, left: 1, top: 2, width: 90 });
  });

  it("falls back to the trigger when it holds no media", () => {
    const trigger = document.createElement("button");
    stubRect(trigger, 3, 4, 60, 50);

    expect(rectFromTrigger(trigger)).toStrictEqual({ height: 50, left: 3, top: 4, width: 60 });
  });
});
