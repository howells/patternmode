"use client";

import { durations } from "@patternmode/motion/durations";
import { cn } from "@patternmode/ui/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  useState,
} from "react";
import { ImageSkeleton } from "./image-skeleton";

interface LoadingImageProps {
  /** The image element to render (e.g., next/image, native img) */
  children: ReactElement<{
    onLoad?: () => void;
    className?: string;
  }>;
  /** Additional className for the image */
  className?: string;
}

/**
 * Image wrapper with loading state - shows shimmer while loading.
 *
 * Framework-agnostic: accepts any image element as children.
 * The child must support `onLoad` and `className` props.
 *
 * @example
 * ```tsx
 * // With next/image
 * <LoadingImage>
 *   <Image src={url} alt="..." fill sizes="256px" />
 * </LoadingImage>
 *
 * // With native img
 * <LoadingImage>
 *   <img src={url} alt="..." className="size-full object-cover" />
 * </LoadingImage>
 * ```
 */
export function LoadingImage({ children, className }: LoadingImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const child = Children.only(children);

  if (!isValidElement(child)) {
    return null;
  }

  // Clone the child with onLoad handler and merged className
  const clonedImage = cloneElement(child, {
    onLoad: () => {
      child.props.onLoad?.();
      setIsLoaded(true);
    },
    className: cn(child.props.className, className),
  });

  return (
    <>
      {clonedImage}
      <AnimatePresence>
        {!isLoaded && (
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
