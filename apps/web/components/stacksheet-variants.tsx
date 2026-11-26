"use client";

import { createStacksheet, Sheet } from "@patternmode/stacksheet";
import type { StacksheetConfig } from "@patternmode/stacksheet";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { SheetStage } from "@/components/sheet-stage";
import { VariantCell, VariantsBlock } from "@/components/variant-cells";
import "@patternmode/stacksheet/styles.css";
import "./stacksheet-demo.css";

/*
 * Each cell is a real Stacksheet held open inside its own box, drawn small:
 * the widths and snap heights are in px for a 328 by 160 cell, so the code
 * under each cell names the prop and the sheet shows what it does.
 */

const Handle = () => <Sheet.Handle />;

const Bars = () => (
  <>
    <Sheet.Handle />
    <div className="cell-bars">
      <span className="w-[120px]" />
      <span className="w-20" />
    </div>
  </>
);

/** Guides at the two lower snap heights, inside the sheet so they rise with it. */
const Guides = () => (
  <>
    <Sheet.Handle />
    <span className="cell-guide bottom-[78px]" />
    <span className="cell-guide bottom-11" />
  </>
);

const Empty = () => null;

type Content = () => ReactNode;

const cell = (
  config: StacksheetConfig,
  Content: Content,
  inset: [number, number, number, number],
  panelClass: string,
) => {
  const { StacksheetProvider, store } = createStacksheet({
    closeOnEscape: false,
    dismissible: false,
    maxWidth: "100%",
    modal: false,
    spring: "subtle",
    ...config,
  });

  const Cell = ({ children }: { children?: ReactNode }) => {
    const [stage, setStage] = useState<HTMLDivElement | null>(null);
    useEffect(() => {
      store.getState().open(Content, {});
    }, []);

    return (
      <StacksheetProvider classNames={{ panel: panelClass }} container={stage} layout="composable">
        <SheetStage className="cell-stage" containerRef={setStage} inset={inset} radius={12}>
          {children}
        </SheetStage>
      </StacksheetProvider>
    );
  };
  return Cell;
};

const SIDE_INSET: [number, number, number, number] = [10, 10, 10, 10];
const BOTTOM_INSET: [number, number, number, number] = [10, 10, 0, 10];

const RightSide = cell({ side: "right", width: 92 }, Empty, SIDE_INSET, "cell-panel");
const LeftSide = cell({ side: "left", width: 92 }, Empty, SIDE_INSET, "cell-panel");
const BottomSheet = cell(
  { side: "bottom", snapPoints: [96] },
  Handle,
  BOTTOM_INSET,
  "cell-panel cell-panel-bottom",
);
const SnapPoints = cell(
  { side: "bottom", snapPoints: [44, 78, 120] },
  Guides,
  BOTTOM_INSET,
  "cell-panel cell-panel-bottom",
);
const Fitted = cell(
  { height: "fit", side: "bottom" },
  Bars,
  BOTTOM_INSET,
  "cell-panel cell-panel-bottom",
);
const NonModal = cell({ side: "right", width: 92 }, Empty, SIDE_INSET, "cell-panel");

export const StacksheetVariants = () => (
  <VariantsBlock
    id="variants-title"
    lead="Set once on the provider, or per sheet when you open it."
  >
    <VariantCell code='side: "right", width: 420' name="Right side">
      <RightSide />
    </VariantCell>
    <VariantCell code='side: "left"' name="Left side">
      <LeftSide />
    </VariantCell>
    <VariantCell code='side: "bottom"' name="Bottom sheet">
      <BottomSheet />
    </VariantCell>
    <VariantCell code="snapPoints: [0.4, 0.75]" name="Snap points">
      <SnapPoints />
    </VariantCell>
    <VariantCell code='height: "fit"' name="Fitted height">
      <Fitted />
    </VariantCell>
    <VariantCell code="modal: false, showOverlay: false" name="Non-modal">
      <NonModal>
        <span className="cell-line top-5 w-[110px]" />
        <span className="cell-line top-9 w-20" />
      </NonModal>
    </VariantCell>
  </VariantsBlock>
);
