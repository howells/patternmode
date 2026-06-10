"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useId, useLayoutEffect, useReducer, useRef } from "react";
import type { CSSProperties, Dispatch, KeyboardEvent } from "react";

import { ApertoContent } from "../aperto-content";
import { ApertoDescription } from "../aperto-description";
import { ApertoGroupContext } from "../aperto-group-context";
import { ApertoOverlay } from "../aperto-overlay";
import { ApertoPortal } from "../aperto-portal";
import { ApertoRoot } from "../aperto-root";
import { ApertoTitle } from "../aperto-title";
import { ApertoExpandedMediaStage } from "../expanded-media-stage";
import type { NavigationDirection } from "../expanded-media-stage";
import { ApertoMediaTransitionClone } from "../media-transition";
import { rectFromElement } from "../media-transition-utils";
import type { ApertoMediaTransition } from "../media-transition-utils";
import { getDescriptionProps, getMediaLabel } from "../media-utils";
import type {
  ApertoClassNames,
  ApertoMediaItem,
  NavigationMotionPresetName,
  RenderImage,
  RenderVideo,
} from "../types";
import { apertoGroupReducer, getInitialGroupState } from "./aperto-group-state";
import type { ApertoGroupAction, ApertoGroupState } from "./aperto-group-state";
import { shouldIgnoreKeyboardNavigationTarget } from "./aperto-keyboard";
import type { ApertoGroupProps } from "./aperto-types";

type ApertoExpandedMediaStyle = CSSProperties & {
  "--aperto-expanded-aspect-ratio"?: string;
  "--aperto-expanded-aspect-ratio-height"?: number;
  "--aperto-expanded-aspect-ratio-width"?: number;
};
type ApertoGroupDispatch = Dispatch<ApertoGroupAction>;

const ApertoMediaNavigationButtons = ({
  classNames,
  enabled,
  onNext,
  onPrevious,
}: {
  classNames: ApertoClassNames | undefined;
  enabled: boolean;
  onNext: () => void;
  onPrevious: () => void;
}) => {
  if (!enabled) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Previous media"
        className={classNames?.previousButton}
        data-slot="aperto-previous-button"
        onClick={onPrevious}
        type="button"
      >
        <ChevronLeft aria-hidden="true" size={18} strokeWidth={2} />
      </button>
      <button
        aria-label="Next media"
        className={classNames?.nextButton}
        data-slot="aperto-next-button"
        onClick={onNext}
        type="button"
      >
        <ChevronRight aria-hidden="true" size={18} strokeWidth={2} />
      </button>
    </>
  );
};

const useThumbnailMap = () => {
  const thumbnailRefs = useRef<Map<number, HTMLButtonElement> | null>(null);
  thumbnailRefs.current ??= new Map();
  return thumbnailRefs.current;
};

const getExpandedMediaStyle = (
  activeMedia: ApertoMediaItem | undefined,
): ApertoExpandedMediaStyle | undefined => {
  if (
    activeMedia === undefined ||
    activeMedia.width === undefined ||
    activeMedia.height === undefined
  ) {
    return undefined;
  }

  return {
    "--aperto-expanded-aspect-ratio": `${activeMedia.width} / ${activeMedia.height}`,
    "--aperto-expanded-aspect-ratio-height": activeMedia.height,
    "--aperto-expanded-aspect-ratio-width": activeMedia.width,
  };
};

