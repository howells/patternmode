import { Icon } from "@patternmode/icon";
import { Kbd } from "@patternmode/kbd";
import { Loader } from "@patternmode/loader";
import { cx } from "@patternmode/utils/cx";
import type { ButtonProps } from "../types";
import { getIconOpacityClass } from "./button-utils";
import { getIconContainerSize, getIconSize, getLoaderSize } from "./index";

export type LayoutRendererProps = {
  size: NonNullable<ButtonProps["size"]>;
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

const KbdElement = ({
  kbd,
  kbdPlatform,
  kbdVariant,
}: Pick<LayoutRendererProps, "kbd" | "kbdPlatform" | "kbdVariant">) => (
  <Kbd
    className="ml-2"
    keys={Array.isArray(kbd) ? kbd : undefined}
    platform={kbdPlatform}
    variant={kbdVariant}
  >
    {Array.isArray(kbd) ? undefined : kbd}
  </Kbd>
);

const LeftAdornment = ({
  isLoading,
  hasLeftIcon,
  size,
  effectiveLeftIcon,
  showLeftIconOnHover,
  iconStrokeWidth,
  loadingText,
}: Pick<
  LayoutRendererProps,
  | "isLoading"
  | "hasLeftIcon"
  | "size"
  | "effectiveLeftIcon"
  | "showLeftIconOnHover"
  | "iconStrokeWidth"
  | "loadingText"
>) => (
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
            getIconOpacityClass(isLoading, !!showLeftIconOnHover)
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
);

const RightAdornment = ({
  RightIcon,
  size,
  iconStrokeWidth,
  showRightIconOnHover,
  kbd,
  kbdPlatform,
  kbdVariant,
}: Pick<
  LayoutRendererProps,
  | "RightIcon"
  | "size"
  | "iconStrokeWidth"
  | "showRightIconOnHover"
  | "kbd"
  | "kbdPlatform"
  | "kbdVariant"
>) => (
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
      <KbdElement kbd={kbd} kbdPlatform={kbdPlatform} kbdVariant={kbdVariant} />
    )}
  </span>
);

type NormalLayoutProps = LayoutRendererProps & {
  layoutClassName: string;
  iconButtonChildren: React.ReactNode;
};

const isSimpleCase = (p: NormalLayoutProps) =>
  !(p.hasLeftIcon || p.hasRightIcon || p.isLoading || p.kbd);

const renderSimpleCase = (p: NormalLayoutProps): React.ReactNode | null => {
  if (p.isIconButton && p.hasChildren) {
    return p.iconButtonChildren;
  }
  return p.effectiveShouldShowChildren ? p.effectiveChildren : null;
};

const isKbdOnlyCase = (p: NormalLayoutProps) =>
  !(p.hasLeftIcon || p.hasRightIcon || p.isLoading) && Boolean(p.kbd);

const renderKbdOnlyCase = (p: NormalLayoutProps): React.ReactNode => {
  let left: React.ReactNode = null;
  if (p.isIconButton && p.hasChildren) {
    left = p.iconButtonChildren;
  } else if (p.effectiveShouldShowChildren) {
    left = p.effectiveChildren;
  }
  const right = (
    <KbdElement
      kbd={p.kbd}
      kbdPlatform={p.kbdPlatform}
      kbdVariant={p.kbdVariant}
    />
  );
  return (
    <span className="flex w-full items-center justify-between">
      {left}
      {right}
    </span>
  );
};

const renderFullCase = (p: NormalLayoutProps): React.ReactNode => {
  const leftAdornment =
    p.isLoading || p.hasLeftIcon ? (
      <LeftAdornment
        effectiveLeftIcon={p.effectiveLeftIcon}
        hasLeftIcon={p.hasLeftIcon}
        iconStrokeWidth={p.iconStrokeWidth}
        isLoading={p.isLoading}
        loadingText={p.loadingText}
        showLeftIconOnHover={p.showLeftIconOnHover}
        size={p.size}
      />
    ) : null;

  let middle: React.ReactNode = null;
  if (p.isIconButton && p.hasChildren) {
    middle = p.iconButtonChildren;
  } else if (p.effectiveShouldShowChildren) {
    middle = p.effectiveChildren;
  }

  const rightKbd =
    p.kbd && !p.hasRightIcon ? (
      <span className="ml-auto">
        <KbdElement
          kbd={p.kbd}
          kbdPlatform={p.kbdPlatform}
          kbdVariant={p.kbdVariant}
        />
      </span>
    ) : null;

  const rightAdornment = p.hasRightIcon ? (
    <RightAdornment
      iconStrokeWidth={p.iconStrokeWidth}
      kbd={p.kbd}
      kbdPlatform={p.kbdPlatform}
      kbdVariant={p.kbdVariant}
      RightIcon={p.RightIcon}
      showRightIconOnHover={p.showRightIconOnHover}
      size={p.size}
    />
  ) : null;

  return (
    <span className={p.layoutClassName}>
      {leftAdornment}
      {middle}
      {rightKbd}
      {rightAdornment}
    </span>
  );
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
  const p: NormalLayoutProps = {
    layoutClassName,
    iconButtonChildren,
    size,
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
    showLeftIconOnHover,
    showRightIconOnHover,
    kbd,
    kbdPlatform,
    kbdVariant,
    iconStrokeWidth,
  };

  if (isSimpleCase(p)) {
    return renderSimpleCase(p);
  }
  if (isIconButton && isLoading) {
    return null;
  }
  if (isKbdOnlyCase(p)) {
    return renderKbdOnlyCase(p);
  }
  return renderFullCase(p);
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
