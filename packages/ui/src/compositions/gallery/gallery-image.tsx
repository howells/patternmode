"use client";

import { durations } from "@patternmode/motion/durations";
import { cn } from "@patternmode/ui/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { ImageSkeleton } from "./image-skeleton";

interface ImageRenderProps {
  /** Additional className */
  className?: string;
  /** Image source URL */
  src: string;
}

interface GalleryImageProps {
  /**
   * Render function that receives props to spread onto your image component.
   * Must pass `src` and `className` to the rendered image surface.
   */
  children: (props: ImageRenderProps) => ReactNode;
  /** Additional className for the image */
  className?: string;
  /** Current image source URL */
  src: string;
}

/**
 * Gallery image that handles variant changes with crossfade.
 * Shows old image + shimmer while new image loads, then crossfades.
 *
 * Framework-agnostic: uses a render prop to let you provide any image component.
 *
 * @example
 * ```tsx
 * // With next/image
 * <GalleryImage src={currentImageUrl}>
 *   {(props) => (
 *     <Image
 *       alt="Product"
 *       className={props.className}
 *       fill
 *       sizes="50vw"
 *       src={props.src}
 *     />
 *   )}
 * </GalleryImage>
 *
 * // With a background image surface
 * <GalleryImage src={currentImageUrl}>
 *   {(props) => (
 *     <div
 *       aria-label="Product"
 *       className={props.className}
 *       role="img"
 *       style={{ backgroundImage: `url(${props.src})` }}
 *     />
 *   )}
 * </GalleryImage>
 * ```
 */
export function GalleryImage({ src, children, className }: GalleryImageProps) {
  // Track previous and current src for crossfade
  const [currentSrc, setCurrentSrc] = useState(src);
  const [previousSrc, setPreviousSrc] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [newImageLoaded, setNewImageLoaded] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const initialLoadRef = useRef(true);

  useEffect(() => {
    let active = true;

    const image = new window.Image();
    image.onload = () => {
      if (!active) {
        return;
      }

      if (initialLoadRef.current) {
        setInitialLoaded(true);
        return;
      }

      setNewImageLoaded(true);
      window.setTimeout(() => {
        if (!active) {
          return;
        }
        setIsTransitioning(false);
        setPreviousSrc(null);
      }, 50);
    };
    image.src = currentSrc;

    return () => {
      active = false;
      image.onload = null;
    };
  }, [currentSrc]);

  // Detect src change and start transition
  useEffect(() => {
    if (src !== currentSrc) {
      // Save current as previous for crossfade
      setPreviousSrc(currentSrc);
      setCurrentSrc(src);
      setIsTransitioning(true);
      setNewImageLoaded(false);
      initialLoadRef.current = false;
    }
  }, [src, currentSrc]);

  // Initial load - show loading state
  if (initialLoadRef.current) {
    if (initialLoaded) {
      initialLoadRef.current = false;
    }

    return (
      <>
        {children({
          src,
          className,
        })}
        <AnimatePresence>
          {!initialLoaded && (
            <motion.div
              animate={{ opacity: 1 }}
              className="absolute inset-0"
              exit={{ opacity: 0 }}
              initial={{ opacity: 1 }}
              transition={{ duration: durations.normal }}
            >
              <ImageSkeleton />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      {/* Previous image (stays visible during transition) */}
      {previousSrc &&
        isTransitioning &&
        children({
          src: previousSrc,
          className: cn(className, "z-0"),
        })}

      {/* Current/new image */}
      {children({
        src: currentSrc,
        className: cn(
          className,
          isTransitioning ? "z-10" : "z-0",
          isTransitioning && !newImageLoaded && "opacity-0",
        ),
      })}

      {/* Shimmer overlay during transition */}
      <AnimatePresence>
        {isTransitioning && !newImageLoaded && (
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-30"
            exit={{ opacity: 0 }}
            initial={{ opacity: 1 }}
            transition={{ duration: durations.normal }}
          >
            <ImageSkeleton />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
