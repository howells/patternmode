"use client";

import { Meter } from "./component";

export const DefaultExample = () => <Meter value={65} />;

export const WithLabelExample = () => <Meter label="Progress" value={75} />;

export const VariantsExample = () => (
  <div className="w-full space-y-4">
    <Meter label="Default" value={65} variant="default" />
    <Meter label="Neutral" value={45} variant="neutral" />
    <Meter label="Success" value={85} variant="success" />
    <Meter label="Info" value={70} variant="info" />
    <Meter label="Warning" value={90} variant="warning" />
    <Meter label="Error" value={95} variant="error" />
    <Meter label="Critical" value={80} variant="critical" />
    <Meter label="Positive" value={75} variant="positive" />
    <Meter label="Negative" value={60} variant="negative" />
  </div>
);

export const CustomRangeExample = () => {
  const MB = 1000;
  return <Meter label="Storage Used (MB)" max={MB} min={0} value={750} />;
};

export const NoAnimationExample = () => (
  <Meter label="Static Progress" showAnimation={false} value={40} />
);

export const ValueOnlyExample = () => <Meter showValue={true} value={80} />;

export const CustomFormattingExample = () => (
  <div className="w-full space-y-4">
    <Meter
      formatValue={(value, _min, max) => `${value}GB of ${max}GB`}
      label="Memory Usage"
      max={32}
      value={24}
    />
    <Meter
      formatValue={(value, _min, max) => {
        const MB = 1000;
        return `${(value / MB).toFixed(1)}MB / ${(max / MB).toFixed(1)}MB`;
      }}
      label="Download Progress"
      max={2000}
      value={1250}
    />
  </div>
);

export const SystemMetricsExample = () => (
  <div className="w-full space-y-4">
    <Meter label="CPU Usage" value={45} variant="success" />
    <Meter label="Memory Usage" value={72} variant="warning" />
    <Meter label="Disk Usage" value={85} variant="error" />
    <Meter label="Network Usage" value={30} variant="info" />
  </div>
);
