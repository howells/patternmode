"use client";

import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { Slot } from "@radix-ui/react-slot";
import {
	type ButtonHTMLAttributes,
	type ComponentPropsWithoutRef,
	type CSSProperties,
	createContext,
	forwardRef,
	type HTMLAttributes,
	type MouseEvent,
	type ReactNode,
	type Ref,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

export const SCROLL_FRAME_AXES = ["vertical", "horizontal", "both"] as const;
export const SCROLL_FRAME_EDGES = ["start", "end"] as const;
export const SCROLL_FRAME_SCROLLBARS = [
	"auto",
	"always",
	"hover",
	"hidden",
] as const;
export const SCROLL_FRAME_CONTROL_VISIBILITY = [
	"auto",
	"disabled",
	"hidden",
] as const;

export type ScrollFrameAxis = "vertical" | "horizontal";
export type ScrollFrameAxes = (typeof SCROLL_FRAME_AXES)[number];
export type ScrollFrameEdge = (typeof SCROLL_FRAME_EDGES)[number];
export type ScrollFrameScrollbarVisibility =
	(typeof SCROLL_FRAME_SCROLLBARS)[number];
export type ScrollFrameControlVisibility =
	(typeof SCROLL_FRAME_CONTROL_VISIBILITY)[number];
export type ScrollFrameFadeEdges = "none" | "start" | "end" | "both" | boolean;
export type ScrollFrameFadeConfig =
	| ScrollFrameFadeEdges
	| Partial<Record<ScrollFrameAxis, ScrollFrameFadeEdges>>;
export type ScrollFrameScrollStep =
	| "page"
	| number
	| ((state: ScrollFrameContextValue, axis: ScrollFrameAxis) => number);
export type ScrollFrameScrollBehavior = ScrollBehavior;

export interface ScrollFrameAxisState {
	atEnd: boolean;
	atStart: boolean;
	scrollable: boolean;
}

export interface ScrollFrameEdgeState {
	horizontal: ScrollFrameAxisState;
	vertical: ScrollFrameAxisState;
}

export interface ScrollFrameControlsConfig {
	axis?: ScrollFrameAxis;
	visibility?: ScrollFrameControlVisibility;
}

export interface ScrollFrameProps
	extends Omit<ComponentPropsWithoutRef<typeof RadixScrollArea.Root>, "type"> {
	axes?: ScrollFrameAxes;
	children: ReactNode;
	contentClassName?: string;
	contentStyle?: CSSProperties;
	controls?: boolean | ScrollFrameControlsConfig;
	controlVisibility?: ScrollFrameControlVisibility;
	fadeColor?: string;
	fadeSize?: number | string;
	fades?: ScrollFrameFadeConfig;
	scrollbars?: ScrollFrameScrollbarVisibility;
	scrollBehavior?: ScrollFrameScrollBehavior;
	scrollStep?: ScrollFrameScrollStep;
	viewportClassName?: string;
	viewportRef?: Ref<HTMLDivElement>;
	viewportStyle?: CSSProperties;
}

export interface ScrollFrameRootProps
	extends Omit<ComponentPropsWithoutRef<typeof RadixScrollArea.Root>, "type"> {
	axes?: ScrollFrameAxes;
	children: ReactNode;
	controlVisibility?: ScrollFrameControlVisibility;
	fadeColor?: string;
	fadeSize?: number | string;
	scrollbars?: ScrollFrameScrollbarVisibility;
	scrollBehavior?: ScrollFrameScrollBehavior;
	scrollStep?: ScrollFrameScrollStep;
}

export interface ScrollFrameViewportProps
	extends ComponentPropsWithoutRef<typeof RadixScrollArea.Viewport> {
	children: ReactNode;
	contentClassName?: string;
	contentStyle?: CSSProperties;
	viewportRef?: Ref<HTMLDivElement>;
}

export interface ScrollFrameFadeProps extends HTMLAttributes<HTMLSpanElement> {
	axis?: ScrollFrameAxis;
	color?: string;
	edge: ScrollFrameEdge;
	size?: number | string;
}

export interface ScrollFrameMovementControlProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
	axis?: ScrollFrameAxis;
	visibility?: ScrollFrameControlVisibility;
}

