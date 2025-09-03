"use client";

import { Dot } from "./component";

export const BasicExample = () => (
  <div className="flex items-center gap-3">
    <Dot variant="default" />
    <Dot variant="success" />
    <Dot variant="warning" />
    <Dot variant="error" />
    <Dot variant="info" />
  </div>
);

export const SemanticVariantsExample = () => (
  <div className="flex items-center gap-3">
    <Dot label="Online" variant="success" />
    <Dot label="Away" variant="warning" />
    <Dot label="Offline" variant="error" />
  </div>
);

export const ColorVariantsExample = () => (
  <div className="flex items-center gap-3">
    <Dot variant="blue" />
    <Dot variant="purple" />
    <Dot variant="emerald" />
  </div>
);

export const SizesExample = () => (
  <div className="flex items-center gap-3">
    <Dot size="sm" />
    <Dot size="default" />
    <Dot size="lg" />
  </div>
);

export const WithLabelsExample = () => (
  <div className="flex items-center gap-4">
    <Dot label="Up" variant="success" />
    <Dot label="Down" variant="error" />
  </div>
);

export const WithoutLabelsExample = () => (
  <div className="flex items-center gap-3">
    <Dot />
    <Dot />
    <Dot />
  </div>
);

export const AnimatedExample = () => (
  <div className="flex items-center gap-3">
    <Dot animated label="Live" variant="info" />
  </div>
);

export const DotExample = () => (
  <div className="flex items-center gap-3">
    <Dot label="Deployed" variant="success" />
    <Dot animated label="Rolling" variant="warning" />
    <Dot label="Failed" variant="error" />
  </div>
);
