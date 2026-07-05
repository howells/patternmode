// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, Ref } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createStacksheet, Sheet } from "./index";

interface MotionProps {
  animate?: unknown;
  exit?: unknown;
  initial?: unknown;
  onAnimationComplete?: () => void;
  transition?: unknown;
}

type MotionDivProps = HTMLAttributes<HTMLDivElement> &
  MotionProps & {
    ref?: Ref<HTMLDivElement>;
  };

type MotionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps & {
    ref?: Ref<HTMLButtonElement>;
  };

const stripMotionProps = vi.hoisted(
  () =>
    ({
      animate: _animate,
      exit: _exit,
      initial: _initial,
      onAnimationComplete: _onAnimationComplete,
      ref: _ref,
      transition: _transition,
      ...props
    }: MotionDivProps | MotionButtonProps) =>
      props,
);
const LazyMotion = vi.hoisted(() => ({ children }: { children: ReactNode }) => <>{children}</>);
const AnimatePresence = vi.hoisted(() => ({ children }: { children: ReactNode }) => (
  <>{children}</>
));
const NestedSheet = () => <p>Nested sheet content</p>;
const PlainSheet = () => <Sheet.Body>Plain body</Sheet.Body>;
const EscapeConsumerSheet = () => (
  <input
    aria-label="Inner field"
    onKeyDown={(e) => {
      if (e.key === "Escape") {
        e.preventDefault();
      }
    }}
  />
);
class MockCloseWatcher {
  static instances: MockCloseWatcher[] = [];
  destroyed = false;
  private readonly listeners = new Set<() => void>();
  constructor() {
    MockCloseWatcher.instances.push(this);
  }
  addEventListener(_type: "close", listener: () => void) {
    this.listeners.add(listener);
  }
  removeEventListener(_type: "close", listener: () => void) {
    this.listeners.delete(listener);
  }
  destroy() {
    this.destroyed = true;
  }
  requestClose() {
    for (const listener of this.listeners) {
      listener();
    }
  }
}
const DetailsSheet = () => (
  <>
    <Sheet.Header>
      <Sheet.Title>Composable details</Sheet.Title>
      <Sheet.Close />
    </Sheet.Header>
    <Sheet.Description>Choose how this Sheet should continue.</Sheet.Description>
    <Sheet.Body>Details body</Sheet.Body>
  </>
);

vi.mock("focus-trap-react", () => ({
  FocusTrap: ({ children }: { children: ReactNode }) => <>{children}</>,
}));
vi.mock("motion/react", () => {
  const MotionDiv = ({ ref, ...props }: MotionDivProps) => {
    useEffect(() => {
      props.onAnimationComplete?.();
    }, [props]);
    return <div ref={ref} {...stripMotionProps(props)} />;
  };
  const motionComponents = {
    button: ({ ref, ...props }: MotionButtonProps) => (
      <button ref={ref} {...stripMotionProps(props)} />
    ),
    div: MotionDiv,
  };
  return {
    AnimatePresence,
    LazyMotion,
    domMax: {},
    m: motionComponents,
    motion: motionComponents,
    useReducedMotion: () => false,
  };
});

