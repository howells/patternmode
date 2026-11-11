import type { ReactNode } from "react";
import "./verge-action.css";

export type ActionName = "edit" | "more" | "star";

const ICONS: Record<ActionName, ReactNode> = {
  edit: <path d="M10.5 2.5l3 3L6 13H3v-3z" strokeLinecap="round" strokeLinejoin="round" />,
  more: (
    <g fill="currentColor" stroke="none">
      <circle cx="3.5" cy="8" r="1.4" />
      <circle cx="8" cy="8" r="1.4" />
      <circle cx="12.5" cy="8" r="1.4" />
    </g>
  ),
  star: (
    <path
      d="M8 2l1.8 3.7 4 .6-2.9 2.8.7 4L8 11.2 4.4 13.1l.7-4L2.2 6.3l4-.6z"
      strokeLinejoin="round"
    />
  ),
};

const LABELS: Record<ActionName, string> = {
  edit: "Rename",
  more: "More actions",
  star: "Favourite",
};

export const ActionIcon = ({ action }: { action: ActionName }) => (
  <svg
    aria-hidden="true"
    fill="none"
    height="16"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 16 16"
    width="16"
  >
    {ICONS[action]}
  </svg>
);

/**
 * 28px visually, one `--patternmode-verge-slot-size`, with the hit area
 * expanded to 48px on coarse pointers only. Verge reserves the slot; it does
 * not own the button, so sizing it for a thumb is the consumer's job.
 */
export const RowAction = ({ action }: { action: ActionName }) => (
  <button aria-label={LABELS[action]} className="verge-action" type="button">
    <span aria-hidden="true" className="verge-action-hit" />
    <ActionIcon action={action} />
  </button>
);