export interface ScrollFrameContextValue {
	axes: ScrollFrameAxes;
	controlVisibility: ScrollFrameControlVisibility;
	edgeState: ScrollFrameEdgeState;
	registerViewport: (node: HTMLDivElement | null) => void;
	scrollbars: ScrollFrameScrollbarVisibility;
	scrollBehavior: ScrollFrameScrollBehavior;
	scrollByStep: (direction: ScrollFrameEdge, axis?: ScrollFrameAxis) => void;
	scrollStep: ScrollFrameScrollStep;
	viewport: HTMLDivElement | null;
}

const DEFAULT_AXIS_STATE: ScrollFrameAxisState = {
	atEnd: true,
	atStart: true,
	scrollable: false,
};

const DEFAULT_EDGE_STATE: ScrollFrameEdgeState = {
	horizontal: DEFAULT_AXIS_STATE,
	vertical: DEFAULT_AXIS_STATE,
};

const ScrollFrameContext = createContext<ScrollFrameContextValue | null>(null);

function joinClasses(
	...parts: Array<false | null | string | undefined>
): string | undefined {
	const out = parts.filter(Boolean).join(" ").trim();
	return out.length > 0 ? out : undefined;
}

function setRef<T>(ref: Ref<T> | undefined, value: T | null) {
	if (!ref) {
		return;
	}
	if (typeof ref === "function") {
		ref(value);
		return;
	}
	ref.current = value;
}

function toCssSize(value: number | string | undefined): string | undefined {
	if (typeof value === "number") {
		return `${value}px`;
	}
	return value;
}

function resolveRadixType(
	scrollbars: ScrollFrameScrollbarVisibility,
): ComponentPropsWithoutRef<typeof RadixScrollArea.Root>["type"] {
	if (scrollbars === "hidden") {
		return "always";
	}
	return scrollbars === "auto" ? "scroll" : scrollbars;
}

function supportsAxis(axes: ScrollFrameAxes, axis: ScrollFrameAxis): boolean {
	return axes === "both" || axes === axis;
}

function defaultControlAxis(axes: ScrollFrameAxes): ScrollFrameAxis {
	return axes === "horizontal" ? "horizontal" : "vertical";
}

function normalizeFadeEdges(
	fadeEdges: ScrollFrameFadeEdges | undefined,
): "none" | "start" | "end" | "both" {
	if (fadeEdges === undefined || fadeEdges === true) {
		return "both";
	}
	if (fadeEdges === false) {
		return "none";
	}
	return fadeEdges;
}

function shouldRenderFade(
	fades: ScrollFrameFadeConfig | undefined,
	axis: ScrollFrameAxis,
	edge: ScrollFrameEdge,
): boolean {
	if (fades === false || fades === "none") {
		return false;
	}
	if (fades && typeof fades === "object") {
		const axisEdges = normalizeFadeEdges(fades[axis]);
		return axisEdges === "both" || axisEdges === edge;
	}
	const edges = normalizeFadeEdges(fades);
	return edges === "both" || edges === edge;
}

function getAxisState(
	node: HTMLDivElement,
	axis: ScrollFrameAxis,
): ScrollFrameAxisState {
	const max =
		axis === "vertical"
			? node.scrollHeight - node.clientHeight
			: node.scrollWidth - node.clientWidth;
	const position = axis === "vertical" ? node.scrollTop : node.scrollLeft;
	const scrollable = max > 1;
	return {
		atStart: position <= 1,
		atEnd: !scrollable || position >= max - 1,
		scrollable,
	};
}

