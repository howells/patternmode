"use client";

import { Tag, TagSelector } from "@patternmode/tags";
import type { TagItem } from "@patternmode/tags";
import { useState } from "react";
import { VariantCell, VariantsBlock } from "@/components/variant-cells";
import { createTag, findTagOption, tagOptions } from "./tags-items";
import "./tags-variants.css";

const Selector = ({
  creates = false,
  initial,
  label,
  placeholder,
}: {
  creates?: boolean;
  initial: TagItem[];
  label: string;
  placeholder: string;
}) => {
  const [tags, setTags] = useState(initial);
  return (
    <TagSelector
      aria-label={label}
      className="tags-variant-selector"
      onChange={setTags}
      onCreateItem={creates ? createTag : undefined}
      options={tagOptions}
      placeholder={placeholder}
      value={tags}
    />
  );
};

const RemovableTag = () => {
  const [removed, setRemoved] = useState(false);
  return removed ? (
    <button
      className="tags-variant-restore"
      onClick={() => {
        setRemoved(false);
      }}
      type="button"
    >
      Add it back
    </button>
  ) : (
    <Tag
      onRemove={() => {
        setRemoved(true);
      }}
      size="lg"
      variant="outline"
    >
      Large
    </Tag>
  );
};

export const TagsVariants = () => (
  <VariantsBlock
    id="variants-title"
    lead="Badge matches shadcn. Tag adds a remove button. TagSelector puts them together."
  >
    <VariantCell code="variant" name="Badge">
      <Tag variant="default">Default</Tag>
      <Tag variant="secondary">Secondary</Tag>
      <Tag variant="outline">Outline</Tag>
    </VariantCell>
    <VariantCell code="Tag onRemove" name="Removable tag">
      <RemovableTag />
    </VariantCell>
    <VariantCell code="placeholder" name="Empty selector">
      <Selector initial={[]} label="Empty selector" placeholder="Select tags" />
    </VariantCell>
    <VariantCell code="value" name="Chosen tags, each removable">
      <Selector
        initial={[findTagOption("accessible")]}
        label="Chosen tags"
        placeholder="Select tags"
      />
    </VariantCell>
    <VariantCell code="onCreateItem" name="Create a new tag">
      <Selector creates initial={[]} label="Create a new tag" placeholder="Type to create a tag" />
    </VariantCell>
    <VariantCell code="separators" name="Commas commit a tag">
      <Selector
        creates
        initial={[createTag("oak"), createTag("walnut")]}
        label="Comma separated tags"
        placeholder="oak, walnut,"
      />
    </VariantCell>
  </VariantsBlock>
);
