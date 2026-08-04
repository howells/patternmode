"use client";

import { joinClassNames } from "@patternmode/system";
import type { CssSize } from "@patternmode/system";
import type { CSSProperties } from "react";

import type { ThumbnailProps } from "./thumbnail-types";

/** Numbers are pixels; strings pass through as written. */
const toCssSize = (value: CssSize): string => (typeof value === "number" ? `${value}px` : value);

/**
 * A framed image.
 *
 * The frame is an **inset** hairline — an edge drawn inside the picture rather
 * than a border drawn around it — plus, optionally, one tight downward shadow.
 * The distinction is not pedantry. A photograph with an inset edge reads as a
 * window onto the image; the same photograph inside an outer border reads as a
 * form field containing one, which is how imagery ends up looking like a widget
 * on a screen full of widgets.
 *
 * ```tsx
 * <Thumbnail src={thumbHref} alt="" size={32} />
 *
 * <Thumbnail size={null} fit="contain">
 *   <Image src={previewHref} alt={caption} width={640} height={640} />
 * </Thumbnail>
 * ```
 *
 * ## What it guarantees
 *
 * 1. **The edge survives the image.** It is painted by an overlay
 *    pseudo-element, not by `box-shadow: inset` on the frame. An inset shadow
 *    on the frame is painted *behind* its children, so a picture that fills the
 *    box hides it entirely — the effect looks right in a skeleton and vanishes
 *    the moment real media loads. That failure is impossible here.
 * 2. **The edge is translucent, not a border token.** It has to sit over
 *    whatever the photograph happens to be, and a solid colour either
 *    disappears against a dark image or draws a hard line across a pale one.
 * 3. **It works in the dark.** The default edge follows `prefers-color-scheme`
 *    and inverts to a highlight, because on a dark surface the thing that reads
 *    as a shadow falling inside an opening is a light edge, not a black one. A
 *    class-based theme overrides `--patternmode-thumbnail-frame` on its own
 *    selector.
 * 4. **It does not own your image element.** Pass `children` and the frame
 *    clips and edges whatever you give it — a framework `<Image>`, a `<video>`,
 *    a `<canvas>` — without wrapping, cloning or intercepting props.
 *
 * ## Sizing
 *
 * Square at `size` by default, because a thumbnail is a stamp of fixed
 * footprint and a picture that sizes itself is what makes a list ragged.
 * `size={null}` hands that back for the one case that needs it: a preview whose
 * height follows the photograph's own aspect ratio.
 */
export const Thumbnail = ({
  alt = "",
  children,
  className,
  fit = "cover",
  position,
  radius,
  raised = false,
  size = "2rem",
  src,
  style,
  ...props
}: ThumbnailProps) => {
  /*
   * Every knob travels as a custom property rather than as an inline
   * `width`/`box-shadow`, so a consumer can retune one of them from a stylesheet
   * without an inline declaration — which beats every rule in every layer —
   * standing in the way.
   *
   * `fit` is the exception worth noting: it is written unconditionally because
   * it has a default, and an absent custom property would fall back to the
   * `var()` default in the sheet anyway. Writing it keeps the two spellings from
   * drifting apart.
   */
  const frameStyle: CSSProperties = {
    ...(size === null ? {} : { "--patternmode-thumbnail-size": toCssSize(size) }),
    ...(radius === undefined ? {} : { "--patternmode-thumbnail-radius": toCssSize(radius) }),
    ...(position === undefined ? {} : { "--patternmode-thumbnail-position": position }),
    "--patternmode-thumbnail-fit": fit,
    ...style,
  } as CSSProperties;

  return (
    <span
      className={joinClassNames("patternmode-thumbnail", className)}
      data-raised={raised ? "true" : undefined}
      data-sized={size === null ? "false" : "true"}
      data-slot="thumbnail"
      style={frameStyle}
      {...props}
    >
      {children ??
        (src === undefined ? null : (
          /*
           * A plain `<img>`, and no `loading`/`decoding` defaults invented here.
           * Those are a consumer's call — a stamp in a virtualised row wants
           * `loading="lazy"`, a hero above the fold emphatically does not — and
           * a component that guesses is a component that has to be fought.
           *
           * The optimizer rules below point at `next/image`, which a
           * framework-agnostic package cannot import and must not require. The
           * `children` path exists precisely so a Next consumer can hand one in;
           * `src` is the plain case, and it stays plain.
           */
          // oxlint-disable-next-line react-doctor/nextjs-no-img-element, no-img-element
          <img alt={alt} src={src} />
        ))}
    </span>
  );
};
