"use client";

import { Deck } from "@patternmode/deck";
import type { AdvanceDirection, DeckMode } from "@patternmode/deck";
import Image from "next/image";
import { useState } from "react";

import { apertoMedia } from "@/lib/aperto-media";

import { OptionBar } from "./option-bar";

export const DeckDemo = () => {
  const [mode, setMode] = useState<DeckMode>("cycle");
  const [visibleCount, setVisibleCount] = useState(3);
  const [lastAdvance, setLastAdvance] = useState<AdvanceDirection | "none">("none");

  return (
    <div className="deck-demo">
      <div className="deck-stage">
        <Deck
          aria-label="Patternmode deck demo"
          className="deck-surface"
          key={mode}
          mode={mode}
          onAdvance={({ direction }) => setLastAdvance(direction)}
          rotation={7}
          visibleCount={visibleCount}
        >
          {apertoMedia.map((item, index) => (
            <Deck.Card className="deck-demo-card" key={item.id ?? item.src}>
              <Image
                alt={item.alt}
                draggable={false}
                fill
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 640px) 78vw, 420px"
                src={item.thumbnailSrc ?? item.src}
              />
            </Deck.Card>
          ))}
          <Deck.Empty>
            <div className="deck-empty-state">
              <h3>No cards left</h3>
              <p>Switch back to cycle mode to keep the stack moving.</p>
            </div>
          </Deck.Empty>
        </Deck>
      </div>

      <div className="aperto-controls">
        <OptionBar
          label="Mode"
          onChange={setMode}
          options={[
            { label: "Cycle", value: "cycle" as const },
            { label: "Finite", value: "finite" as const },
          ]}
          value={mode}
        />
        <OptionBar
          label="Visible"
          onChange={setVisibleCount}
          options={[
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
          ]}
          value={visibleCount}
        />
        <p className="deck-demo-state">Last advance: {lastAdvance}</p>
      </div>
    </div>
  );
};
