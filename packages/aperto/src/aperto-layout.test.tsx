// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
	forwardRef,
	type HTMLAttributes,
	type ReactNode,
	useEffect,
	useRef,
} from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const unmountedLayoutIds = vi.hoisted((): string[] => []);

vi.mock("motion/react", () => {
	type MotionTestProps = HTMLAttributes<HTMLElement> & {
		animate?: unknown;
		"data-slot"?: string;
		drag?: unknown;
		dragConstraints?: unknown;
		dragElastic?: unknown;
		dragMomentum?: unknown;
		dragSnapToOrigin?: unknown;
		exit?: unknown;
		initial?: unknown;
		layout?: boolean;
		layoutCrossfade?: unknown;
		layoutId?: string;
		onAnimationComplete?: () => void;
		onDrag?: unknown;
		onDragEnd?: unknown;
		onLayoutAnimationComplete?: unknown;
		transition?: unknown;
	};

	const stripMotionProps = ({
		animate: _animate,
		drag: _drag,
		dragConstraints: _dragConstraints,
		dragElastic: _dragElastic,
		dragMomentum: _dragMomentum,
		dragSnapToOrigin: _dragSnapToOrigin,
		exit: _exit,
		initial: _initial,
		layout,
		layoutCrossfade: _layoutCrossfade,
		layoutId,
		onAnimationComplete: _onAnimationComplete,
		onDrag: _onDrag,
		onDragEnd: _onDragEnd,
		onLayoutAnimationComplete: _onLayoutAnimationComplete,
		transition: _transition,
		...props
	}: MotionTestProps) => ({
		...props,
		"data-drag": _drag === undefined ? undefined : String(_drag),
		"data-layout": layout === undefined ? undefined : String(layout),
		"data-layout-id": layoutId,
	});

	const LayoutGroup = ({ children }: { children: ReactNode }) => (
		<>{children}</>
	);

	const MotionDiv = forwardRef<HTMLDivElement, MotionTestProps>(
		(props, ref) => {
			const latestLayoutIdRef = useRef(props.layoutId);
			latestLayoutIdRef.current = props.layoutId;

			useEffect(
				() => () => {
					if (latestLayoutIdRef.current) {
						unmountedLayoutIds.push(latestLayoutIdRef.current);
					}
				},
				[],
			);

			useEffect(() => {
				if (props["data-slot"] === "aperto-transition-media" && props.animate) {
					props.onAnimationComplete?.();
				}
			}, [props]);

			return <div ref={ref} {...stripMotionProps(props)} />;
		},
	);

	return {
		AnimatePresence: LayoutGroup,
		LayoutGroup,
		motion: {
			button: forwardRef<HTMLButtonElement, MotionTestProps>((props, ref) => (
				<button ref={ref} {...stripMotionProps(props)} />
			)),
			div: MotionDiv,
		},
		useMotionValue: (initial: number) => ({
			get: () => initial,
			set: vi.fn(),
		}),
		useReducedMotion: () => false,
		useSpring: (value: unknown) => value,
		useTransform: () => 1,
	};
});

import { Aperto, type ApertoMediaItem } from "./index";

afterEach(() => {
	cleanup();
	unmountedLayoutIds.length = 0;
});

