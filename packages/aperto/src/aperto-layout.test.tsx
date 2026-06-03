// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect, useRef } from "react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Aperto } from "./index";
import type { ApertoMediaItem } from "./index";

const unmountedLayoutIds = vi.hoisted((): string[] => []);

type MotionTestProps = HTMLAttributes<HTMLElement> & {
  animate?: unknown;
  "data-slot"?: string;
  drag?: unknown;
  dragConstraints?: unknown;
  dragElastic?: unknown;
  dragMomentum?: unknown;
  dragSnapToOrigin?: unknown;
  exit?: unknown;
  initial?: unknown;
  layout?: boolean;
  layoutCrossfade?: unknown;
  layoutId?: string;
  onAnimationComplete?: () => void;
  onDrag?: unknown;
  onDragEnd?: unknown;
  onLayoutAnimationComplete?: unknown;
  ref?: Ref<HTMLElement>;
  transition?: unknown;
};

const stripMotionProps = ({
  animate: _animate,
  drag: _drag,
  dragConstraints: _dragConstraints,
  dragElastic: _dragElastic,
  dragMomentum: _dragMomentum,
  dragSnapToOrigin: _dragSnapToOrigin,
  exit: _exit,
  initial: _initial,
  layout,
  layoutCrossfade: _layoutCrossfade,
  layoutId,
  onAnimationComplete: _onAnimationComplete,
  onDrag: _onDrag,
  onDragEnd: _onDragEnd,
  onLayoutAnimationComplete: _onLayoutAnimationComplete,
  ref: _ref,
  transition: _transition,
  ...props
}: MotionTestProps) => ({
  ...props,
  "data-drag": _drag === undefined ? undefined : String(_drag),
  "data-layout": layout === undefined ? undefined : String(layout),
  "data-layout-id": layoutId,
});
const LayoutGroupComponent = vi.hoisted(() => ({ children }: { children: ReactNode }) => (
  <>{children}</>
));
const LazyMotionComponent = vi.hoisted(() => ({ children }: { children: ReactNode }) => (
  <>{children}</>
));

vi.mock("motion/react", () => {
  const MotionDiv = ({ ref, ...props }: MotionTestProps) => {
    const latestLayoutIdRef = useRef(props.layoutId);
    latestLayoutIdRef.current = props.layoutId;

    useEffect(
      () => () => {
        if (latestLayoutIdRef.current) {
          unmountedLayoutIds.push(latestLayoutIdRef.current);
        }
      },
      [],
    );

    useEffect(() => {
      if (props["data-slot"] === "aperto-transition-media" && props.animate) {
        props.onAnimationComplete?.();
      }
    }, [props]);

    return <div ref={ref as Ref<HTMLDivElement>} {...stripMotionProps(props)} />;
  };

  const motionComponents = {
    button: ({ ref, ...props }: MotionTestProps) => (
      <button ref={ref as Ref<HTMLButtonElement>} {...stripMotionProps(props)} />
    ),
    div: MotionDiv,
  };

  return {
    AnimatePresence: LayoutGroupComponent,
    LayoutGroup: LayoutGroupComponent,
    LazyMotion: LazyMotionComponent,
    domMax: {},
    m: motionComponents,
    motion: motionComponents,
    useMotionValue: (initial: number) => ({
      get: () => initial,
      set: vi.fn(),
    }),
    useReducedMotion: () => false,
    useSpring: (value: unknown) => value,
    useTransform: () => 1,
  };
});

let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  try {
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  } finally {
    consoleErrorSpy.mockRestore();
    cleanup();
    unmountedLayoutIds.length = 0;
  }
});

describe("Aperto layout projection", () => {
  it("centers primitive content by default", () => {
    render(
      <Aperto.Primitive.Root defaultOpen>
        <Aperto.Primitive.Content aria-describedby={undefined}>
          <Aperto.Primitive.Title>Centered panel</Aperto.Primitive.Title>
          Centered content
        </Aperto.Primitive.Content>
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
        <Aperto.Primitive.Content aria-describedby={undefined} placement="none">
          <Aperto.Primitive.Title>Unpositioned panel</Aperto.Primitive.Title>
          Custom content
        </Aperto.Primitive.Content>
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
      ).toHaveAttribute("data-renderer", "expanded");
    });
  });
});
