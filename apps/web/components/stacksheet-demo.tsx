"use client";

import { createStacksheet } from "@patternmode/stacksheet";

interface Colour {
  hex: string;
  name: string;
  share: number;
}

interface Palette {
  colours: Colour[];
  id: string;
  name: string;
}

const PALETTES: Palette[] = [
  {
    colours: [
      { hex: "#315C4B", name: "Evergreen", share: 48 },
      { hex: "#D9A441", name: "Saffron", share: 30 },
      { hex: "#9B3D32", name: "Oxblood", share: 22 },
    ],
    id: "harvest",
    name: "Harvest",
  },
  {
    colours: [
      { hex: "#B5A38F", name: "Clay", share: 40 },
      { hex: "#E8E1D6", name: "Linen", share: 35 },
      { hex: "#9B3D32", name: "Oxblood", share: 25 },
    ],
    id: "terrace",
    name: "Terrace",
  },
  {
    colours: [
      { hex: "#1F2A2E", name: "Slate", share: 55 },
      { hex: "#315C4B", name: "Evergreen", share: 30 },
      { hex: "#A97C4F", name: "Bronze", share: 15 },
    ],
    id: "dusk",
    name: "Dusk",
  },
];

const FIT = { height: "fit" } as const;

const findPalette = (id: string): Palette => {
  const palette = PALETTES.find((item) => item.id === id);
  if (palette === undefined) {
    throw new Error(`Unknown palette ${id}`);
  }
  return palette;
};

interface DemoSheets {
  Colour: { index: number; paletteId: string };
  Palette: { paletteId: string };
}

const { StacksheetProvider, useSheet, useStacksheetState } = createStacksheet<DemoSheets>({
  side: { desktop: "right", mobile: "bottom" },
  spring: "subtle",
  stacking: {
    opacityStep: 0.04,
    radius: 10,
    scaleStep: 0.035,
  },
  width: 430,
});

const PaletteBar = ({ colours }: { colours: Colour[] }) => (
  <span aria-hidden="true" className="palette-bar">
    {colours.map((colour) => (
      <span key={colour.name} style={{ background: colour.hex, flexGrow: colour.share }} />
    ))}
  </span>
);

const PaletteSheet = ({ paletteId }: { paletteId: string }) => {
  const sheet = useSheet();
  const palette = findPalette(paletteId);

  return (
    <div className="sheet-panel-content">
      <h3>{palette.name}</h3>
      <PaletteBar colours={palette.colours} />
      <ul className="palette-rows">
        {palette.colours.map((colour, index) => (
          <li key={colour.name}>
            <button
              className="palette-row"
              onClick={() => {
                sheet.push(
                  "Colour",
                  `${palette.id}-${colour.name}`,
                  {
                    index,
                    paletteId: palette.id,
                  },
                  FIT,
                );
              }}
              type="button"
            >
              <span className="palette-dot" style={{ background: colour.hex }} />
              <span className="palette-row-name">{colour.name}</span>
              <span className="palette-row-value">{colour.share}%</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ColourSheet = ({ index, paletteId }: { index: number; paletteId: string }) => {
  const sheet = useSheet();
  const palette = findPalette(paletteId);
  const colour = palette.colours[index];
  if (colour === undefined) {
    throw new Error(`No colour ${index} in ${paletteId}`);
  }
  const nextIndex = (index + 1) % palette.colours.length;
  const next = palette.colours[nextIndex];

  return (
    <div className="sheet-panel-content">
      <h3>{colour.name}</h3>
      <span className="colour-sheet-fill" style={{ background: colour.hex }} />
      <dl className="colour-sheet-facts">
        <div>
          <dt>Hex</dt>
          <dd>{colour.hex}</dd>
        </div>
        <div>
          <dt>Share of {palette.name}</dt>
          <dd>{colour.share}%</dd>
        </div>
      </dl>
      {next === undefined ? null : (
        <div className="sheet-action-row">
          <button
            onClick={() => {
              sheet.replace(
                "Colour",
                `${palette.id}-${next.name}`,
                {
                  index: nextIndex,
                  paletteId: palette.id,
                },
                FIT,
              );
            }}
            type="button"
          >
            Next: {next.name}
          </button>
        </div>
      )}
    </div>
  );
};

const sheets = {
  Colour: ColourSheet,
  Palette: PaletteSheet,
};

const sheetCount = (count: number) => {
  if (count === 0) {
    return "No sheets open";
  }
  return count === 1 ? "1 sheet open" : `${count} sheets open`;
};

const Launcher = () => {
  const sheet = useSheet();
  const { stack } = useStacksheetState();

  return (
    <div className="stacksheet-launcher">
      <ul className="palette-rows">
        {PALETTES.map((palette) => (
          <li key={palette.id}>
            <button
              className="palette-row"
              onClick={() => {
                sheet.open("Palette", palette.id, { paletteId: palette.id }, FIT);
              }}
              type="button"
            >
              <PaletteBar colours={palette.colours} />
              <span className="palette-row-name">{palette.name}</span>
              <span className="palette-row-value">{palette.colours.length} colours</span>
            </button>
          </li>
        ))}
      </ul>
      <p aria-live="polite" className="demo-state">
        {sheetCount(stack.length)}
      </p>
    </div>
  );
};

export const StacksheetDemo = () => (
  <StacksheetProvider
    classNames={{
      backdrop: "stacksheet-backdrop",
      panel: "stacksheet-panel",
    }}
    sheets={sheets}
  >
    <div className="demo-block">
      <Launcher />
    </div>
  </StacksheetProvider>
);
