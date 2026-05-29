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

export interface DistributionDisplayProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "role"> {
	assignedLabel?: string;
	emptyLabel?: string;
	emptyValue?: number;
	legend?: "segments" | "summary" | false;
	segments: DistributionBarSegment[];
}

export interface DistributionBarProps
	extends Omit<HTMLAttributes<HTMLFieldSetElement>, "onChange"> {
	minValue?: number;
	onChange?: (segments: DistributionBarSegment[]) => void;
	segments: DistributionBarSegment[];
	step?: number;
}

export function DistributionDisplay({
	"aria-label": ariaLabel,
	assignedLabel = "assigned",
	className,
	emptyLabel = "unassigned",
	emptyValue = 0,
	legend = "segments",
	segments,
	...props
}: DistributionDisplayProps) {
	const total = getDistributionDisplayTotal(segments, emptyValue);
	const accessibleLabel =
		ariaLabel ??
		getDistributionDisplayAccessibleLabel(
			segments,
			emptyValue,
			emptyLabel,
			total,
		);

	return (
		<div
			{...props}
			aria-label={accessibleLabel}
			className={joinClassNames("patternmode-distribution-display", className)}
			data-slot="distribution-display"
			role="img"
		>
			<div className="patternmode-distribution-bar__track">
				<DistributionSegments
					emptyValue={emptyValue}
					segments={segments}
					total={total}
				/>
			</div>
			{legend === "segments" ? (
				<DistributionSegmentLegend
					emptyLabel={emptyLabel}
					emptyValue={emptyValue}
					segments={segments}
					total={total}
				/>
			) : null}
			{legend === "summary" ? (
				<DistributionSummaryLegend
					assignedLabel={assignedLabel}
					emptyLabel={emptyLabel}
					emptyValue={emptyValue}
					total={total}
				/>
			) : null}
		</div>
	);
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
	const dragStartSegmentsRef = useRef<DistributionBarSegment[] | null>(null);
	const total = getDistributionTotal(segments);

	function moveBoundary(
		boundaryIndex: number,
		deltaValue: number,
		sourceSegments = segments,
	) {
		onChange?.(
			moveDistributionBoundary(
				sourceSegments,
				boundaryIndex,
				deltaValue,
				minValue,
			),
		);
	}

	function handleDragStart() {
		dragStartSegmentsRef.current = segments;
	}

	function handleDrag(boundaryIndex: number, info: PanInfo) {
		const sourceSegments = dragStartSegmentsRef.current ?? segments;
		const sourceTotal = getDistributionTotal(sourceSegments);
		const trackWidth = trackRef.current?.getBoundingClientRect().width ?? 0;
		if (!(trackWidth > 0 && sourceTotal > 0)) {
			return;
		}

		moveBoundary(
			boundaryIndex,
			(info.offset.x / trackWidth) * sourceTotal,
			sourceSegments,
		);
	}

	function handleDragEnd(boundaryIndex: number, info: PanInfo) {
		handleDrag(boundaryIndex, info);
		dragStartSegmentsRef.current = null;
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
				<DistributionSegments segments={segments} total={total} />
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
							onDrag={(info) => handleDrag(boundaryIndex, info)}
							onDragEnd={(info) => handleDragEnd(boundaryIndex, info)}
							onDragStart={handleDragStart}
							onKeyDown={(event) => handleKeyDown(event, boundaryIndex)}
						/>
					);
				})}
			</div>
			<DistributionSegmentLegend segments={segments} total={total} />
		</fieldset>
	);
}

interface DistributionSegmentsProps {
	emptyValue?: number;
	segments: DistributionBarSegment[];
	total: number;
}

function DistributionSegments({
	emptyValue = 0,
	segments,
	total,
}: DistributionSegmentsProps) {
	return (
		<div className="patternmode-distribution-bar__segments">
			{segments.map((segment) => (
				<div
					aria-hidden="true"
					className="patternmode-distribution-bar__segment"
					key={segment.id}
					style={
						{
							"--patternmode-distribution-segment-color": segment.color,
							width:
								total > 0
									? `${(getRenderableDistributionValue(segment.value) / total) * 100}%`
									: "0%",
						} as CSSProperties
					}
				/>
			))}
			{emptyValue > 0 ? (
				<div
					aria-hidden="true"
					className="patternmode-distribution-bar__segment patternmode-distribution-bar__segment--empty"
					style={{
						width:
							total > 0
								? `${(getRenderableDistributionValue(emptyValue) / total) * 100}%`
								: "0%",
					}}
				/>
			) : null}
		</div>
	);
}

interface DistributionSegmentLegendProps {
	emptyLabel?: string;
	emptyValue?: number;
	segments: DistributionBarSegment[];
	total: number;
}

function DistributionSegmentLegend({
	emptyLabel,
	emptyValue = 0,
	segments,
	total,
}: DistributionSegmentLegendProps) {
	return (
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
			{emptyValue > 0 && emptyLabel ? (
				<span>
					<span
						aria-hidden="true"
						className="patternmode-distribution-bar__swatch patternmode-distribution-bar__swatch--empty"
					/>
					{emptyLabel} {getDerivedDistributionPercentage(emptyValue, total)}%
				</span>
			) : null}
		</div>
	);
}

interface DistributionSummaryLegendProps {
	assignedLabel: string;
	emptyLabel: string;
	emptyValue: number;
	total: number;
}

function DistributionSummaryLegend({
	assignedLabel,
	emptyLabel,
	emptyValue,
	total,
}: DistributionSummaryLegendProps) {
	const emptyPercentage = getDerivedDistributionPercentage(emptyValue, total);

	return (
		<div className="patternmode-distribution-bar__legend">
			<span>
				{Math.max(0, 100 - emptyPercentage)}% {assignedLabel}
			</span>
			{emptyValue > 0 ? (
				<span>
					{emptyPercentage}% {emptyLabel}
				</span>
			) : null}
		</div>
	);
}

function getDistributionDisplayTotal(
	segments: DistributionBarSegment[],
	emptyValue: number,
): number {
	return (
		getDistributionTotal(segments) + getRenderableDistributionValue(emptyValue)
	);
}

function getDistributionDisplayAccessibleLabel(
	segments: DistributionBarSegment[],
	emptyValue: number,
	emptyLabel: string,
	total: number,
): string {
	const segmentLabels = segments.map(
		(segment) =>
			`${segment.label ?? segment.id} ${getDerivedDistributionPercentage(
				segment.value,
				total,
			)}%`,
	);
	if (emptyValue > 0) {
		segmentLabels.push(
			`${emptyLabel} ${getDerivedDistributionPercentage(emptyValue, total)}%`,
		);
	}

	return segmentLabels.join(", ");
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

function getRenderableDistributionValue(value: number): number {
	return Number.isFinite(value) ? Math.max(0, value) : 0;
}

interface DistributionBarHandleProps {
	"aria-label": string;
	boundaryPercent: number;
	onDrag: (info: PanInfo) => void;
	onDragEnd: (info: PanInfo) => void;
	onDragStart: () => void;
	onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

function DistributionBarHandle({
	"aria-label": ariaLabel,
	boundaryPercent,
	onDrag,
	onDragEnd,
	onDragStart,
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
			onDrag={(_event, info) => onDrag(info)}
			onDragEnd={(_event, info) => onDragEnd(info)}
			onDragStart={onDragStart}
			onKeyDown={onKeyDown}
			style={{ left: `calc(${boundaryPercent}% - 1.375rem)` }}
			transformTemplate={() => "none"}
			type="button"
		/>
	);
}
