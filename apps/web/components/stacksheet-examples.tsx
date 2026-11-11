"use client";

import { createStacksheet, Sheet, useSheetPanel } from "@patternmode/stacksheet";
import { Fragment, useState } from "react";
import type { ReactNode } from "react";
import "./stacksheet-demo.css";

const DEMO_CLASSNAMES = {
  backdrop: "stacksheet-backdrop",
  panel: "stacksheet-panel",
};

// ── Row (the quiet launcher) ────────────────────

const Row = ({
  name,
  description,
  onOpen,
}: {
  name: string;
  description: string;
  onOpen: () => void;
}) => (
  <button className="stacksheet-row" onClick={onOpen} type="button">
    <span className="stacksheet-row-name">{name}</span>
    <span className="stacksheet-row-desc">{description}</span>
    <span className="stacksheet-row-open">Open</span>
  </button>
);

// ── Shared sheet content ────────────────────────

const InfoContent = ({ title, body }: { title: string; body: string }) => {
  const { close } = useSheetPanel();
  return (
    <div className="sheet-panel-content">
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="sheet-action-row">
        <button onClick={close} type="button">
          Close
        </button>
      </div>
    </div>
  );
};

const FormContent = () => {
  const { close } = useSheetPanel();
  return (
    <div className="sheet-panel-content">
      <h3>Contact</h3>
      <p>On mobile, focus a field and the sheet lifts above the on-screen keyboard.</p>
      <div className="sheet-form">
        <label>
          Name
          <input aria-label="Name" name="name" placeholder="Ada Lovelace" type="text" />
        </label>
        <label>
          Email
          <input aria-label="Email" name="email" placeholder="ada@example.com" type="email" />
        </label>
        <label>
          Message
          <textarea aria-label="Message" name="message" placeholder="Say hello…" rows={3} />
        </label>
      </div>
      <div className="sheet-action-row">
        <button onClick={close} type="button">
          Done
        </button>
      </div>
    </div>
  );
};

const ComposableContent = () => (
  <>
    <Sheet.Handle />
    <Sheet.Close />
    <Sheet.Body>
      <div className="sheet-panel-content">
        <Sheet.Title>Composable</Sheet.Title>
        <Sheet.Description>
          Built from Sheet Parts, with a floating close and no header bar.
        </Sheet.Description>
      </div>
    </Sheet.Body>
  </>
);

// ── Example factory (open shared InfoContent) ───

type Config = Parameters<typeof createStacksheet>[0];

const makeExample = (opts: {
  name: string;
  description: string;
  config?: Config;
  sheet: { title: string; body: string };
}): ReactNode => {
  const { StacksheetProvider, useSheet } = createStacksheet(opts.config);
  const Node = () => {
    const { open } = useSheet();
    return (
      <Row
        description={opts.description}
        name={opts.name}
        onOpen={() => {
          open(InfoContent, { body: opts.sheet.body, title: opts.sheet.title });
        }}
      />
    );
  };
  return (
    <StacksheetProvider classNames={DEMO_CLASSNAMES}>
      <Node />
    </StacksheetProvider>
  );
};

// ── Nested / stacked (needs push) ───────────────

const nested = createStacksheet<{ level: { depth: number } }>({
  side: { desktop: "right", mobile: "bottom" },
});

const NestedLevel = ({ depth }: { depth: number }) => {
  const { push } = nested.useSheet();
  const { close, back, isNested } = useSheetPanel();
  return (
    <div className="sheet-panel-content">
      <h3>Level {depth}</h3>
      <p>Push keeps the path back: each layer sits behind the next.</p>
      <div className="sheet-action-row">
        <button
          onClick={() => {
            push("level", `nested-${depth + 1}`, { depth: depth + 1 });
          }}
          type="button"
        >
          Push another
        </button>
        <button onClick={isNested ? back : close} type="button">
          {isNested ? "Back" : "Close"}
        </button>
      </div>
    </div>
  );
};

const NestedRow = () => {
  const { open } = nested.useSheet();
  return (
    <Row
      description="Push adds layers while keeping the path back."
      name="Nested / stacked"
      onOpen={() => {
        open("level", "nested-1", { depth: 1 });
      }}
    />
  );
};

