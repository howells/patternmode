"use client";

import React from "react";
import {
	Progress,
	ProgressBar,
	ProgressIndicator,
	ProgressLabel,
	ProgressTrack,
	ProgressValue,
} from "./component";

export const DefaultExample = () => {
	return (
		<div className="space-y-4">
			<ProgressBar value={75} />
		</div>
	);
};

export const WithLabelExample = () => {
	return (
		<div className="space-y-4">
			<ProgressBar value={60} label="Loading data" />
		</div>
	);
};

export const WithValueExample = () => {
	return (
		<div className="space-y-4">
			<ProgressBar value={45} label="Upload progress" showValue />
		</div>
	);
};

export const VariantsExample = () => {
	return (
		<div className="space-y-4">
			<ProgressBar value={25} variant="default" label="Default" showValue />
			<ProgressBar value={50} variant="neutral" label="Neutral" showValue />
			<ProgressBar value={75} variant="warning" label="Warning" showValue />
			<ProgressBar value={40} variant="error" label="Error" showValue />
			<ProgressBar value={90} variant="success" label="Success" showValue />
		</div>
	);
};

export const CustomFormatterExample = () => {
	return (
		<div className="space-y-4">
			<ProgressBar
				value={3}
				max={10}
				label="Processing files"
				showValue
				valueFormatter={(value: number | null, max: number) =>
					`${value ?? 0} of ${max} files`
				}
			/>
			<ProgressBar
				value={1024}
				max={2048}
				label="Upload progress"
				showValue
				valueFormatter={(value: number | null, max: number) =>
					`${Math.round(((value ?? 0) / max) * 100)}% (${value ?? 0}/${max} MB)`
				}
				variant="success"
			/>
		</div>
	);
};

export const CompositionExample = () => {
	return (
		<div className="space-y-4">
			<Progress value={45} max={100}>
				<ProgressLabel>Custom Progress</ProgressLabel>
				<ProgressTrack variant="warning">
					<ProgressIndicator variant="warning" />
				</ProgressTrack>
				<ProgressValue>
					{(_formatted, value) => `${value}% complete`}
				</ProgressValue>
			</Progress>
		</div>
	);
};

export const AnimationExample = () => {
	const [value, setValue] = React.useState(0);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setValue((prev) => (prev >= 100 ? 0 : prev + 10));
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="space-y-4">
			<ProgressBar
				value={value}
				label="Animated progress"
				showValue
				variant="success"
				showAnimation
			/>
			<ProgressBar
				value={value}
				label="No animation"
				showValue
				variant="neutral"
				showAnimation={false}
			/>
		</div>
	);
};
