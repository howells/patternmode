"use client";

import { Check, Clock, Zap } from "lucide-react";

import { ProgressCircle } from ".";

export const DefaultExample = () => {
  return <ProgressCircle value={75} />;
};

export const SizesExample = () => {
  return (
    <div className="flex items-center gap-4">
      <ProgressCircle size="xs" value={25} />
      <ProgressCircle size="sm" value={50} />
      <ProgressCircle size="md" value={75} />
      <ProgressCircle size="lg" value={90} />
      <ProgressCircle size="xl" value={100} />
    </div>
  );
};

export const VariantsExample = () => {
  return (
    <div className="flex items-center gap-4">
      <ProgressCircle value={75} variant="default" />
      <ProgressCircle value={75} variant="neutral" />
      <ProgressCircle value={75} variant="warning" />
      <ProgressCircle value={75} variant="error" />
      <ProgressCircle value={75} variant="success" />
    </div>
  );
};

export const WithValueExample = () => {
  return <ProgressCircle showValue value={85} />;
};

export const WithLabelExample = () => {
  return <ProgressCircle label="Progress" showValue value={60} />;
};

export const CustomFormatterExample = () => {
  return (
    <div className="flex items-center gap-4">
      <ProgressCircle
        label="Rating"
        max={10}
        showValue
        value={8}
        valueFormatter={(val, max) => `${val?.toFixed(1) || 0}/${max}`}
      />
      <ProgressCircle
        label="Points"
        max={1000}
        showValue
        value={750}
        valueFormatter={(val) => `${val || 0}pts`}
        variant="success"
      />
    </div>
  );
};

export const IndeterminateExample = () => {
  return <ProgressCircle label="Loading..." value={null} />;
};

export const CustomContentExample = () => {
  return (
    <div className="flex items-center gap-4">
      <ProgressCircle size="lg" value={100} variant="success">
        <Check className="h-6 w-6 text-emerald-500" />
      </ProgressCircle>
      <ProgressCircle size="lg" value={null} variant="neutral">
        <Clock className="h-6 w-6 animate-spin text-zinc-500" />
      </ProgressCircle>
      <ProgressCircle size="lg" value={45} variant="warning">
        <div className="text-center">
          <Zap className="mx-auto h-4 w-4 text-yellow-500" />
          <span className="mt-1 block text-xs text-yellow-600">Fast</span>
        </div>
      </ProgressCircle>
    </div>
  );
};

export const NoAnimationExample = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <ProgressCircle showAnimation value={75} />
        <p className="mt-2 text-sm text-zinc-600">With animation</p>
      </div>
      <div className="text-center">
        <ProgressCircle showAnimation={false} value={75} />
        <p className="mt-2 text-sm text-zinc-600">No animation</p>
      </div>
    </div>
  );
};
