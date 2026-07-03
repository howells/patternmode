import { m } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";

import type { DragState } from "../Drag/drag-types";
import { useDrag } from "../Drag/use-drag";
import { SheetPanelContext } from "../panel-context";
import { usePanelHeight } from "../renderer-effects";
import {
  buildAnimateTarget,
  buildAriaProps,
  buildPanelStyle,
  buildPanelTransition,
  computeSnapYOffset,
  getDragTransform,
  getInitialRadius,
  getShadow,
  resolveSlideFrom,
  VISUAL_TWEEN,
} from "../renderer-helpers";
import {
  getAnimatedBorderRadius,
  getPanelStyles,
  getStackOffset,
  getStackTransform,
} from "../stacking";
import type { HeaderRenderProps } from "../types";
import { PanelInnerContent } from "./sheet-panel-content";
import { ModalFocusTrap } from "./sheet-panel-focus";
import { BottomHandle, SideHandle } from "./sheet-panel-handles";
import { resolvePanelLayout } from "./sheet-panel-layout";
import type { SheetPanelProps } from "./sheet-panel-types";

const getPanelAriaLabel = (item: SheetPanelProps["item"], fallbackLabel: string): string =>
  item.ariaLabel ??
  (typeof item.data?.__ariaLabel === "string" ? item.data.__ariaLabel : undefined) ??
  fallbackLabel;

const getPanelHoverProps = (enabled: boolean, setIsHovered: (value: boolean) => void) =>
  enabled
    ? {
        onBlur: () => {
          setIsHovered(false);
        },
        onFocus: () => {
          setIsHovered(true);
        },
        onMouseEnter: () => {
          setIsHovered(true);
        },
        onMouseLeave: () => {
          setIsHovered(false);
        },
      }
    : {};

const getInactivePanelProps = (isTop: boolean) =>
  isTop ? {} : { "aria-hidden": "true" as const, inert: true };

const getHeaderProps = ({
  close,
  isNested,
  pop,
  side,
}: Pick<SheetPanelProps, "close" | "isNested" | "pop" | "side">): HeaderRenderProps => ({
  isNested,
  onBack: pop,
  onClose: close,
  side,
});

const getPanelContext = ({
  close,
  hasDescription,
  hasTitle,
  isNested,
  isTop,
  panelId,
  pop,
  registerDescription,
  registerTitle,
  side,
}: Pick<SheetPanelProps, "close" | "isNested" | "isTop" | "pop" | "side"> & {
  hasDescription: boolean;
  hasTitle: boolean;
  panelId: string;
  registerDescription: () => () => void;
  registerTitle: () => () => void;
}) => ({
  back: pop,
  close,
  hasDescription,
  hasTitle,
  isNested,
  isTop,
  panelId,
  registerDescription,
  registerTitle,
  side,
});

const getOptionalSideHandle = ({
  isHovered,
  onDismiss,
  show,
  side,
}: {
  isHovered: boolean;
  onDismiss: () => void;
  show: boolean;
  side: SheetPanelProps["side"];
}): ReactNode =>
  show ? <SideHandle isHovered={isHovered} onDismiss={onDismiss} side={side} /> : null;

const getOptionalBottomHandle = (show: boolean, onDismiss: () => void): ReactNode =>
  show ? <BottomHandle onDismiss={onDismiss} /> : null;

const completeOpeningAnimation = (
  hasEnteredRef: RefObject<boolean>,
  isTop: boolean,
  onOpenCompleteRef: RefObject<(() => void) | undefined>,
) => {
  if (isTop && !hasEnteredRef.current) {
    hasEnteredRef.current = true;
    onOpenCompleteRef.current?.();
  }
};

const useOpeningCompletion = (isTop: boolean, onOpenComplete: (() => void) | undefined) => {
  const hasEnteredRef = useRef(false);
  const onOpenCompleteRef = useRef(onOpenComplete);

  if (!isTop && hasEnteredRef.current) {
    hasEnteredRef.current = false;
  }
  useEffect(() => {
    onOpenCompleteRef.current = onOpenComplete;
  }, [onOpenComplete]);

  return () => {
    completeOpeningAnimation(hasEnteredRef, isTop, onOpenCompleteRef);
  };
};

