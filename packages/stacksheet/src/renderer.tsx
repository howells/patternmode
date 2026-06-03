import { AnimatePresence, domMax, LazyMotion, m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import { RemoveScroll } from "react-remove-scroll";
import type { StoreApi } from "zustand";
import { useStore } from "zustand";
import { useResolvedSide } from "./media";
import { useBodyScale, useViewportHeight } from "./renderer-effects";
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
  sheets: ContentMap<TMap>;
  store: StoreApi<StacksheetSnapshot<TMap> & SheetActions<TMap>>;
}
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
  const isOpen = useStore(store, (s) => s.isOpen);
  const stack = useStore(store, (s) => s.stack);
  const rawClose = useStore(store, (s) => s.close);
  const rawPop = useStore(store, (s) => s.pop);
  const side = useResolvedSide(config);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const classNames = resolveClassNames(classNamesProp);
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
  const closeReasonRef = useRef<CloseReason>("programmatic");
  const closeWith = (reason: CloseReason) => {
    closeReasonRef.current = reason;
    rawClose();
  };
  const popWith = (reason: CloseReason) => {
    closeReasonRef.current = reason;
    rawPop();
  };
  const close = () => closeWith("programmatic");
  const pop = () => popWith("programmatic");
  useBodyScale(config, isOpen, prefersReducedMotion);
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
  const stackLengthRef = useRef(stack.length);
  useEffect(() => {
    stackLengthRef.current = stack.length;
  }, [stack.length]);
  useEffect(() => {
    if (!(isOpen && config.closeOnEscape && config.dismissible)) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (stackLengthRef.current > 1) {
          closeReasonRef.current = "escape";
          rawPop();
        } else {
          closeReasonRef.current = "escape";
          rawClose();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, config.closeOnEscape, config.dismissible, rawPop, rawClose]);
  useEffect(() => {
    if (!(isOpen && config.dismissible) || globalThis.CloseWatcher === undefined) {
      return;
    }
    const watcher = new globalThis.CloseWatcher();
    const handleClose = () => {
      if (stackLengthRef.current > 1) {
        closeReasonRef.current = "escape";
        rawPop();
      } else {
        closeReasonRef.current = "escape";
        rawClose();
      }
    };
    watcher.addEventListener("close", handleClose);
    return () => {
      watcher.removeEventListener("close", handleClose);
      watcher.destroy();
    };
  }, [isOpen, config.dismissible, rawPop, rawClose]);
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
  const swipeClose = () => closeWith("swipe");
  const swipePop = () => popWith("swipe");
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
                  ? () => closeWith("backdrop")
                  : undefined
              }
              style={backdropStyle}
              transition={spring}
            />
          )}
        </AnimatePresence>
      )}

      <RemoveScroll enabled={shouldLockScroll} forwardProps>
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
              const Content = (componentMap.get(item.type) ?? sheets[item.type as keyof TMap]) as
                | ComponentType<Record<string, unknown>>
                | undefined;
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
