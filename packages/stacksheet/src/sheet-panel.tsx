import { FocusTrap } from "focus-trap-react";
import { motion as m } from "motion/react";
import {
	type ComponentType,
	type CSSProperties,
	memo,
	type ReactNode,
	type RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { ArrowLeftIcon, XIcon } from "./icons";
import { SheetPanelContext } from "./panel-context";
import { usePanelHeight } from "./renderer-effects";
import {
	buildAnimateTarget,
	buildAriaProps,
	buildPanelStyle,
	buildPanelTransition,
	computeSnapYOffset,
	getDragTransform,
	getInitialRadius,
	getShadow,
	type ResolvedClassNames,
	resolveSlideFrom,
	VISUAL_TWEEN,
} from "./renderer-helpers";
import {
	getAnimatedBorderRadius,
	getPanelStyles,
	getStackOffset,
	getStackTransform,
	type SlideValues,
} from "./stacking";
import type {
	HeaderRenderProps,
	ResolvedConfig,
	SheetItem,
	Side,
	StacksheetLayout,
} from "./types";
import { type DragState, useDrag } from "./use-drag";

function DefaultHeader({
	isNested,
	onBack,
	onClose,
	className,
}: HeaderRenderProps & { className?: string }) {
	return (
		<div
			className={`flex shrink-0 items-center justify-between px-4 pt-4 pb-2 ${className ?? ""}`}
		>
			<div className="flex items-center gap-2">
				{isNested && (
					<button
						aria-label="Back"
						className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-black/5 p-0 text-inherit opacity-70 transition-opacity duration-150 hover:opacity-100"
						onClick={onBack}
						type="button"
					>
						<ArrowLeftIcon />
					</button>
				)}
			</div>
			<button
				aria-label="Close"
				className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-black/5 p-0 text-inherit opacity-70 transition-opacity duration-150 hover:opacity-100"
				onClick={onClose}
				type="button"
			>
				<XIcon />
			</button>
		</div>
	);
}

const LAYERED_MODAL_SELECTORS = [
	'[role="dialog"][data-state="open"]',
	'[role="alertdialog"][data-state="open"]',
	"[data-radix-popper-content-wrapper]",
	"[data-radix-focus-guard]",
].join(", ");

function useLayeredModalFocused(active: boolean): boolean {
	const [layered, setLayered] = useState(false);

	useEffect(() => {
		if (!active) {
			setLayered(false);
			return;
		}
		const evaluate = () => {
			const target = document.activeElement;
			if (!target || target === document.body) {
				setLayered(false);
				return;
			}
			const inLayer =
				target instanceof Element &&
				target.closest(LAYERED_MODAL_SELECTORS) !== null;
			setLayered(inLayer);
		};
		evaluate();
		const handler = () => evaluate();
		document.addEventListener("focusin", handler, true);
		return () => document.removeEventListener("focusin", handler, true);
	}, [active]);

	return layered;
}

function ModalFocusTrap({
	enabled,
	active,
	fallbackRef,
	children,
}: {
	enabled: boolean;
	active: boolean;
	fallbackRef: RefObject<HTMLElement | null>;
	children: ReactNode;
}) {
	const paused = useLayeredModalFocused(enabled && active);

	if (!enabled) {
		return children;
	}
	return (
		<FocusTrap
			active={active}
			focusTrapOptions={{
				initialFocus: false,
				returnFocusOnDeactivate: true,
				escapeDeactivates: false,
				allowOutsideClick: true,
				checkCanFocusTrap: () =>
					new Promise<void>((resolve) =>
						requestAnimationFrame(() => resolve()),
					),
				fallbackFocus: () => {
					if (fallbackRef.current) {
						return fallbackRef.current;
					}
					return document.body;
				},
			}}
			paused={paused}
		>
			{children}
		</FocusTrap>
	);
}

interface SheetPanelProps {
	activeSnapIndex: number;
	// biome-ignore lint/suspicious/noExplicitAny: heterogeneous content component
	Content: ComponentType<any> | undefined;
	classNames: ResolvedClassNames;
	close: () => void;
	config: ResolvedConfig;
	depth: number;
	index: number;
	isNested: boolean;
	isTop: boolean;
	item: SheetItem;
	layout?: StacksheetLayout;
	onSnap: (index: number) => void;
	pop: () => void;
	prefersReducedMotion: boolean;
	renderHeader?: false | ((props: HeaderRenderProps) => ReactNode);
	shouldRender: boolean;
	side: Side;
	slideFrom: SlideValues;
	slideTarget: SlideValues;
	snapHeights: number[];
	spring: Record<string, unknown>;
	stackSpring: Record<string, unknown>;
	swipeClose: () => void;
	swipePop: () => void;
}

const PanelInnerContent = memo(function PanelInnerContent({
	isComposable,
	shouldRender,
	Content,
	data,
	renderHeader,
	headerProps,
	headerClassName,
}: {
	isComposable: boolean;
	shouldRender: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: heterogeneous content component
	Content: ComponentType<any> | undefined;
	data: Record<string, unknown>;
	renderHeader?: false | ((props: HeaderRenderProps) => ReactNode);
	headerProps: HeaderRenderProps;
	headerClassName: string | undefined;
}) {
	if (isComposable) {
		return shouldRender && Content ? <Content {...data} /> : null;
	}

	return (
		<>
			{renderHeader ? (
				renderHeader(headerProps)
			) : (
				<DefaultHeader {...headerProps} className={headerClassName} />
			)}
			{shouldRender && Content && (
				<div
					className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
					data-stacksheet-no-drag=""
				>
					<Content {...data} />
				</div>
			)}
		</>
	);
});

PanelInnerContent.displayName = "PanelInnerContent";

function resolvePanelLayout(
	layout: StacksheetLayout | undefined,
	renderHeader?: false | ((props: HeaderRenderProps) => ReactNode),
): StacksheetLayout {
	if (layout) {
		return layout;
	}
	return renderHeader === false ? "composable" : "classic";
}

function BottomHandle({ onDismiss }: { onDismiss?: () => void }) {
	return (
		<button
			aria-label="Dismiss"
			className="absolute inset-x-0 top-0 z-10 flex w-full cursor-grab touch-none items-center justify-center border-none bg-transparent pt-2.5 pb-2"
			data-stacksheet-handle=""
			onClick={onDismiss}
			type="button"
		>
			<div
				aria-hidden="true"
				className="h-[5px] w-9 rounded-full bg-current/15"
			/>
		</button>
	);
}

function SideHandle({
	side,
	isHovered,
	onDismiss,
}: {
	side: Side;
	isHovered: boolean;
	onDismiss?: () => void;
}) {
	const position: CSSProperties =
		side === "right" ? { right: "100%" } : { left: "100%" };

	return (
		<m.div
			animate={{ opacity: isHovered ? 1 : 0 }}
			aria-label="Dismiss"
			className="absolute top-0 bottom-0 flex w-6 cursor-grab touch-none items-center justify-center"
			data-stacksheet-handle=""
			onClick={onDismiss}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onDismiss?.();
				}
			}}
			role="button"
			style={position}
			tabIndex={0}
			transition={{ duration: isHovered ? 0.15 : 0.4, ease: "easeOut" }}
		>
			<div aria-hidden="true" className="h-8 w-1 rounded-full bg-current/20" />
		</m.div>
	);
}

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
