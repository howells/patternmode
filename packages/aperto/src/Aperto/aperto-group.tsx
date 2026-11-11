"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLayoutEffect, useMemo, useReducer, useState } from "react";
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
import { rectFromElement, rectFromTrigger } from "../media-transition-utils";
import { getDescriptionProps, getMediaLabel } from "../media-utils";
import type {
  ApertoClassNames,
  ApertoMediaItem,
  NavigationMotionPresetName,
  RenderImage,
  RenderVideo,
} from "../types";
import {
  apertoGroupReducer,
  getFlight,
  getInitialGroupState,
  isPhaseOpen,
} from "./aperto-group-state";
import type { ApertoGroupAction, ApertoGroupPhase } from "./aperto-group-state";
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

const useThumbnailMap = () =>
  // oxlint-disable-next-line react-doctor/react-compiler-no-manual-memoization -- the map must keep one identity for the life of the group; the library build does not run React Compiler.
  useMemo(() => new Map<number, HTMLButtonElement>(), []);

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
  finalFocus,
  handleContentKeyDown,
  onMediaTransitionComplete,
  hasNavigation,
  index,
  mediaLength,
  navigationDirection,
  navigationMotion,
  phase,
  renderImage,
  renderVideo,
  setExpandedMediaNode,
  startClose,
  goToNext,
  goToPrevious,
}: {
  activeMedia: ApertoMediaItem | undefined;
  classNames: ApertoClassNames | undefined;
  expandedMediaStyle: ApertoExpandedMediaStyle | undefined;
  finalFocus: () => HTMLElement | null;
  goToNext: () => void;
  goToPrevious: () => void;
  handleContentKeyDown: ((event: KeyboardEvent<HTMLDivElement>) => void) | undefined;
  onMediaTransitionComplete: () => void;
  hasNavigation: boolean;
  index: number;
  mediaLength: number;
  navigationDirection: NavigationDirection;
  navigationMotion: NavigationMotionPresetName;
  phase: ApertoGroupPhase;
  renderImage: RenderImage | undefined;
  renderVideo: RenderVideo | undefined;
  setExpandedMediaNode: (node: HTMLDivElement | null) => void;
  startClose: () => void;
}) => {
  if (activeMedia === undefined) {
    return null;
  }

  const transitionPhase =
    phase.name === "opening" || phase.name === "closing" ? phase.name : undefined;

  return (
    <ApertoPortal>
      <ApertoOverlay className={classNames?.overlay} fadeOut={phase.name === "closing"} />
      <ApertoContent
        className={classNames?.content}
        data-aperto-transition={transitionPhase}
        finalFocus={finalFocus}
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
        <div data-slot="aperto-caption">
          <ApertoTitle>{activeMedia.title ?? getMediaLabel(activeMedia)}</ApertoTitle>
          {activeMedia.description === undefined || activeMedia.description === "" ? null : (
            <ApertoDescription>{activeMedia.description}</ApertoDescription>
          )}
          {hasNavigation ? (
            <div className={classNames?.counter} data-slot="aperto-counter">
              {index + 1} / {mediaLength}
            </div>
          ) : null}
        </div>
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
        onComplete={onMediaTransitionComplete}
        renderImage={renderImage}
        renderVideo={renderVideo}
        transition={getFlight(phase)}
      />
    </ApertoPortal>
  );
};

