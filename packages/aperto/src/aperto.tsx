"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
	AnimatePresence,
	motion,
	type TargetAndTransition,
	type Transition,
} from "motion/react";
import {
	createContext,
	type KeyboardEvent,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useId,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { flushSync } from "react-dom";

import { ApertoClose } from "./aperto-close";
import { ApertoContent } from "./aperto-content";
import { ApertoDescription } from "./aperto-description";
import { ApertoOverlay } from "./aperto-overlay";
import { ApertoPortal } from "./aperto-portal";
import { ApertoRoot } from "./aperto-root";
import { ApertoTitle } from "./aperto-title";
import { ApertoTrigger } from "./aperto-trigger";
import { useApertoContext } from "./context";
import type {
	ApertoClassNames,
	ApertoMediaItem,
	MotionPresetName,
	MotionVariants,
	NavigationMotionPresetName,
	RenderImage,
	RenderVideo,
} from "./types";

export interface ApertoProps {
	classNames?: ApertoClassNames;
	media: ApertoMediaItem;
	renderImage?: RenderImage;
	renderVideo?: RenderVideo;
}

export interface ApertoGroupProps {
	children: ReactNode;
	classNames?: ApertoClassNames;
	index?: number;
	initialIndex?: number;
	media: ApertoMediaItem[];
	/** Motion preset for open/close transitions */
	motion?: MotionPresetName | MotionVariants;
	navigationMotion?: NavigationMotionPresetName;
	onIndexChange?: (index: number) => void;
	renderImage?: RenderImage;
	renderVideo?: RenderVideo;
}

export interface ApertoThumbnailProps {
	children?: ReactNode;
	className?: string;
	index: number;
}

interface ApertoGroupContextValue {
	classNames?: ApertoClassNames;
	index: number;
	media: ApertoMediaItem[];
	open: boolean;
	openAtIndex: (index: number) => void;
	registerThumbnail: (index: number, node: HTMLButtonElement | null) => void;
	renderImage?: RenderImage;
	renderVideo?: RenderVideo;
	setIndex: (index: number) => void;
	sharedLayoutId: string;
	sharedLayoutIdForIndex: (index: number) => string;
}

const ApertoGroupContext = createContext<ApertoGroupContextValue | null>(null);

interface ApertoRect {
	height: number;
	left: number;
	top: number;
	width: number;
}

interface ApertoMediaTransition {
	from: ApertoRect;
	item: ApertoMediaItem;
	phase: "opening" | "closing";
	to?: ApertoRect;
}

type NavigationDirection = -1 | 0 | 1;

interface NavigationMotionPreset {
	offset: number;
	scale: number;
	transition: Transition;
}

interface NavigationAnimationCustom {
	direction: NavigationDirection;
	offset: number;
	scale: number;
}

const NAVIGATION_MOTION_PRESETS: Record<
	NavigationMotionPresetName,
	NavigationMotionPreset
> = {
	float: {
		offset: 96,
		scale: 0.97,
		transition: {
			opacity: { duration: 0.34, ease: [0.45, 0, 0.2, 1] },
			scale: { damping: 26, mass: 1.15, stiffness: 80, type: "spring" },
			x: { damping: 26, mass: 1.15, stiffness: 80, type: "spring" },
		},
	},
	glide: {
		offset: 58,
		scale: 0.984,
		transition: {
			opacity: { duration: 0.24, ease: [0.4, 0, 0.2, 1] },
			scale: { damping: 28, mass: 0.95, stiffness: 150, type: "spring" },
			x: { damping: 28, mass: 0.95, stiffness: 150, type: "spring" },
		},
	},
	snap: {
		offset: 38,
		scale: 0.996,
		transition: {
			opacity: { duration: 0.12, ease: [0.2, 0, 0, 1] },
			scale: { damping: 34, mass: 0.7, stiffness: 420, type: "spring" },
			x: { damping: 34, mass: 0.7, stiffness: 420, type: "spring" },
		},
	},
};

const REDUCED_EXPANDED_MEDIA_TRANSITION: Transition = {
	duration: 0.12,
	ease: "linear",
};

const expandedMediaVariants = {
	center: {
		opacity: 1,
		scale: 1,
		x: 0,
	},
	enter: ({
		direction,
		offset,
		scale,
	}: NavigationAnimationCustom): TargetAndTransition => ({
		opacity: 0,
		scale: direction === 0 ? 1 : scale,
		x: direction * offset,
	}),
	exit: ({
		direction,
		offset,
		scale,
	}: NavigationAnimationCustom): TargetAndTransition => ({
		opacity: 0,
		scale: direction === 0 ? 1 : scale,
		x: direction * -offset,
	}),
};

const reducedExpandedMediaVariants = {
	center: {
		opacity: 1,
		x: 0,
	},
	enter: {
		opacity: 0,
		x: 0,
	},
	exit: {
		opacity: 0,
		x: 0,
	},
};

function useApertoGroup(): ApertoGroupContextValue {
	const ctx = useContext(ApertoGroupContext);
	if (!ctx) {
		throw new Error("Aperto.Thumbnail must be used within <Aperto.Group>");
	}
	return ctx;
}

function getMediaLabel(item: ApertoMediaItem): string {
	return item.title ?? item.alt ?? "media";
}

function getMediaKey(item: ApertoMediaItem, index: number): string {
	return item.id ?? `${item.type}:${item.src}:${index}`;
}

function getDescriptionProps(item: ApertoMediaItem): {
	"aria-describedby"?: undefined;
} {
	return item.description ? {} : { "aria-describedby": undefined };
}

function shouldIgnoreKeyboardNavigationTarget(
	target: EventTarget | null,
): boolean {
	if (!(target instanceof Element)) {
		return false;
	}

	return (
		(target as HTMLElement).isContentEditable ||
		Boolean(
			target.closest(
				'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], audio, video',
			),
		)
	);
}

function rectFromElement(element: Element | null): ApertoRect | null {
	if (!element) {
		return null;
	}

	const rect = element.getBoundingClientRect();
	return {
		height: rect.height,
		left: rect.left,
		top: rect.top,
		width: rect.width,
	};
}

function rectTarget(rect: ApertoRect): TargetAndTransition {
	return {
		height: rect.height,
		left: rect.left,
		top: rect.top,
		width: rect.width,
	};
}

function transitionDurationMs(transition: Transition): number {
	return typeof transition.duration === "number"
		? transition.duration * 1000
		: 450;
}

function renderDefaultImage(props: Parameters<RenderImage>[0]): ReactNode {
	const { item: _item, variant: _variant, ...imageProps } = props;
	return <img {...imageProps} alt={imageProps.alt ?? ""} />;
}

function renderDefaultVideo(props: Parameters<RenderVideo>[0]): ReactNode {
	const { item: _item, variant, ...videoProps } = props;
	if (variant === "thumbnail") {
		return (
			<img alt={videoProps["aria-label"] ?? ""} src={props.item.thumbnailSrc} />
		);
	}
	return <video {...videoProps} />;
}

function renderThumbnail(
	item: ApertoMediaItem,
	renderImage?: RenderImage,
	renderVideo?: RenderVideo,
): ReactNode {
	if (item.type === "image") {
		const imageProps: Parameters<RenderImage>[0] = {
			alt: "",
			height: item.height,
			item,
			src: item.thumbnailSrc ?? item.src,
			variant: "thumbnail",
			width: item.width,
		};
		return (renderImage ?? renderDefaultImage)(imageProps);
	}

	const videoProps: Parameters<RenderVideo>[0] = {
		"aria-label": item.alt ?? item.title ?? "Video thumbnail",
		height: item.height,
		item,
		poster: item.poster,
		src: item.thumbnailSrc,
		variant: "thumbnail",
		width: item.width,
	};
	return (renderVideo ?? renderDefaultVideo)(videoProps);
}

function renderExpandedMedia(
	item: ApertoMediaItem,
	renderImage?: RenderImage,
	renderVideo?: RenderVideo,
): ReactNode {
	if (item.type === "image") {
		const imageProps: Parameters<RenderImage>[0] = {
			alt: item.alt,
			height: item.height,
			item,
			src: item.src,
			variant: "expanded",
			width: item.width,
		};
		return (renderImage ?? renderDefaultImage)(imageProps);
	}

	const videoProps: Parameters<RenderVideo>[0] = {
		"aria-label": item.alt ?? item.title ?? "Video",
		controls: true,
		height: item.height,
		item,
		poster: item.poster,
		src: item.src,
		variant: "expanded",
		width: item.width,
	};
	return (renderVideo ?? renderDefaultVideo)(videoProps);
}

function renderTransitionMedia(item: ApertoMediaItem): ReactNode {
	if (item.type === "image") {
		return <img alt="" src={item.src} />;
	}

	return <img alt="" src={item.poster ?? item.thumbnailSrc} />;
}

function ApertoMediaTransitionClone({
	onComplete,
	transition,
}: {
	onComplete: () => void;
	transition: ApertoMediaTransition | null;
}) {
	const ctx = useApertoContext();

	useEffect(() => {
		if (!transition?.to) {
			return;
		}

		const timer = setTimeout(
			onComplete,
			transitionDurationMs(ctx.preset.transition),
		);
		return () => clearTimeout(timer);
	}, [ctx.preset.transition, onComplete, transition]);

	if (!transition?.to) {
		return null;
	}

	return (
		<motion.div
			animate={rectTarget(transition.to)}
			data-slot="aperto-transition-media"
			initial={rectTarget(transition.from)}
			style={{
				borderRadius: "var(--aperto-radius, 0.5rem)",
				overflow: "hidden",
				pointerEvents: "none",
				position: "fixed",
				willChange: "left, top, width, height",
				zIndex: 1002,
			}}
			transition={ctx.preset.transition}
		>
			{renderTransitionMedia(transition.item)}
		</motion.div>
	);
}

function ApertoExpandedMediaStage({
	direction,
	index,
	item,
	navigationMotion,
	renderImage,
	renderVideo,
}: {
	direction: NavigationDirection;
	index: number;
	item: ApertoMediaItem;
	navigationMotion: NavigationMotionPresetName;
	renderImage?: RenderImage;
	renderVideo?: RenderVideo;
}) {
	const ctx = useApertoContext();
	const preset = NAVIGATION_MOTION_PRESETS[navigationMotion];
	const transition = ctx.reduceMotion
		? REDUCED_EXPANDED_MEDIA_TRANSITION
		: preset.transition;
	const variants = ctx.reduceMotion
		? reducedExpandedMediaVariants
		: expandedMediaVariants;
	const animationCustom: NavigationAnimationCustom = {
		direction,
		offset: preset.offset,
		scale: preset.scale,
	};

	return (
		<AnimatePresence custom={animationCustom} initial={false} mode="sync">
			<motion.div
				animate="center"
				custom={animationCustom}
				data-navigation-direction={direction}
				data-navigation-motion={navigationMotion}
				data-slot="aperto-media-stage"
				exit="exit"
				initial="enter"
				key={getMediaKey(item, index)}
				transition={transition}
				variants={variants}
			>
				{renderExpandedMedia(item, renderImage, renderVideo)}
			</motion.div>
		</AnimatePresence>
	);
}

function ApertoSingle({
	classNames,
	media,
	renderImage,
	renderVideo,
}: ApertoProps) {
	const label = getMediaLabel(media);
	const title = media.title ?? label;

	return (
		<ApertoRoot>
			<ApertoTrigger
				aria-label={`Open ${label}`}
				className={classNames?.thumbnail}
			>
				{renderThumbnail(media, renderImage, renderVideo)}
			</ApertoTrigger>
			<ApertoPortal>
				<ApertoOverlay className={classNames?.overlay} />
				<ApertoContent
					className={classNames?.content}
					{...getDescriptionProps(media)}
				>
					{renderExpandedMedia(media, renderImage, renderVideo)}
					<ApertoTitle>{title}</ApertoTitle>
					{media.description ? (
						<ApertoDescription>{media.description}</ApertoDescription>
					) : null}
					<ApertoClose
						aria-label="Close"
						className={classNames?.closeButton}
						type="button"
					/>
				</ApertoContent>
			</ApertoPortal>
		</ApertoRoot>
	);
}

function ApertoGroup({
	children,
	classNames,
	index: controlledIndex,
	initialIndex = 0,
	media,
	motion: motionProp,
	navigationMotion = "glide",
	onIndexChange,
	renderImage,
	renderVideo,
}: ApertoGroupProps) {
	const generatedId = useId();
	const [internalIndex, setInternalIndex] = useState(initialIndex);
	const [open, setOpen] = useState(false);
	const [closing, setClosing] = useState(false);
	const [mediaTransition, setMediaTransition] =
		useState<ApertoMediaTransition | null>(null);
	const [navigationDirection, setNavigationDirection] =
		useState<NavigationDirection>(0);
	const isControlled = controlledIndex !== undefined;
	const index = isControlled ? controlledIndex : internalIndex;
	const activeMedia = media[index] ?? media[0];
	const [layoutSourceIndex, setLayoutSourceIndex] = useState(index);
	const expandedMediaRef = useRef<HTMLDivElement | null>(null);
	const thumbnailRefs = useRef(new Map<number, HTMLButtonElement>());
	const sharedLayoutIdForIndex = useCallback(
		(nextIndex: number) => `aperto-group-${generatedId}-${nextIndex}-shared`,
		[generatedId],
	);
	const sharedLayoutId = sharedLayoutIdForIndex(layoutSourceIndex);
	const measureOpeningTarget = useCallback((node: HTMLDivElement) => {
		const targetRect = rectFromElement(node);
		if (!targetRect) {
			return;
		}

		setMediaTransition((current) => {
			if (current?.phase !== "opening" || current.to) {
				return current;
			}
			return { ...current, to: targetRect };
		});
	}, []);
	const setExpandedMediaNode = useCallback(
		(node: HTMLDivElement | null) => {
			expandedMediaRef.current = node;
			if (node) {
				measureOpeningTarget(node);
			}
		},
		[measureOpeningTarget],
	);

	const registerThumbnail = useCallback(
		(thumbIndex: number, node: HTMLButtonElement | null) => {
			if (node) {
				thumbnailRefs.current.set(thumbIndex, node);
				return;
			}
			thumbnailRefs.current.delete(thumbIndex);
		},
		[],
	);

	useLayoutEffect(() => {
		if (
			mediaTransition?.phase !== "opening" ||
			mediaTransition.to ||
			!expandedMediaRef.current
		) {
			return;
		}

		measureOpeningTarget(expandedMediaRef.current);
	}, [measureOpeningTarget, mediaTransition]);

	const setIndex = useCallback(
		(nextIndex: number) => {
			if (!isControlled) {
				setInternalIndex(nextIndex);
			}
			onIndexChange?.(nextIndex);
		},
		[isControlled, onIndexChange],
	);

	const openAtIndex = useCallback(
		(thumbIndex: number) => {
			const sourceRect = rectFromElement(
				thumbnailRefs.current.get(thumbIndex) ?? null,
			);
			const item = media[thumbIndex];

			flushSync(() => {
				setClosing(false);
				setMediaTransition(
					sourceRect && item
						? { from: sourceRect, item, phase: "opening" }
						: null,
				);
				setNavigationDirection(0);
				setLayoutSourceIndex(thumbIndex);
				setIndex(thumbIndex);
				setOpen(true);
			});
		},
		[media, setIndex],
	);

	const startClose = useCallback(() => {
		if (!open || closing) {
			return;
		}

		const sourceRect = rectFromElement(expandedMediaRef.current);
		const targetRect = rectFromElement(
			thumbnailRefs.current.get(index) ?? null,
		);

		if (!activeMedia || !sourceRect || !targetRect) {
			setMediaTransition(null);
			setClosing(false);
			setOpen(false);
			return;
		}

		flushSync(() => {
			setClosing(true);
			setMediaTransition({
				from: sourceRect,
				item: activeMedia,
				phase: "closing",
				to: targetRect,
			});
		});
	}, [activeMedia, closing, index, open]);

	const handleMediaTransitionComplete = useCallback(() => {
		if (mediaTransition?.phase === "closing") {
			setOpen(false);
			setClosing(false);
		}
		setMediaTransition(null);
	}, [mediaTransition?.phase]);

	const handleOpenChange = useCallback(
		(nextOpen: boolean) => {
			if (nextOpen) {
				setClosing(false);
				setOpen(true);
				return;
			}

			startClose();
		},
		[startClose],
	);

	const value = useMemo(
		() => ({
			classNames,
			index,
			media,
			open,
			openAtIndex,
			registerThumbnail,
			renderImage,
			renderVideo,
			setIndex,
			sharedLayoutId,
			sharedLayoutIdForIndex,
		}),
		[
			classNames,
			index,
			media,
			open,
			openAtIndex,
			registerThumbnail,
			renderImage,
			renderVideo,
			setIndex,
			sharedLayoutId,
			sharedLayoutIdForIndex,
		],
	);
	const hasNavigation = media.length > 1;
	const navigateToIndex = useCallback(
		(nextIndex: number, direction: NavigationDirection) => {
			setNavigationDirection(direction);
			setLayoutSourceIndex(nextIndex);
			setIndex(nextIndex);
		},
		[setIndex],
	);
	const goToPrevious = useCallback(() => {
		navigateToIndex((index - 1 + media.length) % media.length, -1);
	}, [index, media.length, navigateToIndex]);
	const goToNext = useCallback(() => {
		navigateToIndex((index + 1) % media.length, 1);
	}, [index, media.length, navigateToIndex]);
	const handleContentKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (
				event.defaultPrevented ||
				event.altKey ||
				event.ctrlKey ||
				event.metaKey ||
				shouldIgnoreKeyboardNavigationTarget(event.target)
			) {
				return;
			}

			if (event.key === "ArrowLeft") {
				event.preventDefault();
				goToPrevious();
			}

			if (event.key === "ArrowRight") {
				event.preventDefault();
				goToNext();
			}
		},
		[goToNext, goToPrevious],
	);

	return (
		<ApertoGroupContext.Provider value={value}>
			<ApertoRoot
				motion={motionProp}
				onOpenChange={handleOpenChange}
				open={open}
			>
				{children}
				{activeMedia ? (
					<ApertoPortal>
						<ApertoOverlay className={classNames?.overlay} fadeOut={closing} />
						<ApertoContent
							className={classNames?.content}
							data-aperto-transition={mediaTransition?.phase}
							onKeyDown={hasNavigation ? handleContentKeyDown : undefined}
							sharedLayoutId={false}
							{...getDescriptionProps(activeMedia)}
						>
							<div data-slot="aperto-media" ref={setExpandedMediaNode}>
								<ApertoExpandedMediaStage
									direction={navigationDirection}
									index={index}
									item={activeMedia}
									navigationMotion={navigationMotion}
									renderImage={renderImage}
									renderVideo={renderVideo}
								/>
								{hasNavigation ? (
									<>
										<button
											aria-label="Previous media"
											className={classNames?.previousButton}
											data-slot="aperto-previous-button"
											onClick={goToPrevious}
											type="button"
										>
											<ChevronLeft
												aria-hidden="true"
												size={18}
												strokeWidth={2}
											/>
										</button>
										<button
											aria-label="Next media"
											className={classNames?.nextButton}
											data-slot="aperto-next-button"
											onClick={goToNext}
											type="button"
										>
											<ChevronRight
												aria-hidden="true"
												size={18}
												strokeWidth={2}
											/>
										</button>
									</>
								) : null}
							</div>
							<ApertoTitle>
								{activeMedia.title ?? getMediaLabel(activeMedia)}
							</ApertoTitle>
							{activeMedia.description ? (
								<ApertoDescription>{activeMedia.description}</ApertoDescription>
							) : null}
							{hasNavigation ? (
								<div className={classNames?.counter} data-slot="aperto-counter">
									{index + 1} / {media.length}
								</div>
							) : null}
							<button
								aria-label="Close"
								className={classNames?.closeButton}
								data-slot="aperto-close"
								onClick={startClose}
								type="button"
							>
								<X aria-hidden="true" size={17} strokeWidth={2} />
							</button>
						</ApertoContent>
						<ApertoMediaTransitionClone
							onComplete={handleMediaTransitionComplete}
							transition={mediaTransition}
						/>
					</ApertoPortal>
				) : null}
			</ApertoRoot>
		</ApertoGroupContext.Provider>
	);
}

function ApertoThumbnail({ children, className, index }: ApertoThumbnailProps) {
	const group = useApertoGroup();
	const media = group.media[index];

	if (!media) {
		return null;
	}

	return (
		<ApertoTrigger
			active={group.index === index}
			aria-label={`Open ${getMediaLabel(media)}`}
			className={className ?? group.classNames?.thumbnail}
			onClick={() => group.openAtIndex(index)}
			ref={(node) => group.registerThumbnail(index, node)}
			sharedLayoutId={false}
		>
			{children ?? renderThumbnail(media, group.renderImage, group.renderVideo)}
		</ApertoTrigger>
	);
}

export { ApertoGroup, ApertoSingle, ApertoThumbnail };
