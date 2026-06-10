"use client";

import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  KeyboardEvent,
  PointerEvent,
  RefObject,
} from "react";
import { useEffect, useId, useRef, useState } from "react";

import {
  buildBriolettePalette,
  BRIOLETTE_MAX_DEPTH,
  nearestBrioletteFace,
} from "./briolette-colors";
import type { BrioletteView } from "./briolette-colors";
import {
  BRIOLETTE_VIEWBOX_SIZE,
  orientationFacingFront,
  projectBrioletteFaces,
  quatSlerp,
  rotateBrioletteOrientation,
} from "./briolette-geometry";
import type {
  BrioletteDensity,
  BrioletteFace,
  BrioletteProjectedFace,
  BrioletteQuat,
  BrioletteVec3,
} from "./briolette-geometry";
import { facesForDensity, useBrioletteMorph } from "./briolette-morph";
import type { BrioletteMorphLayers } from "./briolette-morph";

declare module "react" {
  interface CSSProperties {
    "--patternmode-briolette-color"?: string;
    "--patternmode-briolette-facet"?: string;
    "--patternmode-briolette-seam"?: string;
    "--patternmode-briolette-seam-opacity"?: string;
    "--patternmode-briolette-seam-width"?: string;
  }
}

type BriolettePickerRootProps = Omit<ComponentPropsWithoutRef<"div">, "onChange">;
type BriolettePointerEvent = PointerEvent<SVGSVGElement>;

export interface BriolettePickerProps extends BriolettePickerRootProps {
  /**
   * Facet density of the sphere: `"coarse"` is 20 facets, `"base"` is 80,
   * `"fine"` is 180, `"brilliant"` is 320. Finer cuts offer more colors per
   * view at the cost of smaller click targets; seam width scales down as
   * density rises. Changing the cut animates — the finer geometry grows out
   * of (or collapses back into) the coarser one.
   *
   * @default "base"
   */
  density?: BrioletteDensity;
  /**
   * Accessible name for the sphere stage.
   *
   * @default "Color"
   */
  label?: string;
  /** Called with the facet's hex color on selection, or `null` when unset. */
  onChange: (value: string | null) => void;
  /**
   * Seam color between facets. Falls back to the
   * `--patternmode-briolette-seam` CSS variable, then white.
   */
  seamColor?: string;
  /**
   * Seam visibility from `0` (a seamless gem) to `1` (full seams). Facet
   * strokes blend between the facet's own fill and the seam color, so edges
   * stay crack-free at every opacity.
   *
   * @default 1
   */
  seamOpacity?: number;
  /**
   * Whether to show the selected hex value underneath the sphere.
   *
   * @default true
   */
  showValue?: boolean;
  /**
   * Rendered size of the sphere in pixels.
   *
   * @default 280
   */
  size?: number;
  /** Controlled hex color value, or `null` when nothing is selected. */
  value: string | null;
}

const DRAG_RADIANS_PER_PIXEL = 0.008;
const KEYBOARD_STEP = Math.PI / 15;
const CLICK_MOVEMENT_LIMIT = 6;
const IDLE_YAW_PER_MS = 0.000_07;
const IDLE_PITCH_PER_MS = 0.000_013;
const INERTIA_DECAY_PER_FRAME = 0.94;
const INERTIA_REST_SPEED = 0.000_02;
const MAX_FRAME_MS = 64;
const CENTER_TWEEN_MS = 520;

/** Finer cuts get more delicate seams. */
const SEAM_WIDTHS: Record<BrioletteDensity, number> = {
  base: 1.25,
  brilliant: 0.75,
  coarse: 1.5,
  fine: 1,
};

const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;

const BrioletteHint = ({ id }: { id: string }) => (
  <span className="patternmode-briolette__hint" id={id}>
    Drag or use arrow keys to spin. Select a facet to refine the colors around it. Select the pinned
    facet again to clear.
  </span>
);

const BrioletteValue = ({ value }: { value: string | null }) => (
  <output aria-live="polite" className="patternmode-briolette__value">
    {value ?? "—"}
  </output>
);

const ignoreFaceClick = () => {
  // Selection pauses for the few hundred ms of a cut morph.
};

