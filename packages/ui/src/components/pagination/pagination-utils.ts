export function getPageRange(
  page: number,
  totalPages: number
): Array<number | "ellipsis"> {
  if (totalPages <= 0) {
    return [];
  }

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalPages);

  for (let index = page - 1; index <= page + 1; index += 1) {
    if (index >= 1 && index <= totalPages) {
      pages.add(index);
    }
  }

  const sortedPages = [...pages].sort((left, right) => left - right);
  const result: Array<number | "ellipsis"> = [];

  for (const nextPage of sortedPages) {
    const previous = result.at(-1);

    if (typeof previous === "number" && nextPage - previous > 2) {
      result.push("ellipsis");
    } else if (typeof previous === "number" && nextPage - previous === 2) {
      result.push(previous + 1);
    }

    result.push(nextPage);
  }

  return result;
}
