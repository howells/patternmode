/**
 * Generates a page range array for pagination display.
 *
 * Uses boundary count of 1 (always show first and last page)
 * and sibling count of 1 (one page on each side of current).
 * When a gap is only 1 page wide, shows the number instead of ellipsis.
 *
 * @returns Array of page numbers and "ellipsis" markers
 *
 * @example
 * getPageRange(1, 5) // [1, 2, 3, 4, 5]
 * getPageRange(2, 13) // [1, 2, 3, "ellipsis", 13]
 * getPageRange(7, 13) // [1, "ellipsis", 6, 7, 8, "ellipsis", 13]
 * getPageRange(12, 13) // [1, "ellipsis", 11, 12, 13]
 */
function getPageRange(
  page: number,
  totalPages: number,
): Array<number | "ellipsis"> {
  if (totalPages <= 0) {
    return [];
  }
  if (totalPages === 1) {
    return [1];
  }

  // With siblingCount=1 and boundaryCount=1, max visible slots = 7
  // (1 boundary + ellipsis + 3 siblings + ellipsis + 1 boundary).
  // When totalPages fits within that, show all pages directly.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Collect unique page numbers that should always be visible
  const pages = new Set<number>();

  // Boundary pages (first and last)
  pages.add(1);
  pages.add(totalPages);

  // Sibling pages (current +/- 1)
  for (let i = page - 1; i <= page + 1; i++) {
    if (i >= 1 && i <= totalPages) {
      pages.add(i);
    }
  }

  // Sort and insert ellipsis where gaps exist
  const sorted = Array.from(pages).sort((a, b) => a - b);
  const result: Array<number | "ellipsis"> = [];

  for (const p of sorted) {
    const prev = result.at(-1);

    if (typeof prev === "number" && p - prev > 2) {
      // Gap of more than 1 page — use ellipsis
      result.push("ellipsis");
    } else if (typeof prev === "number" && p - prev === 2) {
      // Gap of exactly 1 page — show the bridging number
      result.push(prev + 1);
    }

    result.push(p);
  }

  return result;
}

export { getPageRange };
