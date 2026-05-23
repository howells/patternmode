// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { SVGProps } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getSwatchColorsBackground, Swatch } from "./index";

function CheckIcon(props: SVGProps<SVGSVGElement>) {
	return <svg data-testid="check-icon" {...props} />;
}

afterEach(() => {
	cleanup();
});

describe("Swatch", () => {
	it("renders a solid color swatch with contrast metadata", () => {
		render(<Swatch aria-label="Olive" color="#315c4b" />);

		const swatch = screen.getByRole("img", { name: "Olive" });
		expect(swatch).toHaveClass("patternmode-swatch");
		expect(swatch).toHaveAttribute("data-slot", "swatch");
		expect(swatch).toHaveAttribute("data-shape", "circle");
		expect(swatch).toHaveAttribute("data-size", "base");
		expect(swatch).toHaveAttribute("data-tone", "dark");
		expect(swatch).toHaveStyle({ "--patternmode-swatch-fill": "#315c4b" });
	});

	it("renders weighted color stops as a single fill", () => {
		render(
			<Swatch
				aria-label="Palette"
				colors={[
					{ color: "#315c4b", ratio: 60 },
					{ color: "#e1ebe5", ratio: 40 },
				]}
			/>,
		);

		expect(screen.getByRole("img", { name: "Palette" })).toHaveStyle({
			"--patternmode-swatch-fill":
				"linear-gradient(90deg, #315c4b 0% 60%, #e1ebe5 60% 100%)",
		});
	});

	it("clamps invalid weighted palette ratios", () => {
		expect(
			getSwatchColorsBackground([
				{ color: "#111111", ratio: -4 },
				{ color: "#222222", ratio: 2 },
				{ color: "#333333", ratio: Number.NaN },
			]),
		).toBe(
			"linear-gradient(90deg, #111111 0% 0%, #222222 0% 100%, #333333 100% 100%)",
		);

		expect(
			getSwatchColorsBackground([
				{ color: "#111111", ratio: 0 },
				{ color: "#222222", ratio: -1 },
			]),
		).toBe("linear-gradient(90deg, #111111 0% 50%, #222222 50% 100%)");
	});

	it("shows selected and removable affordances", async () => {
		const user = userEvent.setup();
		const onRemove = vi.fn();

		render(
			<Swatch
				aria-label="Selected"
				color="#fbfbf9"
				icon={CheckIcon}
				onRemove={onRemove}
				selected
			/>,
		);

		const swatch = screen.getByRole("img", { name: "Selected" });
		expect(swatch).toHaveAttribute("data-selected", "true");
		expect(swatch).toHaveAttribute("data-tone", "light");
		expect(screen.getByTestId("check-icon")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Remove" }));

		expect(onRemove).toHaveBeenCalledTimes(1);
	});

	it("applies shared object sizing to media children", () => {
		render(
			<Swatch aria-label="Sample" objectFit="contain" objectPosition="top left">
				<img alt="Sample media" src="/sample.jpg" />
			</Swatch>,
		);

		const media = screen.getByAltText("Sample media").parentElement;
		expect(media).toHaveStyle({
			height: "100%",
			objectFit: "contain",
			objectPosition: "top left",
			width: "100%",
		});
	});
});
