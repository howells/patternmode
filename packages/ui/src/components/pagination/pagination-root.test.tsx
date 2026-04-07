import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "./pagination-root";

describe("Pagination", () => {
  it("renders boundary pages with ellipsis for long ranges", () => {
    render(
      <Pagination onPageChange={() => undefined} page={7} totalPages={24} />
    );

    expect(screen.getByRole("button", { name: "7" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getAllByText("...")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "24" })).toBeInTheDocument();
  });

  it("calls back with the next page when navigation controls are pressed", () => {
    const onPageChange = vi.fn();

    render(<Pagination onPageChange={onPageChange} page={3} totalPages={10} />);

    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    fireEvent.click(screen.getByRole("button", { name: "1" }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 4);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 1);
  });
});
