"use client";

import { Verge } from "@patternmode/verge";
import { RowAction } from "./verge-action";
import "./verge-demo.css";

/**
 * Verge draws nothing at rest, so this demo is operated rather than looked at:
 * point at a row, or Tab into it. Every row holds the same three-control width,
 * so the hex values never move.
 */
const ROWS = [
  { hex: "#315C4B", name: "Evergreen" },
  { hex: "#D9A441", name: "Saffron" },
  { hex: "#9B3D32", name: "Oxblood" },
  { hex: "#E1EBE5", name: "Linen" },
] as const;

export const VergeDemo = () => (
  <ul className="verge-demo-list">
    {ROWS.map((row) => (
      <Verge.Root as="li" className="verge-demo-row" key={row.name}>
        <span className="verge-demo-name">{row.name}</span>
        <span className="verge-demo-hex">{row.hex}</span>
        <Verge.Slot slots={3}>
          <RowAction action="edit" />
          <RowAction action="star" />
          <RowAction action="more" />
        </Verge.Slot>
      </Verge.Root>
    ))}
  </ul>
);
