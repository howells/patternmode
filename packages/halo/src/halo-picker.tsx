"use client";

import type { ComponentPropsWithoutRef, CSSProperties, PointerEvent, RefObject } from "react";
import { useId, useRef } from "react";

import {
  getHaloHueHandlePosition,
  getHaloPadHandlePosition,
  HALO_ARC_PATH,
  HALO_ARC_STROKE_WIDTH,
  HALO_CENTER_X,
  HALO_CENTER_Y,
  HALO_HEIGHT,
  HALO_PAD_RADIUS,
  HALO_PAD_SIZE,
  HALO_VIEWBOX,
  HALO_WIDTH,
  hslToHex,
  pointerToHaloHue,
  pointerToHaloPad,
} from "./halo-utils";
import type { HaloColor } from "./halo-utils";

type HaloPickerRootProps = Omit<ComponentPropsWithoutRef<"fieldset">, "onChange" | "value">;
type HaloPadPointerEvent = PointerEvent<HTMLDivElement>;
type HaloHuePointerEvent = PointerEvent<SVGSVGElement>;

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
   * Whether to show the computed hex value underneath the wheel.
   *
   * @default true
   */
  showValue?: boolean;
  /** Controlled HSL color value. */
  value: HaloColor;
}

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

const getRootStyle = (hue: number, hex: string, style: CSSProperties | undefined): CSSProperties =>
  ({
    "--patternmode-halo-color": hex,
    "--patternmode-halo-hue-value": String(hue),
    ...style,
  }) as CSSProperties;

const HaloPad = ({
  hex,
  onPointerCancel,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  padHandle,
  padLeft,
  padRef,
  padTop,
}: {
  hex: string;
  onPointerCancel: () => void;
  onPointerDown: (event: HaloPadPointerEvent) => void;
  onPointerMove: (event: HaloPadPointerEvent) => void;
  onPointerUp: (event: HaloPadPointerEvent) => void;
  padHandle: { x: number; y: number };
  padLeft: number;
  padRef: RefObject<HTMLDivElement | null>;
  padTop: number;
}) => (
  <div
    className="patternmode-halo-picker__pad"
    data-slot="halo-picker-pad"
    data-testid="halo-picker-pad"
    onPointerCancel={onPointerCancel}
    onPointerDown={onPointerDown}
    onPointerMove={onPointerMove}
    onPointerUp={onPointerUp}
    ref={padRef}
    style={{
      height: HALO_PAD_SIZE,
      left: padLeft,
      top: padTop,
      width: HALO_PAD_SIZE,
    }}
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

const HaloHueArc = ({
  hex,
  hue,
  hueGradientId,
  hueHandle,
  onPointerCancel,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  svgRef,
}: {
  hex: string;
  hue: number;
  hueGradientId: string;
  hueHandle: { x: number; y: number };
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
      readOnly
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
      viewBox={HALO_VIEWBOX}
    >
      <defs>
        <linearGradient id={hueGradientId} x1="0%" x2="100%" y1="0%" y2="0%">
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
        d={HALO_ARC_PATH}
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
  showValue = true,
  style,
  value,
  ...props
}: HaloPickerProps) => {
  const isPadDraggingRef = useRef(false);
  const isHueDraggingRef = useRef(false);
  const padRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hueGradientId = useId();
  const hex = hslToHex(value.h, value.s, value.l);
  const padHandle = getHaloPadHandlePosition(value.s, value.l);
  const hueHandle = getHaloHueHandlePosition(value.h);
  const padLeft = HALO_CENTER_X - HALO_PAD_RADIUS;
  const padTop = HALO_CENTER_Y - HALO_PAD_RADIUS;
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

    onChange({ ...value, h: pointerToHaloHue(clientX, clientY, svg.getBoundingClientRect()) });
  };

  const onPadPointerDown = (event: HaloPadPointerEvent) => {
    event.preventDefault();
    setPointerCapture(event);
    isPadDraggingRef.current = true;
    updatePad(event.clientX, event.clientY);
  };

  const onPadPointerMove = (event: HaloPadPointerEvent) => {
    if (!(isPadDraggingRef.current || event.buttons === 1)) {
      return;
    }
    updatePad(event.clientX, event.clientY);
  };

  const onPadPointerUp = (event: HaloPadPointerEvent) => {
    releasePointerCapture(event);
    isPadDraggingRef.current = false;
  };

  const onHuePointerDown = (event: HaloHuePointerEvent) => {
    event.preventDefault();
    setPointerCapture(event);
    isHueDraggingRef.current = true;
    updateHue(event.clientX, event.clientY);
  };

  const onHuePointerMove = (event: HaloHuePointerEvent) => {
    if (!(isHueDraggingRef.current || event.buttons === 1)) {
      return;
    }
    updateHue(event.clientX, event.clientY);
  };

  const onHuePointerUp = (event: HaloHuePointerEvent) => {
    releasePointerCapture(event);
    isHueDraggingRef.current = false;
  };

  return (
    <fieldset
      {...props}
      className={["patternmode-halo-picker", className].filter(Boolean).join(" ")}
      data-slot="halo-picker"
      style={rootStyle}
    >
      <legend className="patternmode-halo-picker__legend">{label}</legend>
      <div
        className="patternmode-halo-picker__stage"
        style={{ height: HALO_HEIGHT, width: HALO_WIDTH }}
      >
        <HaloPad
          hex={hex}
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
        />

        <HaloHueArc
          hex={hex}
          hue={value.h}
          hueGradientId={hueGradientId}
          hueHandle={hueHandle}
          onPointerCancel={() => {
            isHueDraggingRef.current = false;
          }}
          onPointerDown={onHuePointerDown}
          onPointerMove={onHuePointerMove}
          onPointerUp={onHuePointerUp}
          svgRef={svgRef}
        />
      </div>
      {showValue ? <output className="patternmode-halo-picker__value">{hex}</output> : null}
    </fieldset>
  );
};
