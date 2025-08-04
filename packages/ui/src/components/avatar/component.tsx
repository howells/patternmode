import { Avatar as BaseAvatar } from "@base-ui-components/react/avatar";
import * as React from "react";
import { tv } from "tailwind-variants";

import { getColorFromName } from "../../lib/colors";
import { cx } from "../../lib/utils";

const avatarVariants = tv({
  base: [
    // Basic layout - using CSS Grid like Catalyst for better layering
    "inline-grid shrink-0 align-middle [--avatar-radius:20%] *:col-start-1 *:row-start-1",
    // Semi-transparent inset ring for better visual definition
    "inset-ring-1 inset-ring-black/15 dark:inset-ring-white/15",
  ],
  variants: {
    size: {
      "2xs": "size-4", // 16px - for very compact UI, inline elements
      "xs": "size-control-xs", // 28px - aligns with control system for form contexts
      "sm": "size-control-sm", // 36px - aligns with control system for form contexts  
      "base": "size-control-base", // 40px - aligns with control system for form contexts
      "lg": "size-control-lg", // 48px - aligns with control system for form contexts
      "xl": "size-16", // 64px - for profile pages, large display
      "2xl": "size-20", // 80px - for hero sections, main profiles
      "3xl": "size-24", // 96px - for very large display contexts
    },
    square: {
      true: "rounded-[--avatar-radius] *:rounded-[--avatar-radius]",
      false: "rounded-full *:rounded-full",
    },
  },
  defaultVariants: {
    size: "base",
    square: false,
  },
});

type AvatarProps = {
  /**
   * Image source URL for the avatar.
   * When provided, displays the image; when null/undefined, shows fallback.
   */
  src?: string | null;
  /**
   * Initials to display when no image is provided.
   * Automatically uppercased and limited to 2 characters.
   */
  initials?: string;
  /**
   * Arbitrary text content to display when no image is provided.
   * Can be numbers, symbols, or any short text (not automatically uppercased).
   */
  text?: string;
  /**
   * Alt text for accessibility.
   * Used for screen readers and image descriptions.
   */
  alt?: string;
  /**
   * Whether to use a dynamic background color based on initials/text/alt text.
   * Generates consistent colors for different users.
   */
  dynamicBackground?: boolean;
  /**
   * Additional CSS classes.
   * Applied to the avatar container element.
   */
  className?: string;
  /**
   * Custom Image component to use (e.g., Next.js Image for optimization).
   * Defaults to standard HTML img element.
   */
  ImageComponent?: React.ComponentType<{
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    [key: string]: unknown;
  }>;
  /**
   * Additional props to pass to the Image component.
   * Useful for optimization settings like priority, quality, etc.
   */
  imageProps?: Record<string, unknown>;
  /**
   * Size variant of the avatar.
   * Controls dimensions from very compact (2xs) to very large (3xl).
   */
  size?: "2xs" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  /**
   * Whether to use square shape instead of circular.
   * Useful for brand logos or non-human avatars.
   */
  square?: boolean;
} & React.ComponentPropsWithoutRef<"span">;

// Size mapping for image dimensions
const imageSizeMap = {
  "2xs": { width: 16, height: 16 },
  "xs": { width: 24, height: 24 },
  "sm": { width: 32, height: 32 },
  "base": { width: 40, height: 40 },
  "lg": { width: 48, height: 48 },
  "xl": { width: 64, height: 64 },
  "2xl": { width: 80, height: 80 },
  "3xl": { width: 96, height: 96 },
} as const;

/**
 * User profile image component with fallback initials and various size options.
 */
