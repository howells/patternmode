"use client";

import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardBody,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardFooter,
  PreviewCardHeader,
  PreviewCardTitle,
  PreviewCardTrigger,
} from "@patternmode/ui";

export function PreviewCardExample() {
  return (
    <div className="flex justify-center p-8">
      <PreviewCard>
        <PreviewCardTrigger>
          @patternmode
        </PreviewCardTrigger>
        <PreviewCardContent>
          <PreviewCardArrow />
          <PreviewCardHeader>
            <PreviewCardTitle>PatternMode Component Library</PreviewCardTitle>
            <PreviewCardDescription>
              A modern React component library built with Tailwind CSS and Base UI primitives.
              Features accessible components with beautiful designs and smooth animations.
            </PreviewCardDescription>
          </PreviewCardHeader>
          <PreviewCardBody>
            <div className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
              <div>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">50+</span> Components
              </div>
              <div>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">TypeScript</span> Support
              </div>
              <div>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">100%</span> Accessible
              </div>
            </div>
          </PreviewCardBody>
          <PreviewCardFooter>
            <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
              Get Started
            </button>
            <div className="flex items-center gap-1 text-sm text-zinc-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Active development
            </div>
          </PreviewCardFooter>
        </PreviewCardContent>
      </PreviewCard>
    </div>
  );
}