"use client";

import React from "react";
import { Separator } from "@patternmode/ui";

// Default separator
export function DefaultExample() {
  return (
    <div className="space-y-4">
      <div>Content above separator</div>
      <Separator />
      <div>Content below separator</div>
    </div>
  );
}

// Separator with text label
export function WithTextExample() {
  return (
    <div className="space-y-4">
      <div>Sign in with your email</div>
      <Separator>or</Separator>
      <div>Continue with Google</div>
    </div>
  );
}

// Vertical separator
export function VerticalExample() {
  return (
    <div className="flex items-center h-8 space-x-4">
      <span>Home</span>
      <Separator orientation="vertical" className="h-4" />
      <span>About</span>
      <Separator orientation="vertical" className="h-4" />
      <span>Contact</span>
    </div>
  );
}

// Different sizes and variants
export function SizesExample() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-zinc-600 mb-2">Subtle variant</div>
        <Separator variant="subtle" />
      </div>
      <div>
        <div className="text-sm text-zinc-600 mb-2">Default variant</div>
        <Separator variant="default" />
      </div>
      <div>
        <div className="text-sm text-zinc-600 mb-2">Strong variant</div>
        <Separator variant="strong" />
      </div>
      <div>
        <div className="text-sm text-zinc-600 mb-2">Large size with text</div>
        <Separator size="lg" spacing="lg">
          Section Break
        </Separator>
      </div>
    </div>
  );
}
