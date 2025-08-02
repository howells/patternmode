/**
 * Preview Card Components.
 *
 * A comprehensive preview card system for displaying rich content previews
 * with hover interactions. Built on Base UI PreviewCard for creating
 * link previews, content cards, and contextual information displays.
 *
 * Features:
 * - Base UI PreviewCard integration for accessibility
 * - Hover-triggered content previews
 * - Smart positioning with collision detection
 * - Portal rendering for proper layering
 * - Smooth animations and transitions
 * - Arrow indicators with automatic positioning
 * - Structured content layout with image, header, body, footer
 * - Dark mode compatible styling
 * - Link-like trigger styling.
 *
 * Built on Base UI PreviewCard documentation:
 * https://base-ui.com/react/components/preview-card.
 *
 * @example
 * ```tsx
 * // Basic preview card
 * <PreviewCard>
 *   <PreviewCardTrigger>Hover for preview</PreviewCardTrigger>
 *   <PreviewCardContent>
 *     <PreviewCardImage src="/preview.jpg" alt="Preview" />
 *     <PreviewCardHeader>
 *       <PreviewCardTitle>Card Title</PreviewCardTitle>
 *       <PreviewCardDescription>Brief description</PreviewCardDescription>
 *     </PreviewCardHeader>
 *   </PreviewCardContent>
 * </PreviewCard>
 *
 * // Rich content preview
 * <PreviewCard>
 *   <PreviewCardTrigger>
 *     <a href="/article/123" className="text-blue-600 hover:underline">
 *       Read the full article
 *     </a>
 *   </PreviewCardTrigger>
 *   <PreviewCardContent side="top" align="start">
 *     <PreviewCardArrow />
 *     <PreviewCardImage
 *       src="/article-preview.jpg"
 *       alt="Article preview"
 *     />
 *     <PreviewCardHeader>
 *       <PreviewCardTitle>The Future of Web Development</PreviewCardTitle>
 *       <PreviewCardDescription>
 *         Exploring the latest trends and technologies shaping the web.
 *       </PreviewCardDescription>
 *     </PreviewCardHeader>
 *     <PreviewCardBody>
 *       <div className="space-y-2">
 *         <p className="text-xs text-zinc-500">Published: March 15, 2024</p>
 *         <p className="text-xs text-zinc-500">Reading time: 5 minutes</p>
 *       </div>
 *     </PreviewCardBody>
 *     <PreviewCardFooter>
 *       <span className="text-xs text-zinc-500">TechBlog.com</span>
 *       <button className="text-xs text-blue-600 hover:underline">
 *         Read more
 *       </button>
 *     </PreviewCardFooter>
 *   </PreviewCardContent>
 * </PreviewCard>
 *
 * // User profile preview
 * <PreviewCard>
 *   <PreviewCardTrigger>
 *     <span className="text-blue-600 hover:underline cursor-pointer">
 *       @johndoe
 *     </span>
 *   </PreviewCardTrigger>
 *   <PreviewCardContent>
 *     <PreviewCardHeader>
 *       <div className="flex items-center gap-3">
 *         <img
 *           src="/avatar.jpg"
 *           alt="John Doe"
 *           className="w-12 h-12 rounded-full"
 *         />
 *         <div>
 *           <PreviewCardTitle>John Doe</PreviewCardTitle>
 *           <PreviewCardDescription>Software Engineer</PreviewCardDescription>
 *         </div>
 *       </div>
 *     </PreviewCardHeader>
 *     <PreviewCardBody>
 *       <p className="text-sm">Building amazing web experiences with React and TypeScript.</p>
 *     </PreviewCardBody>
 *     <PreviewCardFooter>
 *       <span className="text-xs text-zinc-500">Joined March 2022</span>
 *       <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
 *         Follow
 *       </button>
 *     </PreviewCardFooter>
 *   </PreviewCardContent>
 * </PreviewCard>
 * ```
 */

import { PreviewCard as BasePreviewCard } from "@base-ui-components/react/preview-card";
import React from "react";

import { cx } from "../../../lib/utils";

/**
 * Root preview card component.
 *
 * Container for preview card trigger and content with hover interaction management.
 * Built on Base UI PreviewCard.Root for accessibility and state management.
 *
 * @component
 * @example
 * ```tsx
 * <PreviewCard>
 *   <PreviewCardTrigger>Hover me</PreviewCardTrigger>
 *   <PreviewCardContent>Preview content</PreviewCardContent>
 * </PreviewCard>
 * ```
 */
