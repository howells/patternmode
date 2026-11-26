import { usePrefersReducedMotion } from "@howells/motion/react";
import { joinClassNames } from "@patternmode/system";
import { AnimatePresence, domMax, LazyMotion, m, usePresence } from "motion/react";
import type { MotionValue } from "motion/react";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import type { ComponentType, CSSProperties } from "react";
import { RemoveScroll } from "react-remove-scroll";
import type { StoreApi } from "zustand";
import { useStore } from "zustand";
import { useResolvedSide } from "./media";
import { useBodyScale, useKeyboardInset } from "./renderer-effects";
import { resolveClassNames } from "./renderer-helpers";
import { SheetPanel } from "./sheet-panel";
import { isComponent } from "./Store/store-args";
import { useSnapState } from "./snap-state";
import type { StackMotion } from "./stack-motion";
import type { SheetStoreBundle } from "./store";
import type {
  ContentMap,
  ResolvedConfig,
  SheetActions,
  SheetData,
  SheetItem,
  Side,
  StacksheetClassNames,
  StacksheetLayoutProps,
  StacksheetStoreState,
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

const getBackdropStyle = (
  config: ResolvedConfig,
  hasBackdropClass: boolean,
  dismissible: boolean,
): CSSProperties => {
  const style: CSSProperties = {
    // A tap on the overlay closes the stack; without this iOS and Android
    // paint their grey tap flash over the whole screen as it fades.
    WebkitTapHighlightColor: "transparent",
    cursor: config.closeOnBackdrop && dismissible ? "pointer" : undefined,
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
  contained,
  onClick,
  opacity,
  style,
}: {
  className: string | undefined;
  contained: boolean;
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
      data-stacksheet-contained={contained ? "" : undefined}
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

type SheetStore<TMap extends object> = StoreApi<StacksheetStoreState<TMap> & SheetActions<TMap>>;

type SheetRendererProps<TMap extends object> = StacksheetLayoutProps & {
  classNames?: StacksheetClassNames;
  config: ResolvedConfig;
  /** The element a contained stack renders into; undefined renders over the page */
  container: HTMLElement | undefined;
  /** The stack's dismissal controls, which record why the stack closed */
  dismissal: Pick<SheetStoreBundle<TMap>, "close" | "getCloseReason" | "getOpenerElement" | "pop">;
  sheets?: ContentMap<TMap>;
  /** Motion shared by this Sheet Stack's Panels and overlay */
  stackMotion: StackMotion;
  store: SheetStore<TMap>;
};

const isContentComponent = (content: unknown): content is ComponentType<SheetData> =>
  typeof content === "function";

/**
 * The component a Sheet renders: its `type` when it was opened by component,
 * otherwise the `sheets` entry its `type` names. A key missing from `sheets`
 * is a mistake in the caller, so it throws rather than render an empty Panel.
 */
const resolveContent = <TMap extends object>(
  sheets: ContentMap<TMap> | undefined,
  type: SheetItem["type"],
): ComponentType<SheetData> => {
  if (isComponent(type)) {
    return type;
  }
  const content = Object.entries(sheets ?? {}).find(([sheetType]) => sheetType === type)?.[1];
  if (!isContentComponent(content)) {
    throw new Error(
      `[stacksheet] No sheet is registered for type "${type}". Add it to the \`sheets\` prop of <StacksheetProvider>, or open the component directly.`,
    );
  }
  return content;
};

const usePanelKeyboardInset = (
  config: ResolvedConfig,
  isOpen: boolean,
  side: Side,
  contained: boolean,
) => {
  const panelWrapperRef = useRef<HTMLDivElement>(null);
  // The keyboard covers the viewport's bottom edge, which a contained stack doesn't sit on.
  const keyboardInset = useKeyboardInset(
    isOpen && side === "bottom" && config.repositionInputs && !contained,
    panelWrapperRef,
  );
  return { keyboardInset, panelWrapperRef };
};

const useFocusRestore = (isOpen: boolean, getOpenerElement: () => Element | null) => {
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (!isOpen && wasOpenRef.current) {
      const el = getOpenerElement();
      if (
        el instanceof HTMLElement &&
        el.isConnected &&
        el !== document.body &&
        el.tagName !== "BODY"
      ) {
        el.focus();
      }
    }
    wasOpenRef.current = isOpen;
  }, [getOpenerElement, isOpen]);
};

const useDismissalEffects = ({
  config,
  dismissible,
  isOpen,
  onDismiss,
  stackDepth,
}: {
  config: ResolvedConfig;
  /** Whether the top Sheet can be dismissed */
  dismissible: boolean;
  isOpen: boolean;
  /** Pop the top Sheet for an Escape or a close request. Must be stable. */
  onDismiss: () => void;
  /** Current number of open Sheets; each close consumes a CloseWatcher, so depth changes arm a fresh one. */
  stackDepth: number;
}) => {
  useEffect(() => {
    const shouldListen = isOpen && config.closeOnEscape && dismissible;
    const handleKeyDown = (e: KeyboardEvent) => {
      // An inner layer (popover, select, menu) already consumed this Escape —
      // don't also pop the sheet.
      if (e.key !== "Escape" || e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      onDismiss();
    };
    if (shouldListen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      if (shouldListen) {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isOpen, config.closeOnEscape, dismissible, onDismiss]);
  useEffect(() => {
    const CloseWatcherConstructor = globalThis.CloseWatcher;
    // CloseWatcher cannot distinguish Escape from other close requests (e.g.
    // the Android back gesture), so gating on `closeOnEscape` conservatively
    // disables back-gesture dismissal too when Escape dismissal is turned off.
    const shouldListen =
      stackDepth > 0 &&
      config.closeOnEscape &&
      dismissible &&
      CloseWatcherConstructor !== undefined;
    let watcher: InstanceType<NonNullable<typeof CloseWatcherConstructor>> | undefined;
    const handleClose = () => {
      onDismiss();
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
  }, [stackDepth, config.closeOnEscape, dismissible, onDismiss]);
};

/**
 * The stack's dismissals, each naming its reason. The store's own `close` and
 * `pop` are the programmatic ones.
 */
const useDismissals = <TMap extends object>(
  store: SheetStore<TMap>,
  { close, pop }: Pick<SheetStoreBundle<TMap>, "close" | "pop">,
) =>
  // oxlint-disable-next-line react-doctor/react-compiler-no-manual-memoization -- the library build does not run React Compiler; stable identities keep the Escape and CloseWatcher listeners from re-subscribing on every render.
  useMemo(() => {
    const actions = store.getState();
    return {
      close: actions.close,
      closeFromBackdrop: () => {
        close("backdrop");
      },
      pop: actions.pop,
      popFromEscape: () => {
        pop("escape");
      },
      popFromSwipe: () => {
        pop("swipe");
      },
    };
  }, [store, close, pop]);

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
  classNames: classNamesProp,
  container,
  dismissal,
  layout,
  renderHeader,
  stackMotion,
}: SheetRendererProps<TMap>) => {
  const stack = useStore(store, (s) => s.stack);
  const isOpen = stack.length > 0;
  const side = useResolvedSide(config);
  const prefersReducedMotion = usePrefersReducedMotion();
  const classNames = resolveClassNames(classNamesProp);
  const contained = container !== undefined;
  const { activeSnapIndex, handleSnap, snapHeights } = useSnapState(
    config,
    isOpen,
    side,
    stack,
    container,
  );
  const { close, closeFromBackdrop, pop, popFromEscape, popFromSwipe } = useDismissals(
    store,
    dismissal,
  );
  const { panelWrapperRef, keyboardInset } = usePanelKeyboardInset(config, isOpen, side, contained);
  useBodyScale(config, isOpen, prefersReducedMotion);
  useFocusRestore(isOpen, dismissal.getOpenerElement);
  // The top Sheet decides: a dismissible Sheet pushed over one that is not can
  // be dismissed, and so the other way round.
  const dismissible = stack.at(-1)?.dismissible ?? config.dismissible;
  useDismissalEffects({
    config,
    dismissible,
    isOpen,
    onDismiss: popFromEscape,
    stackDepth: stack.length,
  });
  useSteppedStack(stackMotion, prefersReducedMotion);
  const isModal = config.modal;
  const showOverlay = isModal && config.showOverlay;
  const hasBackdropClass = classNames.backdrop !== "";
  const backdropStyle = getBackdropStyle(config, hasBackdropClass, dismissible);
  const handleExitComplete = () => {
    if (stack.length === 0) {
      config.onCloseComplete?.(dismissal.getCloseReason());
    }
  };
  const shouldLockScroll = isOpen && isModal && config.lockScroll;
  return (
    <LazyMotion features={domMax}>
      {showOverlay && (
        <AnimatePresence onExitComplete={handleBackdropExitComplete}>
          {isOpen && (
            <Backdrop
              className={joinClassNames("patternmode-stacksheet__backdrop", classNames.backdrop)}
              contained={contained}
              key="stacksheet-backdrop"
              onClick={config.closeOnBackdrop && dismissible ? closeFromBackdrop : undefined}
              opacity={stackMotion.backdrop}
              style={backdropStyle}
            />
          )}
        </AnimatePresence>
      )}

      <RemoveScroll enabled={shouldLockScroll} forwardProps ref={panelWrapperRef}>
        <div
          className="patternmode-stacksheet__layer"
          data-stacksheet-contained={contained ? "" : undefined}
          style={{ zIndex: config.zIndex + 1 }}
        >
          <AnimatePresence onExitComplete={handleExitComplete}>
            {stack.map((item, index) => {
              const depth = stack.length - 1 - index;
              const isTop = depth === 0;
              const isNested = index > 0;
              const shouldRender = depth <= config.stacking.renderThreshold;
              return (
                <SheetPanel
                  activeSnapIndex={activeSnapIndex}
                  Content={resolveContent(sheets, item.type)}
                  classNames={classNames}
                  close={close}
                  config={config}
                  contained={contained}
                  depth={depth}
                  index={index}
                  isComposable={layout === "composable"}
                  isNested={isNested}
                  isTop={isTop}
                  item={item}
                  key={item.id}
                  keyboardInset={keyboardInset}
                  onSnap={handleSnap}
                  onSwipeDismiss={popFromSwipe}
                  pop={pop}
                  prefersReducedMotion={prefersReducedMotion}
                  renderHeader={renderHeader}
                  shouldRender={shouldRender}
                  side={side}
                  snapHeights={snapHeights}
                  stackMotion={stackMotion}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </RemoveScroll>
    </LazyMotion>
  );
};
