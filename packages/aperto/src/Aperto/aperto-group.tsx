"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useId, useLayoutEffect, useReducer, useRef } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

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
import { getDescriptionProps, getMediaLabel } from "../media-utils";
import type { ApertoClassNames } from "../types";
import { apertoGroupReducer, getInitialGroupState } from "./aperto-group-state";
import { shouldIgnoreKeyboardNavigationTarget } from "./aperto-keyboard";
import type { ApertoGroupProps } from "./aperto-types";

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

export const ApertoGroup = ({
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
}: ApertoGroupProps) => {
  const generatedId = useId();
  const [state, dispatch] = useReducer(apertoGroupReducer, initialIndex, getInitialGroupState);
  const isControlled = controlledIndex !== undefined;
  const index = isControlled ? controlledIndex : state.internalIndex;
  const activeMedia = media[index] ?? media[0];
  const expandedMediaRef = useRef<HTMLDivElement | null>(null);
  const thumbnailRefs = useRef<Map<number, HTMLButtonElement> | null>(null);
  if (thumbnailRefs.current === null) {
    thumbnailRefs.current = new Map();
  }
  const thumbnailMap = thumbnailRefs.current;
  const sharedLayoutIdForIndex = (nextIndex: number) =>
    `aperto-group-${generatedId}-${nextIndex}-shared`;
  const sharedLayoutId = sharedLayoutIdForIndex(state.layoutSourceIndex);
  const setExpandedMediaNode = (node: HTMLDivElement | null) => {
    expandedMediaRef.current = node;
    if (node) {
      const targetRect = rectFromElement(node);
      if (targetRect) {
        dispatch({ rect: targetRect, type: "complete-opening-target" });
      }
    }
  };

  const registerThumbnail = (thumbIndex: number, node: HTMLButtonElement | null) => {
    if (node) {
      thumbnailMap.set(thumbIndex, node);
      return;
    }
    thumbnailMap.delete(thumbIndex);
  };

  useLayoutEffect(() => {
    if (
      state.mediaTransition?.phase !== "opening" ||
      state.mediaTransition.to ||
      !expandedMediaRef.current
    ) {
      return;
    }

    const targetRect = rectFromElement(expandedMediaRef.current);
    if (targetRect) {
      dispatch({ rect: targetRect, type: "complete-opening-target" });
    }
  }, [state.mediaTransition]);

  const setIndex = (nextIndex: number) => {
    if (!isControlled) {
      dispatch({ index: nextIndex, type: "set-index" });
    }
    onIndexChange?.(nextIndex);
  };

  const openAtIndex = (thumbIndex: number) => {
    const sourceRect = rectFromElement(thumbnailMap.get(thumbIndex) ?? null);
    const item = media[thumbIndex];
    const transition =
      sourceRect && item ? { from: sourceRect, item, phase: "opening" as const } : null;

    dispatch({ index: thumbIndex, transition, type: "open-at-index" });
    onIndexChange?.(thumbIndex);
  };

  const startClose = () => {
    if (!state.open || state.closing) {
      return;
    }

    const sourceRect = rectFromElement(expandedMediaRef.current);
    const targetRect = rectFromElement(thumbnailMap.get(index) ?? null);

    if (!activeMedia || !sourceRect || !targetRect) {
      dispatch({ type: "close-without-transition" });
      return;
    }

    dispatch({
      transition: {
        from: sourceRect,
        item: activeMedia,
        phase: "closing",
        to: targetRect,
      },
      type: "start-close",
    });
  };

  const handleCloseAutoFocus = (event: Event) => {
    event.preventDefault();
    thumbnailMap.get(index)?.focus({ preventScroll: true });
  };

  const handleMediaTransitionComplete = () => {
    dispatch({ type: "finish-transition" });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      dispatch({ open: true, type: "set-open" });
      return;
    }

    startClose();
  };

  const value = {
    classNames,
    index,
    media,
    open: state.open,
    openAtIndex,
    registerThumbnail,
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
  const expandedMediaStyle = ((): CSSProperties | undefined => {
    if (!activeMedia?.width || !activeMedia.height) {
      return undefined;
    }

    return {
      "--aperto-expanded-aspect-ratio": `${activeMedia.width} / ${activeMedia.height}`,
      "--aperto-expanded-aspect-ratio-height": activeMedia.height,
      "--aperto-expanded-aspect-ratio-width": activeMedia.width,
    } as CSSProperties;
  })();

  return (
    <ApertoGroupContext.Provider value={value}>
      <ApertoRoot
        dismissible={dismissible}
        motion={motionProp}
        onOpenChange={handleOpenChange}
        open={state.open}
      >
        {children}
        {activeMedia ? (
          <ApertoPortal>
            <ApertoOverlay className={classNames?.overlay} fadeOut={state.closing} />
            <ApertoContent
              className={classNames?.content}
              data-aperto-transition={state.mediaTransition?.phase}
              onCloseAutoFocus={handleCloseAutoFocus}
              onKeyDown={hasNavigation ? handleContentKeyDown : undefined}
              sharedLayoutId={false}
              {...getDescriptionProps(activeMedia)}
            >
              <div data-slot="aperto-media" ref={setExpandedMediaNode} style={expandedMediaStyle}>
                <ApertoExpandedMediaStage
                  direction={state.navigationDirection}
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
              renderImage={renderImage}
              renderVideo={renderVideo}
              transition={state.mediaTransition}
            />
          </ApertoPortal>
        ) : null}
      </ApertoRoot>
    </ApertoGroupContext.Provider>
  );
};
