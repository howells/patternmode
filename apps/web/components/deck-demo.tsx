"use client";

import { Deck } from "@patternmode/deck";
import Image from "next/image";
import { useState } from "react";

import { apertoMedia } from "@/lib/aperto-media";

import "./deck-demo.css";

const count = apertoMedia.length;

const Arrow = ({
  label,
  onClick,
  symbol,
}: {
  label: string;
  onClick: () => void;
  symbol: string;
}) => (
  <button aria-label={label} className="deck-arrow" onClick={onClick} type="button">
    {symbol}
  </button>
);

export const DeckDemo = () => {
  const [index, setIndex] = useState(0);
  const step = (by: number) => {
    setIndex((current) => (current + by + count) % count);
  };

  return (
    <div className="deck-demo">
      <Deck
        aria-label="Patternmode deck demo"
        className="deck-surface"
        index={index}
        mode="cycle"
        onIndexChange={setIndex}
        rotation={0}
        visibleCount={3}
      >
        {apertoMedia.map((item, position) => (
          <Deck.Card className="deck-card" key={item.id ?? item.src}>
            <span className="deck-card-image">
              <Image
                alt={item.alt}
                draggable={false}
                fill
                fetchPriority={position === 0 ? "high" : "auto"}
                loading={position === 0 ? "eager" : "lazy"}
                sizes="300px"
                src={item.thumbnailSrc ?? item.src}
              />
            </span>
            <span className="deck-card-caption">
              <span className="deck-card-title">{item.title}</span>
              <span className="deck-card-count">
                {position + 1} of {count}
              </span>
            </span>
          </Deck.Card>
        ))}
      </Deck>

      <div className="deck-side">
        <div className="deck-arrows">
          <Arrow
            label="Previous card"
            onClick={() => {
              step(-1);
            }}
            symbol="←"
          />
          <Arrow
            label="Next card"
            onClick={() => {
              step(1);
            }}
            symbol="→"
          />
        </div>
        <p className="deck-hint">
          Drag the top card past the threshold or fling it. The next card is already in place
          underneath.
        </p>
        <code className="deck-code">{'mode="cycle" visibleCount={3}'}</code>
      </div>
    </div>
  );
};
