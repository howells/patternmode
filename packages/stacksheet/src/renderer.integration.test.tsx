// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
	forwardRef,
	type HTMLAttributes,
	type ReactNode,
	useEffect,
} from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("focus-trap-react", () => ({
	FocusTrap: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

vi.mock("motion/react", () => {
	type MotionTestProps = HTMLAttributes<HTMLElement> & {
		animate?: unknown;
		exit?: unknown;
		initial?: unknown;
		onAnimationComplete?: () => void;
		transition?: unknown;
	};

	const stripMotionProps = ({
		animate: _animate,
		exit: _exit,
		initial: _initial,
		onAnimationComplete: _onAnimationComplete,
		transition: _transition,
		...props
	}: MotionTestProps) => props;

	const MotionDiv = forwardRef<HTMLDivElement, MotionTestProps>(
		(props, ref) => {
			useEffect(() => {
				props.onAnimationComplete?.();
			}, [props]);

			return <div ref={ref} {...stripMotionProps(props)} />;
		},
	);

	return {
		AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
		motion: {
			div: MotionDiv,
		},
		useReducedMotion: () => false,
	};
});

import { createStacksheet, Sheet } from "./index";

beforeEach(() => {
	Object.defineProperty(window, "matchMedia", {
		configurable: true,
		value: vi.fn().mockImplementation((query: string) => ({
			addEventListener: vi.fn(),
			addListener: vi.fn(),
			dispatchEvent: vi.fn(),
			matches: false,
			media: query,
			onchange: null,
			removeEventListener: vi.fn(),
			removeListener: vi.fn(),
		})),
	});
});

afterEach(() => {
	cleanup();
});

describe("SheetRenderer integration", () => {
	it("makes the pushed Nested Sheet active, then backs out and closes the Sheet Stack", async () => {
		const user = userEvent.setup();
		const { StacksheetProvider, useSheet } = createStacksheet<{
			root: Record<string, never>;
			nested: Record<string, never>;
		}>();

		function RootSheet() {
			const { push } = useSheet();
			return (
				<div>
					<p>Root sheet content</p>
					<button
						onClick={() =>
							push("nested", "nested", {}, { ariaLabel: "Nested sheet" })
						}
						type="button"
					>
						Open nested
					</button>
				</div>
			);
		}

		function NestedSheet() {
			return <p>Nested sheet content</p>;
		}

		function Controls() {
			const { open } = useSheet();
			return (
				<button
					onClick={() => open("root", "root", {}, { ariaLabel: "Root sheet" })}
					type="button"
				>
					Open root
				</button>
			);
		}

		render(
			<StacksheetProvider
				sheets={{
					nested: NestedSheet,
					root: RootSheet,
				}}
			>
				<Controls />
			</StacksheetProvider>,
		);

		await user.click(screen.getByRole("button", { name: "Open root" }));

		expect(
			screen.getByRole("dialog", { name: "Root sheet" }),
		).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Open nested" }));

		expect(
			screen.getByRole("dialog", { name: "Nested sheet" }),
		).toBeInTheDocument();
		expect(
			screen.queryByRole("dialog", { name: "Root sheet" }),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole("button", { name: "Open nested" }),
		).not.toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Back" }));

		expect(
			screen.getByRole("dialog", { name: "Root sheet" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Open nested" }),
		).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Close" }));

		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("links composable Sheet Title and Description to the Active Sheet dialog", async () => {
		const user = userEvent.setup();
		const { StacksheetProvider, useSheet } = createStacksheet<{
			details: Record<string, never>;
		}>();

		function DetailsSheet() {
			return (
				<>
					<Sheet.Header>
						<Sheet.Title>Composable details</Sheet.Title>
						<Sheet.Close />
					</Sheet.Header>
					<Sheet.Description>
						Choose how this Sheet should continue.
					</Sheet.Description>
					<Sheet.Body>Details body</Sheet.Body>
				</>
			);
		}

		function Controls() {
			const { open } = useSheet();
			return (
				<button onClick={() => open("details", "details", {})} type="button">
					Open details
				</button>
			);
		}

		render(
			<StacksheetProvider
				layout="composable"
				sheets={{ details: DetailsSheet }}
			>
				<Controls />
			</StacksheetProvider>,
		);

		await user.click(screen.getByRole("button", { name: "Open details" }));

		const dialog = screen.getByRole("dialog", {
			description: "Choose how this Sheet should continue.",
			name: "Composable details",
		});
		expect(dialog).toBeInTheDocument();
		expect(dialog).toHaveAttribute("aria-labelledby");
		expect(dialog).toHaveAttribute("aria-describedby");
	});
});
