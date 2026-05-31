import { m } from "motion/react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { DragState } from "../Drag/DragTypes";
import { useDrag } from "../Drag/useDrag";
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
import { PanelInnerContent } from "./SheetPanelContent";
import { ModalFocusTrap } from "./SheetPanelFocus";
import { BottomHandle, SideHandle } from "./SheetPanelHandles";
import { resolvePanelLayout } from "./SheetPanelLayout";
import type { SheetPanelProps } from "./SheetPanelTypes";

export const SheetPanel = memo(function SheetPanel({
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
}: SheetPanelProps) {
	const panelRef = useRef<HTMLDivElement>(null);
	const hasEnteredRef = useRef(false);
	const [dragState, setDragState] = useState<DragState>({
		offset: 0,
		isDragging: false,
	});
	const [isHovered, setIsHovered] = useState(false);

	const measuredHeight = usePanelHeight(panelRef, snapHeights.length > 0);

	const transform = getStackTransform(depth, config.stacking);
	const panelStyles = getPanelStyles(side, config, index);

	useEffect(() => {
		if (!isTop) {
			hasEnteredRef.current = false;
		}
	}, [isTop]);

	const handleAnimationComplete = useCallback(() => {
		if (isTop && !hasEnteredRef.current) {
			hasEnteredRef.current = true;
			config.onOpenComplete?.();
		}
	}, [isTop, config]);

	useDrag(
		panelRef,
		{
			enabled:
				isTop && config.drag && config.dismissible && !prefersReducedMotion,
			closeThreshold: config.closeThreshold,
			velocityThreshold: config.velocityThreshold,
			side,
			onClose: swipeClose,
			onPop: swipePop,
			isNested,
			snapHeights,
			activeSnapIndex,
			onSnap,
			sequential: config.snapToSequentialPoints,
		},
		setDragState,
	);

	const ariaLabel =
		item.ariaLabel ??
		(typeof item.data?.__ariaLabel === "string"
			? item.data.__ariaLabel
			: undefined) ??
		config.ariaLabel;

	const panelId = `stacksheet-${item.id}`;
	const [hasDescription, setHasDescription] = useState(false);
	const registerDescription = useCallback(() => {
		setHasDescription(true);
		return () => setHasDescription(false);
	}, []);
	const panelContext = useMemo(
		() => ({
			close,
			back: pop,
			isNested,
			isTop,
			panelId,
			side,
			hasDescription,
			registerDescription,
		}),
		[
			close,
			pop,
			isNested,
			isTop,
			panelId,
			side,
			hasDescription,
			registerDescription,
		],
	);

	const panelLayout = resolvePanelLayout(layout, renderHeader);
	const isComposable = panelLayout === "composable";
	const hasPanelClass = classNames.panel !== "";
	const dragOffset = getDragTransform(side, dragState.offset);
	const panelStyle = buildPanelStyle(
		panelStyles,
		isTop,
		hasPanelClass,
		dragState.isDragging,
	);

	const headerProps = useMemo<HeaderRenderProps>(
		() => ({
			isNested,
			onBack: pop,
			onClose: close,
			side,
		}),
		[close, isNested, pop, side],
	);

	const ariaProps = buildAriaProps(
		isTop,
		config.modal,
		isComposable,
		ariaLabel,
		panelId,
		hasDescription,
	);

	const transition = buildPanelTransition(
		dragState.isDragging,
		isTop,
		spring,
		stackSpring,
	);

	const animatedRadius = getAnimatedBorderRadius(side, depth, config.stacking);
	const snapYOffset = computeSnapYOffset(
		side,
		snapHeights,
		activeSnapIndex,
		measuredHeight,
	);
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

	const panelContent = (
		<m.div
			animate={animateTarget}
			className={classNames.panel || undefined}
			exit={{
				...resolvedSlideFrom,
				opacity: 0.6,
				boxShadow: getShadow(false),
				transition: {
					type: "tween",
					duration: prefersReducedMotion ? 0 : 0.24,
					ease: "easeOut",
					boxShadow: VISUAL_TWEEN,
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
			onBlur={showSideHandle ? () => setIsHovered(false) : undefined}
			onFocus={showSideHandle ? () => setIsHovered(true) : undefined}
			onMouseEnter={showSideHandle ? () => setIsHovered(true) : undefined}
			onMouseLeave={showSideHandle ? () => setIsHovered(false) : undefined}
			ref={panelRef}
			style={panelStyle}
			tabIndex={isTop ? -1 : undefined}
			{...(isTop ? {} : { "aria-hidden": "true" as const, inert: true })}
			{...ariaProps}
		>
			{showSideHandle && (
				<SideHandle
					isHovered={isHovered}
					onDismiss={isNested ? pop : close}
					side={side}
				/>
			)}
			<div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[inherit]">
				{showBottomHandle && (
					<BottomHandle onDismiss={isNested ? pop : close} />
				)}
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
			<ModalFocusTrap
				active={isTop}
				enabled={config.modal}
				fallbackRef={panelRef}
			>
				{panelContent}
			</ModalFocusTrap>
		</SheetPanelContext.Provider>
	);
});
