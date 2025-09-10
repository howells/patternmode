import { NavigationMenu as BaseNavigationMenu } from "@base-ui-components/react/navigation-menu";
import { cx } from "@patternmode/utils/cx";
import {
  floatingArrowBorderDark,
  floatingArrowBorderLight,
  floatingArrowFill,
  floatingSurfaceVariants,
} from "@patternmode/utils/floating-surface";
import type React from "react";

/**
 * Styled popup container matching PatternMode floating surfaces.
 *
 * The popup component provides the visual container for navigation menu content,
 * featuring PatternMode's floating surface styling, smooth animations, and
 * responsive width handling. It includes entrance/exit animations and proper
 * z-index management for overlay behavior.
 *
 * @example
 * ```tsx
 * <NavigationMenuPopup>
 *   <NavigationMenuContent>
 *     <NavigationMenuLink href="/item1">Menu Item 1</NavigationMenuLink>
 *     <NavigationMenuLink href="/item2">Menu Item 2</NavigationMenuLink>
 *   </NavigationMenuContent>
 * </NavigationMenuPopup>
 * ```
 */
export const NavigationMenuPopup = ({
  className,
  ...props
}: NavigationMenuPopupProps) => (
  <BaseNavigationMenu.Popup
    className={cx(
      floatingSurfaceVariants({ density: "compact", width: "auto" }).base(),
      "relative h-[var(--popup-height)] w-max origin-[var(--transform-origin)] rounded-lg",
      "transition-[opacity,transform,width,height,scale,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
      "data-[ending-style]:scale-90 data-[starting-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:duration-150",
      "xs:w-[var(--popup-width)] min-[500px]:w-[var(--popup-width)]",
      className
    )}
    {...props}
  />
);

export type NavigationMenuPopupProps = React.ComponentPropsWithoutRef<
  typeof BaseNavigationMenu.Popup
> & {
  /** Additional CSS classes for styling customization. */
  className?: string;
};

NavigationMenuPopup.displayName = "NavigationMenuPopup";

/**
 * Arrow indicator with PatternMode styles.
 *
 * The arrow component displays a visual indicator pointing toward the navigation
 * menu's anchor element. It automatically rotates based on the popup's position
 * (top, bottom, left, right) and includes PatternMode's floating surface styling
 * with proper border and fill colors for both light and dark themes.
 *
 * @example
 * ```tsx
 * <NavigationMenuPopup>
 *   <NavigationMenuArrow />
 *   <NavigationMenuContent>Menu content</NavigationMenuContent>
 * </NavigationMenuPopup>
 * ```
 */
export const NavigationMenuArrow = ({
  className,
  children,
  ...props
}: NavigationMenuArrowProps) => (
  <BaseNavigationMenu.Arrow
    className={cx(
      "flex",
      "transition-[left] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)]",
      "data-[side=right]:-rotate-90 data-[side=bottom]:top-[-8px] data-[side=left]:right-[-13px] data-[side=top]:bottom-[-8px] data-[side=right]:left-[-13px] data-[side=left]:rotate-90 data-[side=top]:rotate-180",
      className
    )}
    {...props}
  >
    {children ?? (
      <svg
        aria-hidden="true"
        fill="none"
        height="10"
        viewBox="0 0 20 10"
        width="20"
      >
        <title>Menu arrow</title>
        <path
          className={floatingArrowFill}
          d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        />
        <path
          className={cx(floatingArrowBorderLight, floatingArrowBorderDark)}
          d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        />
        <path
          className="dark:fill-zinc-300"
          d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        />
      </svg>
    )}
  </BaseNavigationMenu.Arrow>
);

export type NavigationMenuArrowProps = React.ComponentPropsWithoutRef<
  typeof BaseNavigationMenu.Arrow
> & {
  /** Additional CSS classes for styling customization. */
  className?: string;
};

NavigationMenuArrow.displayName = "NavigationMenuArrow";
