"use client";

import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  CSSProperties,
  KeyboardEvent,
  PointerEvent,
  RefObject,
} from "react";
import { useId, useRef } from "react";

import {
  clampValue,
  getHaloGeometry,
  getHaloHueHandlePosition,
  getHaloPadHandlePosition,
  HALO_ARC_STROKE_WIDTH,
  HALO_PAD_RADIUS,
  HALO_PAD_SIZE,
  hslToHex,
  normalizeHue,
  pointerToHaloHue,
  pointerToHaloPad,
} from "./halo-utils";
import type { HaloColor, HaloGeometry, HaloPlacement } from "./halo-utils";

type HaloPickerRootProps = Omit<ComponentPropsWithoutRef<"fieldset">, "onChange" | "value">;
type HaloPadPointerEvent = PointerEvent<HTMLDivElement>;
type HaloHuePointerEvent = PointerEvent<SVGSVGElement>;

const PAD_KEY_STEP = 1;
const PAD_KEY_STEP_LARGE = 10;
/* The pad's pointer range: saturation spans fully, lightness keeps the
   3..97 clamp of `pointerToHaloPad` so keyboard and pointer agree. */
const PAD_LIGHTNESS_MIN = 3;
const PAD_LIGHTNESS_MAX = 97;

export interface HaloPickerProps extends HaloPickerRootProps {
  /**
   * Hidden fieldset legend used when the picker has no `aria-label`.
   *
   * @default "Color"
   */
  label?: string;
  /** Called whenever the pad or hue arc changes the HSL value. */
  onChange: (value: HaloColor) => void;
  /**
   * Which side of the pad the hue arc sits on. The value readout follows
   * the arc: it renders above the wheel for `"top"`, below otherwise.
   *
   * @default "bottom"
   */
  placement?: HaloPlacement;
  /**
   * Whether to show the computed hex value alongside the wheel.
   *
   * @default true
   */
  showValue?: boolean;
  /** Controlled HSL color value. */
  value: HaloColor;
}

/*
 * Capture on pointerdown is safe here, and the reason is worth stating because
 * the same call in a drag-scroll container shipped a silent bug: capture
 * retargets the rest of the gesture — including the compatibility mouseup and
 * click — at the capturing element, so any clickable descendant stops being
 * activatable. Capture speculatively, before knowing whether a drag will
 * happen, and every button inside dies with no error and nothing in the console.
 *
 * The pad and the arc both commit a color on pointerdown, so by the time they
 * capture, the gesture has already begun — there is no speculation. The price
 * is that neither may ever contain an interactive descendant: measured in a
 * browser, a button inside the pad receives `pointerdown` and then loses both
 * `pointerup` and `click` to the pad, so its handler never runs. Their children
 * are decorative today. Keep it that way.
 */
const setPointerCapture = (event: PointerEvent<HTMLElement | SVGSVGElement>) => {
  if ("setPointerCapture" in event.currentTarget) {
    event.currentTarget.setPointerCapture(event.pointerId);
  }
};

const releasePointerCapture = (event: PointerEvent<HTMLElement | SVGSVGElement>) => {
  if (
    "hasPointerCapture" in event.currentTarget &&
    event.currentTarget.hasPointerCapture(event.pointerId)
  ) {
    event.currentTarget.releasePointerCapture(event.pointerId);
  }
};

/** Arrow-key adjustment for the pad: S left/right, L up/down, Shift for 10×. */
const padColorForKey = (
  event: KeyboardEvent<HTMLDivElement>,
  value: HaloColor,
): HaloColor | null => {
  const step = event.shiftKey ? PAD_KEY_STEP_LARGE : PAD_KEY_STEP;
  let { l, s } = value;
  switch (event.key) {
    case "ArrowLeft": {
      s -= step;
      break;
    }
    case "ArrowRight": {
      s += step;
      break;
    }
    case "ArrowUp": {
      l += step;
      break;
    }
    case "ArrowDown": {
      l -= step;
      break;
    }
    default: {
      return null;
    }
  }
  return {
    ...value,
    l: clampValue(l, PAD_LIGHTNESS_MIN, PAD_LIGHTNESS_MAX),
    s: clampValue(s, 0, 100),
  };
};

const getRootStyle = (hue: number, hex: string, style: CSSProperties | undefined): CSSProperties =>
  ({
    "--patternmode-halo-color": hex,
    "--patternmode-halo-hue-value": String(hue),
    ...style,
  }) as CSSProperties;

