"use client";

import { Deck } from "@patternmode/deck";
import type { ComponentProps, ReactNode } from "react";

import { VariantCell, VariantsBlock } from "@/components/variant-cells";
import "./deck-demo.css";

const TONES = ["front", "mid", "far"] as const;

const Chips = ({
  children,
  ...props
}: {
  children?: (tone: (typeof TONES)[number]) => ReactNode;
} & Omit<ComponentProps<typeof Deck>, "children" | "className">) => (
  <Deck className="deck-chip-deck" peekOffset={6} rotation={0} scaleStep={0.05} {...props}>
    {TONES.map((tone) => (
      <Deck.Card className="deck-chip" data-tone={tone} key={tone}>
        {children?.(tone)}
      </Deck.Card>
    ))}
  </Deck>
);

const Chevron = ({ direction, strong }: { direction: "left" | "right"; strong: boolean }) => (
  <svg
    aria-hidden="true"
    className="deck-chevron"
    fill="none"
    height="16"
    viewBox="0 0 16 16"
    width="16"
  >
    <path
      d={direction === "left" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
      stroke={strong ? "var(--foreground)" : "var(--border)"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const DeckVariants = () => (
  <VariantsBlock
    id="variants-title"
    lead="Choose whether the deck loops, how many cards show, and which directions advance it."
  >
    <VariantCell code='mode="cycle"' name="Loops forever">
      <Chips aria-label="Looping deck" mode="cycle" />
    </VariantCell>
    <VariantCell code='mode="finite", Deck.Empty' name="Runs out">
      <Deck aria-label="Finished deck" className="deck-chip-deck" index={1} mode="finite">
        <Deck.Card className="deck-chip">{null}</Deck.Card>
        <Deck.Empty>
          <div className="deck-chip-empty">No cards left</div>
        </Deck.Empty>
      </Deck>
    </VariantCell>
    <VariantCell code='enter="rise" | "none"' name="Late cards rise in">
      <div className="relative">
        <Chips aria-label="Deck whose late cards rise in" enter="rise" visibleCount={2} />
        <svg
          aria-hidden="true"
          className="deck-chip-hint"
          fill="none"
          height="16"
          viewBox="0 0 12 16"
          width="12"
        >
          <path
            d="M6 14V2M2 6l4-4 4 4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </VariantCell>
    <VariantCell code='allowedDirections={["right"]}' name="One direction only">
      <Chevron direction="left" strong={false} />
      <Chips aria-label="Deck that only advances right" allowedDirections={["right"]} />
      <Chevron direction="right" strong />
    </VariantCell>
    <VariantCell code="renderOverlay" name="Overlay while dragging">
      <Chips
        aria-label="Deck with an overlay"
        renderOverlay={({ active }) =>
          active ? <span className="deck-chip-keep">Keep</span> : null
        }
      />
    </VariantCell>
    <VariantCell code="disabled" name="Disabled">
      <Chips aria-label="Disabled deck" disabled />
    </VariantCell>
  </VariantsBlock>
);