const useSheetPanelDrag = (
  {
    activeSnapIndex,
    config,
    isNested,
    isTop,
    onSnap,
    prefersReducedMotion,
    side,
    snapHeights,
    swipeClose,
    swipePop,
  }: SheetPanelProps,
  panelRef: RefObject<HTMLDivElement | null>,
): DragState => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    offset: 0,
  });

  useDrag(
    panelRef,
    {
      activeSnapIndex,
      closeThreshold: config.closeThreshold,
      enabled: isTop && config.drag && config.dismissible && !prefersReducedMotion,
      isNested,
      onClose: swipeClose,
      onPop: swipePop,
      onSnap,
      sequential: config.snapToSequentialPoints,
      side,
      snapHeights,
      velocityThreshold: config.velocityThreshold,
    },
    setDragState,
  );

  return dragState;
};

const useSheetPanelContext = (
  { close, isNested, isTop, pop, side }: SheetPanelProps,
  panelId: string,
) => {
  const [hasDescription, setHasDescription] = useState(false);
  const [hasTitle, setHasTitle] = useState(false);
  // oxlint-disable-next-line react-doctor/react-compiler-no-manual-memoization -- the library build does not run React Compiler; a stable identity keeps Sheet.Description effects from re-running on every drag re-render.
  const registerDescription = useCallback(() => {
    setHasDescription(true);
    return () => {
      setHasDescription(false);
    };
  }, []);
  // oxlint-disable-next-line react-doctor/react-compiler-no-manual-memoization -- the library build does not run React Compiler; a stable identity keeps Sheet.Title effects from re-running on every drag re-render.
  const registerTitle = useCallback(() => {
    setHasTitle(true);
    return () => {
      setHasTitle(false);
    };
  }, []);
  // Memoized so drag-driven re-renders don't churn the context value (and
  // with it every Sheet.* consumer's effects).
  // oxlint-disable-next-line react-doctor/react-compiler-no-manual-memoization -- the library build does not run React Compiler; without useMemo the panel context is a new object on every pointermove re-render.
  const panelContext = useMemo(
    () =>
      getPanelContext({
        close,
        hasDescription,
        hasTitle,
        isNested,
        isTop,
        panelId,
        pop,
        registerDescription,
        registerTitle,
        side,
      }),
    [
      close,
      hasDescription,
      hasTitle,
      isNested,
      isTop,
      panelId,
      pop,
      registerDescription,
      registerTitle,
      side,
    ],
  );

  return { hasDescription, hasTitle, panelContext };
};

