"use client";

import { Swatch } from "@howells/swatch";
import type { SVGProps } from "react";
import { useState } from "react";

const colors = ["#315c4b", "#e1ebe5", "#9b3d32", "#d9a441", "#1d1d1b"];

function CheckIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg fill="none" viewBox="0 0 24 24" {...props}>
			<title>Selected</title>
			<path d="m5 12 4 4L19 6" />
		</svg>
	);
}

export function SwatchDemo() {
	const [selected, setSelected] = useState(colors[0]);
	const [visibleColors, setVisibleColors] = useState(colors);

	return (
		<div className="swatch-demo">
			<fieldset aria-label="Selectable colors" className="swatch-demo-row">
				<legend className="sr-only">Selectable colors</legend>
				{visibleColors.map((color) => (
					<button
						aria-label={`Select ${color}`}
						aria-pressed={selected === color}
						className="swatch-demo-button"
						key={color}
						onClick={() => setSelected(color)}
						type="button"
					>
						<Swatch
							aria-hidden="true"
							color={color}
							icon={CheckIcon}
							onRemove={
								visibleColors.length > 1
									? () =>
											setVisibleColors((current) =>
												current.filter((item) => item !== color),
											)
									: undefined
							}
							selected={selected === color}
							size="xl"
						/>
					</button>
				))}
			</fieldset>

			<div className="swatch-demo-specimens">
				<Swatch
					aria-label="Weighted palette"
					colors={[
						{ color: "#315c4b", ratio: 48 },
						{ color: "#e1ebe5", ratio: 28 },
						{ color: "#d9a441", ratio: 24 },
					]}
					shape="pill"
					size="2xl"
				/>
				<Swatch
					aria-label="Gradient swatch"
					background="linear-gradient(135deg, #1d1d1b, #315c4b 52%, #e1ebe5)"
					shape="square"
					size="2xl"
				/>
				<Swatch
					aria-label="Unavailable finish"
					color="#d7d2c7"
					size="2xl"
					unavailable
				/>
			</div>
		</div>
	);
}
