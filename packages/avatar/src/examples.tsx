"use client";

import { Avatar } from ".";

export const DefaultExample = () => (
  <div className="flex items-center gap-4">
    <Avatar initials="PM" />
    <Avatar dynamicBackground text="Patternmode" />
    <Avatar alt="Random" src="https://picsum.photos/80" />
  </div>
);

export const SizesExample = () => (
  <div className="flex items-center gap-4">
    <Avatar initials="XS" size="xs" />
    <Avatar initials="SM" size="sm" />
    <Avatar initials="BA" size="base" />
    <Avatar initials="LG" size="lg" />
  </div>
);
