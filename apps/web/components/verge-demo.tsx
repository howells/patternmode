"use client";

import { Verge } from "@patternmode/verge";

/**
 * Verge draws nothing at rest, so a demo of it has to be operated rather than
 * looked at. Three rows carry three different reveal states at the same moment:
 * one you reveal with the pointer, one you reveal with the keyboard, and one
 * held open by the `visible` prop — which is exactly what a touch surface
 * renders, where there is no hover to wait for.
 *
 * The rows carry different numbers of controls on purpose, and `slots={3}`
 * holds the same width open on all of them, so the reveal never moves a row.
 *
 * There is deliberately no options bar here, unlike its sibling demos. The
 * candidate was a `slots` on/off toggle, and measuring it in the browser showed
 * it changed nothing observable at this width — the slot is `justify-end`, so
 * the controls' right edge lands on the same axis either way. A control that
 * changes nothing is furniture, and the rest of the page would have to carry it.
 */

interface DemoRow {
  actions: ActionName[];
  held?: boolean;
  name: string;
  trigger: string;
}

type ActionName = "edit" | "more" | "pin";

const ROWS: DemoRow[] = [
  {
    actions: ["edit", "more"],
    name: "Kiln-fired terracotta",
    trigger: "Point at this row",
  },
  {
    actions: ["more"],
    name: "Brushed aluminium",
    trigger: "Or tab into this one",
  },
  {
    actions: ["edit", "pin", "more"],
    held: true,
    name: "End-grain oak",
    trigger: "Held open — what a touch screen renders",
  },
];

const ICON_PATHS: Record<ActionName, string> = {
  edit: "M4 13.5V16h2.5l7.4-7.4-2.5-2.5L4 13.5Zm11.8-6.9a.7.7 0 0 0 0-1L14.4 4.2a.7.7 0 0 0-1 0l-1.2 1.2 2.5 2.5 1.1-1.3Z",
  more: "M5 10h.01M10 10h.01M15 10h.01",
  pin: "M10 3.5 11.9 8l4.6.4-3.5 3.1 1 4.5-4-2.4-4 2.4 1-4.5L3.5 8.4 8.1 8 10 3.5Z",
};

const ICON_LABELS: Record<ActionName, string> = {
  edit: "Rename",
  more: "More actions",
  pin: "Pin",
};

/**
 * 28px visually — one `--patternmode-verge-slot-size` — with the hit area
 * expanded to 48px on coarse pointers only. Verge reserves the slot; it does
 * not own the button, so this obligation is the consumer's and the catalog
 * should be seen discharging it.
 */
const RowAction = ({ action }: { action: ActionName }) => (
  <button aria-label={ICON_LABELS[action]} className="verge-demo-action" type="button">
    <span aria-hidden="true" className="verge-demo-action-hit" />
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.3"
      viewBox="0 0 20 20"
      width="16"
    >
      <path d={ICON_PATHS[action]} />
    </svg>
  </button>
);

export const VergeDemo = () => (
  <ul className="verge-demo-list">
    {ROWS.map((row) => (
      <Verge.Root as="li" className="verge-demo-row" key={row.name}>
        <div className="verge-demo-text">
          <span className="verge-demo-name">{row.name}</span>
          <span className="verge-demo-trigger">{row.trigger}</span>
        </div>
        <Verge.Slot slots={3} visible={row.held}>
          {row.actions.map((action) => (
            <RowAction action={action} key={action} />
          ))}
        </Verge.Slot>
      </Verge.Root>
    ))}
  </ul>
);
