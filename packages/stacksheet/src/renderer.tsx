// CloseWatcher — ambient type for browsers that support it (Chromium 120+)
declare global {
  var CloseWatcher:
    | (new () => { onclose: (() => void) | null; destroy: () => void })
    | undefined;
}

import {
  AnimatePresence,
  domMax,
  LazyMotion,
  m,
  useReducedMotion,
} from "motion/react";
import {
  type ComponentType,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  StacksheetClassNames,
  StacksheetLayout,
  StacksheetSnapshot,
} from "./types";

interface SheetRendererProps<TMap extends object> {
  classNames?: StacksheetClassNames;
  /** Ad-hoc component map (type key → component) */
  // biome-ignore lint/suspicious/noExplicitAny: heterogeneous component storage
  componentMap: Map<string, ComponentType<any>>;
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
export function SheetRenderer<TMap extends object>({
  store,
  config,
  sheets,
  componentMap,
  classNames: classNamesProp,
  layout,
  renderHeader,
}: SheetRendererProps<TMap>) {
  const isOpen = useStore(store, (s) => s.isOpen);
  const stack = useStore(store, (s) => s.stack);
  const rawClose = useStore(store, (s) => s.close);
  const rawPop = useStore(store, (s) => s.pop);

  const side = useResolvedSide(config);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const classNames = useMemo(
    () => resolveClassNames(classNamesProp),
    [classNamesProp]
  );
  const viewportHeight = useViewportHeight(
    isOpen && side === "bottom" && config.snapPoints.length > 0
  );

  const snapHeights = useMemo(
    () =>
      side === "bottom" && config.snapPoints.length > 0
        ? resolveSnapPoints(config.snapPoints, viewportHeight)
        : [],
    [side, config.snapPoints, viewportHeight]
  );

  const snapContext = isOpen ? stack.map((item) => item.id).join("\u0000") : "";
  const defaultSnapIndex = snapHeights.length > 0 ? snapHeights.length - 1 : 0;
  const [internalSnap, setInternalSnap] = useState({
    context: "",
    index: defaultSnapIndex,
    snapCount: snapHeights.length,
  });
  const internalSnapIndex =
    internalSnap.context === snapContext &&
    internalSnap.snapCount === snapHeights.length
      ? internalSnap.index
      : defaultSnapIndex;
  const activeSnapIndex = config.snapPointIndex ?? internalSnapIndex;

  const handleSnap = useCallback(
    (index: number) => {
      setInternalSnap({
        context: snapContext,
        index,
        snapCount: snapHeights.length,
      });
      config.onSnapPointChange?.(index);
    },
    [config, snapContext, snapHeights.length]
  );

  const closeReasonRef = useRef<CloseReason>("programmatic");

  const closeWith = useCallback(
    (reason: CloseReason) => {
      closeReasonRef.current = reason;
      rawClose();
    },
    [rawClose]
  );

  const popWith = useCallback(
    (reason: CloseReason) => {
      closeReasonRef.current = reason;
      rawPop();
    },
    [rawPop]
  );

  const close = useCallback(() => closeWith("programmatic"), [closeWith]);
  const pop = useCallback(() => popWith("programmatic"), [popWith]);

  useBodyScale(config, isOpen, prefersReducedMotion);

  const triggerRef = useRef<Element | null>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      triggerRef.current = document.activeElement;
    } else if (!isOpen && wasOpenRef.current) {
      const el = triggerRef.current;
      if (
        el &&
        el instanceof HTMLElement &&
        el !== document.body &&
        el.tagName !== "BODY"
      ) {
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

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        if (stackLengthRef.current > 1) {
          popWith("escape");
        } else {
          closeWith("escape");
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, config.closeOnEscape, config.dismissible, popWith, closeWith]);

  useEffect(() => {
    if (
      !(isOpen && config.dismissible) ||
      typeof globalThis.CloseWatcher === "undefined"
    ) {
      return;
    }

    const watcher = new globalThis.CloseWatcher();
    watcher.onclose = () => {
      if (stackLengthRef.current > 1) {
        popWith("escape");
      } else {
        closeWith("escape");
      }
    };

    return () => watcher.destroy();
  }, [isOpen, config.dismissible, popWith, closeWith]);

  const slideFrom = useMemo(() => getSlideFrom(side), [side]);
  const slideTarget = useMemo(() => getSlideTarget(), []);

  const spring = useMemo(
    () =>
      prefersReducedMotion
        ? ({ type: "tween" as const, duration: 0 } as const)
        : ({
            type: "spring" as const,
            damping: config.spring.damping,
            stiffness: config.spring.stiffness,
            mass: config.spring.mass,
          } as const),
    [
      prefersReducedMotion,
      config.spring.damping,
      config.spring.stiffness,
      config.spring.mass,
    ]
  );
  const stackSpring = spring;

  const isModal = config.modal;
  const showOverlay = isModal && config.showOverlay;
  const hasBackdropClass = classNames.backdrop !== "";
  const backdropStyle: CSSProperties = {
    zIndex: config.zIndex,
    willChange: "opacity",
    cursor:
      config.closeOnBackdrop && config.dismissible ? "pointer" : undefined,
    ...(hasBackdropClass
      ? {}
      : { background: "var(--overlay, rgba(0, 0, 0, 0.15))" }),
  };

  const handleExitComplete = useCallback(() => {
    if (stack.length === 0) {
      config.onCloseComplete?.(closeReasonRef.current);
    }
  }, [stack.length, config]);

  const handleBackdropExitComplete = useCallback(() => {
    requestAnimationFrame(() => {
      void document.body.offsetHeight;
    });
  }, []);

  const swipeClose = useCallback(() => closeWith("swipe"), [closeWith]);
  const swipePop = useCallback(() => popWith("swipe"), [popWith]);

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
              const Content = (componentMap.get(item.type) ??
                sheets[item.type as keyof TMap]) as
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
}