const ApertoGroupPortal = ({
  activeMedia,
  classNames,
  expandedMediaStyle,
  handleCloseAutoFocus,
  handleContentKeyDown,
  handleMediaTransitionComplete,
  hasNavigation,
  index,
  mediaLength,
  navigationDirection,
  navigationMotion,
  renderImage,
  renderVideo,
  setExpandedMediaNode,
  startClose,
  transition,
  goToNext,
  goToPrevious,
}: {
  activeMedia: ApertoMediaItem | undefined;
  classNames: ApertoClassNames | undefined;
  expandedMediaStyle: ApertoExpandedMediaStyle | undefined;
  goToNext: () => void;
  goToPrevious: () => void;
  handleCloseAutoFocus: (event: Event) => void;
  handleContentKeyDown: ((event: KeyboardEvent<HTMLDivElement>) => void) | undefined;
  handleMediaTransitionComplete: () => void;
  hasNavigation: boolean;
  index: number;
  mediaLength: number;
  navigationDirection: NavigationDirection;
  navigationMotion: NavigationMotionPresetName;
  renderImage: RenderImage | undefined;
  renderVideo: RenderVideo | undefined;
  setExpandedMediaNode: (node: HTMLDivElement | null) => void;
  startClose: () => void;
  transition: ApertoMediaTransition | null;
}) => {
  if (activeMedia === undefined) {
    return null;
  }

  return (
    <ApertoPortal>
      <ApertoOverlay className={classNames?.overlay} fadeOut={transition?.phase === "closing"} />
      <ApertoContent
        className={classNames?.content}
        data-aperto-transition={transition?.phase}
        onCloseAutoFocus={handleCloseAutoFocus}
        onKeyDown={handleContentKeyDown}
        sharedLayoutId={false}
        {...getDescriptionProps(activeMedia)}
      >
        <div data-slot="aperto-media" ref={setExpandedMediaNode} style={expandedMediaStyle}>
          <ApertoExpandedMediaStage
            direction={navigationDirection}
            index={index}
            item={activeMedia}
            navigationMotion={navigationMotion}
            renderImage={renderImage}
            renderVideo={renderVideo}
          />
          <ApertoMediaNavigationButtons
            classNames={classNames}
            enabled={hasNavigation}
            onNext={goToNext}
            onPrevious={goToPrevious}
          />
        </div>
        <ApertoTitle>{activeMedia.title ?? getMediaLabel(activeMedia)}</ApertoTitle>
        {activeMedia.description === undefined || activeMedia.description === "" ? null : (
          <ApertoDescription>{activeMedia.description}</ApertoDescription>
        )}
        {hasNavigation ? (
          <div className={classNames?.counter} data-slot="aperto-counter">
            {index + 1} / {mediaLength}
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
        renderImage={renderImage}
        renderVideo={renderVideo}
        transition={transition}
      />
    </ApertoPortal>
  );
};

const useApertoMediaLifecycle = ({
  activeMedia,
  dispatch,
  index,
  media,
  onIndexChange,
  state,
}: {
  activeMedia: ApertoMediaItem | undefined;
  dispatch: ApertoGroupDispatch;
  index: number;
  media: ApertoMediaItem[];
  onIndexChange: ApertoGroupProps["onIndexChange"];
  state: ApertoGroupState;
}) => {
  const expandedMediaRef = useRef<HTMLDivElement | null>(null);
  const thumbnailMap = useThumbnailMap();

  const setExpandedMediaNode = (node: HTMLDivElement | null) => {
    expandedMediaRef.current = node;
    if (node === null) {
      return;
    }
    const targetRect = rectFromElement(node);
    if (targetRect !== null) {
      dispatch({ rect: targetRect, type: "complete-opening-target" });
    }
  };

  const registerThumbnail = (thumbIndex: number, node: HTMLButtonElement | null) => {
    if (node !== null) {
      thumbnailMap.set(thumbIndex, node);
      return;
    }
    thumbnailMap.delete(thumbIndex);
  };

  useLayoutEffect(() => {
    if (
      state.mediaTransition?.phase !== "opening" ||
      state.mediaTransition.to !== undefined ||
      expandedMediaRef.current === null
    ) {
      return;
    }

    const targetRect = rectFromElement(expandedMediaRef.current);
    if (targetRect !== null) {
      dispatch({ rect: targetRect, type: "complete-opening-target" });
    }
  }, [dispatch, state.mediaTransition]);

  const openAtIndex = (thumbIndex: number) => {
    const sourceRect = rectFromElement(thumbnailMap.get(thumbIndex) ?? null);
    const item = media[thumbIndex] ?? null;
    const transition =
      sourceRect === null || item === null
        ? null
        : { from: sourceRect, item, phase: "opening" as const };

    dispatch({ index: thumbIndex, transition, type: "open-at-index" });
    onIndexChange?.(thumbIndex);
  };

  const startClose = () => {
    if (!state.open || state.closing) {
      return;
    }

    const sourceRect = rectFromElement(expandedMediaRef.current);
    const targetRect = rectFromElement(thumbnailMap.get(index) ?? null);
    if (activeMedia === undefined || sourceRect === null || targetRect === null) {
      dispatch({ type: "close-without-transition" });
      return;
    }

    dispatch({
      transition: { from: sourceRect, item: activeMedia, phase: "closing", to: targetRect },
      type: "start-close",
    });
  };

  const handleCloseAutoFocus = (event: Event) => {
    event.preventDefault();
    thumbnailMap.get(index)?.focus({ preventScroll: true });
  };

  return { handleCloseAutoFocus, openAtIndex, registerThumbnail, setExpandedMediaNode, startClose };
};

const useApertoGroupController = ({
  classNames,
  index: controlledIndex,
  initialIndex = 0,
  media,
  onIndexChange,
  renderImage,
  renderVideo,
}: Omit<ApertoGroupProps, "children" | "dismissible" | "motion" | "navigationMotion">) => {
  const generatedId = useId();
  const [state, dispatch] = useReducer(apertoGroupReducer, initialIndex, getInitialGroupState);
  const isControlled = controlledIndex !== undefined;
  const index = isControlled ? controlledIndex : state.internalIndex;
  const activeMedia = media[index] ?? media[0];
  const lifecycle = useApertoMediaLifecycle({
    activeMedia,
    dispatch,
    index,
    media,
    onIndexChange,
    state,
  });
  const sharedLayoutIdForIndex = (nextIndex: number) =>
    `aperto-group-${generatedId}-${nextIndex}-shared`;
  const sharedLayoutId = sharedLayoutIdForIndex(state.layoutSourceIndex);

  const setIndex = (nextIndex: number) => {
    if (!isControlled) {
      dispatch({ index: nextIndex, type: "set-index" });
    }
    onIndexChange?.(nextIndex);
  };

  const handleMediaTransitionComplete = () => {
    dispatch({ type: "finish-transition" });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      dispatch({ open: true, type: "set-open" });
      return;
    }

    lifecycle.startClose();
  };

  const value = {
    classNames,
    index,
    media,
    open: state.open,
    openAtIndex: lifecycle.openAtIndex,
    registerThumbnail: lifecycle.registerThumbnail,
    renderImage,
    renderVideo,
    setIndex,
    sharedLayoutId,
    sharedLayoutIdForIndex,
  };
  const hasNavigation = media.length > 1;
  const navigateToIndex = (nextIndex: number, direction: NavigationDirection) => {
    dispatch({ direction, index: nextIndex, type: "navigate" });
    onIndexChange?.(nextIndex);
  };
  const goToPrevious = () => {
    navigateToIndex((index - 1 + media.length) % media.length, -1);
  };
  const goToNext = () => {
    navigateToIndex((index + 1) % media.length, 1);
  };
  const handleContentKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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
  };
  const expandedMediaStyle = getExpandedMediaStyle(activeMedia);

  return {
    activeMedia,
    expandedMediaStyle,
    goToNext,
    goToPrevious,
    handleCloseAutoFocus: lifecycle.handleCloseAutoFocus,
    handleContentKeyDown,
    handleMediaTransitionComplete,
    handleOpenChange,
    hasNavigation,
    index,
    setExpandedMediaNode: lifecycle.setExpandedMediaNode,
    startClose: lifecycle.startClose,
    state,
    value,
  };
};

