"use client";

import { Deck } from "@/components/patternmode/deck";
import { DistributionDisplay, Swatch } from "@/components/patternmode/swatch";
import type { DistributionBarSegment } from "@/components/patternmode/swatch";
import { createStacksheet } from "@/components/patternmode/stacksheet";
import { Tag, TagSelector } from "@/components/patternmode/tags";
import type { TagItem } from "@/components/patternmode/tags";
import { useState } from "react";

import { Button } from "@/components/ui/button";

/* Swatch — a small finish picker driven by real color values. */

const finishes = [
  { color: "#315c4b", name: "Evergreen" },
  { color: "#e1ebe5", name: "Sage" },
  { color: "#9b3d32", name: "Oxblood" },
  { color: "#d9a441", name: "Saffron" },
  { color: "#1d1d1b", name: "Ink" },
  { color: "#c4b7a3", name: "Dune" },
] as const;

const assignedDistribution: DistributionBarSegment[] = [
  { color: "#315c4b", id: "evergreen", label: "Evergreen", value: 38 },
  { color: "#d9a441", id: "saffron", label: "Saffron", value: 24 },
  { color: "#9b3d32", id: "oxblood", label: "Oxblood", value: 17 },
];

const SwatchPanel = () => {
  const [selected, setSelected] = useState<string>(finishes[0].color);

  return (
    <div className="flex flex-col gap-5">
      <fieldset
        aria-label="Select a finish"
        className="m-0 flex flex-wrap items-center gap-3 border-0 p-0"
      >
        {finishes.map((finish) => (
          <button
            aria-label={`Select ${finish.name}`}
            aria-pressed={selected === finish.color}
            className="cursor-pointer rounded-full border-0 bg-transparent p-0 leading-none transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            key={finish.color}
            onClick={() => {
              setSelected(finish.color);
            }}
            type="button"
          >
            <Swatch
              aria-hidden="true"
              color={finish.color}
              selected={selected === finish.color}
              size="xl"
            />
          </button>
        ))}
      </fieldset>
      <DistributionDisplay
        aria-label="Assigned finish distribution: 79% assigned, 21% unassigned"
        emptyValue={21}
        legend="summary"
        segments={assignedDistribution}
      />
    </div>
  );
};

/* Deck — a small cyclic release stack. */

const releases = [
  { note: "Theme tokens + registry", version: "v1.0" },
  { note: "Swatch and distribution", version: "v1.1" },
  { note: "Tag selector + scroll frame", version: "v1.2" },
];

const DeckPanel = () => (
  <div className="grid min-h-[220px] place-items-center">
    <Deck
      aria-label="Release deck"
      className="h-[180px] w-[260px]"
      mode="cycle"
      rotation={6}
      visibleCount={3}
    >
      {releases.map((release) => (
        <Deck.Card
          className="flex min-h-full flex-col justify-between rounded-xl border border-border bg-card p-5 text-card-foreground shadow-lg"
          key={release.version}
        >
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {release.version}
          </span>
          <span className="text-sm font-medium">{release.note}</span>
        </Deck.Card>
      ))}
      <Deck.Empty>
        <div className="grid h-full place-items-center text-sm text-muted-foreground">
          No cards left
        </div>
      </Deck.Empty>
    </Deck>
  </div>
);

/* Tags — controlled selector plus a row of variants. */

const tagOptions: TagItem[] = [
  { id: "accessible", label: "Accessible", variant: "secondary" },
  { id: "shadcn", label: "shadcn compatible", variant: "outline" },
  { id: "searchable", label: "Searchable", variant: "secondary" },
  { id: "keyboard", label: "Keyboard first", variant: "outline" },
  { id: "themeable", label: "Themeable", variant: "secondary" },
];

const initialTags: TagItem[] = [
  { id: "accessible", label: "Accessible", variant: "secondary" },
  { id: "keyboard", label: "Keyboard first", variant: "outline" },
];

const TagsPanel = () => {
  const [tags, setTags] = useState<TagItem[]>(initialTags);

  return (
    <div className="flex flex-col gap-4">
      <TagSelector
        aria-label="Component tags"
        onChange={setTags}
        onCreateItem={(label) => ({
          id: label.toLowerCase().replaceAll(/[^a-z0-9]+/gu, "-"),
          label,
          variant: "outline",
        })}
        options={tagOptions}
        placeholder="Add tags"
        value={tags}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Tag variant="default">Default</Tag>
        <Tag variant="secondary">Secondary</Tag>
        <Tag variant="outline">Outline</Tag>
        <Tag selected variant="outline">
          Selected
        </Tag>
      </div>
    </div>
  );
};

/* StackSheet — a typed sheet stack opened from a launcher. */

interface PreviewSheets {
  Details: { title: string };
  Nested: { title: string };
}

const { StacksheetProvider, useSheet } = createStacksheet<PreviewSheets>({
  side: { desktop: "right", mobile: "bottom" },
  spring: "subtle",
  width: 420,
});

const DetailsSheet = ({ title }: { title: string }) => {
  const sheet = useSheet();
  return (
    <div className="flex flex-col gap-4 p-6">
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
        Sheet stack
      </p>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">
        Push another sheet without losing the path back, then close the whole stack.
      </p>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            sheet.push("Nested", `nested-${Date.now()}`, { title: "Nested sheet" });
          }}
          size="sm"
        >
          Push next
        </Button>
        <Button
          onClick={() => {
            sheet.close();
          }}
          size="sm"
          variant="outline"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

const NestedSheet = ({ title }: { title: string }) => {
  const sheet = useSheet();
  return (
    <div className="flex flex-col gap-4 p-6">
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Nested</p>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">
        Back returns to the previous sheet; close dismisses the stack.
      </p>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            sheet.pop();
          }}
          size="sm"
          variant="outline"
        >
          Back
        </Button>
        <Button
          onClick={() => {
            sheet.close();
          }}
          size="sm"
          variant="outline"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

const StackSheetLauncher = () => {
  const sheet = useSheet();
  return (
    <Button
      onClick={() => {
        sheet.open("Details", "details", { title: "Typed sheet" });
      }}
      variant="outline"
    >
      Open sheet stack
    </Button>
  );
};

const StackSheetPanel = () => (
  <StacksheetProvider sheets={{ Details: DetailsSheet, Nested: NestedSheet }}>
    <StackSheetLauncher />
  </StacksheetProvider>
);

export { DeckPanel, StackSheetPanel, SwatchPanel, TagsPanel };
