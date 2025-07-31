"use client";

import { TouchTarget } from "@patternmode/ui";

export function TouchTargetExample() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Without TouchTarget</h3>
        <button className="text-xs px-2 py-1 bg-blue-600 text-white rounded">
          Small Button
        </button>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">With TouchTarget</h3>
        <TouchTarget>
          <button className="text-xs px-2 py-1 bg-blue-600 text-white rounded">
            Small Button
          </button>
        </TouchTarget>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        TouchTarget ensures the button has a minimum touch area of 44px × 44px for better accessibility.
      </p>
    </div>
  );
}
