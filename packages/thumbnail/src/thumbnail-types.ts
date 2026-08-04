import type { CssSize } from "@patternmode/system";
import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";

/** How the media fills its frame. */
export type ThumbnailFit = "contain" | "cover";

/** Props for {@link Thumbnail}. */
export interface ThumbnailProps extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  /**
   * Alternative text for the image this renders.
   *
   * Required whenever `src` is given, and required to be empty far more often
   * than people expect: if the row beside the picture already names the thing,
   * `alt=""` is correct and a repeat of the name is noise a screen reader hears
   * instead of a list.
   *
   * Ignored when `children` is used — the caller owns the media element then,
   * and owns its description with it.
   */
  alt?: string;
  /**
   * The media, when it is not a plain `<img>`.
   *
   * Pass an `<Image>`, a `<video>`, a `<canvas>` — anything. The frame clips it
   * and draws its edge over the top without touching the element itself, which
   * is what keeps this compatible with a framework image component rather than
   * competing with one.
   *
   * Mutually exclusive with `src`; passing both renders `children` and ignores
   * `src`.
   */
  children?: ReactNode;
  /**
   * How the media fills its frame.
   *
   * Default `"cover"` — a stamp of fixed footprint, cropped from the centre.
   * `"contain"` is for the case where the whole picture matters more than the
   * grid staying square, which in practice means a preview rather than a row.
   */
  fit?: ThumbnailFit;
  /** `object-position`, for a crop that should not come from the centre. */
  position?: string;
  /**
   * Lift the frame very slightly off the surface behind it.
   *
   * One tight downward layer, not a card shadow. Reach for it when thumbnails
   * sit on the same fill as the surface and need separating from it; leave it
   * off in a dense row, where the inset edge is already doing that job and a
   * shadow per row reads as a list of cards.
   *
   * Default `false`.
   */
  raised?: boolean;
  /**
   * Corner radius. Number is pixels.
   *
   * Default `3px` — small enough to read as a cut corner on a 32px stamp rather
   * than as a rounded button.
   */
  radius?: CssSize;
  ref?: Ref<HTMLSpanElement>;
  /**
   * The frame's edge length. Number is pixels.
   *
   * `null` hands sizing back to the caller: the frame takes its box from the
   * media and its height follows the picture's own aspect ratio, which is what
   * a preview wants and what a row never does.
   *
   * Default `"2rem"` (32px).
   */
  size?: CssSize | null;
  /** Image source. Renders a plain `<img>`; omit it and pass `children` instead. */
  src?: string;
}
