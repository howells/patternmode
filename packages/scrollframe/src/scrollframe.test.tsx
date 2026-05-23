// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ScrollFrame } from "./index";

class ResizeObserverMock {
	observe = vi.fn();
	disconnect = vi.fn();
	unobserve = vi.fn();
}

beforeEach(() => {
	vi.stubGlobal("ResizeObserver", ResizeObserverMock);
});

afterEach(() => {
	cleanup();
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe("ScrollFrame", () => {
	it("renders a named Radix-backed scroll region with fades and plumbing", () => {
		render(
			<ScrollFrame aria-label="Updates">
				<p>One</p>
				<p>Two</p>
			</ScrollFrame>,
		);

		const region = screen.getByRole("region", { name: "Updates" });
		expect(region).toHaveClass("patternmode-scrollframe");
		expect(region).toHaveAttribute("data-axes", "vertical");
		expect(region).toHaveAttribute("data-axis-vertical", "true");
		expect(region).toHaveAttribute("data-slot", "scrollframe");

		const viewport = screen.getByTestId("scrollframe-viewport");
		expect(viewport).toHaveAttribute("data-slot", "scrollframe-viewport");
		expect(
			screen.getByTestId("scrollframe-fade-vertical-start"),
		).toBeInTheDocument();
		expect(
			screen.getByTestId("scrollframe-fade-vertical-end"),
		).toBeInTheDocument();
	});

	it("supports both axes and keeps hidden scrollbar plumbing mounted", () => {
		render(
			<ScrollFrame axes="both" scrollbars="hidden">
				<div>Content</div>
			</ScrollFrame>,
		);

		const root = screen.getByTestId("scrollframe-viewport").parentElement;
		expect(root).toHaveAttribute("data-axes", "both");
		expect(root).toHaveAttribute("data-scrollbar-visibility", "hidden");
		expect(
			root?.querySelectorAll('[data-slot="scrollframe-scrollbar"]'),
		).toHaveLength(2);
	});

	it("updates edge state and moves by a page step", () => {
		const scrollBy = vi.fn();

		render(
			<ScrollFrame
				aria-label="Scrollable"
				controls={{ visibility: "disabled" }}
				scrollBehavior="auto"
			>
				<div>Content</div>
			</ScrollFrame>,
		);

		const viewport = screen.getByTestId("scrollframe-viewport");
		const root = screen.getByRole("region", { name: "Scrollable" });
		Object.defineProperties(viewport, {
			clientHeight: { configurable: true, value: 100 },
			scrollHeight: { configurable: true, value: 300 },
			scrollTop: { configurable: true, value: 0, writable: true },
			scrollBy: { configurable: true, value: scrollBy },
		});

		act(() => {
			fireEvent.scroll(viewport);
		});

		expect(root).toHaveAttribute("data-axes", "vertical");
		const previous = screen.getByRole("button", { name: "Scroll backward" });
		const next = screen.getByRole("button", { name: "Scroll forward" });
		expect(previous).toBeDisabled();
		expect(next).not.toBeDisabled();

		fireEvent.click(next);

		expect(scrollBy).toHaveBeenCalledWith({ top: 85, behavior: "auto" });
	});
});
