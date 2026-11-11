"use client";

import { Verge } from "@patternmode/verge";
import { useState } from "react";
import { VariantCell, VariantsBlock } from "@/components/variant-cells";
import { ActionIcon, RowAction } from "./verge-action";
import "./verge-variants.css";

const MenuOpenRow = () => {
  const [open, setOpen] = useState(true);
  return (
    <Verge.Root
      as="div"
      className="vv-row"
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      }}
    >
      <span className="vv-name">Menu open</span>
      <Verge.Slot>
        <button
          aria-expanded={open}
          aria-label="More actions"
          className="vv-more"
          onClick={() => {
            setOpen(!open);
          }}
          type="button"
        >
          <ActionIcon action="more" />
        </button>
      </Verge.Slot>
      {open ? (
        <div className="vv-menu">
          <button className="vv-menu-item" type="button">
            Duplicate
          </button>
          <button className="vv-menu-item vv-menu-danger" type="button">
            Delete
          </button>
        </div>
      ) : null}
    </Verge.Root>
  );
};

export const VergeVariants = () => (
  <VariantsBlock
    id="variants-title"
    lead="Only opacity and pointer events change. The slot takes the same width at rest and revealed."
  >
    <VariantCell code="slots={3}" name="Rows align on one column">
      <div className="vv-rows">
        <Verge.Root className="vv-row">
          <span className="vv-name">Two controls</span>
          <Verge.Slot slots={3} visible>
            <RowAction action="edit" />
            <RowAction action="more" />
          </Verge.Slot>
        </Verge.Root>
        <Verge.Root className="vv-row">
          <span className="vv-name">One control</span>
          <Verge.Slot slots={3} visible>
            <RowAction action="more" />
          </Verge.Slot>
        </Verge.Root>
      </div>
    </VariantCell>

    <VariantCell code="@media (hover: none)" name="Always visible, 48px targets">
      <Verge.Root className="vv-row vv-touch">
        <span className="vv-name">On a touch screen</span>
        <Verge.Slot visible>
          <RowAction action="edit" />
          <RowAction action="more" />
        </Verge.Slot>
      </Verge.Root>
    </VariantCell>

    <VariantCell code='aria-expanded="true"' name="Stays while its menu is open">
      <div className="vv-menu-stage">
        <MenuOpenRow />
      </div>
    </VariantCell>

    <VariantCell code="visible" name="Held open mid-action">
      <Verge.Root className="vv-row">
        <span className="vv-name">Saving</span>
        <Verge.Slot visible>
          <span aria-hidden="true" className="vv-spinner">
            <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 16 16" width="16">
              <path
                d="M8 2a6 6 0 1 1-6 6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
          </span>
        </Verge.Slot>
      </Verge.Root>
    </VariantCell>
  </VariantsBlock>
);