const useSheetPanelModel = (props: SheetPanelProps) => {
  const {
    item,
    index,
    depth,
    isTop,
    isNested,
    side,
    config,
    classNames,
    pop,
    close,
    snapHeights,
    activeSnapIndex,
    layout,
    renderHeader,
    slideFrom,
    slideTarget,
    spring,
    stackSpring,
  } = props;
  const panelRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const measuredHeight = usePanelHeight(panelRef, snapHeights.length > 0);

  const transform = getStackTransform(depth, config.stacking);
  const panelStyles = getPanelStyles(side, config, index);

  const handleAnimationComplete = useOpeningCompletion(isTop, config.onOpenComplete);
  const dragState = useSheetPanelDrag(props, panelRef);

  const ariaLabel = getPanelAriaLabel(item, config.ariaLabel);

  const panelId = `stacksheet-${item.id}`;
  const { hasDescription, hasTitle, panelContext } = useSheetPanelContext(props, panelId);

  const panelLayout = resolvePanelLayout(layout, renderHeader);
  const isComposable = panelLayout === "composable";
  const hasPanelClass = classNames.panel !== "";
  const dragOffset = getDragTransform(side, dragState.offset);
  const panelStyle = buildPanelStyle(panelStyles, isTop, hasPanelClass, dragState.isDragging);

  const headerProps = getHeaderProps({ close, isNested, pop, side });

  const ariaProps = buildAriaProps({
    ariaLabel,
    hasDescription,
    hasTitle,
    isComposable,
    isModal: config.modal,
    isTop,
    panelId,
  });

  const transition = buildPanelTransition(dragState.isDragging, isTop, spring, stackSpring);

  const animatedRadius = getAnimatedBorderRadius(side, depth, config.stacking);
  const snapYOffset = computeSnapYOffset(side, snapHeights, activeSnapIndex, measuredHeight);
  const resolvedSlideFrom = resolveSlideFrom(side, slideFrom, measuredHeight);

  const stackOffset = getStackOffset(side, transform.offset);
  const animateTarget = buildAnimateTarget(
    slideTarget,
    stackOffset,
    dragOffset,
    transform,
    animatedRadius,
    transition,
    snapYOffset,
    isTop,
  );

  const initialRadius = getInitialRadius(side);
  const showSideHandle = isTop && side !== "bottom";
  const showBottomHandle = isTop && side === "bottom";
  const dismiss = isNested ? pop : close;
  const sideHandle = getOptionalSideHandle({
    isHovered,
    onDismiss: dismiss,
    show: showSideHandle,
    side,
  });
  const bottomHandle = getOptionalBottomHandle(showBottomHandle, dismiss);
  const hoverProps = getPanelHoverProps(showSideHandle, setIsHovered);
  const inactivePanelProps = getInactivePanelProps(isTop);

  return {
    animateTarget,
    ariaProps,
    bottomHandle,
    handleAnimationComplete,
    headerProps,
    hoverProps,
    inactivePanelProps,
    initialRadius,
    isComposable,
    panelContext,
    panelRef,
    panelStyle,
    resolvedSlideFrom,
    sideHandle,
  };
};

export const SheetPanel = (props: SheetPanelProps) => {
  const {
    item,
    isTop,
    config,
    classNames,
    Content,
    shouldRender,
    renderHeader,
    prefersReducedMotion,
  } = props;
  const {
    animateTarget,
    ariaProps,
    bottomHandle,
    handleAnimationComplete,
    headerProps,
    hoverProps,
    inactivePanelProps,
    initialRadius,
    isComposable,
    panelContext,
    panelRef,
    panelStyle,
    resolvedSlideFrom,
    sideHandle,
  } = useSheetPanelModel(props);

  const panelContent = (
    <m.div
      animate={animateTarget}
      className={classNames.panel || undefined}
      exit={{
        ...resolvedSlideFrom,
        boxShadow: getShadow(false),
        opacity: 0.6,
        transition: {
          boxShadow: VISUAL_TWEEN,
          duration: prefersReducedMotion ? 0 : 0.24,
          ease: "easeOut",
          type: "tween",
        },
      }}
      initial={{
        ...resolvedSlideFrom,
        opacity: 0.8,
        ...initialRadius,
        boxShadow: getShadow(false),
      }}
      key={item.id}
      onAnimationComplete={handleAnimationComplete}
      ref={panelRef}
      style={panelStyle}
      tabIndex={isTop ? -1 : undefined}
      {...hoverProps}
      {...inactivePanelProps}
      {...ariaProps}
    >
      {sideHandle}
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[inherit]">
        {bottomHandle}
        <PanelInnerContent
          Content={Content}
          data={item.data}
          headerClassName={classNames.header || undefined}
          headerProps={headerProps}
          isComposable={isComposable}
          renderHeader={renderHeader}
          shouldRender={shouldRender}
        />
      </div>
    </m.div>
  );

  return (
    <SheetPanelContext.Provider value={panelContext}>
      <ModalFocusTrap active={isTop} enabled={config.modal} fallbackRef={panelRef}>
        {panelContent}
      </ModalFocusTrap>
    </SheetPanelContext.Provider>
  );
};
