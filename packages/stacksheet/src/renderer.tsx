import { AnimatePresence, domMax, LazyMotion, m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ComponentType, CSSProperties, ReactNode, RefObject } from "react";
import { RemoveScroll } from "react-remove-scroll";
import type { StoreApi } from "zustand";
import { useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { useResolvedSide } from "./media";
import { useBodyScale, useKeyboardInset, useViewportHeight } from "./renderer-effects";
import { resolveClassNames } from "./renderer-helpers";
import { SheetPanel } from "./sheet-panel";
import { resolveSnapPoints } from "./snap-points";
import { getSlideFrom, getSlideTarget } from "./stacking";
import type {
  CloseReason,
  ContentMap,
  HeaderRenderProps,
  ResolvedConfig,
  SheetActions,
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

const getMotionSpring = (prefersReducedMotion: boolean, config: ResolvedConfig) =>
  prefersReducedMotion
    ? ({ duration: 0, type: "tween" as const } as const)
    : ({
        damping: config.spring.damping,
        mass: config.spring.mass,
        stiffness: config.spring.stiffness,
        type: "spring" as const,
      } as const);

const getBackdropStyle = (config: ResolvedConfig, hasBackdropClass: boolean): CSSProperties => ({
  cursor: config.closeOnBackdrop && config.dismissible ? "pointer" : undefined,
  willChange: "opacity",
  zIndex: config.zIndex,
  ...(hasBackdropClass ? {} : { background: "var(--overlay, rgba(0, 0, 0, 0.15))" }),
});

interface SheetRendererProps<TMap extends object> {
  classNames?: StacksheetClassNames;
  /** Ad-hoc component map (type key → component) */
  componentMap: Map<string, ComponentType<Record<string, unknown>>>;
  config: ResolvedConfig;
  layout?: StacksheetLayout;
  renderHeader?: false | ((props: HeaderRenderProps) => ReactNode);
  sheets?: ContentMap<TMap>;
  store: StoreApi<StacksheetSnapshot<TMap> & SheetActions<TMap>>;
}

const isContentComponent = (content: unknown): content is ComponentType<Record<string, unknown>> =>
  typeof content === "function";

const getStaticContent = <TMap extends object>(
  sheets: ContentMap<TMap> | undefined,
  type: string,
): ComponentType<Record<string, unknown>> | undefined => {
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
}: SheetRendererProps<TMap>) => {
  const { isOpen, rawClose, rawPop, stack } = useRendererStore(store);
  const side = useResolvedSide(config);
  const prefersReducedMotion = useReducedMotion() ?? false;
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
  const slideFrom = getSlideFrom(side);
  const slideTarget = getSlideTarget();
  const spring = getMotionSpring(prefersReducedMotion, config);
  const stackSpring = spring;
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
            <m.div
              animate={{ opacity: 1 }}
              className={`fixed inset-0 ${classNames.backdrop || ""}`}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key="stacksheet-backdrop"
              onClick={
                config.closeOnBackdrop && config.dismissible
                  ? () => {
                      closeWith("backdrop");
                    }
                  : undefined
              }
              style={backdropStyle}
              transition={spring}
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
                  slideFrom={slideFrom}
                  slideTarget={slideTarget}
                  snapHeights={snapHeights}
                  spring={spring}
                  stackSpring={stackSpring}
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
