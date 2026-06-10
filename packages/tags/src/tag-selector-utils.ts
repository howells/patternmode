import type { TagItem } from "./types";

export const DEFAULT_SEPARATORS = ["Enter", ","] as const;
export const NO_ACTIVE_OPTION = -1;

export const normalizeTag = (value: string): string => value.trim().replaceAll(/\s+/gu, " ");

export const normalizeComparable = (value: string): string =>
  normalizeTag(value).toLocaleLowerCase();

export const splitPastedTags = (value: string): string[] =>
  value.split(/[,\n\r\t]+/u).flatMap((part) => {
    const tag = normalizeTag(part);
    return tag === "" ? [] : [tag];
  });

export const defaultFilterOption = (item: TagItem, query: string): boolean =>
  item.label.toLocaleLowerCase().includes(query.toLocaleLowerCase());

export const getNextIndex = (currentIndex: number, length: number): number => {
  if (length === 0) {
    return NO_ACTIVE_OPTION;
  }

  return currentIndex < 0 ? 0 : (currentIndex + 1) % length;
};

export const getPreviousIndex = (currentIndex: number, length: number): number => {
  if (length === 0) {
    return NO_ACTIVE_OPTION;
  }

  return currentIndex <= 0 ? length - 1 : currentIndex - 1;
};
