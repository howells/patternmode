"use client";

import { TagSelector } from "@patternmode/tags";
import type { TagItem } from "@patternmode/tags";
import { useId, useState } from "react";
import { createTag, findTagOption, tagOptions } from "./tags-items";
import "./tags-demo.css";

export const TagsDemo = () => {
  const labelId = useId();
  const [tags, setTags] = useState<TagItem[]>([
    findTagOption("accessible"),
    findTagOption("keyboard-first"),
  ]);

  return (
    <div className="tags-demo">
      <span className="tags-demo-label" id={labelId}>
        Project tags
      </span>
      <TagSelector
        aria-labelledby={labelId}
        onChange={setTags}
        onCreateItem={createTag}
        options={tagOptions}
        placeholder="Select tags"
        value={tags}
      />
    </div>
  );
};
