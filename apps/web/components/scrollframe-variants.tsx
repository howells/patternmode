import { ScrollFrame } from "@patternmode/scrollframe";

import { VariantCell, VariantsBlock } from "@/components/variant-cells";
import "./scrollframe-variants.css";

const lineWidths = [90, 70, 96, 60, 84, 76, 92, 64];
const swatches = ["#C9B79C", "#8F7A62", "#B7B1A6", "#6D6152", "#A89883"];

const Lines = ({ widths = lineWidths }: { widths?: number[] }) => (
  <div className="sfv-lines">
    {widths.map((width, index) => (
      // oxlint-disable-next-line react/no-array-index-key -- fixed decorative bars
      <span className="sfv-line" key={index} style={{ width }} />
    ))}
  </div>
);

export const ScrollFrameVariants = () => (
  <VariantsBlock
    id="variants-title"
    lead="Choose the axes, how scrollbars show, and which edges fade."
  >
    <VariantCell code='axes="vertical"' name="Vertical">
      <ScrollFrame
        aria-label="Vertical"
        className="sfv-card sfv-card-narrow"
        fadeColor="var(--card)"
      >
        <Lines />
      </ScrollFrame>
    </VariantCell>

    <VariantCell code='axes="horizontal" scrollbars="hidden"' name="Horizontal, no scrollbar">
      <ScrollFrame
        aria-label="Horizontal"
        axes="horizontal"
        className="sfv-strip"
        fadeColor="var(--muted)"
        scrollbars="hidden"
      >
        <div className="sfv-swatches">
          {swatches.map((color) => (
            <span className="sfv-swatch" key={color} style={{ background: color }} />
          ))}
        </div>
      </ScrollFrame>
    </VariantCell>

    <VariantCell code='axes="both" scrollbars="always"' name="Both axes, always shown">
      <ScrollFrame
        aria-label="Both axes"
        axes="both"
        className="sfv-card sfv-card-wide"
        fadeColor="var(--card)"
        scrollbars="always"
      >
        <Lines widths={[220, 180, 200, 210, 190, 220, 170, 200]} />
      </ScrollFrame>
    </VariantCell>

    <VariantCell code='fades="end"' name="End fade only">
      <ScrollFrame
        aria-label="End fade only"
        className="sfv-card sfv-card-narrow"
        fadeColor="var(--card)"
        fades="end"
      >
        <Lines />
      </ScrollFrame>
    </VariantCell>

    <VariantCell code='fadeMode="mask"' name="Mask over any background">
      <div className="sfv-backdrop">
        <ScrollFrame
          aria-label="Mask over any background"
          className="sfv-mask"
          contentClassName="sfv-mask-content"
          fadeMode="mask"
          fades="end"
        >
          <Lines />
        </ScrollFrame>
      </div>
    </VariantCell>

    <VariantCell code='controls scrollStep="page"' name="Previous and next">
      <ScrollFrame
        aria-label="Previous and next"
        axes="horizontal"
        className="sfv-strip"
        controls={{ visibility: "disabled" }}
        fadeColor="var(--muted)"
        scrollbars="hidden"
        scrollStep="page"
      >
        <div className="sfv-swatches">
          {swatches.map((color) => (
            <span className="sfv-swatch" key={color} style={{ background: color }} />
          ))}
        </div>
      </ScrollFrame>
    </VariantCell>
  </VariantsBlock>
);