function getReducedMotionPreference(): boolean {
	if (typeof window === "undefined" || !window.matchMedia) {
		return false;
	}
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getPageStep(node: HTMLDivElement, axis: ScrollFrameAxis): number {
	const size = axis === "vertical" ? node.clientHeight : node.clientWidth;
	return Math.max(1, size * 0.85);
}

export function useScrollFrame(): ScrollFrameContextValue {
	const context = useContext(ScrollFrameContext);
	if (!context) {
		throw new Error("useScrollFrame must be used within <ScrollFrame.Root>.");
	}
	return context;
}

const ScrollFrameRoot = forwardRef<HTMLDivElement, ScrollFrameRootProps>(
	function ScrollFrameRoot(
		{
			axes = "vertical",
			"aria-label": ariaLabel,
			"aria-labelledby": ariaLabelledBy,
			children,
			className,
			controlVisibility = "auto",
			fadeColor,
			fadeSize,
			role,
			scrollbars = "auto",
			scrollBehavior = getReducedMotionPreference() ? "auto" : "smooth",
			scrollStep = "page",
			style,
			...props
		},
		ref,
	) {
		const [viewport, setViewport] = useState<HTMLDivElement | null>(null);
		const [edgeState, setEdgeState] =
			useState<ScrollFrameEdgeState>(DEFAULT_EDGE_STATE);
		const viewportRef = useRef<HTMLDivElement | null>(null);
		const contextRef = useRef<ScrollFrameContextValue | null>(null);

		const measure = useCallback(() => {
			const node = viewportRef.current;
			if (!node) {
				return;
			}
			setEdgeState({
				horizontal: getAxisState(node, "horizontal"),
				vertical: getAxisState(node, "vertical"),
			});
		}, []);

		const registerViewport = useCallback(
			(node: HTMLDivElement | null) => {
				viewportRef.current = node;
				setViewport(node);
				if (node) {
					queueMicrotask(measure);
				}
			},
			[measure],
		);

		const scrollByStep = useCallback(
			(direction: ScrollFrameEdge, axis = defaultControlAxis(axes)) => {
				const node = viewportRef.current;
				if (!node) {
					return;
				}
				const rawStep =
					typeof scrollStep === "function" && contextRef.current
						? scrollStep(contextRef.current, axis)
						: scrollStep === "page"
							? getPageStep(node, axis)
							: scrollStep;
				const distance = direction === "end" ? rawStep : -rawStep;
				node.scrollBy({
					[axis === "vertical" ? "top" : "left"]: distance,
					behavior: scrollBehavior,
				});
			},
			[axes, scrollBehavior, scrollStep],
		);

		const context = useMemo<ScrollFrameContextValue>(
			() => ({
				axes,
				controlVisibility,
				edgeState,
				registerViewport,
				scrollbars,
				scrollBehavior,
				scrollByStep,
				scrollStep,
				viewport,
			}),
			[
				axes,
				controlVisibility,
				edgeState,
				registerViewport,
				scrollbars,
				scrollBehavior,
				scrollByStep,
				scrollStep,
				viewport,
			],
		);
		contextRef.current = context;

		useEffect(() => {
			if (!viewport) {
				return;
			}

			measure();
			const ResizeObserverCtor = globalThis.ResizeObserver;
			const resizeObserver = ResizeObserverCtor
				? new ResizeObserverCtor(measure)
				: null;
			resizeObserver?.observe(viewport);
			viewport.addEventListener("scroll", measure, { passive: true });
			return () => {
				resizeObserver?.disconnect();
				viewport.removeEventListener("scroll", measure);
			};
		}, [measure, viewport]);

		const rootStyle = {
			"--howells-scroll-frame-fade-color": fadeColor,
			"--howells-scroll-frame-fade-size": toCssSize(fadeSize),
			...style,
		} as CSSProperties;

		return (
			<ScrollFrameContext.Provider value={context}>
				<RadixScrollArea.Root
					{...props}
					aria-label={ariaLabel}
					aria-labelledby={ariaLabelledBy}
					className={joinClasses("howells-scroll-frame", className)}
					data-axis-horizontal={
						supportsAxis(axes, "horizontal") ? "true" : "false"
					}
					data-axis-vertical={supportsAxis(axes, "vertical") ? "true" : "false"}
					data-axes={axes}
					data-scrollbar-visibility={scrollbars}
					data-slot="scroll-frame"
					ref={ref}
					role={role ?? (ariaLabel || ariaLabelledBy ? "region" : undefined)}
					style={rootStyle}
					type={resolveRadixType(scrollbars)}
				>
					{children}
				</RadixScrollArea.Root>
			</ScrollFrameContext.Provider>
		);
	},
);

const ScrollFrameViewport = forwardRef<
	HTMLDivElement,
	ScrollFrameViewportProps
>(function ScrollFrameViewport(
	{
		children,
		className,
		contentClassName,
		contentStyle,
		viewportRef,
		...props
	},
	ref,
) {
	const { registerViewport } = useScrollFrame();
	const assignRef = useCallback(
		(node: HTMLDivElement | null) => {
			registerViewport(node);
			setRef(ref, node);
			setRef(viewportRef, node);
		},
		[ref, registerViewport, viewportRef],
	);

	return (
		<RadixScrollArea.Viewport
			{...props}
			className={joinClasses("howells-scroll-frame__viewport", className)}
			data-slot="scroll-frame-viewport"
			data-testid="scroll-frame-viewport"
			ref={assignRef}
		>
			<div
				className={joinClasses(
					"howells-scroll-frame__content",
					contentClassName,
				)}
				data-slot="scroll-frame-content"
				style={contentStyle}
			>
				{children}
			</div>
		</RadixScrollArea.Viewport>
	);
});

function ScrollFrameFade({
	axis = "vertical",
	className,
	color,
	edge,
	size,
	style,
	...props
}: ScrollFrameFadeProps) {
	const { edgeState } = useScrollFrame();
	const axisState = edgeState[axis];
	const hidden =
		!axisState.scrollable || axisState[edge === "start" ? "atStart" : "atEnd"];
	const fadeStyle = {
		"--howells-scroll-frame-fade-color": color,
		"--howells-scroll-frame-fade-size": toCssSize(size),
		...style,
	} as CSSProperties;

	return (
		<span
			{...props}
			aria-hidden="true"
			className={joinClasses("howells-scroll-frame__fade", className)}
			data-axis={axis}
			data-edge={edge}
			data-hidden={hidden ? "true" : "false"}
			data-slot="scroll-frame-fade"
			data-testid={`scroll-frame-fade-${axis}-${edge}`}
			style={fadeStyle}
		/>
	);
}

function ScrollFrameMovementControl({
	asChild,
	axis,
	children,
	className,
	direction,
	disabled,
	onClick,
	type,
	visibility,
	...props
}: ScrollFrameMovementControlProps & { direction: ScrollFrameEdge }) {
	const { axes, controlVisibility, edgeState, scrollByStep } = useScrollFrame();
	const resolvedAxis = axis ?? defaultControlAxis(axes);
	const resolvedVisibility = visibility ?? controlVisibility;
	const axisState = edgeState[resolvedAxis];
	const movementBlocked =
		!axisState.scrollable ||
		(direction === "start" ? axisState.atStart : axisState.atEnd);
	const hidden =
		resolvedVisibility === "hidden" ||
		(resolvedVisibility === "auto" && movementBlocked);
	const controlDisabled = disabled || movementBlocked;
	const Comp = asChild ? Slot : "button";
	const label =
		props["aria-label"] ??
		(direction === "start" ? "Scroll backward" : "Scroll forward");

	if (hidden) {
		return null;
	}

	return (
		<Comp
			{...props}
			aria-disabled={asChild && controlDisabled ? true : props["aria-disabled"]}
			aria-label={label}
			className={joinClasses("howells-scroll-frame__control", className)}
			data-axis={resolvedAxis}
			data-direction={direction}
			data-slot="scroll-frame-control"
			disabled={asChild ? undefined : controlDisabled}
			onClick={(event: MouseEvent<HTMLButtonElement>) => {
				onClick?.(event);
				if (!event.defaultPrevented && !controlDisabled) {
					scrollByStep(direction, resolvedAxis);
				}
			}}
			type={asChild ? undefined : (type ?? "button")}
		>
			{children ?? (direction === "start" ? "Previous" : "Next")}
		</Comp>
	);
}

function ScrollFramePrevious(props: ScrollFrameMovementControlProps) {
	return <ScrollFrameMovementControl {...props} direction="start" />;
}

function ScrollFrameNext(props: ScrollFrameMovementControlProps) {
	return <ScrollFrameMovementControl {...props} direction="end" />;
}

const ScrollFrameScrollbar = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<typeof RadixScrollArea.Scrollbar>
>(function ScrollFrameScrollbar({ className, orientation, ...props }, ref) {
	const { axes, scrollbars } = useScrollFrame();
	const resolvedOrientation =
		orientation ?? (axes === "horizontal" ? "horizontal" : "vertical");
	return (
		<RadixScrollArea.Scrollbar
			{...props}
			className={joinClasses("howells-scroll-frame__scrollbar", className)}
			data-hidden={scrollbars === "hidden" ? "true" : undefined}
			data-slot="scroll-frame-scrollbar"
			orientation={resolvedOrientation}
			ref={ref}
		/>
	);
});

const ScrollFrameThumb = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<typeof RadixScrollArea.Thumb>
>(function ScrollFrameThumb({ className, ...props }, ref) {
	return (
		<RadixScrollArea.Thumb
			{...props}
			className={joinClasses("howells-scroll-frame__thumb", className)}
			data-slot="scroll-frame-thumb"
			ref={ref}
		/>
	);
});

const ScrollFrameCorner = RadixScrollArea.Corner;

const ScrollFrameBase = forwardRef<HTMLDivElement, ScrollFrameProps>(
	function ScrollFrame(
		{
			axes = "vertical",
			children,
			contentClassName,
			contentStyle,
			controls = false,
			controlVisibility,
			fades = true,
			scrollbars = "auto",
			viewportClassName,
			viewportRef,
			viewportStyle,
			...props
		},
		ref,
	) {
		const controlConfig = typeof controls === "object" ? controls : {};
		const controlsEnabled = controls !== false;
		const controlAxis = controlConfig.axis ?? defaultControlAxis(axes);
		const visibility =
			controlConfig.visibility ??
			controlVisibility ??
			(controlsEnabled ? "auto" : "hidden");
		const fadeAxes: ScrollFrameAxis[] =
			axes === "both" ? ["vertical", "horizontal"] : [axes];

		return (
			<ScrollFrameRoot
				{...props}
				axes={axes}
				controlVisibility={visibility}
				ref={ref}
				scrollbars={scrollbars}
			>
				{controlsEnabled ? (
					<ScrollFramePrevious axis={controlAxis} visibility={visibility} />
				) : null}
				<ScrollFrameViewport
					className={viewportClassName}
					contentClassName={contentClassName}
					contentStyle={contentStyle}
					style={viewportStyle}
					viewportRef={viewportRef}
				>
					{children}
				</ScrollFrameViewport>
				{fadeAxes.map((axis) =>
					(["start", "end"] as const).map((edge) =>
						shouldRenderFade(fades, axis, edge) ? (
							<ScrollFrameFade
								axis={axis}
								edge={edge}
								key={`${axis}-${edge}`}
							/>
						) : null,
					),
				)}
				{supportsAxis(axes, "vertical") ? (
					<ScrollFrameScrollbar orientation="vertical">
						<ScrollFrameThumb />
					</ScrollFrameScrollbar>
				) : null}
				{supportsAxis(axes, "horizontal") ? (
					<ScrollFrameScrollbar orientation="horizontal">
						<ScrollFrameThumb />
					</ScrollFrameScrollbar>
				) : null}
				{axes === "both" ? <ScrollFrameCorner /> : null}
				{controlsEnabled ? (
					<ScrollFrameNext axis={controlAxis} visibility={visibility} />
				) : null}
			</ScrollFrameRoot>
		);
	},
);

export const ScrollFrame = Object.assign(ScrollFrameBase, {
	Corner: ScrollFrameCorner,
	Fade: ScrollFrameFade,
	Next: ScrollFrameNext,
	Previous: ScrollFramePrevious,
	Root: ScrollFrameRoot,
	Scrollbar: ScrollFrameScrollbar,
	Thumb: ScrollFrameThumb,
	Viewport: ScrollFrameViewport,
});
