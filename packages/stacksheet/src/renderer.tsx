import { AnimatePresence, domMax, LazyMotion, m, usePresence } from "motion/react";
import type { MotionValue } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ComponentType, CSSProperties, ReactNode, RefObject } from "react";
import { RemoveScroll } from "react-remove-scroll";
import type { StoreApi } from "zustand";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { usePrefersReducedMotion, useResolvedSide } from "./media";
import { useBodyScale, useKeyboardInset, useViewportHeight } from "./renderer-effects";
import { resolveClassNames } from "./renderer-helpers";
import { SheetPanel } from "./sheet-panel";
import { resolveSnapPoints } from "./snap-points";
import type { StackMotion } from "./stack-motion";
import type {
  CloseReason,
  ContentMap,
  HeaderRenderProps,
  ResolvedConfig,
  SheetActions,
  SheetData,
  Side,
  StacksheetClassNames,
  StacksheetLayout,
  StacksheetSnapshot,
} from "./types";

// CloseWatcher — ambient type for browsers that support it (Chromium 120+)
declare global {
  var CloseWatcher:
    | (new () => {
        addEventListener: (type: "close", listener: () => void) => void;
        destroy: () => void;
        removeEventListener: (type: "close", listener: () => void) => void;
      })
    | undefined;
}

const handleBackdropExitComplete = () => {
  requestAnimationFrame(() => {
    void document.body.offsetHeight;
  });
};

const getResolvedSnapHeights = (
  side: Side,
  snapPoints: ResolvedConfig["snapPoints"],
  viewportHeight: number,
) =>
  side === "bottom" && snapPoints.length > 0 ? resolveSnapPoints(snapPoints, viewportHeight) : [];

const getActiveInternalSnapIndex = ({
  defaultSnapIndex,
  internalSnap,
  snapContext,
  snapHeights,
}: {
  defaultSnapIndex: number;
  internalSnap: { context: string; index: number; snapCount: number };
  snapContext: string;
  snapHeights: number[];
}) =>
  internalSnap.context === snapContext && internalSnap.snapCount === snapHeights.length
    ? internalSnap.index
    : defaultSnapIndex;

const getBackdropStyle = (config: ResolvedConfig, hasBackdropClass: boolean): CSSProperties => {
  const style: CSSProperties = {
    // A tap on the overlay closes the stack; without this iOS and Android
    // paint their grey tap flash over the whole screen as it fades.
    WebkitTapHighlightColor: "transparent",
    cursor: config.closeOnBackdrop && config.dismissible ? "pointer" : undefined,
    willChange: "opacity",
    zIndex: config.zIndex,
  };
  if (!hasBackdropClass) {
    style.background = "var(--overlay, rgba(0, 0, 0, 0.15))";
  }
  return style;
};

/** Below this the overlay is invisible, and a closing stack can unmount it. */
const BACKDROP_GONE = 0.001;
/** Unmount a closing overlay even if no Panel ever reports its exit. */
const BACKDROP_EXIT_FALLBACK_MS = 1000;

/**
 * The Overlay. Its opacity is the Sheet Stack's backdrop value, so it dims in
 * step with the first Sheet's entrance, lightens as that Sheet is dragged
 * down, and fades out with its exit, on whatever curve the Sheet is moving on.
 */
const Backdrop = ({
  className,
  onClick,
  opacity,
  style,
}: {
  className: string;
  onClick: (() => void) | undefined;
  opacity: MotionValue<number>;
  style: CSSProperties;
}) => {
  const [isPresent, safeToRemove] = usePresence();
  useEffect(() => {
    let done = isPresent;
    const remove = () => {
      if (!done) {
        done = true;
        safeToRemove?.();
      }
    };
    const unsubscribe = opacity.on("change", (value) => {
      if (value <= BACKDROP_GONE) {
        remove();
      }
    });
    const fallback = setTimeout(remove, BACKDROP_EXIT_FALLBACK_MS);
    if (opacity.get() <= BACKDROP_GONE) {
      remove();
    }
    return () => {
      done = true;
      unsubscribe();
      clearTimeout(fallback);
    };
  }, [isPresent, opacity, safeToRemove]);
  return (
    <m.div
      className={className}
      onClick={isPresent ? onClick : undefined}
      style={{ ...style, opacity, pointerEvents: isPresent ? undefined : "none" }}
    />
  );
};

const useSteppedStack = (stackMotion: StackMotion, prefersReducedMotion: boolean) => {
  useLayoutEffect(() => {
    stackMotion.setStepped(prefersReducedMotion);
  }, [stackMotion, prefersReducedMotion]);
};

interface SheetRendererProps<TMap extends object> {
  classNames?: StacksheetClassNames;
  /** Ad-hoc component map (type key → component) */
  componentMap: Map<string, ComponentType<SheetData>>;
  config: ResolvedConfig;
  layout?: StacksheetLayout;
  renderHeader?: false | ((props: HeaderRenderProps) => ReactNode);
  sheets?: ContentMap<TMap>;
  /** Motion shared by this Sheet Stack's Panels and overlay */
  stackMotion: StackMotion;
  store: StoreApi<StacksheetSnapshot<TMap> & SheetActions<TMap>>;
}