const nestedExample = (
  <nested.StacksheetProvider classNames={DEMO_CLASSNAMES} sheets={{ level: NestedLevel }}>
    <NestedRow />
  </nested.StacksheetProvider>
);

// ── Composable layout (Sheet.* parts) ───────────

const composable = createStacksheet({ side: { desktop: "right", mobile: "bottom" } });

const ComposableRow = () => {
  const { open } = composable.useSheet();
  return (
    <Row
      description="Build the panel yourself from Sheet Parts."
      name="Composable layout"
      onOpen={() => {
        open(ComposableContent, {});
      }}
    />
  );
};

const composableExample = (
  <composable.StacksheetProvider classNames={DEMO_CLASSNAMES} layout="composable">
    <ComposableRow />
  </composable.StacksheetProvider>
);

// ── Form / reposition inputs ────────────────────

const form = createStacksheet({ side: "bottom" });

const FormRow = () => {
  const { open } = form.useSheet();
  return (
    <Row
      description="Focus a field on mobile and the sheet clears the keyboard."
      name="Form with inputs"
      onOpen={() => {
        open(FormContent, {});
      }}
    />
  );
};

const formExample = (
  <form.StacksheetProvider classNames={DEMO_CLASSNAMES}>
    <FormRow />
  </form.StacksheetProvider>
);

// ── Rows that open Sheets (buttons, scrolling) ────

const REGIONS = [
  "North",
  "North East",
  "East",
  "South East",
  "South",
  "South West",
  "West",
  "Midlands",
  "Wales",
  "Scotland",
  "Northern Ireland",
  "London",
  "Home Counties",
  "Channel Islands",
  "Isle of Man",
  "Overseas",
];

const rows = createStacksheet<{ region: { depth: number; name: string } }>({
  side: { desktop: "right", mobile: "bottom" },
});

const RegionSheet = ({ depth, name }: { depth: number; name: string }) => {
  const { push } = rows.useSheet();
  return (
    <>
      <Sheet.Handle />
      <Sheet.Close />
      <Sheet.Header className="sheet-panel-content justify-start pb-0">
        <Sheet.Back />
        <Sheet.Title>{name}</Sheet.Title>
      </Sheet.Header>
      <Sheet.Body>
        <nav aria-label={`Regions under ${name}`} className="sheet-link-list">
          {REGIONS.map((region) => (
            <button
              className="stacksheet-row"
              key={region}
              onClick={() => {
                push("region", `region-${depth + 1}-${region}`, { depth: depth + 1, name: region });
              }}
              type="button"
            >
              <span className="stacksheet-row-name">{region}</span>
              <span className="stacksheet-row-open">Open</span>
            </button>
          ))}
        </nav>
      </Sheet.Body>
    </>
  );
};

const RowsRow = () => {
  const { open } = rows.useSheet();
  return (
    <Row
      description="Drag from any row; a tap still opens the next Sheet."
      name="Rows that open Sheets"
      onOpen={() => {
        open("region", "region-0", { depth: 0, name: "Regions" });
      }}
    />
  );
};

const rowsExample = (
  <rows.StacksheetProvider
    classNames={DEMO_CLASSNAMES}
    layout="composable"
    sheets={{ region: RegionSheet }}
  >
    <RowsRow />
  </rows.StacksheetProvider>
);

// ── Fitted height ───────────────────────────────

const fitted = createStacksheet({ side: "bottom" });

const FiltersContent = () => {
  const { close } = useSheetPanel();
  const [filters, setFilters] = useState(["Region", "Rep"]);
  return (
    <>
      <Sheet.Handle />
      <Sheet.Body>
        <div className="sheet-panel-content">
          <Sheet.Title>Filters</Sheet.Title>
          <div className="sheet-list">
            {filters.map((filter) => (
              <span key={filter}>{filter}</span>
            ))}
          </div>
          <div className="sheet-action-row">
            <button
              onClick={() => {
                setFilters((current) => [...current, `Filter ${current.length + 1}`]);
              }}
              type="button"
            >
              Add a filter
            </button>
            <button
              disabled={filters.length === 0}
              onClick={() => {
                setFilters((current) => current.slice(0, -1));
              }}
              type="button"
            >
              Remove one
            </button>
            <button onClick={close} type="button">
              Done
            </button>
          </div>
        </div>
      </Sheet.Body>
    </>
  );
};

