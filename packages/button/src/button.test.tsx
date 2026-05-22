// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import type { SVGProps } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button } from "./index";

function StartIcon(props: SVGProps<SVGSVGElement>) {
	return <svg data-testid="start-icon" {...props} />;
}

function EndIcon(props: SVGProps<SVGSVGElement>) {
	return <svg data-testid="end-icon" {...props} />;
}

afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
});

describe("Button", () => {
	it("renders with stable defaults", () => {
		render(<Button>Continue</Button>);

		const button = screen.getByRole("button", { name: "Continue" });
		expect(button).toHaveClass("howells-button");
		expect(button).toHaveAttribute("data-slot", "button");
		expect(button).toHaveAttribute("data-variant", "default");
		expect(button).toHaveAttribute("data-appearance", "solid");
		expect(button).toHaveAttribute("data-size", "base");
		expect(button).toHaveAttribute("data-radius", "full");
		expect(button).toHaveAttribute("data-align", "center");
		expect(button).toHaveAttribute("data-pressed", "true");
	});

	it("maps visual state props to attributes", () => {
		render(
			<Button
				align="start"
				appearance="outline"
				focused
				hovered
				pressed={false}
				radius="rounded"
				size="lg"
				square
				variant="destructive"
			>
				Delete
			</Button>,
		);

		const button = screen.getByRole("button", { name: "Delete" });
		expect(button).toHaveAttribute("data-variant", "destructive");
		expect(button).toHaveAttribute("data-appearance", "outline");
		expect(button).toHaveAttribute("data-size", "lg");
		expect(button).toHaveAttribute("data-radius", "rounded");
		expect(button).toHaveAttribute("data-align", "start");
		expect(button).toHaveAttribute("data-square", "true");
		expect(button).toHaveAttribute("data-focused", "true");
		expect(button).toHaveAttribute("data-hovered", "true");
		expect(button).not.toHaveAttribute("data-pressed");
	});

	it("supports viewport responsive size objects", () => {
		render(<Button size={{ base: "sm", md: "lg", xl: "2xl" }}>Grow</Button>);

		const button = screen.getByRole("button", { name: "Grow" });
		expect(button).toHaveAttribute("data-size", "sm");
		expect(button).toHaveClass(
			"howells-button--md-lg",
			"howells-button--xl-2xl",
		);
		expect(button).not.toHaveAttribute("data-responsive-mode");
	});

	it("supports container responsive size objects", () => {
		render(
			<Button responsiveMode="container" size={{ base: "xs", md: "base" }}>
				Resize
			</Button>,
		);

		const button = screen.getByRole("button", { name: "Resize" });
		expect(button).toHaveAttribute("data-size", "xs");
		expect(button).toHaveAttribute("data-responsive-mode", "container");
		expect(button).toHaveClass("howells-button--cq-md-base");
	});

	it("shows loading content, disables the button, and marks it busy", () => {
		render(
			<Button loading loadingLabel="Saving">
				Save
			</Button>,
		);

		const button = screen.getByRole("button", { name: "Saving" });
		expect(button).toBeDisabled();
		expect(button).toHaveAttribute("aria-busy", "true");
		expect(screen.getByTestId("button-spinner")).toBeInTheDocument();
		expect(screen.queryByText("Save")).not.toBeInTheDocument();
	});

	it("renders icons, suffix icons, and dots around text content", () => {
		render(
			<Button dot="#315c4b" icon={StartIcon} suffixIcon={EndIcon}>
				Filter
			</Button>,
		);

		expect(screen.getByTestId("start-icon")).toBeInTheDocument();
		expect(screen.getByTestId("end-icon")).toBeInTheDocument();
		expect(screen.getByTestId("button-dot")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Filter" })).toBeInTheDocument();
	});

	it("renders only the leading icon for icon-only buttons", () => {
		render(
			<Button aria-label="Settings" icon={StartIcon} suffixIcon={EndIcon} />,
		);

		expect(
			screen.getByRole("button", { name: "Settings" }),
		).toBeInTheDocument();
		expect(screen.getByTestId("start-icon")).toBeInTheDocument();
		expect(screen.queryByTestId("end-icon")).not.toBeInTheDocument();
	});

	it("warns when an icon-only button has no accessible name", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

		render(<Button icon={StartIcon} />);

		expect(warn).toHaveBeenCalledWith(
			expect.stringContaining("Icon-only Button"),
		);
	});

	it("renders through asChild while preserving decorations", () => {
		render(
			<Button asChild icon={StartIcon} suffixIcon={EndIcon}>
				<a href="/button">Open</a>
			</Button>,
		);

		const link = screen.getByRole("link", { name: "Open" });
		expect(link).toHaveAttribute("href", "/button");
		expect(link).toHaveClass("howells-button");
		expect(screen.getByTestId("start-icon")).toBeInTheDocument();
		expect(screen.getByTestId("end-icon")).toBeInTheDocument();
	});
});