/* oxlint-disable jsx-a11y/prefer-tag-over-role, react-doctor/prefer-tag-over-role -- the pad is a two-axis control; no native input covers saturation and lightness at once. */
const HaloPad = ({
  hex,
  lightness,
  onKeyDown,
  onPointerCancel,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  padHandle,
  padLeft,
  padRef,
  padTop,
  saturation,
}: {
  hex: string;
  lightness: number;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onPointerCancel: () => void;
  onPointerDown: (event: HaloPadPointerEvent) => void;
  onPointerMove: (event: HaloPadPointerEvent) => void;
  onPointerUp: (event: HaloPadPointerEvent) => void;
  padHandle: { x: number; y: number };
  padLeft: number;
  padRef: RefObject<HTMLDivElement | null>;
  padTop: number;
  saturation: number;
}) => (
  <div
    aria-label="Saturation and lightness"
    aria-valuemax={100}
    aria-valuemin={0}
    aria-valuenow={Math.round(saturation)}
    aria-valuetext={`Saturation ${Math.round(saturation)}%, Lightness ${Math.round(lightness)}%`}
    className="patternmode-halo-picker__pad"
    data-slot="halo-picker-pad"
    onKeyDown={onKeyDown}
    onPointerCancel={onPointerCancel}
    onPointerDown={onPointerDown}
    onPointerMove={onPointerMove}
    onPointerUp={onPointerUp}
    ref={padRef}
    role="slider"
    style={{
      height: HALO_PAD_SIZE,
      left: padLeft,
      top: padTop,
      width: HALO_PAD_SIZE,
    }}
    tabIndex={0}
  >
    <span className="patternmode-halo-picker__pad-hue" />
    <span className="patternmode-halo-picker__pad-white" />
    <span className="patternmode-halo-picker__pad-black" />
    <span
      className="patternmode-halo-picker__pad-handle"
      style={{
        backgroundColor: hex,
        left: `${padHandle.x}px`,
        top: `${padHandle.y}px`,
      }}
    />
  </div>
);
/* oxlint-enable jsx-a11y/prefer-tag-over-role, react-doctor/prefer-tag-over-role */

