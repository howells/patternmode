import { joinClassNames } from "@patternmode/system";
import { motion, type PanInfo } from "motion/react";
import type { CSSProperties, HTMLAttributes, KeyboardEvent } from "react";
import { useRef } from "react";

import {
	type DistributionBarSegment,
	getDistributionBoundaryPercent,
	getDistributionTotal,
	moveDistributionBoundary,
} from "./DistributionBarMath";

export interface DistributionBarProps
	extends Omit<HTMLAttributes<HTMLFieldSetElement>, "onChange"> {
	minValue?: number;
	onChange?: (segments: DistributionBarSegment[]) => void;
	segments: DistributionBarSegment[];
	step?: number;
}

export function DistributionBar({
	"aria-label": ariaLabel,
	className,
	minValue = 4,
	onChange,
	segments,
	step = 1,
	...props
}: DistributionBarProps) {
	const trackRef = useRef<HTMLDivElement>(null);
	const total = getDistributionTotal(segments);

	function moveBoundary(boundaryIndex: number, deltaValue: number) {
		onChange?.(
			moveDistributionBoundary(segments, boundaryIndex, deltaValue, minValue),
		);
	}

	function handleDragEnd(boundaryIndex: number, info: PanInfo) {
		const trackWidth = trackRef.current?.getBoundingClientRect().width ?? 0;
		if (!(trackWidth > 0 && total > 0)) {
			return;
		}

		moveBoundary(boundaryIndex, (info.offset.x / trackWidth) * total);
	}

	function handleKeyDown(
		event: KeyboardEvent<HTMLButtonElement>,
		boundaryIndex: number,
	) {
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			moveBoundary(boundaryIndex, -step);
		}
		if (event.key === "ArrowRight") {
			event.preventDefault();
			moveBoundary(boundaryIndex, step);
		}
	}

	return (
		<fieldset
			{...props}
			aria-label={ariaLabel}
			className={joinClassNames("patternmode-distribution-bar", className)}
			data-slot="distribution-bar"
		>
			<div className="patternmode-distribution-bar__track" ref={trackRef}>
				<div className="patternmode-distribution-bar__segments">
					{segments.map((segment) => (
						<div
							aria-hidden="true"
							className="patternmode-distribution-bar__segment"
							key={segment.id}
							style={
								{
									"--patternmode-distribution-segment-color": segment.color,
									width: total > 0 ? `${(segment.value / total) * 100}%` : "0%",
								} as CSSProperties
							}
						/>
					))}
				</div>
				{segments.slice(0, -1).map((segment, boundaryIndex) => {
					const nextSegment = segments[boundaryIndex + 1];
					const boundaryPercent = getDistributionBoundaryPercent(
						segments,
						boundaryIndex,
					);
					const label = `Adjust ${segment.label ?? segment.id} and ${
						nextSegment?.label ?? nextSegment?.id
					} distribution`;
					return (
						<DistributionBarHandle
							aria-label={label}
							boundaryPercent={boundaryPercent}
							key={`${segment.id}-${nextSegment?.id ?? "end"}`}
							onDragEnd={(info) => handleDragEnd(boundaryIndex, info)}
							onKeyDown={(event) => handleKeyDown(event, boundaryIndex)}
						/>
					);
				})}
			</div>
			<div className="patternmode-distribution-bar__legend">
				{segments.map((segment) => (
					<span key={segment.id}>
						<span
							aria-hidden="true"
							className="patternmode-distribution-bar__swatch"
							style={
								{
									"--patternmode-distribution-segment-color": segment.color,
								} as CSSProperties
							}
						/>
						{segment.label ?? segment.id}{" "}
						{getDerivedDistributionPercentage(segment.value, total)}%
					</span>
				))}
			</div>
		</fieldset>
	);
}

function getDerivedDistributionPercentage(
	value: number,
	total: number,
): number {
	if (!(total > 0 && Number.isFinite(value))) {
		return 0;
	}

	return Math.round((Math.max(0, value) / total) * 100);
}

interface DistributionBarHandleProps {
	"aria-label": string;
	boundaryPercent: number;
	onDragEnd: (info: PanInfo) => void;
	onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

function DistributionBarHandle({
	"aria-label": ariaLabel,
	boundaryPercent,
	onDragEnd,
	onKeyDown,
}: DistributionBarHandleProps) {
	return (
		<motion.button
			aria-label={ariaLabel}
			className="patternmode-distribution-bar__handle"
			drag="x"
			dragElastic={0}
			dragMomentum={false}
			dragSnapToOrigin
			onDragEnd={(_event, info) => onDragEnd(info)}
			onKeyDown={onKeyDown}
			style={{ left: `calc(${boundaryPercent}% - 1.375rem)` }}
			type="button"
		/>
	);
}
