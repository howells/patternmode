"use client";

import { Separator } from ".";

export const DefaultExample = () => (
  <div>
    <div className="mb-2 text-sm text-zinc-600">Section 1</div>
    <Separator />
    <div className="mt-2 text-sm text-zinc-600">Section 2</div>
  </div>
);

export const WithTextExample = () => <Separator>Or continue</Separator>;

export const VerticalExample = () => (
  <div className="flex items-center gap-4">
    <span>A</span>
    <Separator orientation="vertical" />
    <span>B</span>
    <Separator orientation="vertical" />
    <span>C</span>
  </div>
);

export const VariantsExample = () => (
  <div className="space-y-3">
    <Separator variant="subtle" />
    <Separator variant="default" />
    <Separator variant="strong" />
  </div>
);

export const SizesExample = () => (
  <div className="space-y-3">
    <Separator size="sm" />
    <Separator size="md" />
    <Separator size="lg" />
  </div>
);

export const ContentSectionsExample = () => (
  <div className="space-y-6">
    <div>
      <h4 className="mb-2 font-medium text-sm text-zinc-700">Billing</h4>
      <p className="mb-2 text-xs text-zinc-600">Manage billing details</p>
      <Separator />
    </div>
    <div>
      <h4 className="mb-2 font-medium text-sm text-zinc-700">Users</h4>
      <p className="mb-2 text-xs text-zinc-600">Manage team and roles</p>
      <Separator />
    </div>
  </div>
);
