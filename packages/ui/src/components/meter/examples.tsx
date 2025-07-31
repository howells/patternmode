"use client";

import { Meter } from "@patternmode/ui";
import React from "react";

export const /**
              *
              */
  DefaultExample = () => <Meter value={65} />;

export const /**
              *
              */
  WithLabelExample = () => <Meter value={75} label="Progress" />;

export const /**
              *
              */
  VariantsExample = () => (
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

export const /**
              *
              */
  CustomRangeExample = () => (
    <Meter value={750} min={0} max={1000} label="Storage Used (MB)" />
  );

export const /**
              *
              */
  NoAnimationExample = () => (
    <Meter value={40} showAnimation={false} label="Static Progress" />
  );

export const /**
              *
              */
  ValueOnlyExample = () => <Meter value={80} showValue={true} />;
export const /**
              *
              */
  MeterExample = DefaultExample;
