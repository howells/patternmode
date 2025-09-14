"use client";

import { Stack } from "@patternmode/stack";
import { ArrowRight, Check, Heart, Search, Star, User } from "lucide-react";
import { Icon } from ".";

// Basic icons
export const DefaultExample = () => {
  return (
    <Stack align="center" direction="horizontal" gap={4}>
      <Icon icon={User} />
      <Icon icon={Heart} />
      <Icon icon={Star} />
      <Icon icon={Check} />
    </Stack>
  );
};

// Different sizes
export const SizesExample = () => {
  return (
    <Stack align="center" direction="horizontal" gap={2}>
      <Icon icon={Star} size="xs" />
      <Icon icon={Star} size="sm" />
      <Icon icon={Star} size="base" />
      <Icon icon={Star} size="lg" />
      <Icon icon={Star} size="xl" />
    </Stack>
  );
};

// Icons with backgrounds
export const WithBackgroundExample = () => {
  return (
    <Stack align="center" direction="horizontal" gap={2}>
      <Stack
        align="center"
        className="rounded border p-3"
        direction="horizontal"
        gap={2}
      >
        <Icon icon={User} />
        <span>Profile</span>
      </Stack>

      <div className="flex items-center rounded border p-3">
        <Icon className="text-red-500" icon={Heart} />
      </div>

      <Stack align="center" direction="horizontal" gap={1}>
        <Icon className="text-yellow-500" icon={Star} size="sm" />
        <span className="text-sm">4.5</span>
      </Stack>

      <Stack align="center" direction="horizontal" gap={3}>
        <span>Next</span>
        <Icon icon={ArrowRight} size="sm" />
      </Stack>
    </Stack>
  );
};

export function CustomStrokeExample() {
  return (
    <Stack align="center" direction="horizontal" gap={4}>
      <Icon icon={Star} strokeWidth={1} />
      <Icon icon={Star} strokeWidth={1.5} />
      <Icon icon={Star} strokeWidth={2} />
      <Icon icon={Star} strokeWidth={2.5} />
    </Stack>
  );
}

export function LayoutExample() {
  return (
    <div className="space-y-4">
      {/* Stack with gap */}
      <Stack
        align="center"
        className="rounded border p-3"
        direction="horizontal"
        gap={2}
      >
        <Icon icon={Search} />
        <span>Search with stack gap</span>
      </Stack>

      {/* Manual margin */}
      <div className="flex items-center rounded border p-3">
        <Icon className="mr-2" icon={User} />
        <span>User with margin-right</span>
      </div>

      {/* Different gap sizes */}
      <Stack gap={2}>
        <Stack align="center" direction="horizontal" gap={1}>
          <Icon icon={Star} size="sm" />
          <span className="text-sm">Small gap</span>
        </Stack>
        <Stack align="center" direction="horizontal" gap={3}>
          <Icon icon={Heart} />
          <span>Large gap</span>
        </Stack>
      </Stack>
    </div>
  );
}
