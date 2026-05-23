"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
	type KeyboardEvent,
	useCallback,
	useId,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { flushSync } from "react-dom";

import { ApertoContent } from "../aperto-content";
import { ApertoDescription } from "../aperto-description";
import { ApertoGroupContext } from "../aperto-group-context";
import { ApertoOverlay } from "../aperto-overlay";
import { ApertoPortal } from "../aperto-portal";
import { ApertoRoot } from "../aperto-root";
import { ApertoTitle } from "../aperto-title";
import {
	ApertoExpandedMediaStage,
	type NavigationDirection,
} from "../expanded-media-stage";
import { getDescriptionProps, getMediaLabel } from "../media-rendering";
import {
	type ApertoMediaTransition,
	ApertoMediaTransitionClone,
	rectFromElement,
} from "../media-transition";
import { shouldIgnoreKeyboardNavigationTarget } from "./ApertoKeyboard";
import type { ApertoGroupProps } from "./ApertoTypes";

export function ApertoGroup({
	children,
	classNames,
	dismissible,
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
				dismissible={dismissible}
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