const isContentComponent = (content: unknown): content is ComponentType<SheetData> =>
  typeof content === "function";

const getStaticContent = <TMap extends object>(
  sheets: ContentMap<TMap> | undefined,
  type: string,
): ComponentType<SheetData> | undefined => {
  if (sheets === undefined) {
    return undefined;
  }
  const match = Object.entries(sheets).find(([sheetType]) => sheetType === type);
  const content = match?.[1];
  return isContentComponent(content) ? content : undefined;
};

const useRendererStore = <TMap extends object>(
  store: StoreApi<StacksheetSnapshot<TMap> & SheetActions<TMap>>,
) => {
  const isOpen = useStore(store, (s) => s.isOpen);
  const stack = useStore(store, (s) => s.stack);
  const { rawClose, rawPop } = useStore(
    store,
    useShallow((s) => ({
      rawClose: s.close,
      rawPop: s.pop,
    })),
  );
  return { isOpen, rawClose, rawPop, stack };
};

const useSnapState = (
  config: ResolvedConfig,
  isOpen: boolean,
  side: Side,
  stack: StacksheetSnapshot<object>["stack"],
) => {
  const viewportHeight = useViewportHeight(
    isOpen && side === "bottom" && config.snapPoints.length > 0,
  );
  const snapHeights = getResolvedSnapHeights(side, config.snapPoints, viewportHeight);
  const snapContext = isOpen ? stack.map((item) => item.id).join("\u0000") : "";
  const defaultSnapIndex = snapHeights.length > 0 ? snapHeights.length - 1 : 0;
  const [internalSnap, setInternalSnap] = useState({
    context: "",
    index: defaultSnapIndex,
    snapCount: snapHeights.length,
  });
  const internalSnapIndex = getActiveInternalSnapIndex({
    defaultSnapIndex,
    internalSnap,
    snapContext,
    snapHeights,
  });
  const activeSnapIndex = config.snapPointIndex ?? internalSnapIndex;
  const handleSnap = (index: number) => {
    setInternalSnap({
      context: snapContext,
      index,
      snapCount: snapHeights.length,
    });
    config.onSnapPointChange?.(index);
  };
  return { activeSnapIndex, handleSnap, snapHeights };
};

const usePanelKeyboardInset = (config: ResolvedConfig, isOpen: boolean, side: Side) => {
  const panelWrapperRef = useRef<HTMLDivElement>(null);
  const keyboardInset = useKeyboardInset(
    isOpen && side === "bottom" && config.repositionInputs,
    panelWrapperRef,
  );
  return { keyboardInset, panelWrapperRef };
};

const useCloseControls = (rawClose: () => void, rawPop: () => void) => {
  const closeReasonRef = useRef<CloseReason>("programmatic");
  const closeWith = (reason: CloseReason) => {
    closeReasonRef.current = reason;
    rawClose();
  };
  const popWith = (reason: CloseReason) => {
    closeReasonRef.current = reason;
    rawPop();
  };
  return {
    close: () => {
      closeWith("programmatic");
    },
    closeReasonRef,
    closeWith,
    pop: () => {
      popWith("programmatic");
    },
    popWith,
  };
};

const useFocusRestore = (isOpen: boolean) => {
  const triggerRef = useRef<Element | null>(null);
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      triggerRef.current = document.activeElement;
    } else if (!isOpen && wasOpenRef.current) {
      const el = triggerRef.current;
      if (el && el instanceof HTMLElement && el !== document.body && el.tagName !== "BODY") {
        el.focus();
      }
      triggerRef.current = null;
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);
};

const dismissFromEscape = ({
  closeReasonRef,
  rawClose,
  rawPop,
  stackLengthRef,
}: {
  closeReasonRef: RefObject<CloseReason>;
  rawClose: () => void;
  rawPop: () => void;
  stackLengthRef: RefObject<number>;
}) => {
  closeReasonRef.current = "escape";
  if (stackLengthRef.current > 1) {
    rawPop();
  } else {
    rawClose();
  }
};

