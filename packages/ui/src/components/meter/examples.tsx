"use client";

import React from "react";
import { Meter } from "./component";

export const DefaultExample = () => <Meter value={65} />;

export const WithLabelExample = () => <Meter value={75} label="Progress" />;

export const VariantsExample = () => (
  <div className="w-full space-y-4">
    <Meter value={65} variant="default" label="Default" />
    <Meter value={45} variant="neutral" label="Neutral" />
    <Meter value={85} variant="success" label="Success" />
    <Meter value={70} variant="info" label="Info" />
    <Meter value={90} variant="warning" label="Warning" />
    <Meter value={95} variant="error" label="Error" />
    <Meter value={80} variant="critical" label="Critical" />
    <Meter value={75} variant="positive" label="Positive" />
    <Meter value={60} variant="negative" label="Negative" />
  </div>
);

export const CustomRangeExample = () => (
  <Meter value={750} min={0} max={1000} label="Storage Used (MB)" />
);

export const NoAnimationExample = () => (
  <Meter value={40} showAnimation={false} label="Static Progress" />
);

export const ValueOnlyExample = () => <Meter value={80} showValue={true} />;

export const CustomFormattingExample = () => (
  <div className="w-full space-y-4">
    <Meter
      value={24}
      max={32}
      label="Memory Usage"
      formatValue={(value, min, max) => `${value}GB of ${max}GB`}
    />
    <Meter
      value={1250}
      max={2000}
      label="Download Progress"
      formatValue={(value, min, max) => `${(value / 1000).toFixed(1)}MB / ${(max / 1000).toFixed(1)}MB`}
    />
  </div>
);

export const SystemMetricsExample = () => (
  <div className="w-full space-y-4">
    <Meter value={45} variant="success" label="CPU Usage" />
    <Meter value={72} variant="warning" label="Memory Usage" />
    <Meter value={85} variant="error" label="Disk Usage" />
    <Meter value={30} variant="info" label="Network Usage" />
  </div>
);
