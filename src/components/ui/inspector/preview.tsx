"use client";

import { Subheading } from "@patternmode/ui";
import {
  Inspector,
  InspectorBody,
  InspectorGroup,
  InspectorHeader,
  InspectorSection,
} from "@patternmode/ui";

export function Example() {
  return (
    <div className="relative h-96 border border-zinc-200 dark:border-zinc-800">
      <Inspector>
        <InspectorHeader>
          <Subheading level={2}>Inspector Panel</Subheading>
        </InspectorHeader>
        <InspectorBody>
          <InspectorSection>
            <InspectorGroup>
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Properties
              </h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-zinc-500">Width:</span>
                  <span className="ml-2 text-zinc-900 dark:text-zinc-100">
                    320px
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-zinc-500">Height:</span>
                  <span className="ml-2 text-zinc-900 dark:text-zinc-100">
                    100%
                  </span>
                </div>
              </div>
            </InspectorGroup>
            <InspectorGroup>
              <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Settings
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Configure inspector panel settings and options.
              </p>
            </InspectorGroup>
          </InspectorSection>
        </InspectorBody>
      </Inspector>
    </div>
  );
}
