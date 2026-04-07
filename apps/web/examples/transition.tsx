"use client";
import { Transition } from "@patternmode/transition";

export default function TransitionExample() {
  return (
    <Transition.Root motion="smooth" dismissible>
      <Transition.Trigger className="cursor-pointer rounded-xl bg-card border border-border/70 p-6 shadow-sm transition-shadow hover:shadow-md">
        <p className="font-medium text-sm">Click to expand</p>
        <p className="text-sm text-muted-foreground">Drag to dismiss</p>
      </Transition.Trigger>
      <Transition.Portal>
        <Transition.Overlay className="fixed inset-0 bg-black/40" />
        <Transition.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl bg-card border border-border/60 p-8 shadow-xl">
            <Transition.Title className="font-display text-lg font-semibold">
              Shared Element Transition
            </Transition.Title>
            <Transition.Description className="mt-2 text-sm text-muted-foreground">
              This content morphed from the trigger using a shared layoutId.
              Drag anywhere to dismiss, or use the button below.
            </Transition.Description>
            <div className="mt-6">
              <Transition.Close className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Close
              </Transition.Close>
            </div>
          </div>
        </Transition.Content>
      </Transition.Portal>
    </Transition.Root>
  );
}