const useApertoMediaLifecycle = ({
  activeMedia,
  dispatch,
  index,
  media,
  phase,
  selectIndex,
}: {
  activeMedia: ApertoMediaItem | undefined;
  dispatch: ApertoGroupDispatch;
  index: number;
  media: ApertoMediaItem[];
  phase: ApertoGroupPhase;
  selectIndex: (nextIndex: number) => void;
}) => {
  // State, not a ref: the Expanded Media mounts a commit after the phase
  // changes, and measuring must re-run when it does.
  const [expandedMediaNode, setExpandedMediaNode] = useState<HTMLDivElement | null>(null);
  const thumbnailMap = useThumbnailMap();

  const registerThumbnail = (thumbIndex: number, node: HTMLButtonElement | null) => {
    if (node !== null) {
      thumbnailMap.set(thumbIndex, node);
      return;
    }
    thumbnailMap.delete(thumbIndex);
  };

  const isMeasuringOpeningTarget = phase.name === "opening" && phase.to === undefined;
  useLayoutEffect(() => {
    if (!isMeasuringOpeningTarget || expandedMediaNode === null) {
      return;
    }
    const rect = rectFromElement(expandedMediaNode);
    if (rect !== null) {
      dispatch({ rect, type: "measure-opening-target" });
    }
  }, [dispatch, expandedMediaNode, isMeasuringOpeningTarget]);

  const openAtIndex = (thumbIndex: number) => {
    // Fly from the media inside the trigger, not the whole card (see rectFromTrigger).
    const from = rectFromTrigger(thumbnailMap.get(thumbIndex) ?? null);
    const item = media[thumbIndex];
    const source = from === null || item === undefined ? null : { from, item };

    dispatch({ index: thumbIndex, source, type: "open-from-thumbnail" });
    selectIndex(thumbIndex);
  };

  const startClose = () => {
    const from = rectFromElement(expandedMediaNode);
    const to = rectFromTrigger(thumbnailMap.get(index) ?? null);
    const transition =
      activeMedia === undefined || from === null || to === null
        ? null
        : { from, item: activeMedia, to };

    dispatch({ transition, type: "start-close" });
  };

  // Focus Return target for Base UI's `finalFocus`: the Thumbnail that opened
  // the Media Transition, falling back to the active thumbnail if it unmounted.
  // Base UI's FloatingFocusManager focuses the returned element with
  // `preventScroll: true`, matching the previous manual `onCloseAutoFocus`.
  const finalFocus = (): HTMLElement | null => {
    const openerThumbnail =
      phase.openerIndex === null ? undefined : thumbnailMap.get(phase.openerIndex);
    return openerThumbnail ?? thumbnailMap.get(index) ?? null;
  };

  return { finalFocus, openAtIndex, registerThumbnail, setExpandedMediaNode, startClose };
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
  const [state, dispatch] = useReducer(apertoGroupReducer, initialIndex, getInitialGroupState);
  const isControlled = controlledIndex !== undefined;
  const index = isControlled ? controlledIndex : state.internalIndex;
  const activeMedia = media[index] ?? media[0];

  const selectIndex = (nextIndex: number) => {
    if (!isControlled) {
      dispatch({ index: nextIndex, type: "set-index" });
    }
    onIndexChange?.(nextIndex);
  };

  const lifecycle = useApertoMediaLifecycle({
    activeMedia,
    dispatch,
    index,
    media,
    phase: state.phase,
    selectIndex,
  });

  const handleMediaTransitionComplete = () => {
    dispatch({ type: "finish-transition" });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      dispatch({ index, type: "open" });
      return;
    }

    lifecycle.startClose();
  };

  const value = {
    classNames,
    index,
    media,
    openAtIndex: lifecycle.openAtIndex,
    registerThumbnail: lifecycle.registerThumbnail,
    renderImage,
    renderVideo,
  };
  const hasNavigation = media.length > 1;
  const navigateToIndex = (nextIndex: number, direction: NavigationDirection) => {
    dispatch({ direction, type: "navigate" });
    selectIndex(nextIndex);
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
    finalFocus: lifecycle.finalFocus,
    goToNext,
    goToPrevious,
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
        open={isPhaseOpen(controller.state.phase)}
      >
        {children}
        <ApertoGroupPortal
          activeMedia={controller.activeMedia}
          classNames={classNames}
          expandedMediaStyle={controller.expandedMediaStyle}
          finalFocus={controller.finalFocus}
          goToNext={controller.goToNext}
          goToPrevious={controller.goToPrevious}
          handleContentKeyDown={
            controller.hasNavigation ? controller.handleContentKeyDown : undefined
          }
          onMediaTransitionComplete={controller.handleMediaTransitionComplete}
          hasNavigation={controller.hasNavigation}
          index={controller.index}
          mediaLength={media.length}
          navigationDirection={controller.state.navigationDirection}
          navigationMotion={navigationMotion}
          phase={controller.state.phase}
          renderImage={renderImage}
          renderVideo={renderVideo}
          setExpandedMediaNode={controller.setExpandedMediaNode}
          startClose={controller.startClose}
        />
      </ApertoRoot>
    </ApertoGroupContext.Provider>
  );
};
