import { Avatar as BaseAvatar } from "@base-ui-components/react/avatar";
import { getColorFromName } from "@patternmode/utils/colors";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import { imageSizeMap } from "../constants";
import type {
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarProps,
  AvatarWithFallbackProps,
} from "../types";
import { avatarVariants } from "../variants";

const DEFAULT_IMAGE_PROPS = {};

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
  imageProps = DEFAULT_IMAGE_PROPS,
  ...props
}: AvatarProps & { ref?: React.RefObject<HTMLSpanElement | null> }) => {
  const displayText =
    text || (initials ? initials.slice(0, 2).toUpperCase() : undefined);
  const backgroundColor = dynamicBackground
    ? getColorFromName(initials || text || alt || "default")
    : undefined;
  const imageSize = imageSizeMap[size || "base"];
  const ImageEl = ImageComponent || "img";
  const filteredImageProps = ImageComponent
    ? imageProps
    : Object.fromEntries(
        Object.entries(imageProps).filter(
          ([key]) =>
            typeof key === "string" &&
            Number.isNaN(Number(key)) &&
            key !== "children"
        )
      );

  return (
    <span
      ref={ref}
      {...props}
      className={cx(avatarVariants({ size, square }), className)}
      data-testid="avatar"
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      {displayText && (
        <svg
          aria-hidden={alt ? undefined : "true"}
          className="size-full select-none fill-current p-[5%] font-medium text-[36px]"
          viewBox="0 0 100 100"
        >
          <title>{alt || displayText}</title>
          <text
            alignmentBaseline="middle"
            dominantBaseline="middle"
            dy=".125em"
            fill={dynamicBackground ? "white" : "currentColor"}
            textAnchor="middle"
            x="50%"
            y="50%"
          >
            {displayText}
          </text>
        </svg>
      )}
      {src && (
        <ImageEl
          alt={alt}
          className="size-full object-cover"
          height={imageSize.height}
          src={src}
          width={imageSize.width}
          {...filteredImageProps}
        />
      )}
    </span>
  );
};
Avatar.displayName = "Avatar";

const AvatarWithFallback = ({
  ref,
  className,
  ...props
}: AvatarWithFallbackProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseAvatar.Root> | null>;
}) => (
  <BaseAvatar.Root
    className={cx(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      "-outline-offset-1 outline outline-black/5 dark:outline-white/5",
      className
    )}
    ref={ref}
    {...props}
  />
);
AvatarWithFallback.displayName = "AvatarWithFallback";

const AvatarImage = ({
  ref,
  className,
  ...props
}: AvatarImageProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseAvatar.Image> | null>;
}) => (
  <BaseAvatar.Image
    className={cx("aspect-square h-full w-full object-cover", className)}
    ref={ref}
    {...props}
  />
);
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = ({
  ref,
  className,
  ...props
}: AvatarFallbackProps & {
  ref?: React.RefObject<React.ElementRef<typeof BaseAvatar.Fallback> | null>;
}) => (
  <BaseAvatar.Fallback
    className={cx(
      "flex h-full w-full items-center justify-center rounded-full bg-zinc-100 font-medium text-sm text-zinc-900",
      "dark:bg-zinc-800 dark:text-zinc-50",
      className
    )}
    ref={ref}
    {...props}
  />
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarFallback, AvatarImage, AvatarWithFallback };
