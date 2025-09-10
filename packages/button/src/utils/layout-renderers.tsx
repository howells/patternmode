import { Icon } from "@patternmode/icon";
import { Kbd } from "@patternmode/kbd";
import { Loader } from "@patternmode/loader";
import { cx } from "@patternmode/utils/cx";
import type { ButtonProps } from "../types";
import { getIconOpacityClass } from "./button-utils";
import { getIconContainerSize, getIconSize, getLoaderSize } from "./index";

export type LayoutRendererProps = {
  size: ButtonProps["size"];
  fullWidth?: boolean;
  textAlign?: ButtonProps["textAlign"];
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
  isLoading: boolean;
  isIconButton: boolean;
  hasChildren: boolean;
  effectiveChildren: React.ReactNode;
  effectiveShouldShowChildren: boolean;
  iconButtonChildren: React.ReactNode;
  effectiveLeftIcon: ButtonProps["icon"] | ButtonProps["leftIcon"];
  RightIcon: ButtonProps["rightIcon"];
  loadingText?: string;
  showLeftIconOnHover?: boolean;
  showRightIconOnHover?: boolean;
  kbd?: ButtonProps["kbd"];
  kbdPlatform?: ButtonProps["kbdPlatform"];
  kbdVariant: "onDarkButton" | "onLightButton";
  iconStrokeWidth?: number;
  layoutClassName: string;
};

/**
 * Renders the normal width layout for button content
 */