/**
 * Card component for displaying content previews with consistent formatting.
 *
 * @id preview-card
 * @name PreviewCard
 * @icon Square
 * @category ui
 * @component
 * @param props - Component properties.
 */
const PreviewCard = BasePreviewCard.Root;

/**
 * Preview card trigger component that shows preview on hover.
 *
 * Interactive element that reveals preview content on hover or focus.
 * Features link-like styling with smooth transitions and accessibility support.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI Trigger props.
 *
 *
 * @id preview-card
 * @name Preview Card
 * @component
 * @example
 * ```tsx
 * <PreviewCardTrigger>Hover for preview</PreviewCardTrigger>
 *
 * <PreviewCardTrigger className="font-bold">
 *   <a href="/link">Custom styled trigger</a>
 * </PreviewCardTrigger>
 * ```
 */
/**
 * Card component for displaying content previews with consistent formatting.
 *
 * @id preview-card
 * @name PreviewCard
 * @icon Square
 * @category ui
 * @component
 * @param props - Component properties.
 */
const PreviewCardTrigger = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof BasePreviewCard.Trigger> & { ref?: React.RefObject<React.ElementRef<typeof BasePreviewCard.Trigger> | null> }) => (
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

/**
 * Portal component for rendering preview card content outside normal DOM flow.
 *
 * Ensures preview content is rendered at the document root to avoid z-index
 * conflicts and enable proper layering.
 *
 * @component
 * @example
 * ```tsx
 * <PreviewCardPortal>
 *   <PreviewCardContent>Portal rendered content</PreviewCardContent>
 * </PreviewCardPortal>
 * ```
 */
const PreviewCardPortal = BasePreviewCard.Portal;

/**
 * Positioner component for smart preview card placement.
 *
 * Handles automatic positioning relative to trigger with collision detection
 * and boundary awareness. Used internally by PreviewCardContent.
 *
 * @param sideOffset - Distance from trigger element.
 * @param collisionPadding - Padding for collision detection.
 * @param props - Additional Base UI Positioner props.
 *
 * @component
 * @example
 * ```tsx
 * <PreviewCardPositioner side="top" align="center">
 *   <PreviewCardContent>Positioned content</PreviewCardContent>
 * </PreviewCardPositioner>
 * ```
 */
const PreviewCardPositioner = ({ ref, sideOffset = 8, collisionPadding = 5, ...props }: React.ComponentPropsWithoutRef<typeof BasePreviewCard.Positioner> & { ref?: React.RefObject<React.ElementRef<typeof BasePreviewCard.Positioner> | null> }) => (
  <BasePreviewCard.Positioner
    ref={ref}
    sideOffset={sideOffset}
    collisionPadding={collisionPadding}
    {...props}
  />
);

/**
 * Main preview card content container with automatic positioning.
 *
 * Primary container for preview card content with smart positioning,
 * portal rendering, and smooth animations. Includes collision detection
 * and responsive behavior.
 *
 * @param sideOffset - Distance from trigger element.
 * @param side - Preferred placement side (top, right, bottom, left).
 * @param align - Alignment relative to trigger (start, center, end).
 * @param collisionPadding - Padding for collision detection.
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI Popup props.
 *
 * @component
 * @example
 * ```tsx
 * <PreviewCardContent>
 *   <PreviewCardHeader>
 *     <PreviewCardTitle>Title</PreviewCardTitle>
 *   </PreviewCardHeader>
 * </PreviewCardContent>
 *
 * <PreviewCardContent side="top" align="start" sideOffset={12}>
 *   Positioned preview content
 * </PreviewCardContent>
 * ```
 */
const PreviewCardContent = (
  { ref, className, sideOffset = 8, side = "bottom", align = "center", collisionPadding = 5, ...props }: React.ComponentPropsWithoutRef<typeof BasePreviewCard.Popup> & {
    /**
     * Distance from trigger element.
     */
    sideOffset?: number;
    /**
     * Preferred placement side.
     */
    side?: "top" | "right" | "bottom" | "left";
    /**
     * Alignment relative to trigger.
     */
    align?: "start" | "center" | "end";
    /**
     * Padding for collision detection.
     */
    collisionPadding?: number;
  } & { ref?: React.RefObject<React.ElementRef<typeof BasePreviewCard.Popup> | null> },
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

/**
 * Arrow component pointing from preview card to trigger.
 *
 * Visual indicator that connects the preview content to its trigger.
 * Automatically rotates and positions based on the card's placement.
 *
 * @param className - Additional CSS classes.
 * @param props - Additional Base UI Arrow props.
 *
 * @component
 * @example
 * ```tsx
 * <PreviewCardContent>
 *   <PreviewCardArrow />
 *   <PreviewCardHeader>
 *     <PreviewCardTitle>Card with arrow</PreviewCardTitle>
 *   </PreviewCardHeader>
 * </PreviewCardContent>
 * ```
 */
const PreviewCardArrow = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof BasePreviewCard.Arrow> & { ref?: React.RefObject<React.ElementRef<typeof BasePreviewCard.Arrow> | null> }) => (
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

/**
 * Image component for preview card headers.
 *
 * Displays preview images with consistent aspect ratio and styling.
 * Automatically rounds top corners to match card design.
 *
 * @param className - Additional CSS classes.
 * @param props - Standard HTML img props.
 *
 * @component
 * @example
 * ```tsx
 * <PreviewCardImage
 *   src="/preview.jpg"
 *   alt="Preview image"
 * />
 *
 * <PreviewCardImage
 *   src="/thumbnail.jpg"
 *   alt="Thumbnail"
 *   className="h-32 object-contain"
 * />
 * ```
 */
const PreviewCardImage = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<"img"> & { ref?: React.RefObject<HTMLImageElement | null> }) => (
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

/**
 * Header section for preview card title and description.
 *
 * Container for preview card title, description, and other header content
 * with consistent padding and spacing.
 *
 * @param className - Additional CSS classes.
 * @param props - Standard HTML div props.
 *
 * @component
 * @example
 * ```tsx
 * <PreviewCardHeader>
 *   <PreviewCardTitle>Card Title</PreviewCardTitle>
 *   <PreviewCardDescription>Card description</PreviewCardDescription>
 * </PreviewCardHeader>
 * ```
 */
const PreviewCardHeader = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<"div"> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
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

/**
 * Title heading component for preview cards.
 *
 * Semantic heading that provides the main title for preview content
 * with prominent typography and proper hierarchy.
 *
 * @param className - Additional CSS classes.
 * @param props - Standard HTML h3 props.
 *
 * @component
 * @example
 * ```tsx
 * <PreviewCardTitle>Article Title</PreviewCardTitle>
 *
 * <PreviewCardTitle className="text-xl text-blue-600">
 *   Custom Styled Title
 * </PreviewCardTitle>
 * ```
 */
const PreviewCardTitle = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<"h3"> & { ref?: React.RefObject<HTMLHeadingElement | null> }) => (
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

/**
 * Description component for preview card content.
 *
 * Provides additional context and information with muted styling
 * that complements the title hierarchy.
 *
 * @param className - Additional CSS classes.
 * @param props - Standard HTML p props.
 *
 * @component
 * @example
 * ```tsx
 * <PreviewCardDescription>
 *   Brief description of the preview content.
 * </PreviewCardDescription>
 *
 * <PreviewCardDescription className="text-xs italic">
 *   Custom styled description
 * </PreviewCardDescription>
 * ```
 */
const PreviewCardDescription = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<"p"> & { ref?: React.RefObject<HTMLParagraphElement | null> }) => (
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

/**
 * Body section for preview card main content.
 *
 * Container for the main content area between header and footer
 * with consistent padding and spacing.
 *
 * @param className - Additional CSS classes.
 * @param props - Standard HTML div props.
 *
 * @component
 * @example
 * ```tsx
 * <PreviewCardBody>
 *   <p>Main content goes here.</p>
 *   <div>Additional elements</div>
 * </PreviewCardBody>
 * ```
 */
const PreviewCardBody = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<"div"> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
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

/**
 * Footer section for preview card actions and metadata.
 *
 * Bottom section typically containing actions, timestamps, or metadata
 * with subtle background and border separation.
 *
 * @param className - Additional CSS classes.
 * @param props - Standard HTML div props.
 *
 * @component
 * @example
 * ```tsx
 * <PreviewCardFooter>
 *   <span className="text-sm text-zinc-500">Published: March 2024</span>
 *   <button className="text-blue-600 hover:underline">Read more</button>
 * </PreviewCardFooter>
 * ```
 */
const PreviewCardFooter = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<"div"> & { ref?: React.RefObject<HTMLDivElement | null> }) => (
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