const FittedRow = () => {
  const { open } = fitted.useSheet();
  return (
    <Row
      description="As tall as its content; a change in height animates."
      name="Fitted height"
      onOpen={() => {
        open(FiltersContent, {}, { height: "fit" });
      }}
    />
  );
};

const fittedExample = (
  <fitted.StacksheetProvider classNames={DEMO_CLASSNAMES} layout="composable">
    <FittedRow />
  </fitted.StacksheetProvider>
);

// ── Grouped gallery ─────────────────────────────

const groups: { label: string; items: { id: string; node: ReactNode }[] }[] = [
  {
    items: [
      {
        id: "default",
        node: makeExample({
          description: "Side on desktop, bottom sheet on mobile.",
          name: "Default",
          sheet: { body: "The default responsive placement.", title: "Default" },
        }),
      },
      {
        id: "left",
        node: makeExample({
          config: { side: "left" },
          description: "Slides in from the left edge.",
          name: "Left side",
          sheet: { body: "Docked to the left edge.", title: "Left side" },
        }),
      },
      {
        id: "bottom",
        node: makeExample({
          config: { side: "bottom" },
          description: "Bottom sheet on every breakpoint.",
          name: "Bottom sheet",
          sheet: { body: "Drag down to dismiss.", title: "Bottom sheet" },
        }),
      },
    ],
    label: "Placement",
  },
  {
    items: [
      {
        id: "snap",
        node: makeExample({
          config: { side: "bottom", snapPoints: [0.35, 0.6, 1] },
          description: "Drag between fixed snap heights.",
          name: "Snap points",
          sheet: {
            body: "Drag the handle to snap between 35%, 60%, and full height.",
            title: "Snap points",
          },
        }),
      },
      {
        id: "non-dismissible",
        node: makeExample({
          config: { dismissible: false },
          description: "No drag, backdrop, or Escape dismissal.",
          name: "Non-dismissible",
          sheet: { body: "Only the Close button dismisses this one.", title: "Non-dismissible" },
        }),
      },
      {
        id: "non-modal",
        node: makeExample({
          config: { modal: false, side: "bottom" },
          description: "No backdrop, scroll lock, or focus trap.",
          name: "Non-modal",
          sheet: { body: "The page stays interactive behind this sheet.", title: "Non-modal" },
        }),
      },
      {
        id: "scaled",
        node: makeExample({
          config: { shouldScaleBackground: true, side: "bottom" },
          description: "Scales the page behind while open.",
          name: "Scaled background",
          sheet: {
            body: "The gallery behind scales back as this opens.",
            title: "Scaled background",
          },
        }),
      },
      {
        id: "spring",
        node: makeExample({
          config: { side: "bottom", spring: "snappy" },
          description: "Swap the open/close spring preset.",
          name: "Spring preset",
          sheet: {
            body: "Snappy, stiff, and subtle presets ship built in.",
            title: "Snappy spring",
          },
        }),
      },
      { id: "form", node: formExample },
      { id: "fitted", node: fittedExample },
    ],
    label: "Behaviour",
  },
  {
    items: [
      { id: "nested", node: nestedExample },
      { id: "rows", node: rowsExample },
      { id: "composable", node: composableExample },
      {
        id: "handle-outside",
        node: makeExample({
          config: { handle: "outside", side: "bottom" },
          description: "Floats the drag handle above the sheet.",
          name: "Handle outside",
          sheet: {
            body: "The handle sits on the backdrop above the sheet.",
            title: "Outside handle",
          },
        }),
      },
    ],
    label: "Layout",
  },
];

export const StacksheetExamples = () => (
  // data-stacksheet-wrapper is the target `shouldScaleBackground` scales.
  <div className="stacksheet-examples" data-stacksheet-wrapper>
    {groups.map((group) => (
      <section className="stacksheet-group" key={group.label}>
        <p className="stacksheet-group-label">{group.label}</p>
        <div className="stacksheet-group-rows">
          {group.items.map((item) => (
            <Fragment key={item.id}>{item.node}</Fragment>
          ))}
        </div>
      </section>
    ))}
  </div>
);
