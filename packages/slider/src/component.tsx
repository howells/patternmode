"use client";

import { Slider as BaseSlider } from "@base-ui-components/react/slider";
import { cx } from "@patternmode/utils/cx";
import type * as React from "react";
import type { SliderProps } from "./types";
import { sliderVariants } from "./variants";

/**
 * Range slider component for selecting numeric values within a specified range.
 */
const Slider = ({
	ref: forwardedRef,
	className,
	ariaLabelThumb,
	showValue = false,
	valueFormatter = (value) => value.toString(),
	value,
	defaultValue,
	...props
}: SliderProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseSlider.Root> | null>;
}) => {
	const {
		root,
		control,
		track,
		indicator,
		thumb,
		value: _valueClass,
	} = sliderVariants();

	// Ensure we always have a proper value to avoid hydration mismatches
	const currentValue = value ?? defaultValue ?? [0];
	const valueArray = Array.isArray(currentValue)
		? currentValue
		: [currentValue];

	// Clean props to pass to BaseSlider - ensure value is never undefined
	const sliderProps = {
		...props,
		value: currentValue,
		defaultValue: defaultValue ?? [0],
	};

	if (props.orientation === "vertical") {
		return (
			<div className="flex flex-col items-center h-full">
				<BaseSlider.Root
					ref={forwardedRef as React.RefObject<HTMLDivElement>}
					className={cx(root(), "flex flex-col items-center", className)}
					data-testid="slider"
					{...sliderProps}
				>
					<BaseSlider.Control className={control()}>
						<BaseSlider.Track className={track()}>
							<BaseSlider.Indicator className={indicator()} />
							{valueArray.map((_, index) => (
								<BaseSlider.Thumb
									// biome-ignore lint/suspicious/noArrayIndexKey: thumbs are positional and order is stable
									key={`thumb-${index}`}
									className={thumb()}
									getAriaLabel={() =>
										ariaLabelThumb || `Slider thumb ${index + 1}`
									}
								/>
							))}
						</BaseSlider.Track>
					</BaseSlider.Control>
					{showValue && (
						<div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
							<BaseSlider.Value>
								{(_formattedValues, values) =>
									values.length === 1 ? (
										<div className="text-center">
											<span>{valueFormatter(values[0])}</span>
										</div>
									) : (
										<div className="flex flex-col items-center gap-1">
											{values.map((val, index) => (
												// biome-ignore lint/suspicious/noArrayIndexKey: value badges are static for current values
												<span key={`value-${index}`}>
													{valueFormatter(val)}
												</span>
											))}
										</div>
									)
								}
							</BaseSlider.Value>
						</div>
					)}
				</BaseSlider.Root>
			</div>
		);
	}

	return (
		<div className="w-full">
			<BaseSlider.Root
				ref={forwardedRef as React.RefObject<HTMLDivElement>}
				className={cx(root(), className)}
				data-testid="slider"
				{...sliderProps}
			>
				<BaseSlider.Control className={control()}>
					<BaseSlider.Track className={track()}>
						<BaseSlider.Indicator className={indicator()} />
						{valueArray.map((_, index) => (
							<BaseSlider.Thumb
								// biome-ignore lint/suspicious/noArrayIndexKey: thumbs are positional and order is stable
								key={`thumb-${index}`}
								className={thumb()}
								getAriaLabel={() =>
									ariaLabelThumb || `Slider thumb ${index + 1}`
								}
							/>
						))}
					</BaseSlider.Track>
				</BaseSlider.Control>
				{showValue && (
					<div className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">
						<BaseSlider.Value>
							{(_formattedValues, values) =>
								values.length === 1 ? (
									<div className="w-full text-center">
										<span>{valueFormatter(values[0])}</span>
									</div>
								) : (
									<div className="flex justify-between w-full">
										{values.map((val, index) => (
											// biome-ignore lint/suspicious/noArrayIndexKey: value badges are static for current values
											<span key={`value-${index}`}>{valueFormatter(val)}</span>
										))}
									</div>
								)
							}
						</BaseSlider.Value>
					</div>
				)}
			</BaseSlider.Root>
		</div>
	);
};

Slider.displayName = "Slider";

// Export individual components for advanced usage
const SliderRoot = BaseSlider.Root;
const SliderValue = BaseSlider.Value;
const SliderControl = BaseSlider.Control;
const SliderTrack = BaseSlider.Track;
const SliderIndicator = BaseSlider.Indicator;
const SliderThumb = BaseSlider.Thumb;

export {
	Slider,
	SliderControl,
	SliderIndicator,
	SliderRoot,
	SliderThumb,
	SliderTrack,
	SliderValue,
};
