/**
 * How well a search matches an entry, from 0 (no match) to 1 (exact), as
 * cmdk scored it. The search's characters must appear in order; a match that
 * starts a word, follows a separator or runs on from the last one scores
 * higher than one in the middle of a word. Ported from cmdk 1.1.1 (MIT),
 * itself after Superhuman's command-score.
 */

const CONTINUE_MATCH = 1;
const WORD_JUMP = 0.9;
const CHARACTER_JUMP = 0.8;
const MID_WORD = 0.17;
const SKIP_PENALTY = 0.1;
const DISTANCE_PENALTY = 0.999;
const CASE_PENALTY = 0.9999;
const INCOMPLETE = 0.99;

const CHARACTER_GAP = /[\\/_+.#"@[({&]/u;
const CHARACTER_GAPS = /[\\/_+.#"@[({&]/gu;
const WORD_GAP = /[\s-]/u;
const WORD_GAPS = /[\s-]/gu;

const gapMultiplier = (
  entry: string,
  search: string,
  entryIndex: number,
  searchIndex: number,
  index: number,
): number => {
  let factor = 1;
  const before = entry.charAt(index - 1);

  if (index === entryIndex) {
    factor = CONTINUE_MATCH;
  } else if (CHARACTER_GAP.test(before)) {
    factor = CHARACTER_JUMP;
    const gaps = entry.slice(entryIndex, index - 1).match(CHARACTER_GAPS);

    if (gaps !== null && entryIndex > 0) {
      factor *= DISTANCE_PENALTY ** gaps.length;
    }
  } else if (WORD_GAP.test(before)) {
    factor = WORD_JUMP;
    const gaps = entry.slice(entryIndex, index - 1).match(WORD_GAPS);

    if (gaps !== null && entryIndex > 0) {
      factor *= DISTANCE_PENALTY ** gaps.length;
    }
  } else {
    factor = MID_WORD;

    if (entryIndex > 0) {
      factor *= DISTANCE_PENALTY ** (index - entryIndex);
    }
  }

  return entry.charAt(index) === search.charAt(searchIndex) ? factor : factor * CASE_PENALTY;
};

const shouldSkipTypo = (
  lowerEntry: string,
  lowerSearch: string,
  index: number,
  searchIndex: number,
  next: number,
): boolean =>
  (next < SKIP_PENALTY && lowerEntry.charAt(index - 1) === lowerSearch.charAt(searchIndex + 1)) ||
  (lowerSearch.charAt(searchIndex + 1) === lowerSearch.charAt(searchIndex) &&
    lowerEntry.charAt(index - 1) !== lowerSearch.charAt(searchIndex));

const score = (
  entry: string,
  search: string,
  lowerEntry: string,
  lowerSearch: string,
  entryIndex: number,
  searchIndex: number,
  memo: Map<string, number>,
): number => {
  if (searchIndex === search.length) {
    return entryIndex === entry.length ? CONTINUE_MATCH : INCOMPLETE;
  }

  const key = `${entryIndex},${searchIndex}`;
  const remembered = memo.get(key);

  if (remembered !== undefined) {
    return remembered;
  }

  const character = lowerSearch.charAt(searchIndex);
  let best = 0;
  let index = lowerEntry.indexOf(character, entryIndex);

  while (index !== -1) {
    let next = score(entry, search, lowerEntry, lowerSearch, index + 1, searchIndex + 1, memo);

    if (next > best) {
      next *= gapMultiplier(entry, search, entryIndex, searchIndex, index);
    }

    if (shouldSkipTypo(lowerEntry, lowerSearch, index, searchIndex, next)) {
      const skipped = score(
        entry,
        search,
        lowerEntry,
        lowerSearch,
        index + 1,
        searchIndex + 2,
        memo,
      );

      if (skipped * SKIP_PENALTY > next) {
        next = skipped * SKIP_PENALTY;
      }
    }

    if (next > best) {
      best = next;
    }

    index = lowerEntry.indexOf(character, index + 1);
  }

  memo.set(key, best);

  return best;
};

const formatForMatching = (text: string): string => text.toLowerCase().replaceAll(WORD_GAPS, " ");

/** Scores `search` against `entry` and any `aliases`, from 0 to 1. */
export const commandScore = (
  entry: string,
  search: string,
  aliases: readonly string[] = [],
): number => {
  const text = aliases.length > 0 ? `${entry} ${aliases.join(" ")}` : entry;

  return score(text, search, formatForMatching(text), formatForMatching(search), 0, 0, new Map());
};
