"use client";

import { createStacksheet, Sheet, useSheetPanel } from "@patternmode/stacksheet";
import { Fragment } from "react";
import type { ReactNode } from "react";

const DEMO_CLASSNAMES = {
  backdrop: "stacksheet-backdrop",
  panel: "stacksheet-panel",
};

// ── Row (the quiet launcher) ────────────────────

const OpenArrow = () => (
  <svg
    aria-hidden="true"
    fill="none"
    height="12"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="12"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

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
    <span className="stacksheet-row-open">
      Open
      <OpenArrow />
    </span>
  </button>
);

// ── Shared sheet content ────────────────────────

const InfoContent = ({ title, body }: { title: string; body: string }) => {
  const { close } = useSheetPanel();
  return (
    <div className="sheet-panel-content">
      <p className="sheet-kicker">Example</p>
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
      <p className="sheet-kicker">repositionInputs</p>
      <h3>Contact</h3>
      <p>On mobile, focus a field — the sheet lifts above the on-screen keyboard.</p>
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
      <div className="p-6">
        <Sheet.Title className="font-medium">Composable</Sheet.Title>
        <Sheet.Description className="mt-1.5 text-[color:var(--muted)]">
          Built from Sheet Parts — a floating close, no header bar.
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
      <p className="sheet-kicker">Level {depth}</p>
      <h3>Stacked sheet</h3>
      <p>Push keeps the path back — each layer sits behind the next.</p>
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
      description="Focus a field on mobile — the sheet clears the keyboard."
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
    ],
    label: "Behaviour",
  },
  {
    items: [
      { id: "nested", node: nestedExample },
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
