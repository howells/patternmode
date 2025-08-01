import type { VariantProps } from "tailwind-variants";

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
      "xs": "size-6", // 24px - for compact UI, tags
      "sm": "size-8", // 32px - for small contexts, lists
      "base": "size-10", // 40px - default size, most common
      "lg": "size-12", // 48px - for headers, prominent display
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

/**
 * Props for the Avatar component.
 *
 * @interface AvatarProps
 * @example
 * ```tsx
 * <Avatar src="/avatar.jpg" alt="User" />
 * ```
 */
type AvatarProps = {
  /**
   * Image source URL for the avatar.
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
   */
  alt?: string;
  /**
   * Whether to use a dynamic background color based on initials/text/alt text.
   */
  dynamicBackground?: boolean;
  /**
   * Additional CSS classes.
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
   */
  imageProps?: Record<string, unknown>;
} & VariantProps<typeof avatarVariants>;

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
 * A user profile picture display component with initials fallback and size variants.
 *
 * Displays user profile pictures with automatic fallback to initials when no image is provided.
 * Supports both circular and square variants with proper layering using CSS Grid.
 * Uses standard HTML img element by default, with option to provide custom Image component.
 *
 * @id avatar
 * @name Avatar
 * @component
 * @example
 * ```tsx
 * // Basic avatar with default size
 * <Avatar src="/profile.jpg" alt="John Doe" />
 *
 * // Different sizes
 * <Avatar src="/profile.jpg" alt="John Doe" size="2xs" />
 * <Avatar src="/profile.jpg" alt="John Doe" size="xs" />
 * <Avatar src="/profile.jpg" alt="John Doe" size="lg" />
 * <Avatar src="/profile.jpg" alt="John Doe" size="2xl" />
 *
 * // With initials (auto-uppercased, max 2 chars)
 * <Avatar initials="jd" alt="John Doe" size="lg" /> // Shows "JD"
 * <Avatar initials="alice" alt="Alice" size="lg" /> // Shows "AL"
 *
 * // With arbitrary text (as-is, no auto-formatting)
 * <Avatar text="42" alt="User 42" size="lg" />
 * <Avatar text="★" alt="Featured" size="lg" />
 * <Avatar text="CEO" alt="Chief Executive" size="lg" />
 *
 * // Square variant
 * <Avatar src="/profile.jpg" square size="xl" alt="John Doe" />
 *
 * // Dynamic background color
 * <Avatar initials="AB" dynamicBackground size="lg" />
 *
 * // With custom Image component (e.g., Next.js Image)
 * import Image from 'next/image';
 * <Avatar
 *   src="/profile.jpg"
 *   alt="John Doe"
 *   ImageComponent={Image}
 *   imageProps={{ priority: true, quality: 95 }}
 * />
 * ```
 */
/**
 * User profile image component with fallback initials and various size options.
 *
 * @id avatar
 * @name Avatar
 * @icon User
 * @category media
 * @component
 * @param props - Component properties.
 * @param props.src - Image source URL for the avatar.
 * @param props.initials - Initials to display when no image is provided (auto-uppercased, max 2 chars).
 * @param props.text - Arbitrary text content to display when no image is provided (numbers, symbols, etc.).
 * @param props.alt - Alt text for accessibility.
 * @param props.dynamicBackground - Whether to use a dynamic background color based on initials/text/alt text.
 * @param props.size - Size variant of the avatar.
 * @param props.square - Whether to use square shape instead of circular.
 * @param props.ImageComponent - Custom Image component to use (e.g., Next.js Image for optimization).
 * @param props.imageProps - Additional props to pass to the Image component.
 * @param props.className - Additional CSS classes.
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
}: AvatarProps
  & React.ComponentPropsWithoutRef<"span"> & {
    ref?: React.RefObject<HTMLSpanElement | null>;
  }) => {
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

/**
 * @inheritDoc
 */
const AvatarWithFallback = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseAvatar.Root> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseAvatar.Root> | null>;
}) => (
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

/**
 * @inheritDoc
 */
const AvatarImage = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseAvatar.Image> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseAvatar.Image> | null>;
}) => (
  <BaseAvatar.Image
    ref={ref}
    className={cx("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
);
AvatarImage.displayName = "AvatarImage";

/**
 * @inheritDoc
 */
const AvatarFallback = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseAvatar.Fallback> & {
  ref?: React.RefObject<React.ElementRef<typeof BaseAvatar.Fallback> | null>;
}) => (
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
  AvatarImage,
  type AvatarProps,
  avatarVariants,
  AvatarWithFallback,
};