export const ApertoGroup = ({
  children,
  classNames,
  dismissible,
  index,
  initialIndex,
  media,
  motion: motionProp,
  navigationMotion = "glide",
  onIndexChange,
  renderImage,
  renderVideo,
}: ApertoGroupProps) => {
  const controller = useApertoGroupController({
    classNames,
    index,
    initialIndex,
    media,
    onIndexChange,
    renderImage,
    renderVideo,
  });

  return (
    <ApertoGroupContext.Provider value={controller.value}>
      <ApertoRoot
        dismissible={dismissible}
        motion={motionProp}
        onOpenChange={controller.handleOpenChange}
        open={controller.state.open}
      >
        {children}
        <ApertoGroupPortal
          activeMedia={controller.activeMedia}
          classNames={classNames}
          expandedMediaStyle={controller.expandedMediaStyle}
          goToNext={controller.goToNext}
          goToPrevious={controller.goToPrevious}
          handleCloseAutoFocus={controller.handleCloseAutoFocus}
          handleContentKeyDown={
            controller.hasNavigation ? controller.handleContentKeyDown : undefined
          }
          handleMediaTransitionComplete={controller.handleMediaTransitionComplete}
          hasNavigation={controller.hasNavigation}
          index={controller.index}
          mediaLength={media.length}
          navigationDirection={controller.state.navigationDirection}
          navigationMotion={navigationMotion}
          renderImage={renderImage}
          renderVideo={renderVideo}
          setExpandedMediaNode={controller.setExpandedMediaNode}
          startClose={controller.startClose}
          transition={controller.state.mediaTransition}
        />
      </ApertoRoot>
    </ApertoGroupContext.Provider>
  );
};
