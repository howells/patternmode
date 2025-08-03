import { PreviewCard as BasePreviewCard } from "@base-ui-components/react/preview-card";
import React from "react";

import { cx } from "../../lib/utils";

type PreviewCardProps = React.ComponentPropsWithoutRef<typeof BasePreviewCard.Root>;

/**
 * Root preview card component for hover-triggered content previews.
 */
const PreviewCard = BasePreviewCard.Root;

type PreviewCardTriggerProps = {
  /**
   * Reference to the trigger element.
   */
  ref?: React.RefObject<React.ElementRef<typeof BasePreviewCard.Trigger> | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePreviewCard.Trigger>;

/**
 * Preview card trigger component that shows preview on hover with link-like styling.
 */
const PreviewCardTrigger = ({ ref, className, ...props }: PreviewCardTriggerProps) => (
  <BasePreviewCard.Trigger
    ref={ref}
    className={cx(
      // base
      "inline-flex items-center gap-1 text-blue-600 dark:text-blue-400",
      // decoration
      "no-underline decoration-blue-600/60 dark:decoration-blue-400/60 decoration-1 underline-offset-2",
      // focus
      "outline-none focus-visible:rounded-sm focus-visible:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2",
      // hover
      "hover:underline hover:decoration-blue-600 dark:hover:decoration-blue-400",
      // states
      "data-[popup-open]:underline data-[popup-open]:decoration-blue-600 dark:data-[popup-open]:decoration-blue-400",
      "data-[popup-open]:focus-visible:no-underline",
      // transitions
      "transition-all duration-200 ease-out",
      className,
    )}
    {...props}
  />
);

type PreviewCardPortalProps = React.ComponentPropsWithoutRef<typeof BasePreviewCard.Portal>;

/**
 * Portal component for rendering preview card content outside normal DOM flow.
 */
const PreviewCardPortal = BasePreviewCard.Portal;

type PreviewCardPositionerProps = {
  /**
   * Reference to the positioner element.
   */
  ref?: React.RefObject<React.ElementRef<typeof BasePreviewCard.Positioner> | null>;
  /**
   * Distance from trigger element in pixels.
   */
  sideOffset?: number;
  /**
   * Padding for collision detection boundaries.
   */
  collisionPadding?: number;
} & React.ComponentPropsWithoutRef<typeof BasePreviewCard.Positioner>;

/**
 * Positioner component for smart preview card placement with collision detection.
 */
const PreviewCardPositioner = ({ ref, sideOffset = 8, collisionPadding = 5, ...props }: PreviewCardPositionerProps) => (
  <BasePreviewCard.Positioner
    ref={ref}
    sideOffset={sideOffset}
    collisionPadding={collisionPadding}
    {...props}
  />
);

type PreviewCardContentProps = {
  /**
   * Reference to the content element.
   */
  ref?: React.RefObject<React.ElementRef<typeof BasePreviewCard.Popup> | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
  /**
   * Distance from trigger element in pixels.
   */
  sideOffset?: number;
  /**
   * Preferred placement side relative to trigger.
   */
  side?: "top" | "right" | "bottom" | "left";
  /**
   * Alignment relative to the trigger element.
   */
  align?: "start" | "center" | "end";
  /**
   * Padding for collision detection boundaries.
   */
  collisionPadding?: number;
} & React.ComponentPropsWithoutRef<typeof BasePreviewCard.Popup>;

/**
 * Main preview card content container with automatic positioning and portal rendering.
 */
const PreviewCardContent = (
  { ref, className, sideOffset = 8, side = "bottom", align = "center", collisionPadding = 5, ...props }: PreviewCardContentProps,
) => {
  return (
    <PreviewCardPortal>
      <PreviewCardPositioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
      >
        <BasePreviewCard.Popup
          ref={ref}
          className={cx(
            // base
            "z-50 w-80 max-w-sm origin-[var(--transform-origin)] overflow-hidden rounded-lg border shadow-lg",
            // border color
            "border-zinc-200 dark:border-zinc-800",
            // background color
            "bg-white dark:bg-zinc-950",
            // animations
            "transition-[transform,scale,opacity] duration-200 ease-out",
            "data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-90 data-[ending-style]:opacity-0",
            className,
          )}
          {...props}
        />
      </PreviewCardPositioner>
    </PreviewCardPortal>
  );
};

type PreviewCardArrowProps = {
  /**
   * Reference to the arrow element.
   */
  ref?: React.RefObject<React.ElementRef<typeof BasePreviewCard.Arrow> | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BasePreviewCard.Arrow>;

/**
 * Arrow component pointing from preview card to trigger with automatic positioning.
 */
const PreviewCardArrow = ({ ref, className, ...props }: PreviewCardArrowProps) => (
  <BasePreviewCard.Arrow
    ref={ref}
    className={cx(
      // base
      "flex transition-all duration-200 ease-out",
      // positioning based on side
      "data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=left]:rotate-90",
      "data-[side=right]:left-[-13px] data-[side=right]:-rotate-90",
      "data-[side=top]:bottom-[-8px] data-[side=top]:rotate-180",
      className,
    )}
    {...props}
  >
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-white dark:fill-zinc-950"
      />
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className="fill-zinc-200 dark:fill-zinc-700"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="fill-zinc-300 dark:fill-zinc-600"
      />
    </svg>
  </BasePreviewCard.Arrow>
);

type PreviewCardImageProps = {
  /**
   * Reference to the image element.
   */
  ref?: React.RefObject<HTMLImageElement | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"img">;

/**
 * Image component for preview card headers with consistent aspect ratio.
 */
const PreviewCardImage = ({ ref, className, ...props }: PreviewCardImageProps) => (
  <img
    ref={ref}
    className={cx(
      // base
      "block w-full rounded-t-md object-cover",
      // aspect ratio
      "aspect-video",
      className,
    )}
    {...props}
  />
);

type PreviewCardHeaderProps = {
  /**
   * Reference to the header element.
   */
  ref?: React.RefObject<HTMLDivElement | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Header section for preview card title and description with consistent spacing.
 */
const PreviewCardHeader = ({ ref, className, ...props }: PreviewCardHeaderProps) => (
  <div
    ref={ref}
    className={cx(
      // base
      "flex flex-col space-y-1.5 p-4 pb-2",
      className,
    )}
    {...props}
  />
);

type PreviewCardTitleProps = {
  /**
   * Reference to the title element.
   */
  ref?: React.RefObject<HTMLHeadingElement | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"h3">;

/**
 * Title heading component for preview cards with prominent typography.
 */
const PreviewCardTitle = ({ ref, className, ...props }: PreviewCardTitleProps) => (
  <h3
    ref={ref}
    className={cx(
      // base
      "text-lg font-semibold leading-6 tracking-tight",
      // text color
      "text-zinc-900 dark:text-zinc-50",
      className,
    )}
    {...props}
  />
);

type PreviewCardDescriptionProps = {
  /**
   * Reference to the description element.
   */
  ref?: React.RefObject<HTMLParagraphElement | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"p">;

/**
 * Description component for preview card content with muted styling.
 */
const PreviewCardDescription = ({ ref, className, ...props }: PreviewCardDescriptionProps) => (
  <p
    ref={ref}
    className={cx(
      // base
      "text-sm leading-6 text-pretty",
      // text color
      "text-zinc-600 dark:text-zinc-400",
      className,
    )}
    {...props}
  />
);

type PreviewCardBodyProps = {
  /**
   * Reference to the body element.
   */
  ref?: React.RefObject<HTMLDivElement | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Body section for preview card main content between header and footer.
 */
const PreviewCardBody = ({ ref, className, ...props }: PreviewCardBodyProps) => (
  <div
    ref={ref}
    className={cx(
      // base
      "px-4 pb-4 pt-0",
      className,
    )}
    {...props}
  />
);

type PreviewCardFooterProps = {
  /**
   * Reference to the footer element.
   */
  ref?: React.RefObject<HTMLDivElement | null>;
  /**
   * Additional CSS classes for styling customization.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

/**
 * Footer section for preview card actions and metadata with subtle styling.
 */
const PreviewCardFooter = ({ ref, className, ...props }: PreviewCardFooterProps) => (
  <div
    ref={ref}
    className={cx(
      // base
      "flex items-center justify-between px-4 py-3",
      // border
      "border-t border-zinc-200 dark:border-zinc-800",
      // background
      "bg-zinc-50 dark:bg-zinc-900/50",
      className,
    )}
    {...props}
  />
);

export {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardBody,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardFooter,
  PreviewCardHeader,
  PreviewCardImage,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTitle,
  PreviewCardTrigger,
};

export type { PreviewCardProps };