interface BrioletteSelection {
  faceCount: number;
  view: BrioletteView;
}

/**
 * Makes the value prop fully controllable: a hex supplied from outside (not
 * from a facet click) re-anchors the neighborhood around the facet whose
 * universe color is nearest, and glides it to the center. Adjusted during
 * render; the glide itself runs after commit.
 */
const useExternalValueAnchor = (
  value: string | null,
  faces: BrioletteFace[],
  selection: BrioletteSelection | null,
  setSelection: (update: (current: BrioletteSelection | null) => BrioletteSelection | null) => void,
  centerOn: (center: BrioletteVec3) => void,
) => {
  const [anchoredValue, setAnchoredValue] = useState(value);
  const pendingCenterRef = useRef<BrioletteVec3 | null>(null);

  if (value !== anchoredValue) {
    setAnchoredValue(value);
    if (value !== null && value !== selection?.view.anchorHex) {
      const anchorFace = nearestBrioletteFace(faces, value);
      if (anchorFace) {
        setSelection((current) => ({
          faceCount: faces.length,
          view: {
            anchorFaceIndex: anchorFace.index,
            anchorHex: value,
            depth: current?.faceCount === faces.length ? current.view.depth : 1,
          },
        }));
        pendingCenterRef.current = anchorFace.center;
      }
    }
  }

  useEffect(() => {
    if (pendingCenterRef.current) {
      centerOn(pendingCenterRef.current);
      pendingCenterRef.current = null;
    }
  });

  return setAnchoredValue;
};

interface BrioletteTween {
  duration: number;
  elapsed: number;
  from: BrioletteQuat;
  to: BrioletteQuat;
}

/** Friendly three-quarter starting orientation. */
const INITIAL_ORIENTATION: BrioletteQuat = rotateBrioletteOrientation(
  { w: 1, x: 0, y: 0, z: 0 },
  -0.55,
  0.42,
);

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getRootStyle = (
  value: string | null,
  seamColor: string | undefined,
  seamOpacity: number,
  seamWidth: number,
  style: CSSProperties | undefined,
): CSSProperties => ({
  "--patternmode-briolette-color": value ?? "transparent",
  "--patternmode-briolette-seam-opacity": String(Math.min(Math.max(seamOpacity, 0), 1)),
  "--patternmode-briolette-seam-width": String(seamWidth),
  ...(seamColor === undefined ? null : { "--patternmode-briolette-seam": seamColor }),
  ...style,
});

const useViewportPresence = (stageRef: RefObject<HTMLDivElement | null>) => {
  const isInViewportRef = useRef(true);

  useEffect(() => {
    const stage = stageRef.current;
    const observer =
      stage && typeof IntersectionObserver === "function"
        ? new IntersectionObserver(([entry]) => {
            isInViewportRef.current = entry?.isIntersecting ?? true;
          })
        : null;
    if (stage && observer) {
      observer.observe(stage);
    }
    return () => {
      observer?.disconnect();
    };
  }, [stageRef]);

  return isInViewportRef;
};

interface BrioletteMotionRefs {
  isInViewportRef: RefObject<boolean>;
  isPointerActiveRef: RefObject<boolean>;
  tweenRef: RefObject<BrioletteTween | null>;
  velocityRef: RefObject<{ pitch: number; yaw: number }>;
}

/**
 * The single animation loop: a centering tween takes priority, then release
 * inertia, then idle drift. Drift pauses while a selection is active so the
 * pinned facet stays put; reduced motion opts out of all autonomous motion.
 */
