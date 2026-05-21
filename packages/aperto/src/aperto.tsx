"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
	type KeyboardEvent,
	type ReactNode,
	useCallback,
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
import { ApertoGroupContext, useApertoGroup } from "./aperto-group-context";
import { ApertoOverlay } from "./aperto-overlay";
import { ApertoPortal } from "./aperto-portal";
import { ApertoRoot } from "./aperto-root";
import { ApertoTitle } from "./aperto-title";
import { ApertoTrigger } from "./aperto-trigger";
import {
	ApertoExpandedMediaStage,
	type NavigationDirection,
} from "./expanded-media-stage";
import {
	getDescriptionProps,
	getMediaLabel,
	renderExpandedMedia,
	renderThumbnail,
} from "./media-rendering";
import {
	type ApertoMediaTransition,
	ApertoMediaTransitionClone,
	rectFromElement,
} from "./media-transition";
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