describe("Aperto layout projection", () => {
	it("centers primitive content by default", () => {
		render(
			<Aperto.Primitive.Root defaultOpen>
				<Aperto.Primitive.Content aria-label="Centered panel">
					Centered content
				</Aperto.Primitive.Content>
			</Aperto.Primitive.Root>,
		);

		expect(screen.getByRole("dialog", { name: "Centered panel" })).toHaveStyle({
			left: "50%",
			top: "50%",
			translate: "-50% -50%",
		});
	});

	it("can leave primitive content positioning to the caller", () => {
		render(
			<Aperto.Primitive.Root defaultOpen>
				<Aperto.Primitive.Content
					aria-label="Unpositioned panel"
					placement="none"
				>
					Custom content
				</Aperto.Primitive.Content>
			</Aperto.Primitive.Root>,
		);

		const content = screen.getByRole("dialog", { name: "Unpositioned panel" });
		expect(content.style.left).toBe("");
		expect(content.style.top).toBe("");
		expect(content.style.translate).toBe("");
	});

	it("allows single media drag dismissal to be disabled", async () => {
		const user = userEvent.setup();
		const media: ApertoMediaItem = {
			type: "image",
			src: "/large.jpg",
			alt: "A mountain at sunrise",
			title: "Morning ridge",
		};

		render(<Aperto dismissible={false} media={media} />);

		await user.click(
			screen.getByRole("button", { name: "Open Morning ridge" }),
		);

		expect(
			screen.getByRole("dialog", { name: "Morning ridge" }),
		).toHaveAttribute("data-drag", "false");
	});

	it("allows grouped media drag dismissal to be disabled", async () => {
		const user = userEvent.setup();
		const media: ApertoMediaItem[] = [
			{
				type: "image",
				src: "/first-large.jpg",
				alt: "Ceramic vessels on linen",
				title: "Studio table",
			},
			{
				type: "image",
				src: "/second-large.jpg",
				alt: "A quiet reading nook",
				title: "Soft afternoon",
			},
		];

		render(
			<Aperto.Group dismissible={false} media={media}>
				<Aperto.Thumbnail index={0} />
				<Aperto.Thumbnail index={1} />
			</Aperto.Group>,
		);

		await user.click(screen.getByRole("button", { name: "Open Studio table" }));

		expect(
			screen.getByRole("dialog", { name: "Studio table" }),
		).toHaveAttribute("data-drag", "false");
	});

	it("keeps grouped media draggable when using custom dismissal thresholds", async () => {
		const user = userEvent.setup();
		const media: ApertoMediaItem[] = [
			{
				type: "image",
				src: "/first-large.jpg",
				alt: "Ceramic vessels on linen",
				title: "Studio table",
			},
		];

		render(
			<Aperto.Group
				dismissible={{ threshold: 180, velocity: 900 }}
				media={media}
			>
				<Aperto.Thumbnail index={0} />
			</Aperto.Group>,
		);

		await user.click(screen.getByRole("button", { name: "Open Studio table" }));

		expect(
			screen.getByRole("dialog", { name: "Studio table" }),
		).toHaveAttribute("data-drag", "true");
	});

	it("keeps grouped content mounted while switching media", async () => {
		const user = userEvent.setup();
		const media: ApertoMediaItem[] = [
			{
				type: "image",
				src: "/first-large.jpg",
				alt: "Ceramic vessels on linen",
				title: "Studio table",
			},
			{
				type: "image",
				src: "/second-large.jpg",
				alt: "A quiet reading nook",
				title: "Soft afternoon",
			},
		];

		render(
			<Aperto.Group media={media}>
				<Aperto.Thumbnail index={0} />
				<Aperto.Thumbnail index={1} />
			</Aperto.Group>,
		);

		await user.click(screen.getByRole("button", { name: "Open Studio table" }));
		const openedContent = screen.getByRole("dialog", { name: "Studio table" });

		await user.click(screen.getByRole("button", { name: "Next media" }));
		const navigatedContent = screen.getByRole("dialog", {
			name: "Soft afternoon",
		});

		expect(navigatedContent).toBe(openedContent);
		expect(navigatedContent).not.toHaveAttribute("data-layout-id");
		expect(navigatedContent).toBeVisible();
	});

	it("closes grouped content after navigating to another media item", async () => {
		const user = userEvent.setup();
		const media: ApertoMediaItem[] = [
			{
				type: "image",
				src: "/first-large.jpg",
				alt: "Ceramic vessels on linen",
				title: "Studio table",
			},
			{
				type: "image",
				src: "/second-large.jpg",
				alt: "A quiet reading nook",
				title: "Soft afternoon",
			},
		];

		render(
			<Aperto.Group media={media}>
				<Aperto.Thumbnail index={0} />
				<Aperto.Thumbnail index={1} />
			</Aperto.Group>,
		);

		await user.click(screen.getByRole("button", { name: "Open Studio table" }));

		await user.click(screen.getByRole("button", { name: "Next media" }));
		expect(
			screen.getByRole("button", {
				hidden: true,
				name: "Open Soft afternoon",
			}),
		).not.toHaveAttribute("data-layout-id");
		await user.click(screen.getByRole("button", { name: "Close" }));

		await waitFor(() =>
			expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
		);
	});
});
