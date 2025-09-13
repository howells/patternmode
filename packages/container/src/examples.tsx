"use client";

import { Container } from "./component";

export const BasicExample = () => (
  <Container>
    <div className="rounded-md border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        This is a centered container with base width and safe side padding.
      </p>
    </div>
  </Container>
);

export const SizesExample = () => (
  <div className="space-y-6">
    <Container size="2xs">
      <div className="rounded-md border border-zinc-200 p-3 text-xs dark:border-zinc-800">
        size="2xs" (max 480px)
      </div>
    </Container>
    <Container size="xs">
      <div className="rounded-md border border-zinc-200 p-3 text-xs dark:border-zinc-800">
        size="xs" (max 640px)
      </div>
    </Container>
    <Container size="sm">
      <div className="rounded-md border border-zinc-200 p-3 text-xs dark:border-zinc-800">
        size="sm" (max 768px)
      </div>
    </Container>
    <Container size="base">
      <div className="rounded-md border border-zinc-200 p-3 text-xs dark:border-zinc-800">
        size="base" (max 1024px)
      </div>
    </Container>
    <Container size="lg">
      <div className="rounded-md border border-zinc-200 p-3 text-xs dark:border-zinc-800">
        size="lg" (max 1280px)
      </div>
    </Container>
  </div>
);

export const FluidExample = () => (
  <Container fluid>
    <div className="rounded-md border border-zinc-200 border-dashed p-4 text-sm dark:border-zinc-800">
      Fluid container — no max-width, still includes safe side padding.
    </div>
  </Container>
);
