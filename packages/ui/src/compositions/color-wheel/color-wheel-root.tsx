"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import {
  ARC_PATH,
  ARC_STROKE_WIDTH,
  CENTER_X,
  CENTER_Y,
  CONTAINER_HEIGHT,
  CONTAINER_WIDTH,
  getHueHandlePosition,
  getPadHandlePosition,
  hslToHex,
  PAD_RADIUS,
  PAD_SIZE,
  pointerToHue,
  pointerToPadSL,
  SVG_VIEWBOX,
} from "./color-wheel-utils";

export type { ColorWheelValue } from "./color-wheel-utils";

import type { ColorWheelValue } from "./color-wheel-utils";

export interface ColorWheelProps {
  onChange: (value: ColorWheelValue) => void;
  value: ColorWheelValue;
}

/** Concentric saturation/lightness pad + hue arc picker. */
export function ColorWheel({ value, onChange }: ColorWheelProps) {
  const [isPadDragging, setIsPadDragging] = useState(false);
  const [isHueDragging, setIsHueDragging] = useState(false);
  const padRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hueGradientId = useId();

  const hex = useMemo(
    () => hslToHex(value.h, value.s, value.l),
    [value.h, value.s, value.l],
  );

  const padHandle = useMemo(
    () => getPadHandlePosition(value.s, value.l),
    [value.s, value.l],
  );

  const hueHandle = useMemo(() => getHueHandlePosition(value.h), [value.h]);

  // ── Pad pointer handlers ─────────────────────────────────────────────

  const handlePadPointer = useCallback(
    (clientX: number, clientY: number) => {
      const pad = padRef.current;
      if (!pad) {
        return;
      }
      const rect = pad.getBoundingClientRect();
      const { s, l } = pointerToPadSL(clientX, clientY, rect);
      onChange({ ...value, s, l });
    },
    [value, onChange],
  );

  const onPadPointerDown = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsPadDragging(true);
      handlePadPointer(event.clientX, event.clientY);
    },
    [handlePadPointer],
  );

  const onPadPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!(isPadDragging || event.buttons === 1)) {
        return;
      }
      handlePadPointer(event.clientX, event.clientY);
    },
    [isPadDragging, handlePadPointer],
  );

  const onPadPointerUp = useCallback((event: React.PointerEvent) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsPadDragging(false);
  }, []);

  // ── Hue arc pointer handlers ─────────────────────────────────────────

  const handleHuePointer = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) {
        return;
      }
      const rect = svg.getBoundingClientRect();
      const h = pointerToHue(clientX, clientY, rect);
      onChange({ ...value, h });
    },
    [value, onChange],
  );

  const onHuePointerDown = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsHueDragging(true);
      handleHuePointer(event.clientX, event.clientY);
    },
    [handleHuePointer],
  );

  const onHuePointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!(isHueDragging || event.buttons === 1)) {
        return;
      }
      handleHuePointer(event.clientX, event.clientY);
    },
    [isHueDragging, handleHuePointer],
  );

  const onHuePointerUp = useCallback((event: React.PointerEvent) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsHueDragging(false);
  }, []);

  // ── Pad position within the container ────────────────────────────────

  const padLeft = CENTER_X - PAD_RADIUS;
  const padTop = CENTER_Y - PAD_RADIUS;

  return (
    <div
      className="relative"
      style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
    >
      {/* Saturation/Lightness circular pad */}
      <div
        className="absolute touch-none rounded-full border border-black/8"
        onPointerCancel={() => setIsPadDragging(false)}
        onPointerDown={onPadPointerDown}
        onPointerMove={onPadPointerMove}
        onPointerUp={onPadPointerUp}
        ref={padRef}
        style={{
          left: padLeft,
          top: padTop,
          width: PAD_SIZE,
          height: PAD_SIZE,
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: `hsl(${value.h} 100% 50%)` }}
        />
        <div className="absolute inset-0 rounded-full bg-[linear-gradient(to_right,#fff,transparent)]" />
        <div className="absolute inset-0 rounded-full bg-[linear-gradient(to_top,#000,transparent)]" />
        <div
          className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0_/_0.25)]"
          style={{
            backgroundColor: hex,
            left: `${padHandle.x}px`,
            top: `${padHandle.y}px`,
          }}
        />
      </div>

      {/* Hue arc SVG overlay */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 touch-none"
        onPointerCancel={() => setIsHueDragging(false)}
        onPointerDown={onHuePointerDown}
        onPointerMove={onHuePointerMove}
        onPointerUp={onHuePointerUp}
        ref={svgRef}
        style={{ pointerEvents: "none" }}
        viewBox={SVG_VIEWBOX}
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
          d={ARC_PATH}
          fill="none"
          stroke={`url(#${hueGradientId})`}
          strokeLinecap="round"
          strokeWidth={ARC_STROKE_WIDTH}
          style={{ pointerEvents: "stroke" }}
        />
        <circle
          cx={hueHandle.x}
          cy={hueHandle.y}
          fill={hex}
          r="6"
          stroke="white"
          strokeWidth="2"
          style={{ pointerEvents: "auto" }}
        />
      </svg>
    </div>
  );
}
