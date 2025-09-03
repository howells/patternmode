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
      <ProgressBar label="Loading data" value={60} />
    </div>
  );
};

export const WithValueExample = () => {
  return (
    <div className="space-y-4">
      <ProgressBar label="Upload progress" showValue value={45} />
    </div>
  );
};

export const VariantsExample = () => {
  return (
    <div className="space-y-4">
      <ProgressBar label="Default" showValue value={25} variant="default" />
      <ProgressBar label="Neutral" showValue value={50} variant="neutral" />
      <ProgressBar label="Warning" showValue value={75} variant="warning" />
      <ProgressBar label="Error" showValue value={40} variant="error" />
      <ProgressBar label="Success" showValue value={90} variant="success" />
    </div>
  );
};

export const CustomFormatterExample = () => {
  return (
    <div className="space-y-4">
      <ProgressBar
        label="Processing files"
        max={10}
        showValue
        value={3}
        valueFormatter={(value: number | null, max: number) =>
          `${value ?? 0} of ${max} files`
        }
      />
      <ProgressBar
        label="Upload progress"
        max={2048}
        showValue
        value={1024}
        valueFormatter={(value: number | null, max: number) => {
          const PERCENT = 100;
          return `${Math.round(((value ?? 0) / max) * PERCENT)}% (${value ?? 0}/${max} MB)`;
        }}
        variant="success"
      />
    </div>
  );
};

export const CompositionExample = () => {
  return (
    <div className="space-y-4">
      <Progress max={100} value={45}>
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
    const MAX_PERCENT = 100;
    const STEP = 10;
    const INTERVAL_MS = 1000;
    const timer = setInterval(() => {
      setValue((prev) => (prev >= MAX_PERCENT ? 0 : prev + STEP));
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-4">
      <ProgressBar
        label="Animated progress"
        showAnimation
        showValue
        value={value}
        variant="success"
      />
      <ProgressBar
        label="No animation"
        showAnimation={false}
        showValue
        value={value}
        variant="neutral"
      />
    </div>
  );
};
