import { m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { MutableRefObject, ReactNode } from "react";

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
        onBlur: () => setIsHovered(false),
        onFocus: () => setIsHovered(true),
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
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
  isNested,
  isTop,
  panelId,
  pop,
  registerDescription,
  side,
}: Pick<SheetPanelProps, "close" | "isNested" | "isTop" | "pop" | "side"> & {
  hasDescription: boolean;
  panelId: string;
  registerDescription: () => () => void;
}) => ({
  back: pop,
  close,
  hasDescription,
  isNested,
  isTop,
  panelId,
  registerDescription,
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
  hasEnteredRef: MutableRefObject<boolean>,
  isTop: boolean,
  onOpenCompleteRef: MutableRefObject<(() => void) | undefined>,
) => {
  if (isTop && !hasEnteredRef.current) {
    hasEnteredRef.current = true;
    onOpenCompleteRef.current?.();
  }
};

export const SheetPanel = ({
  item,
  index,
  depth,
  isTop,
  isNested,
  side,
  config,
  classNames,
  Content,
  shouldRender,
  pop,
  close,
  swipeClose,
  swipePop,
  snapHeights,
  activeSnapIndex,
  onSnap,
  layout,
  renderHeader,
  slideFrom,
  slideTarget,
  spring,
  stackSpring,
  prefersReducedMotion,
}: SheetPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const hasEnteredRef = useRef(false);
  const onOpenCompleteRef = useRef(config.onOpenComplete);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    offset: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  const measuredHeight = usePanelHeight(panelRef, snapHeights.length > 0);

  const transform = getStackTransform(depth, config.stacking);
  const panelStyles = getPanelStyles(side, config, index);

  if (!isTop && hasEnteredRef.current) {
    hasEnteredRef.current = false;
  }
  useEffect(() => {
    onOpenCompleteRef.current = config.onOpenComplete;
  }, [config.onOpenComplete]);

  const handleAnimationComplete = () => {
    completeOpeningAnimation(hasEnteredRef, isTop, onOpenCompleteRef);
  };

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

  const ariaLabel = getPanelAriaLabel(item, config.ariaLabel);

  const panelId = `stacksheet-${item.id}`;
  const [hasDescription, setHasDescription] = useState(false);
  const registerDescription = () => {
    setHasDescription(true);
    return () => setHasDescription(false);
  };
  const panelContext = getPanelContext({
    close,
    hasDescription,
    isNested,
    isTop,
    panelId,
    pop,
    registerDescription,
    side,
  });

  const panelLayout = resolvePanelLayout(layout, renderHeader);
  const isComposable = panelLayout === "composable";
  const hasPanelClass = classNames.panel !== "";
  const dragOffset = getDragTransform(side, dragState.offset);
  const panelStyle = buildPanelStyle(panelStyles, isTop, hasPanelClass, dragState.isDragging);

  const headerProps = getHeaderProps({ close, isNested, pop, side });

  const ariaProps = buildAriaProps(
    isTop,
    config.modal,
    isComposable,
    ariaLabel,
    panelId,
    hasDescription,
  );

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
          data={item.data as Record<string, unknown>}
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