const useIdleMotion = (
  refs: BrioletteMotionRefs,
  setOrientation: (update: (q: BrioletteQuat) => BrioletteQuat) => void,
  isDriftEnabled: boolean,
) => {
  useEffect(() => {
    let frame = 0;
    if (prefersReducedMotion() || typeof requestAnimationFrame !== "function") {
      return () => {
        // No animation scheduled under reduced motion.
      };
    }

    let last = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min(now - last, MAX_FRAME_MS);
      last = now;

      const tween = refs.tweenRef.current;
      if (tween) {
        tween.elapsed += elapsed;
        const t = Math.min(tween.elapsed / tween.duration, 1);
        setOrientation(() => quatSlerp(tween.from, tween.to, easeOutCubic(t)));
        if (t >= 1) {
          refs.tweenRef.current = null;
        }
      } else if (
        !refs.isPointerActiveRef.current &&
        refs.isInViewportRef.current &&
        !document.hidden
      ) {
        const velocity = refs.velocityRef.current;
        if (Math.hypot(velocity.yaw, velocity.pitch) > INERTIA_REST_SPEED) {
          setOrientation((q) =>
            rotateBrioletteOrientation(q, velocity.yaw * elapsed, velocity.pitch * elapsed),
          );
          const decay = INERTIA_DECAY_PER_FRAME ** (elapsed / 16);
          velocity.yaw *= decay;
          velocity.pitch *= decay;
        } else {
          velocity.yaw = 0;
          velocity.pitch = 0;
          if (isDriftEnabled) {
            setOrientation((q) =>
              rotateBrioletteOrientation(q, IDLE_YAW_PER_MS * elapsed, IDLE_PITCH_PER_MS * elapsed),
            );
          }
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [
    refs.isInViewportRef,
    refs.isPointerActiveRef,
    refs.tweenRef,
    refs.velocityRef,
    setOrientation,
    isDriftEnabled,
  ]);
};

const useBrioletteRotation = (isDriftEnabled: boolean) => {
  const [orientation, setOrientation] = useState<BrioletteQuat>(INITIAL_ORIENTATION);
  const [isDragging, setIsDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ lastTime: 0, lastX: 0, lastY: 0, movement: 0 });
  const isPointerActiveRef = useRef(false);
  const velocityRef = useRef({ pitch: 0, yaw: 0 });
  const tweenRef = useRef<BrioletteTween | null>(null);
  const orientationRef = useRef(orientation);
  orientationRef.current = orientation;
  const isInViewportRef = useViewportPresence(stageRef);

  useIdleMotion(
    { isInViewportRef, isPointerActiveRef, tweenRef, velocityRef },
    setOrientation,
    isDriftEnabled,
  );

  const rotateBy = (yaw: number, pitch: number) => {
    tweenRef.current = null;
    setOrientation((q) => rotateBrioletteOrientation(q, yaw, pitch));
  };

  /** Glide the sphere so `center` ends facing the viewer. Snaps under reduced motion. */
  const centerOn = (center: BrioletteVec3) => {
    const target = orientationFacingFront(orientationRef.current, center);
    velocityRef.current = { pitch: 0, yaw: 0 };
    if (prefersReducedMotion() || typeof requestAnimationFrame !== "function") {
      tweenRef.current = null;
      setOrientation(() => target);
      return;
    }
    tweenRef.current = {
      duration: CENTER_TWEEN_MS,
      elapsed: 0,
      from: orientationRef.current,
      to: target,
    };
  };

  const onPointerDown = (event: BriolettePointerEvent) => {
    event.preventDefault();
    tweenRef.current = null;
    isPointerActiveRef.current = true;
    velocityRef.current = { pitch: 0, yaw: 0 };
    pointerRef.current = {
      lastTime: event.timeStamp,
      lastX: event.clientX,
      lastY: event.clientY,
      movement: 0,
    };
    setIsDragging(true);
  };

  const onPointerMove = (event: BriolettePointerEvent) => {
    if (!isPointerActiveRef.current) {
      return;
    }

    const pointer = pointerRef.current;
    const dx = event.clientX - pointer.lastX;
    const dy = event.clientY - pointer.lastY;
    const elapsed = Math.max(event.timeStamp - pointer.lastTime, 1);
    pointer.lastX = event.clientX;
    pointer.lastY = event.clientY;
    pointer.lastTime = event.timeStamp;
    pointer.movement += Math.abs(dx) + Math.abs(dy);

    // Capture only once the gesture becomes a drag — capturing on pointerdown
    // would retarget the click event away from the facet polygons.
    if (
      pointer.movement > CLICK_MOVEMENT_LIMIT &&
      !event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    const yaw = dx * DRAG_RADIANS_PER_PIXEL;
    const pitch = dy * DRAG_RADIANS_PER_PIXEL;
    rotateBy(yaw, pitch);

    const velocity = velocityRef.current;
    velocity.yaw = velocity.yaw * 0.7 + (yaw / elapsed) * 0.3;
    velocity.pitch = velocity.pitch * 0.7 + (pitch / elapsed) * 0.3;
  };

  const endPointer = (event: BriolettePointerEvent) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    isPointerActiveRef.current = false;
    setIsDragging(false);
    if (prefersReducedMotion()) {
      velocityRef.current = { pitch: 0, yaw: 0 };
    }
  };

  const isClickGesture = () => pointerRef.current.movement <= CLICK_MOVEMENT_LIMIT;

  return {
    centerOn,
    endPointer,
    isClickGesture,
    isDragging,
    onPointerDown,
    onPointerMove,
    orientation,
    rotateBy,
    stageRef,
  };
};

interface BrioletteKeyActions {
  clearSelection: () => void;
  rotateBy: (yaw: number, pitch: number) => void;
  selectFront: () => void;
}

const handleBrioletteKey = (event: KeyboardEvent<HTMLDivElement>, actions: BrioletteKeyActions) => {
  switch (event.key) {
    case "ArrowLeft": {
      event.preventDefault();
      actions.rotateBy(-KEYBOARD_STEP, 0);
      break;
    }
    case "ArrowRight": {
      event.preventDefault();
      actions.rotateBy(KEYBOARD_STEP, 0);
      break;
    }
    case "ArrowUp": {
      event.preventDefault();
      actions.rotateBy(0, -KEYBOARD_STEP);
      break;
    }
    case "ArrowDown": {
      event.preventDefault();
      actions.rotateBy(0, KEYBOARD_STEP);
      break;
    }
    case " ":
    case "Enter": {
      event.preventDefault();
      actions.selectFront();
      break;
    }
    case "Escape": {
      actions.clearSelection();
      break;
    }
    default:
  }
};

const BrioletteFacets = ({
  onFaceClick,
  palette,
  pinHex,
  projected,
  selectedIndex,
}: {
  onFaceClick: (faceIndex: number) => void;
  palette: readonly string[];
  pinHex: string | undefined;
  projected: readonly BrioletteProjectedFace[];
  selectedIndex: number | undefined;
}) => {
  const pinned =
    selectedIndex === undefined
      ? undefined
      : projected.find((face) => face.index === selectedIndex);

  return (
    <>
      {projected.map((face) => (
        <polygon
          className="patternmode-briolette__face"
          data-face-index={face.index}
          data-selected={selectedIndex === face.index || undefined}
          fill={palette[face.index]}
          key={face.index}
          onClick={() => {
            onFaceClick(face.index);
          }}
          points={face.points}
          style={{ "--patternmode-briolette-facet": palette[face.index] }}
        />
      ))}
      {pinned ? (
        <circle
          className="patternmode-briolette__pin"
          cx={pinned.center.x}
          cy={pinned.center.y}
          fill={pinHex}
          r="6"
        />
      ) : null}
    </>
  );
};

const BrioletteMorphSphere = ({
  layers,
  orientation,
}: {
  layers: BrioletteMorphLayers;
  orientation: BrioletteQuat;
}) => (
  <>
    <g>
      <BrioletteFacets
        onFaceClick={ignoreFaceClick}
        palette={layers.under.palette}
        pinHex={undefined}
        projected={projectBrioletteFaces(layers.under.faces, orientation)}
        selectedIndex={undefined}
      />
    </g>
    <g>
      <BrioletteFacets
        onFaceClick={ignoreFaceClick}
        palette={layers.over.palette}
        pinHex={undefined}
        projected={projectBrioletteFaces(layers.over.faces, orientation, layers.over.cull)}
        selectedIndex={undefined}
      />
    </g>
  </>
);

/**
 * A spinnable geodesic color sphere. At rest the facets span the whole
 * color universe; selecting a facet repaints the sphere with that color's
 * nearest neighbors, and selecting the pinned facet again unsets it.
 */
export const BriolettePicker = ({
  "aria-label": ariaLabel,
  className,
  density = "base",
  label = "Color",
  onChange,
  seamColor,
  seamOpacity = 1,
  showValue = true,
  size = 280,
  style,
  value,
  ...props
}: BriolettePickerProps) => {
  const [selection, setSelection] = useState<BrioletteSelection | null>(null);
  const rotation = useBrioletteRotation(value === null);
  const hintId = useId();
  const faces = facesForDensity(density);
  const setAnchoredValue = useExternalValueAnchor(
    value,
    faces,
    selection,
    setSelection,
    rotation.centerOn,
  );

  // External resets (form clears, programmatic unset) collapse back to the
  // universe by derivation — the stored view only applies while a value is
  // set, and only for the density it was selected at.
  const activeView =
    value === null || selection?.faceCount !== faces.length ? null : selection.view;

  const palette = buildBriolettePalette(faces, activeView);
  const projected = projectBrioletteFaces(faces, rotation.orientation);

  // Cut changes animate: the coarser cut sits beneath while the finer cut
  // grows over it (or shrinks away), every vertex interpolated on the sphere.
  const morphLayers = useBrioletteMorph(density, palette, prefersReducedMotion());
  const isMorphing = morphLayers !== null;

  const selectFace = (faceIndex: number) => {
    if (isMorphing) {
      return;
    }
    if (activeView && activeView.anchorFaceIndex === faceIndex) {
      setSelection(null);
      onChange(null);
      return;
    }

    const hex = palette[faceIndex];
    if (hex === undefined) {
      return;
    }

    setSelection({
      faceCount: faces.length,
      view: {
        anchorFaceIndex: faceIndex,
        anchorHex: hex,
        depth: activeView ? Math.min(activeView.depth + 1, BRIOLETTE_MAX_DEPTH) : 1,
      },
    });
    setAnchoredValue(hex);
    onChange(hex);

    const anchorFace = faces[faceIndex];
    if (anchorFace) {
      rotation.centerOn(anchorFace.center);
    }
  };

  const clearSelection = () => {
    if (activeView) {
      setSelection(null);
      onChange(null);
    }
  };

  const selectFront = () => {
    const front = projected.at(-1);
    if (front) {
      selectFace(front.index);
    }
  };

  return (
    <div
      {...props}
      className={["patternmode-briolette", className].filter(Boolean).join(" ")}
      data-slot="briolette-picker"
      style={getRootStyle(value, seamColor, seamOpacity, SEAM_WIDTHS[density], style)}
    >
      {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- the application-role stage is the keyboard surface for rotating and selecting. */}
      <div
        aria-describedby={hintId}
        aria-label={ariaLabel ?? label}
        aria-roledescription="color sphere"
        className="patternmode-briolette__stage"
        onKeyDown={(event) => {
          handleBrioletteKey(event, { clearSelection, rotateBy: rotation.rotateBy, selectFront });
        }}
        ref={rotation.stageRef}
        role="application"
        // oxlint-disable-next-line react-doctor/no-noninteractive-tabindex -- the application-role stage is the keyboard surface for rotating and selecting.
        tabIndex={0}
      >
        <svg
          aria-hidden="true"
          className="patternmode-briolette__svg"
          data-dragging={rotation.isDragging || undefined}
          data-testid="briolette-sphere"
          onPointerCancel={rotation.endPointer}
          onPointerDown={rotation.onPointerDown}
          onPointerMove={rotation.onPointerMove}
          onPointerUp={rotation.endPointer}
          style={{ height: size, width: size }}
          viewBox={`0 0 ${BRIOLETTE_VIEWBOX_SIZE} ${BRIOLETTE_VIEWBOX_SIZE}`}
        >
          {morphLayers ? (
            <BrioletteMorphSphere layers={morphLayers} orientation={rotation.orientation} />
          ) : (
            <BrioletteFacets
              onFaceClick={(faceIndex) => {
                if (rotation.isClickGesture()) {
                  selectFace(faceIndex);
                }
              }}
              palette={palette}
              pinHex={activeView?.anchorHex}
              projected={projected}
              selectedIndex={activeView?.anchorFaceIndex}
            />
          )}
        </svg>
      </div>
      <BrioletteHint id={hintId} />
      {showValue ? <BrioletteValue value={value} /> : null}
    </div>
  );
};
