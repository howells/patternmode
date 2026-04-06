# Patternmode

Canonical UI upstream for active projects in `/Users/danielhowells/Sites`.

## Workspace

```text
apps/
  playground/   # Next.js app for local integration checks
  storybook/    # Component inventory and visual contract
packages/
  tailwind-config/
  typescript-config/
  ui/
```

## What Exists

- `@patternmode/tailwind-config` owns the house-style tokens, semantic colors, typography, radii, shadows, and shared CSS entrypoint
- `@patternmode/ui` currently ships the first canonical primitive set: `Button`, `Badge`, `Input`, `Textarea`, and `Card`
- `apps/storybook` is the visual contract for exported user-facing primitives
- `apps/playground` is the integration sandbox and system showcase

## Principles

- `@patternmode/ui` launches with primitives and reusable building blocks only
- `@patternmode/tailwind-config` owns tokens and theme presets for now
- Storybook is required for exported user-facing components
- Projects start with tokens, variants, slots, and wrappers before ejecting locally

## Commands

```bash
pnpm install
pnpm dev:playground
pnpm dev:storybook
pnpm build
pnpm typecheck
```