export const renderNormalWidthLayout = ({
  layoutClassName,
  iconButtonChildren,
  size = "base",
  hasLeftIcon,
  hasRightIcon,
  isLoading,
  isIconButton,
  hasChildren,
  effectiveChildren,
  effectiveShouldShowChildren,
  effectiveLeftIcon,
  RightIcon,
  loadingText,
  showLeftIconOnHover = false,
  showRightIconOnHover = false,
  kbd,
  kbdPlatform,
  kbdVariant,
  iconStrokeWidth,
}: LayoutRendererProps & {
  layoutClassName: string;
  iconButtonChildren: React.ReactNode;
}) => {
  // Handle simple cases
  if (!(hasLeftIcon || hasRightIcon || isLoading || kbd)) {
    if (isIconButton && hasChildren) {
      return iconButtonChildren;
    }
    return effectiveShouldShowChildren ? effectiveChildren : null;
  }

  if (isIconButton && isLoading) {
    return null;
  }

  // Handle kbd-only case
  if (!(hasLeftIcon || hasRightIcon || isLoading) && kbd) {
    const content = effectiveShouldShowChildren ? effectiveChildren : null;
    const kbdElement = (
      <Kbd
        className="ml-2"
        keys={Array.isArray(kbd) ? kbd : undefined}
        platform={kbdPlatform}
        variant={kbdVariant}
      >
        {Array.isArray(kbd) ? undefined : kbd}
      </Kbd>
    );

    if (isIconButton && hasChildren) {
      return (
        <span className="flex w-full items-center justify-between">
          {iconButtonChildren}
          {kbdElement}
        </span>
      );
    }

    return (
      <span className="flex w-full items-center justify-between">
        {content}
        {kbdElement}
      </span>
    );
  }

  // Complex layout with icons
  return (
    <span className={layoutClassName}>
      {(isLoading || hasLeftIcon) && (
        <span className="relative flex items-center transition-all duration-150 ease-in-out">
          <div
            className={`relative ${getIconContainerSize(size)} flex items-center justify-center`}
          >
            <div
              className={cx(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-in-out",
                isLoading ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <Loader
                aria-label={loadingText || "Loading"}
                size={getLoaderSize(size)}
              />
            </div>
            {hasLeftIcon && (
              <div
                className={cx(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-in-out",
                  getIconOpacityClass(isLoading, showLeftIconOnHover)
                )}
              >
                {effectiveLeftIcon && (
                  <Icon
                    icon={effectiveLeftIcon}
                    size={getIconSize(size)}
                    strokeWidth={iconStrokeWidth}
                  />
                )}
              </div>
            )}
          </div>
        </span>
      )}

      {isIconButton && hasChildren
        ? iconButtonChildren
        : effectiveShouldShowChildren && effectiveChildren}

      {kbd && !hasRightIcon && (
        <Kbd
          className="ml-auto"
          keys={Array.isArray(kbd) ? kbd : undefined}
          platform={kbdPlatform}
          variant={kbdVariant}
        >
          {Array.isArray(kbd) ? undefined : kbd}
        </Kbd>
      )}

      {hasRightIcon && (
        <span className="flex items-center">
          {RightIcon && (
            <span
              className={cx(
                "transition-opacity duration-150 ease-in-out",
                showRightIconOnHover
                  ? "opacity-0 group-hover/button:opacity-100"
                  : "opacity-100"
              )}
            >
              <Icon
                icon={RightIcon}
                size={getIconSize(size)}
                strokeWidth={iconStrokeWidth}
              />
            </span>
          )}
          {kbd && (
            <Kbd
              className="ml-2"
              keys={Array.isArray(kbd) ? kbd : undefined}
              platform={kbdPlatform}
              variant={kbdVariant}
            >
              {Array.isArray(kbd) ? undefined : kbd}
            </Kbd>
          )}
        </span>
      )}
    </span>
  );
};

/**
 * Renders the center-aligned layout for button content
 */
export const renderCenterLayout = ({
  layoutClassName,
  iconButtonChildren,
  size = "base",
  hasLeftIcon,
  isLoading,
  isIconButton,
  hasChildren,
  effectiveChildren,
  effectiveShouldShowChildren,
  effectiveLeftIcon,
  RightIcon,
  loadingText,
  showRightIconOnHover = false,
  iconStrokeWidth,
}: LayoutRendererProps & {
  layoutClassName: string;
  iconButtonChildren: React.ReactNode;
}) => {
  if (isIconButton && isLoading) {
    return null;
  }

  return (
    <span className={layoutClassName}>
      {(isLoading || hasLeftIcon) && (
        <span className="relative flex items-center transition-all duration-150 ease-in-out">
          <div
            className={`relative ${getIconContainerSize(size)} flex items-center justify-center`}
          >
            <div
              className={cx(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                isLoading ? "opacity-100" : "opacity-0"
              )}
            >
              <Loader
                aria-label={loadingText || "Loading"}
                size={getLoaderSize(size)}
              />
            </div>
            {hasLeftIcon && (
              <div
                className={cx(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                  isLoading ? "opacity-0" : "opacity-100"
                )}
              >
                {effectiveLeftIcon && (
                  <Icon
                    icon={effectiveLeftIcon}
                    size={getIconSize(size)}
                    strokeWidth={iconStrokeWidth}
                  />
                )}
              </div>
            )}
          </div>
        </span>
      )}

      <div className="flex-1 text-center">
        {isIconButton && hasChildren
          ? iconButtonChildren
          : effectiveShouldShowChildren && effectiveChildren}
      </div>

      <span className="flex items-center">
        {RightIcon && (
          <span
            className={cx(
              "transition-opacity duration-150 ease-in-out",
              showRightIconOnHover
                ? "opacity-0 group-hover/button:opacity-100"
                : "opacity-100"
            )}
          >
            <Icon
              icon={RightIcon}
              size={getIconSize(size)}
              strokeWidth={iconStrokeWidth}
            />
          </span>
        )}
      </span>
    </span>
  );
};

/**
 * Renders the right icon layout for button content
 */
export const renderRightIconLayout = ({
  iconButtonChildren,
  size = "base",
  hasLeftIcon,
  fullWidth,
  isLoading,
  isIconButton,
  hasChildren,
  effectiveChildren,
  effectiveShouldShowChildren,
  effectiveLeftIcon,
  RightIcon,
  loadingText,
  showRightIconOnHover = false,
  iconStrokeWidth,
}: LayoutRendererProps & { iconButtonChildren: React.ReactNode }) => {
  if (isIconButton && isLoading) {
    return null;
  }

  return (
    <span className="flex w-full items-center gap-x-2 transition-all duration-150 ease-in-out">
      {(isLoading || hasLeftIcon) && (
        <span className="relative flex items-center transition-all duration-150 ease-in-out">
          <div
            className={`relative ${getIconContainerSize(size)} flex items-center justify-center`}
          >
            <div
              className={cx(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                isLoading ? "opacity-100" : "opacity-0"
              )}
            >
              <Loader
                aria-label={loadingText || "Loading"}
                size={getLoaderSize(size)}
              />
            </div>
            {hasLeftIcon && (
              <div
                className={cx(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                  isLoading ? "opacity-0" : "opacity-100"
                )}
              >
                {effectiveLeftIcon && (
                  <Icon
                    icon={effectiveLeftIcon}
                    size={getIconSize(size)}
                    strokeWidth={iconStrokeWidth}
                  />
                )}
              </div>
            )}
          </div>
        </span>
      )}

      {isIconButton && hasChildren
        ? iconButtonChildren
        : effectiveShouldShowChildren && effectiveChildren}

      <span className={`flex items-center ${fullWidth ? "ml-auto" : ""}`}>
        {RightIcon && (
          <span
            className={cx(
              "transition-opacity duration-150 ease-in-out",
              showRightIconOnHover
                ? "opacity-0 group-hover/button:opacity-100"
                : "opacity-100"
            )}
          >
            <Icon
              icon={RightIcon}
              size={getIconSize(size)}
              strokeWidth={iconStrokeWidth}
            />
          </span>
        )}
      </span>
    </span>
  );
};

/**
 * Renders the default layout for button content
 */
export const renderDefaultLayout = ({
  layoutClassName,
  iconButtonChildren,
  size = "base",
  hasLeftIcon,
  isLoading,
  isIconButton,
  hasChildren,
  effectiveChildren,
  effectiveShouldShowChildren,
  effectiveLeftIcon,
  loadingText,
  iconStrokeWidth,
}: LayoutRendererProps & {
  layoutClassName: string;
  iconButtonChildren: React.ReactNode;
}) => {
  if (isIconButton && isLoading) {
    return null;
  }

  return (
    <span className={layoutClassName}>
      {(isLoading || hasLeftIcon) && (
        <span className="relative flex items-center transition-all duration-150 ease-in-out">
          <div
            className={`relative ${getIconContainerSize(size)} flex items-center justify-center`}
          >
            <div
              className={cx(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                isLoading ? "opacity-100" : "opacity-0"
              )}
            >
              <Loader
                aria-label={loadingText || "Loading"}
                size={getLoaderSize(size)}
              />
            </div>
            {hasLeftIcon && (
              <div
                className={cx(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                  isLoading ? "opacity-0" : "opacity-100"
                )}
              >
                {effectiveLeftIcon && (
                  <Icon
                    icon={effectiveLeftIcon}
                    size={getIconSize(size)}
                    strokeWidth={iconStrokeWidth}
                  />
                )}
              </div>
            )}
          </div>
        </span>
      )}

      {isIconButton && hasChildren
        ? iconButtonChildren
        : effectiveShouldShowChildren && effectiveChildren}
    </span>
  );
};
