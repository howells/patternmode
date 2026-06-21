import { getObjectSizingStyle, isLightColor, joinClassNames } from "@patternmode/system";
import { Slot, Slottable } from "@radix-ui/react-slot";
import type { CSSProperties, HTMLAttributes, MouseEvent, ReactNode } from "react";

import { getSwatchAtmosphereBackground } from "./swatch-atmosphere";
import { getSwatchColorsBackground } from "./swatch-colors";
import { getSwatchSizeVariableStyle } from "./swatch-types";
import type { SwatchProps } from "./swatch-types";

type SwatchRootStyle = CSSProperties & Record<"--patternmode-swatch-fill", string | undefined>;

interface SwatchContentProps {
  children: SwatchProps["children"];
  flat: boolean;
  Icon: SwatchProps["icon"];
  mediaStyle: CSSProperties;
  selected: boolean;
  unavailable: boolean;
}

interface RemovableSwatchProps {
  ariaLabel: string | undefined;
  children: ReactNode;
  className: string | undefined;
  dataProps: ReturnType<typeof getSwatchDataProps>;
  onRemove: () => void;
  removeLabel: string;
  rootStyle: SwatchRootStyle;
  props: HTMLAttributes<HTMLElement>;
}

const SwatchContent = ({
  children,
  flat,
  Icon,
  mediaStyle,
  selected,
  unavailable,
}: SwatchContentProps) => (
  <>
    <span aria-hidden="true" className="patternmode-swatch__fill" />
    {children !== undefined && children !== null ? (
      <span className="patternmode-swatch__media" style={mediaStyle}>
        {children}
      </span>
    ) : null}
    {flat ? null : <span aria-hidden="true" className="patternmode-swatch__scrim" />}
    {selected && Icon ? (
      <span className="patternmode-swatch__icon">
        <Icon aria-hidden="true" focusable="false" />
      </span>
    ) : null}
    {unavailable ? <span aria-hidden="true" className="patternmode-swatch__slash" /> : null}
  </>
);

const getSwatchFill = ({
  background,
  blend,
  color,
  colors,
  density,
  gravity,
  texture,
}: Pick<
  SwatchProps,
  "background" | "blend" | "color" | "colors" | "density" | "gravity" | "texture"
>) => {
  const colorsBackground = getSwatchColorsBackground(colors, blend);
  const atmosphereBackground =
    texture === "atmosphere"
      ? getSwatchAtmosphereBackground(colors, { density, gravity })
      : undefined;

  return {
    colorsBackground,
    fill: background ?? atmosphereBackground ?? colorsBackground ?? color,
  };
};

const getSwatchTone = ({
  background,
  color,
  colorsBackground,
  isLight,
}: {
  background: SwatchProps["background"];
  color: SwatchProps["color"];
  colorsBackground: string | undefined;
  isLight: SwatchProps["isLight"];
}) => {
  if (isLight !== undefined) {
    return isLight ? "light" : "dark";
  }

  const hasColor = color !== undefined && color !== "";
  const hasBackground = background !== undefined && background !== "";
  const hasColorsBackground = colorsBackground !== undefined && colorsBackground !== "";

  if (hasColor && !hasBackground && !hasColorsBackground && isLightColor(color)) {
    return "light";
  }

  return "dark";
};

const getSwatchDataProps = ({
  flat,
  lightTone,
  raised,
  selected,
  shape,
  showRing,
  size,
  unavailable,
}: {
  flat: boolean;
  lightTone: "dark" | "light";
  raised: boolean;
  selected: boolean;
  shape: SwatchProps["shape"];
  showRing: boolean;
  size: SwatchProps["size"];
  unavailable: boolean;
}) => ({
  "data-flat": flat ? "true" : undefined,
  "data-raised": raised ? "true" : undefined,
  "data-selected": selected ? "true" : undefined,
  "data-shape": shape,
  "data-show-ring": showRing ? "true" : "false",
  "data-size": size,
  "data-slot": "swatch",
  "data-tone": lightTone,
  "data-unavailable": unavailable ? "true" : undefined,
});

const RemovableSwatch = ({
  ariaLabel,
  children,
  className,
  dataProps,
  onRemove,
  removeLabel,
  rootStyle,
  props,
}: RemovableSwatchProps) => {
  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onRemove();
  };

  return (
    <fieldset
      {...props}
      {...dataProps}
      aria-label={ariaLabel}
      className={joinClassNames("patternmode-swatch", className)}
      style={rootStyle}
    >
      {children}
      <button
        aria-label={removeLabel}
        className="patternmode-swatch__remove"
        onClick={handleRemove}
        type="button"
      >
        <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
          <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" />
        </svg>
      </button>
    </fieldset>
  );
};

export const Swatch = ({
  "aria-label": ariaLabel,
  asChild = false,
  background,
  blend = "step",
  children,
  className,
  color,
  colors,
  density,
  flat = false,
  gravity,
  icon: Icon,
  isLight,
  objectFit,
  objectPosition,
  onRemove,
  raised = false,
  removeLabel,
  role: _role,
  selected = false,
  shape = "circle",
  showRing = true,
  size = "base",
  style,
  texture,
  unavailable = false,
  ...props
}: SwatchProps) => {
  const { colorsBackground, fill } = getSwatchFill({
    background,
    blend,
    color,
    colors,
    density,
    gravity,
    texture,
  });
  const lightTone = getSwatchTone({
    background,
    color,
    colorsBackground,
    isLight,
  });
  const resolvedRemoveLabel =
    removeLabel ?? (ariaLabel !== undefined && ariaLabel !== "" ? `Remove ${ariaLabel}` : "Remove");

  const rootStyle: SwatchRootStyle = {
    ...getSwatchSizeVariableStyle(size),
    "--patternmode-swatch-fill": fill,
    ...style,
  };
  const mediaStyle: CSSProperties = getObjectSizingStyle({
    fit: objectFit,
    position: objectPosition,
  });
  const dataProps = getSwatchDataProps({
    flat,
    lightTone,
    raised,
    selected,
    shape,
    showRing,
    size,
    unavailable,
  });

  const swatchContent = (
    <SwatchContent
      flat={flat}
      Icon={Icon}
      mediaStyle={mediaStyle}
      selected={selected}
      unavailable={unavailable}
    >
      {asChild ? undefined : children}
    </SwatchContent>
  );

  if (asChild) {
    return (
      <Slot
        {...props}
        {...dataProps}
        aria-label={ariaLabel}
        className={joinClassNames("patternmode-swatch", className)}
        style={rootStyle}
      >
        {swatchContent}
        <Slottable>{children}</Slottable>
      </Slot>
    );
  }

  if (onRemove !== undefined) {
    return (
      <RemovableSwatch
        ariaLabel={ariaLabel}
        className={className}
        dataProps={dataProps}
        onRemove={onRemove}
        props={props}
        removeLabel={resolvedRemoveLabel}
        rootStyle={rootStyle}
      >
        {swatchContent}
      </RemovableSwatch>
    );
  }

  return (
    <figure
      {...props}
      {...dataProps}
      aria-label={ariaLabel}
      className={joinClassNames("patternmode-swatch", className)}
      style={rootStyle}
    >
      {swatchContent}
    </figure>
  );
};
