"use client";

import { createStacksheet, Sheet } from "@patternmode/stacksheet";
import { useEffect } from "react";

import { SheetStage } from "@/components/sheet-stage";
import "./stacksheet-demo.css";

const SWATCHES = [
  { hex: "#315C4B", name: "Evergreen" },
  { hex: "#D9A441", name: "Saffron" },
  { hex: "#9B3D32", name: "Oxblood" },
  { hex: "#B5A38F", name: "Clay" },
  { hex: "#E8E1D6", name: "Linen" },
  { hex: "#1F2A2E", name: "Slate" },
];

const ORDERS = [
  { id: "0412", total: "18.90" },
  { id: "0411", total: "12.60" },
  { id: "0410", total: "31.50" },
];

interface DemoSheets {
  Colour: { index: number };
  Palette: Record<string, never>;
}

const { StacksheetProvider, store, useSheet, useStacksheetState } = createStacksheet<DemoSheets>({
  closeOnEscape: true,
  maxWidth: "100%",
  modal: false,
  side: "right",
  spring: "subtle",
  stacking: { offsetStep: 28, opacityStep: 0.15, radius: 12, scaleStep: 0.047 },
  width: 420,
  zIndex: 30,
});

// Every sheet takes its own id, so the same colour can sit in the stack twice.
let sheetCount = 0;
const nextId = (kind: string) => {
  sheetCount += 1;
  return `${kind}-${sheetCount}`;
};

const Chevron = () => (
  <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
    <path
      d="M10 3L5 8l5 5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const Cross = () => (
  <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
  </svg>
);

const Header = ({ title }: { title: string }) => (
  <Sheet.Header className="plate-sheet-header">
    <Sheet.Back>
      <Chevron />
    </Sheet.Back>
    <Sheet.Title>{title}</Sheet.Title>
    <Sheet.Close>
      <Cross />
    </Sheet.Close>
  </Sheet.Header>
);

const PaletteSheet = () => {
  const { push } = useSheet();
  return (
    <>
      <Header title="Palette" />
      <Sheet.Body>
        <ul className="plate-swatches">
          {SWATCHES.map((swatch, index) => (
            <li key={swatch.name}>
              <button
                className="plate-swatch"
                onClick={() => {
                  push("Colour", nextId("colour"), { index });
                }}
                type="button"
              >
                <span className="plate-dot" style={{ background: swatch.hex }} />
                {swatch.name}
                <span className="plate-value">{swatch.hex}</span>
              </button>
            </li>
          ))}
        </ul>
      </Sheet.Body>
    </>
  );
};

const ColourSheet = ({ index }: { index: number }) => {
  const { push, replace } = useSheet();
  const swatch = SWATCHES[index];
  if (swatch === undefined) {
    throw new Error(`No swatch ${index}`);
  }
  const next = (index + 1) % SWATCHES.length;

  return (
    <>
      <Header title={swatch.name} />
      <Sheet.Body>
        <div className="plate-colour">
          <span className="plate-field" style={{ background: swatch.hex }} />
          <dl className="plate-facts">
            <div>
              <dt>Hex</dt>
              <dd>{swatch.hex}</dd>
            </div>
            <div>
              <dt>Swatches in order</dt>
              <dd>{SWATCHES.length}</dd>
            </div>
          </dl>
          <div className="plate-actions">
            <button
              onClick={() => {
                push("Palette", nextId("palette"), {});
              }}
              type="button"
            >
              Push palette
            </button>
            <button
              onClick={() => {
                replace("Colour", nextId("colour"), { index: next });
              }}
              type="button"
            >
              Replace
            </button>
          </div>
        </div>
      </Sheet.Body>
    </>
  );
};

const sheets = { Colour: ColourSheet, Palette: PaletteSheet };

/** The page the sheets open over. Its rows open the stack again once it is cleared. */
const Orders = () => {
  const { open } = useSheet();
  const { isOpen } = useStacksheetState();

  return (
    <>
      <div className="plate-orders">
        <h2 className="plate-orders-title">Orders</h2>
        {ORDERS.map((order) => (
          <button
            className="plate-order"
            key={order.id}
            onClick={() => {
              open("Palette", nextId("palette"), {});
            }}
            type="button"
          >
            Sample order {order.id}
            <span className="plate-value">{order.total}</span>
          </button>
        ))}
      </div>
      {isOpen ? <div className="plate-scrim" /> : null}
    </>
  );
};

export const StacksheetDemo = () => {
  // The page opens two sheets deep, as the stack is meant to be seen.
  useEffect(() => {
    const { open, push } = store.getState();
    open("Palette", nextId("palette"), {});
    push("Colour", nextId("colour"), { index: 0 });
  }, []);

  return (
    <StacksheetProvider classNames={{ panel: "plate-panel" }} layout="composable" sheets={sheets}>
      <SheetStage className="plate-stage" inset={[16, 16, 16, 16]} radius={12} zIndex={30}>
        <Orders />
      </SheetStage>
    </StacksheetProvider>
  );
};