beforeEach(() => {
  const matchMedia = vi.fn<(query: string) => MediaQueryList>().mockImplementation((query) => ({
    addEventListener: vi.fn<MediaQueryList["addEventListener"]>(),
    addListener: vi.fn<MediaQueryList["addListener"]>(),
    dispatchEvent: vi.fn<MediaQueryList["dispatchEvent"]>(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: vi.fn<MediaQueryList["removeEventListener"]>(),
    removeListener: vi.fn<MediaQueryList["removeListener"]>(),
  }));
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: matchMedia,
  });
});
afterEach(() => {
  cleanup();
});
describe("SheetRenderer integration", () => {
  it("makes the pushed Nested Sheet active, then backs out and closes the Sheet Stack", async () => {
    const user = userEvent.setup();
    const { StacksheetProvider, useSheet } = createStacksheet<{
      root: Record<string, never>;
      nested: Record<string, never>;
    }>();
    const RootSheet = () => {
      const { push } = useSheet();
      return (
        <div>
          <p>Root sheet content</p>
          <button
            onClick={() => {
              push("nested", "nested", {}, { ariaLabel: "Nested sheet" });
            }}
            type="button"
          >
            Open nested
          </button>
        </div>
      );
    };
    const Controls = () => {
      const { open } = useSheet();
      return (
        <button
          onClick={() => {
            open("root", "root", {}, { ariaLabel: "Root sheet" });
          }}
          type="button"
        >
          Open root
        </button>
      );
    };
    render(
      <StacksheetProvider
        sheets={{
          nested: NestedSheet,
          root: RootSheet,
        }}
      >
        <Controls />
      </StacksheetProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Open root" }));
    expect(screen.getByRole("dialog", { name: "Root sheet" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Open nested" }));
    expect(screen.getByRole("dialog", { name: "Nested sheet" })).toBeInTheDocument();
    expect(screen.queryByRole("dialog", { name: "Root sheet" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Open nested" })).not.toBeInTheDocument();
    const backButton = screen.getByRole("button", { name: "Back" });
    expect(backButton).toHaveClass("min-h-11", "min-w-11");
    await user.click(backButton);
    expect(screen.getByRole("dialog", { name: "Root sheet" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open nested" })).toBeInTheDocument();
    const closeButton = screen.getByRole("button", { name: "Close" });
    expect(closeButton).toHaveClass("min-h-11", "min-w-11");
    await user.click(closeButton);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("links composable Sheet Title and Description to the Active Sheet dialog", async () => {
    const user = userEvent.setup();
    const { StacksheetProvider, useSheet } = createStacksheet<{
      details: Record<string, never>;
    }>();
    const Controls = () => {
      const { open } = useSheet();
      return (
        <button
          onClick={() => {
            open("details", "details", {});
          }}
          type="button"
        >
          Open details
        </button>
      );
    };
    render(
      <StacksheetProvider layout="composable" sheets={{ details: DetailsSheet }}>
        <Controls />
      </StacksheetProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Open details" }));
    const dialog = screen.getByRole("dialog", {
      description: "Choose how this Sheet should continue.",
      name: "Composable details",
    });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-labelledby");
    expect(dialog).toHaveAttribute("aria-describedby");
    expect(screen.getByRole("button", { name: "Close" })).toHaveClass("min-h-11", "min-w-11");
  });
  it("labels a composable sheet without a Sheet.Title via its ariaLabel option", async () => {
    const user = userEvent.setup();
    const { StacksheetProvider, useSheet } = createStacksheet<{
      plain: Record<string, never>;
    }>();
    const Controls = () => {
      const { open } = useSheet();
      return (
        <button
          onClick={() => {
            open("plain", "plain", {}, { ariaLabel: "Plain filters" });
          }}
          type="button"
        >
          Open plain
        </button>
      );
    };
    render(
      <StacksheetProvider layout="composable" sheets={{ plain: PlainSheet }}>
        <Controls />
      </StacksheetProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Open plain" }));
    const dialog = screen.getByRole("dialog", { name: "Plain filters" });
    expect(dialog).toHaveAttribute("aria-label", "Plain filters");
    expect(dialog).not.toHaveAttribute("aria-labelledby");
  });
});

describe("SheetRenderer escape dismissal", () => {
  const renderEscapeSheet = (config?: Parameters<typeof createStacksheet>[0]) => {
    const { StacksheetProvider, useSheet } = createStacksheet<{
      escape: Record<string, never>;
    }>(config);
    const Controls = () => {
      const { open } = useSheet();
      return (
        <button
          onClick={() => {
            open("escape", "escape", {}, { ariaLabel: "Escape sheet" });
          }}
          type="button"
        >
          Open sheet
        </button>
      );
    };
    render(
      <StacksheetProvider sheets={{ escape: EscapeConsumerSheet }}>
        <Controls />
      </StacksheetProvider>,
    );
  };
  it("closes the sheet when Escape is pressed", async () => {
    const user = userEvent.setup();
    renderEscapeSheet();
    await user.click(screen.getByRole("button", { name: "Open sheet" }));
    expect(screen.getByRole("dialog", { name: "Escape sheet" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("leaves the sheet open when an inner element already consumed Escape", async () => {
    const user = userEvent.setup();
    renderEscapeSheet();
    await user.click(screen.getByRole("button", { name: "Open sheet" }));
    await user.click(screen.getByRole("textbox", { name: "Inner field" }));
    await user.keyboard("{Escape}");
    expect(screen.getByRole("dialog", { name: "Escape sheet" })).toBeInTheDocument();
  });
  it("ignores Escape when closeOnEscape is false", async () => {
    const user = userEvent.setup();
    renderEscapeSheet({ closeOnEscape: false });
    await user.click(screen.getByRole("button", { name: "Open sheet" }));
    await user.keyboard("{Escape}");
    expect(screen.getByRole("dialog", { name: "Escape sheet" })).toBeInTheDocument();
  });
});

describe("SheetRenderer CloseWatcher", () => {
  beforeEach(() => {
    MockCloseWatcher.instances = [];
    vi.stubGlobal("CloseWatcher", MockCloseWatcher);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });
  const renderWatcherSheet = (config?: Parameters<typeof createStacksheet>[0]) => {
    const { StacksheetProvider, useSheet } = createStacksheet<{
      watched: Record<string, never>;
    }>(config);
    const Controls = () => {
      const { open } = useSheet();
      return (
        <button
          onClick={() => {
            open("watched", "watched", {}, { ariaLabel: "Watched sheet" });
          }}
          type="button"
        >
          Open sheet
        </button>
      );
    };
    render(
      <StacksheetProvider sheets={{ watched: NestedSheet }}>
        <Controls />
      </StacksheetProvider>,
    );
  };
  it("creates a CloseWatcher while open and dismisses when it fires", async () => {
    const user = userEvent.setup();
    renderWatcherSheet();
    expect(MockCloseWatcher.instances).toHaveLength(0);
    await user.click(screen.getByRole("button", { name: "Open sheet" }));
    expect(MockCloseWatcher.instances).toHaveLength(1);
    act(() => {
      MockCloseWatcher.instances[0]?.requestClose();
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(MockCloseWatcher.instances[0]?.destroyed).toBe(true);
  });
  it("does not create a CloseWatcher when closeOnEscape is false", async () => {
    const user = userEvent.setup();
    renderWatcherSheet({ closeOnEscape: false });
    await user.click(screen.getByRole("button", { name: "Open sheet" }));
    expect(screen.getByRole("dialog", { name: "Watched sheet" })).toBeInTheDocument();
    expect(MockCloseWatcher.instances).toHaveLength(0);
  });
  it("does not create a CloseWatcher when the sheet is not dismissible", async () => {
    const user = userEvent.setup();
    renderWatcherSheet({ dismissible: false });
    await user.click(screen.getByRole("button", { name: "Open sheet" }));
    expect(screen.getByRole("dialog", { name: "Watched sheet" })).toBeInTheDocument();
    expect(MockCloseWatcher.instances).toHaveLength(0);
  });
});

const FieldSheet = () => <input aria-label="Message" />;

// jsdom has no ResizeObserver; the snap-point path constructs one. A function
// expression (not an arrow) so `new ResizeObserver()` can construct it.
const ResizeObserverStub = function ResizeObserverStub() {
  return {
    disconnect: vi.fn<() => void>(),
    observe: vi.fn<() => void>(),
    unobserve: vi.fn<() => void>(),
  };
};

const setViewport = (innerHeight: number, visualHeight: number) => {
  Object.defineProperty(window, "innerHeight", { configurable: true, value: innerHeight });
  const viewport = Object.assign(new EventTarget(), { height: visualHeight });
  Object.defineProperty(window, "visualViewport", { configurable: true, value: viewport });
};

const focusField = () => {
  const field = screen.getByLabelText("Message");
  act(() => {
    field.focus();
    field.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
  });
};

describe("SheetRenderer keyboard repositioning", () => {
  beforeEach(() => {
    // Synchronous rAF so the keyboard-inset throttle resolves within `act`.
    vi.stubGlobal("requestAnimationFrame", (paint: FrameRequestCallback) => {
      paint(0);
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
    vi.stubGlobal("ResizeObserver", ResizeObserverStub);
    // 300px keyboard: layout viewport 900, visual viewport 600.
    setViewport(900, 600);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    Reflect.deleteProperty(window, "visualViewport");
  });

  const openBottomSheet = async (config?: Parameters<typeof createStacksheet>[0]) => {
    const user = userEvent.setup();
    const { StacksheetProvider, useSheet } = createStacksheet<{ field: Record<string, never> }>({
      side: "bottom",
      ...config,
    });
    const Controls = () => {
      const { open } = useSheet();
      return (
        <button
          onClick={() => {
            open("field", "field", {}, { ariaLabel: "Field sheet" });
          }}
          type="button"
        >
          Open
        </button>
      );
    };
    render(
      <StacksheetProvider sheets={{ field: FieldSheet }}>
        <Controls />
      </StacksheetProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
  };

  it("pads the bottom sheet's content above the keyboard when a field is focused", async () => {
    await openBottomSheet();
    const dialog = screen.getByRole("dialog", { name: "Field sheet" });
    expect(dialog.style.paddingBottom).toBe("");
    focusField();
    // Surface stays anchored at the bottom; content pads up past the keyboard.
    expect(dialog.style.bottom).toBe("0px");
    expect(dialog.style.paddingBottom).toBe("300px");
    expect(dialog.style.maxHeight).toBe("85dvh");
  });

  it("stays put when repositionInputs is disabled", async () => {
    await openBottomSheet({ repositionInputs: false });
    const dialog = screen.getByRole("dialog", { name: "Field sheet" });
    focusField();
    expect(dialog.style.bottom).toBe("0px");
    expect(dialog.style.paddingBottom).toBe("");
  });

  it("lifts snap-point sheets but leaves their height to the snap system", async () => {
    await openBottomSheet({ snapPoints: [0.5, 0.9] });
    const dialog = screen.getByRole("dialog", { name: "Field sheet" });
    focusField();
    expect(dialog.style.bottom).toBe("300px");
    // No maxHeight clamp — snap heights already track the shrunk viewport.
    expect(dialog.style.maxHeight).toBe("85dvh");
  });
});

const BodySheet = () => <p>Body</p>;

const stubMatchMedia = () => {
  const matchMedia = vi.fn<(query: string) => MediaQueryList>().mockImplementation((query) => ({
    addEventListener: vi.fn<MediaQueryList["addEventListener"]>(),
    addListener: vi.fn<MediaQueryList["addListener"]>(),
    dispatchEvent: vi.fn<MediaQueryList["dispatchEvent"]>(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: vi.fn<MediaQueryList["removeEventListener"]>(),
    removeListener: vi.fn<MediaQueryList["removeListener"]>(),
  }));
  Object.defineProperty(window, "matchMedia", { configurable: true, value: matchMedia });
};

const openSheet = async (config?: Parameters<typeof createStacksheet>[0]) => {
  const user = userEvent.setup();
  const { StacksheetProvider, useSheet } = createStacksheet<{ s: Record<string, never> }>(config);
  const Controls = () => {
    const { open } = useSheet();
    return (
      <button
        onClick={() => {
          open("s", "s", {}, { ariaLabel: "Sheet" });
        }}
        type="button"
      >
        Open
      </button>
    );
  };
  render(
    <StacksheetProvider sheets={{ s: BodySheet }}>
      <Controls />
    </StacksheetProvider>,
  );
  await user.click(screen.getByRole("button", { name: "Open" }));
};

describe("SheetRenderer handle placement", () => {
  beforeEach(() => {
    stubMatchMedia();
  });
  afterEach(() => {
    cleanup();
  });

  it("renders the bottom handle inside the top edge by default", async () => {
    await openSheet({ side: "bottom" });
    const handle = screen.getByRole("button", { name: "Dismiss" });
    expect(handle.className).toContain("top-0");
    // Nested inside the overflow-hidden content wrapper.
    expect(handle.parentElement?.className).toContain("overflow-hidden");
  });

  it("floats the bottom handle above the sheet when handle is 'outside'", async () => {
    await openSheet({ handle: "outside", side: "bottom" });
    const handle = screen.getByRole("button", { name: "Dismiss" });
    const dialog = screen.getByRole("dialog", { name: "Sheet" });
    expect(handle.className).toContain("bottom-full");
    // Hoisted to the panel level so the content wrapper can't clip it.
    expect(handle.parentElement).toBe(dialog);
  });

  it("places the side handle on the interior edge of a right sheet by default", async () => {
    await openSheet({ side: "right" });
    const handle = screen.getByRole("button", { name: "Dismiss" });
    expect(handle.style.right).toBe("100%");
  });

  it("places the side handle on the interior edge of a left sheet by default", async () => {
    await openSheet({ side: "left" });
    const handle = screen.getByRole("button", { name: "Dismiss" });
    expect(handle.style.left).toBe("100%");
  });
});
