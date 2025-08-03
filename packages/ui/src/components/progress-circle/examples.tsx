"use client";

import { Check, Clock, Zap } from "lucide-react";
import React from "react";

import { ProgressCircle } from "./component";

export const DefaultExample = () => {
  return <ProgressCircle value={75} />;
};

export const SizesExample = () => {
  return (
    <div className="flex items-center gap-4">
      <ProgressCircle value={25} size="xs" />
      <ProgressCircle value={50} size="sm" />
      <ProgressCircle value={75} size="md" />
      <ProgressCircle value={90} size="lg" />
      <ProgressCircle value={100} size="xl" />
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
  return <ProgressCircle value={85} showValue />;
};

export const WithLabelExample = () => {
  return <ProgressCircle value={60} label="Progress" showValue />;
};

export const CustomFormatterExample = () => {
  return (
    <div className="flex items-center gap-4">
      <ProgressCircle
        value={8}
        max={10}
        label="Rating"
        showValue
        valueFormatter={(val, max) => `${val?.toFixed(1) || 0}/${max}`}
      />
      <ProgressCircle
        value={750}
        max={1000}
        label="Points"
        showValue
        valueFormatter={val => `${val || 0}pts`}
        variant="success"
      />
    </div>
  );
};

export const IndeterminateExample = () => {
  return <ProgressCircle value={null} label="Loading..." />;
};

export const CustomContentExample = () => {
  return (
    <div className="flex items-center gap-4">
      <ProgressCircle value={100} variant="success" size="lg">
        <Check className="w-6 h-6 text-emerald-500" />
      </ProgressCircle>
      <ProgressCircle value={null} variant="neutral" size="lg">
        <Clock className="w-6 h-6 text-zinc-500 animate-spin" />
      </ProgressCircle>
      <ProgressCircle value={45} variant="warning" size="lg">
        <div className="text-center">
          <Zap className="w-4 h-4 text-yellow-500 mx-auto" />
          <span className="text-xs text-yellow-600 block mt-1">Fast</span>
        </div>
      </ProgressCircle>
    </div>
  );
};

export const NoAnimationExample = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <ProgressCircle value={75} showAnimation />
        <p className="text-sm text-zinc-600 mt-2">With animation</p>
      </div>
      <div className="text-center">
        <ProgressCircle value={75} showAnimation={false} />
        <p className="text-sm text-zinc-600 mt-2">No animation</p>
      </div>
    </div>
  );
};
