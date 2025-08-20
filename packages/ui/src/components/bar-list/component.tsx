"use client";

import React from "react";
import { focusRing } from "../../presentation/focus-ring";
import { cx } from "../../utils/cx";

type Bar<T> = T & {
	/**
	 * Unique identifier for the bar (defaults to name if not provided).
	 */
	key?: string;
	/**
	 * Optional URL to make the bar name clickable.
	 */
	href?: string;
	/**
	 * Numeric value for bar length calculation.
	 */
	value: number;
	/**
	 * Display name for the bar.
	 */
	name: string;
};

type BarListProps<T = unknown> = {
	/**
	 * Array of data items to visualize as bars.
	 * Each item should have a name and value, with optional href for links.
	 */
	data: Bar<T>[];
	/**
	 * Function to format displayed values.
	 * Applied to the numeric values shown on the right side.
	 */
	valueFormatter?: (value: number) => string;
	/**
	 * Whether to animate bar width transitions.
	 * Creates smooth transitions when data changes.
	 */
	showAnimation?: boolean;
	/**
	 * Callback when a bar is clicked (makes bars interactive).
	 * Enables click interactions and visual hover states.
	 */
	onValueChange?: (payload: Bar<T>) => void;
	/**
	 * How to sort the bars by value.
	 * Controls the display order of bars in the list.
	 */
	sortOrder?: "ascending" | "descending" | "none";
} & React.ComponentPropsWithoutRef<"div">;

const EMPTY_DATA_ARRAY: any[] = [];
const DEFAULT_VALUE_FORMATTER = (value: number) => value.toString();

function BarListInner<T>(
	{
		data = EMPTY_DATA_ARRAY,
		valueFormatter = DEFAULT_VALUE_FORMATTER,
		showAnimation = false,
		onValueChange,
		sortOrder = "descending",
		className,
		...props
	}: BarListProps<T>,
	forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
	const Component = onValueChange ? "button" : "div";
	const sortedData = React.useMemo(() => {
		if (sortOrder === "none") {
			return data;
		}
		return [...data].sort((a, b) => {
			return sortOrder === "ascending" ? a.value - b.value : b.value - a.value;
		});
	}, [data, sortOrder]);

	const widths = React.useMemo(() => {
		const maxValue = Math.max(...sortedData.map((item) => item.value), 0);
		return sortedData.map((item) =>
			item.value === 0 ? 0 : Math.max((item.value / maxValue) * 100, 2),
		);
	}, [sortedData]);

	const rowHeight = "h-8";

	return (
		<div
			ref={forwardedRef}
			className={cx("flex justify-between space-x-6", className)}
			aria-sort={sortOrder}
			data-testid="bar-list"
			{...props}
		>
			<div className="relative w-full space-y-1.5">
				{sortedData.map((item, index) => (
					<Component
						key={item.key ?? item.name}
						onClick={() => {
							onValueChange?.(item);
						}}
						className={cx(
							// base
							"group w-full rounded-sm",
							// focus
							focusRing,
							onValueChange
								? [
										"-m-0! cursor-pointer",
										// hover
										"hover:bg-zinc-50 dark:hover:bg-zinc-900",
									]
								: "",
						)}
					>
						<div
							className={cx(
								// base
								"flex items-center rounded-sm transition-all",
								rowHeight,
								// background color
								"bg-blue-200 dark:bg-blue-900",
								onValueChange
									? "group-hover:bg-blue-300 dark:group-hover:bg-blue-800"
									: "",
								// margin and duration
								{
									"mb-0": index === sortedData.length - 1,
									"duration-800": showAnimation,
								},
							)}
							style={{ width: `${widths[index]}%` }}
						>
							<div className={cx("absolute left-2 flex max-w-full pr-2")}>
								{item.href ? (
									<a
										href={item.href}
										className={cx(
											// base
											"truncate whitespace-nowrap rounded-sm text-sm",
											// text color
											"text-zinc-900 dark:text-zinc-50",
											// hover
											"hover:underline hover:underline-offset-2",
											// focus
											focusRing,
										)}
										target="_blank"
										rel="noreferrer"
										onClick={(event) => event.stopPropagation()}
									>
										{item.name}
									</a>
								) : (
									<p
										className={cx(
											// base
											"truncate whitespace-nowrap text-sm",
											// text color
											"text-zinc-900 dark:text-zinc-50",
										)}
									>
										{item.name}
									</p>
								)}
							</div>
						</div>
					</Component>
				))}
			</div>
			<div>
				{sortedData.map((item, index) => (
					<div
						key={item.key ?? item.name}
						className={cx(
							"flex items-center justify-end",
							rowHeight,
							index === sortedData.length - 1 ? "mb-0" : "mb-1.5",
						)}
					>
						<p
							className={cx(
								// base
								"truncate whitespace-nowrap text-sm leading-none",
								// text color
								"text-zinc-900 dark:text-zinc-50",
							)}
						>
							{valueFormatter(item.value)}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

BarListInner.displayName = "BarList";

/**
 * List-style bar chart component for simple data comparison with text labels.
 */
const BarList = React.forwardRef(BarListInner) as <T>(
	p: BarListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof BarListInner>;

export { type Bar, BarList, type BarListProps };
