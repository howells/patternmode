import type { TagItem } from "@patternmode/tags";

export const tagOptions: TagItem[] = [
  { id: "accessible", label: "Accessible", variant: "secondary" },
  { id: "shadcn-compatible", label: "Shadcn compatible", variant: "secondary" },
  { id: "searchable", label: "Searchable", variant: "secondary" },
  { id: "command-menu", label: "Command menu", variant: "secondary" },
  { id: "paste-friendly", label: "Paste friendly", variant: "secondary" },
  { id: "reusable", label: "Reusable", variant: "secondary" },
  { id: "keyboard-first", label: "Keyboard first", variant: "secondary" },
  { disabled: true, id: "locked", label: "Locked", variant: "ghost" },
];

export const createTag = (label: string): TagItem => ({
  id: label.toLowerCase().replaceAll(/[^a-z0-9]+/gu, "-"),
  label,
  variant: "secondary",
});

export const findTagOption = (id: string): TagItem => {
  const option = tagOptions.find((item) => item.id === id);
  if (option === undefined) {
    throw new Error(`Missing tag option "${id}".`);
  }
  return option;
};
