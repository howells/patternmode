# @patternmode/theme

Hand-authored source for the Patternmode shadcn registry theme.

## What this is

This package holds the source of truth for the Patternmode design system's shadcn
registry theme: the color tokens, typography, radii, and shadows (light and dark),
plus the Inter font registry item. The build step compiles this source into the
published registry JSON served from `apps/web/public/r`.

## Why it's private

`private: true` is a hard invariant. This package is **never published to npm** — it is
distributed exclusively via the self-hosted shadcn registry. `scripts/check-boundaries.mjs`
crashes on a public package without a `src/` directory, so this package must stay private.

## Why it devDepends on every component package

The registry generator reads the **source** of every Patternmode component package to
build the registry. Listing each component (`@patternmode/*`) and `@howells/motion` as a
`workspace:*` devDependency wires them into Turborepo's dependency graph, so a change to
any component's source correctly invalidates the theme's build cache (`^build`). Without
these edges, Turbo would serve a stale theme build after upstream source changes.

## Build

```bash
pnpm build
```

This runs the shared `scripts/build-registry.mjs` generator, which inlines
`registry/theme/theme.css` into the theme item's `css` field and writes the registry
output.

## Placeholder substitution

`registry/theme/item.json` references the font item via the literal placeholder
`__REGISTRY_BASE_URL__/r/font-inter.json`. The generator substitutes
`__REGISTRY_BASE_URL__` with the real registry base URL at build time (driven by the
`REGISTRY_BASE_URL` / `VERCEL` environment variables), so the same source works across
local, preview, and production deploys.