const HaloHueArc = ({
  geometry,
  hex,
  hue,
  hueGradientId,
  hueHandle,
  hueInputRef,
  onHueChange,
  onPointerCancel,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  svgRef,
}: {
  geometry: HaloGeometry;
  hex: string;
  hue: number;
  hueGradientId: string;
  hueHandle: { x: number; y: number };
  hueInputRef: RefObject<HTMLInputElement | null>;
  onHueChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPointerCancel: () => void;
  onPointerDown: (event: HaloHuePointerEvent) => void;
  onPointerMove: (event: HaloHuePointerEvent) => void;
  onPointerUp: (event: HaloHuePointerEvent) => void;
  svgRef: RefObject<SVGSVGElement | null>;
}) => (
  <>
    <input
      aria-label="Hue"
      aria-valuenow={Math.round(hue)}
      className="patternmode-halo-picker__arc-input"
      max={360}
      min={0}
      onChange={onHueChange}
      ref={hueInputRef}
      type="range"
      value={Math.round(hue)}
    />
    <svg
      aria-hidden="true"
      className="patternmode-halo-picker__arc"
      onPointerCancel={onPointerCancel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      ref={svgRef}
      viewBox={geometry.viewBox}
    >
      <defs>
        <linearGradient
          id={hueGradientId}
          x1="0%"
          x2={geometry.gradientAxis === "horizontal" ? "100%" : "0%"}
          y1="0%"
          y2={geometry.gradientAxis === "horizontal" ? "0%" : "100%"}
        >
          <stop offset="0%" stopColor="#ff3b30" />
          <stop offset="16%" stopColor="#ff9500" />
          <stop offset="33%" stopColor="#ffcc00" />
          <stop offset="50%" stopColor="#34c759" />
          <stop offset="66%" stopColor="#0a84ff" />
          <stop offset="83%" stopColor="#5856d6" />
          <stop offset="100%" stopColor="#ff2d55" />
        </linearGradient>
      </defs>
      <path
        className="patternmode-halo-picker__arc-path"
        d={geometry.arcPath}
        stroke={`url(#${hueGradientId})`}
        strokeWidth={HALO_ARC_STROKE_WIDTH}
      />
      <circle
        className="patternmode-halo-picker__arc-handle"
        cx={hueHandle.x}
        cy={hueHandle.y}
        fill={hex}
        r="6"
      />
    </svg>
  </>
);

/** Round saturation/lightness pad with a compact hue smile arc. */
export const HaloPicker = ({
  className,
  label = "Color",
  onChange,
  placement = "bottom",
  showValue = true,
  style,
  value,
  ...props
}: HaloPickerProps) => {
  const isPadDraggingRef = useRef(false);
  const isHueDraggingRef = useRef(false);
  const padRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hueInputRef = useRef<HTMLInputElement>(null);
  const hueGradientId = useId();
  const geometry = getHaloGeometry(placement);
  const hex = hslToHex(value.h, value.s, value.l);
  const padHandle = getHaloPadHandlePosition(value.s, value.l);
  const hueHandle = getHaloHueHandlePosition(value.h, placement);
  const padLeft = geometry.centerX - HALO_PAD_RADIUS;
  const padTop = geometry.centerY - HALO_PAD_RADIUS;
  const rootStyle = getRootStyle(value.h, hex, style);

  const updatePad = (clientX: number, clientY: number) => {
    const pad = padRef.current;
    if (!pad) {
      return;
    }

    onChange({ ...value, ...pointerToHaloPad(clientX, clientY, pad.getBoundingClientRect()) });
  };

  const updateHue = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) {
      return;
    }

    onChange({
      ...value,
      h: pointerToHaloHue(clientX, clientY, svg.getBoundingClientRect(), placement),
    });
  };

  const onPadPointerDown = (event: HaloPadPointerEvent) => {
    // Only the primary button commits a color — not a right-click.
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    /* `preventDefault` above suppresses the compatibility mousedown, and with it
       the default action that moves focus — so without this the pad advertises
       arrow-key adjustment through `role="slider"` and `tabIndex={0}` that a
       user can never reach after clicking it. Pointer capture is not the cause;
       an uncaptured `preventDefault` loses focus the same way. */
    event.currentTarget.focus();
    setPointerCapture(event);
    isPadDraggingRef.current = true;
    updatePad(event.clientX, event.clientY);
  };

  const onPadPointerMove = (event: HaloPadPointerEvent) => {
    /* Pointer capture already delivers every move of a legitimate drag here,
       so drags that started elsewhere are ignored. */
    if (!isPadDraggingRef.current) {
      return;
    }
    updatePad(event.clientX, event.clientY);
  };

  const onPadPointerUp = (event: HaloPadPointerEvent) => {
    releasePointerCapture(event);
    isPadDraggingRef.current = false;
  };

  const onPadKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const next = padColorForKey(event, value);
    if (next) {
      event.preventDefault();
      onChange(next);
    }
  };

  const onHuePointerDown = (event: HaloHuePointerEvent) => {
    // Only the primary button commits a color — not a right-click.
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    /* The arc itself is `aria-hidden` and unfocusable, so its keyboard
       affordance is the visually hidden range input beside it. Focus that
       instead, for the same reason the pad focuses itself. */
    hueInputRef.current?.focus();
    setPointerCapture(event);
    isHueDraggingRef.current = true;
    updateHue(event.clientX, event.clientY);
  };

  const onHuePointerMove = (event: HaloHuePointerEvent) => {
    /* Pointer capture already delivers every move of a legitimate drag here,
       so drags that started elsewhere are ignored. */
    if (!isHueDraggingRef.current) {
      return;
    }
    updateHue(event.clientX, event.clientY);
  };

  const onHueInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, h: normalizeHue(Number(event.currentTarget.value)) });
  };

  const onHuePointerUp = (event: HaloHuePointerEvent) => {
    releasePointerCapture(event);
    isHueDraggingRef.current = false;
  };

  const valueOutput = showValue ? (
    <output className="patternmode-halo-picker__value">{hex}</output>
  ) : null;

  return (
    <fieldset
      {...props}
      className={["patternmode-halo-picker", className].filter(Boolean).join(" ")}
      data-placement={placement}
      data-slot="halo-picker"
      style={rootStyle}
    >
      <legend className="patternmode-halo-picker__legend">{label}</legend>
      {placement === "top" ? valueOutput : null}
      <div
        className="patternmode-halo-picker__stage"
        style={{ height: geometry.height, width: geometry.width }}
      >
        <HaloPad
          hex={hex}
          lightness={value.l}
          onKeyDown={onPadKeyDown}
          onPointerCancel={() => {
            isPadDraggingRef.current = false;
          }}
          onPointerDown={onPadPointerDown}
          onPointerMove={onPadPointerMove}
          onPointerUp={onPadPointerUp}
          padHandle={padHandle}
          padLeft={padLeft}
          padRef={padRef}
          padTop={padTop}
          saturation={value.s}
        />

        <HaloHueArc
          geometry={geometry}
          hex={hex}
          hue={value.h}
          hueGradientId={hueGradientId}
          hueHandle={hueHandle}
          hueInputRef={hueInputRef}
          onHueChange={onHueInputChange}
          onPointerCancel={() => {
            isHueDraggingRef.current = false;
          }}
          onPointerDown={onHuePointerDown}
          onPointerMove={onHuePointerMove}
          onPointerUp={onHuePointerUp}
          svgRef={svgRef}
        />
      </div>
      {placement === "top" ? null : valueOutput}
    </fieldset>
  );
};