const Avatar = ({
  ref,
  src = null,
  size = "base",
  square = false,
  initials,
  text,
  alt = "",
  dynamicBackground = false,
  className,
  ImageComponent,
  imageProps = {},
  ...props
}: AvatarProps & { ref?: React.RefObject<HTMLSpanElement | null> }) => {
  // Determine what text to display and how to format it
  const displayText = text || (initials ? initials.slice(0, 2).toUpperCase() : undefined);

  // Generate background color from initials/text or alt text when dynamicBackground is true
  const backgroundColor = dynamicBackground
    ? getColorFromName(initials || text || alt || "default")
    : undefined;

  // Get image dimensions for the current size
  const imageSize = imageSizeMap[size || "base"];

  // Use custom ImageComponent if provided, otherwise default to img
  const ImageEl = ImageComponent || "img";

  // Filter out invalid props (numeric keys, functions, etc.) for HTML elements
  const filteredImageProps = ImageComponent
    ? imageProps // If using custom component, pass all props
    : Object.fromEntries(
        Object.entries(imageProps).filter(([key]) =>
          typeof key === "string"
          && Number.isNaN(Number(key))
          && key !== "children",
        ),
      );

  return (
    <span
      ref={ref}
      {...props}
      className={cx(avatarVariants({ size, square }), className)}
      style={backgroundColor ? { backgroundColor } : undefined}
      data-testid="avatar"
    >
      {displayText && (
        <svg
          className="size-full fill-current p-[5%] text-[36px] font-medium select-none"
          viewBox="0 0 100 100"
          aria-hidden={alt ? undefined : "true"}
        >
          {alt && <title>{alt}</title>}
          <text
            x="50%"
            y="50%"
            alignmentBaseline="middle"
            dominantBaseline="middle"
            textAnchor="middle"
            dy=".125em"
            fill={dynamicBackground ? "white" : "currentColor"}
          >
            {displayText}
          </text>
        </svg>
      )}
      {src && (
        <ImageEl
          className="size-full object-cover"
          src={src}
          alt={alt}
          width={imageSize.width}
          height={imageSize.height}
          {...filteredImageProps}
        />
      )}
    </span>
  );
};
Avatar.displayName = "Avatar";

type AvatarWithFallbackProps = {
  /**
   * Additional CSS classes.
   * Applied to the avatar root container.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseAvatar.Root>;

/**
 * Alternative avatar implementation using Base UI primitives with built-in fallback.
 */
const AvatarWithFallback = ({
  ref,
  className,
  ...props
}: AvatarWithFallbackProps & { ref?: React.RefObject<React.ElementRef<typeof BaseAvatar.Root> | null> }) => (
  <BaseAvatar.Root
    ref={ref}
    className={cx(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      "outline -outline-offset-1 outline-black/5 dark:outline-white/5",
      className,
    )}
    {...props}
  />
);
AvatarWithFallback.displayName = "AvatarWithFallback";

type AvatarImageProps = {
  /**
   * Additional CSS classes.
   * Applied to the avatar image element.
   */
  className?: string;
} & React.ComponentPropsWithoutRef<typeof BaseAvatar.Image>;

/**
 * Image component for use within AvatarWithFallback.
 */
const AvatarImage = ({
  ref,
  className,
  ...props
}: AvatarImageProps & { ref?: React.RefObject<React.ElementRef<typeof BaseAvatar.Image> | null> }) => (
  <BaseAvatar.Image
    ref={ref}
    className={cx("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
);
AvatarImage.displayName = "AvatarImage";

type AvatarFallbackProps = {
  /**
   * Additional CSS classes.
   * Applied to the fallback content element.
   */
  className?: string;
  /**
   * Content to display when image fails to load.
   * Usually initials or placeholder text.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof BaseAvatar.Fallback>;

/**
 * Fallback component for use within AvatarWithFallback when image fails to load.
 */
const AvatarFallback = ({
  ref,
  className,
  ...props
}: AvatarFallbackProps & { ref?: React.RefObject<React.ElementRef<typeof BaseAvatar.Fallback> | null> }) => (
  <BaseAvatar.Fallback
    ref={ref}
    className={cx(
      "flex h-full w-full items-center justify-center rounded-full bg-zinc-100 text-sm font-medium text-zinc-900",
      "dark:bg-zinc-800 dark:text-zinc-50",
      className,
    )}
    {...props}
  />
);
AvatarFallback.displayName = "AvatarFallback";

export {
  Avatar,
  AvatarFallback,
  type AvatarFallbackProps,
  AvatarImage,
  type AvatarImageProps,
  type AvatarProps,
  avatarVariants,
  AvatarWithFallback,
  type AvatarWithFallbackProps,
};