const useDismissalEffects = ({
  closeReasonRef,
  config,
  isOpen,
  rawClose,
  rawPop,
  stackLength,
}: {
  closeReasonRef: RefObject<CloseReason>;
  config: ResolvedConfig;
  isOpen: boolean;
  rawClose: () => void;
  rawPop: () => void;
  stackLength: number;
}) => {
  const stackLengthRef = useRef(stackLength);
  useEffect(() => {
    stackLengthRef.current = stackLength;
  }, [stackLength]);
  useEffect(() => {
    const shouldListen = isOpen && config.closeOnEscape && config.dismissible;
    const handleKeyDown = (e: KeyboardEvent) => {
      // An inner layer (popover, select, menu) already consumed this Escape —
      // don't also pop the sheet.
      if (e.key !== "Escape" || e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      dismissFromEscape({ closeReasonRef, rawClose, rawPop, stackLengthRef });
    };
    if (shouldListen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (shouldListen) {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isOpen, config.closeOnEscape, config.dismissible, rawPop, rawClose, closeReasonRef]);
  useEffect(() => {
    const CloseWatcherConstructor = globalThis.CloseWatcher;
    // CloseWatcher cannot distinguish Escape from other close requests (e.g.
    // the Android back gesture), so gating on `closeOnEscape` conservatively
    // disables back-gesture dismissal too when Escape dismissal is turned off.
    const shouldListen =
      isOpen && config.closeOnEscape && config.dismissible && CloseWatcherConstructor !== undefined;
    let watcher: InstanceType<NonNullable<typeof CloseWatcherConstructor>> | undefined;
    const handleClose = () => {
      dismissFromEscape({ closeReasonRef, rawClose, rawPop, stackLengthRef });
    };
    if (shouldListen) {
      watcher = new CloseWatcherConstructor();
      watcher.addEventListener("close", handleClose);
    }
    return () => {
      if (watcher !== undefined) {
        watcher.removeEventListener("close", handleClose);
        watcher.destroy();
      }
    };
  }, [isOpen, config.closeOnEscape, config.dismissible, rawPop, rawClose, closeReasonRef]);
};

/**
 * Root renderer component — manages the backdrop, scroll lock, snap points,
 * close reasons, focus restoration, keyboard/CloseWatcher dismissal, and
 * delegates per-panel rendering to `SheetPanel`.
 *
 * Mounted inside a Portal by `StacksheetProvider`.
 */
export const SheetRenderer = <TMap extends object>({
  store,
  config,
  sheets,
  componentMap,
  classNames: classNamesProp,
  layout,
  renderHeader,
  stackMotion,
}: SheetRendererProps<TMap>) => {
  const { isOpen, rawClose, rawPop, stack } = useRendererStore(store);
  const side = useResolvedSide(config);
  const prefersReducedMotion = usePrefersReducedMotion();
  const classNames = resolveClassNames(classNamesProp);
  const { activeSnapIndex, handleSnap, snapHeights } = useSnapState(config, isOpen, side, stack);
  const { close, closeReasonRef, closeWith, pop, popWith } = useCloseControls(rawClose, rawPop);
  const { panelWrapperRef, keyboardInset } = usePanelKeyboardInset(config, isOpen, side);
  useBodyScale(config, isOpen, prefersReducedMotion);
  useFocusRestore(isOpen);
  useDismissalEffects({
    closeReasonRef,
    config,
    isOpen,
    rawClose,
    rawPop,
    stackLength: stack.length,
  });
  useSteppedStack(stackMotion, prefersReducedMotion);
  const isModal = config.modal;
  const showOverlay = isModal && config.showOverlay;
  const hasBackdropClass = classNames.backdrop !== "";
  const backdropStyle = getBackdropStyle(config, hasBackdropClass);
  const handleExitComplete = () => {
    if (stack.length === 0) {
      config.onCloseComplete?.(closeReasonRef.current);
    }
  };
  const swipeClose = () => {
    closeWith("swipe");
  };
  const swipePop = () => {
    popWith("swipe");
  };
  const shouldLockScroll = isOpen && isModal && config.lockScroll;
  return (
    <LazyMotion features={domMax}>
      {showOverlay && (
        <AnimatePresence onExitComplete={handleBackdropExitComplete}>
          {isOpen && (
            <Backdrop
              className={`fixed inset-0 ${classNames.backdrop || ""}`}
              key="stacksheet-backdrop"
              onClick={
                config.closeOnBackdrop && config.dismissible
                  ? () => {
                      closeWith("backdrop");
                    }
                  : undefined
              }
              opacity={stackMotion.backdrop}
              style={backdropStyle}
            />
          )}
        </AnimatePresence>
      )}

      <RemoveScroll enabled={shouldLockScroll} forwardProps ref={panelWrapperRef}>
        <div
          className="pointer-events-none fixed inset-0 overflow-hidden"
          style={{ zIndex: config.zIndex + 1 }}
        >
          <AnimatePresence onExitComplete={handleExitComplete}>
            {stack.map((item, index) => {
              const depth = stack.length - 1 - index;
              const isTop = depth === 0;
              const isNested = index > 0;
              const shouldRender = depth <= config.stacking.renderThreshold;
              const Content = componentMap.get(item.type) ?? getStaticContent(sheets, item.type);
              return (
                <SheetPanel
                  activeSnapIndex={activeSnapIndex}
                  Content={Content}
                  classNames={classNames}
                  close={close}
                  config={config}
                  depth={depth}
                  index={index}
                  isNested={isNested}
                  isTop={isTop}
                  item={item}
                  key={item.id}
                  keyboardInset={keyboardInset}
                  layout={layout}
                  onSnap={handleSnap}
                  pop={pop}
                  prefersReducedMotion={prefersReducedMotion}
                  renderHeader={renderHeader}
                  shouldRender={shouldRender}
                  side={side}
                  snapHeights={snapHeights}
                  stackMotion={stackMotion}
                  swipeClose={swipeClose}
                  swipePop={swipePop}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </RemoveScroll>
    </LazyMotion>
  );
};
