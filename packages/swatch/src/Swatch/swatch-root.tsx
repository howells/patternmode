import { getObjectSizingStyle, joinClassNames } from "@patternmode/system";
import type { CSSProperties, MouseEvent } from "react";

import { getSwatchAtmosphereBackground } from "./swatch-atmosphere";
import { getSwatchColorsBackground, isLightColor } from "./swatch-colors";
import { getSwatchSizeVariableStyle } from "./swatch-types";
import type { SwatchProps } from "./swatch-types";

interface SwatchContentProps {
  children: SwatchProps["children"];
  flat: boolean;
  Icon: SwatchProps["icon"];
  mediaStyle: CSSProperties;
  selected: boolean;
  unavailable: boolean;
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
    {children ? (
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
  color,
  colors,
  density,
  gravity,
  texture,
}: Pick<SwatchProps, "background" | "color" | "colors" | "density" | "gravity" | "texture">) => {
  const colorsBackground = getSwatchColorsBackground(colors);
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

  if (color && !background && !colorsBackground && isLightColor(color as string)) {
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

export const Swatch = ({
  "aria-label": ariaLabel,
  background,
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
  const resolvedRemoveLabel = removeLabel ?? (ariaLabel ? `Remove ${ariaLabel}` : "Remove");

  const rootStyle = {
    ...getSwatchSizeVariableStyle(size),
    "--patternmode-swatch-fill": fill,
    ...style,
  } as CSSProperties;
  const mediaStyle = getObjectSizingStyle({
    fit: objectFit,
    position: objectPosition,
  }) as CSSProperties;
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

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onRemove?.();
  };

  const swatchContent = (
    <SwatchContent
      flat={flat}
      Icon={Icon}
      mediaStyle={mediaStyle}
      selected={selected}
      unavailable={unavailable}
    >
      {children}
    </SwatchContent>
  );

  if (onRemove) {
    return (
      <fieldset
        {...props}
        {...dataProps}
        aria-label={ariaLabel}
        className={joinClassNames("patternmode-swatch", className)}
        style={rootStyle}
      >
        {swatchContent}
        <button
          aria-label={resolvedRemoveLabel}
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
