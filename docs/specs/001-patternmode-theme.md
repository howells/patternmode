# Spec 001 — @patternmode/theme: A Portable shadcn Theme

**Status:** Reviewed (spec-document-reviewer: ready-with-edits — edits applied), then relocated into patternmode per placement decision
**Date:** 2026-07-09
**Repo:** `~/Sites/patternmode` (existing monorepo)
**Supersedes:** the identical spec briefly drafted in `~/Sites/howellsui` (repo abandoned)

## Problem

Daniel maintains multiple personal sites (agentsurface, patternmode, scaffold, and more to come) that have independently converged on the same visual language — but each implements it with bespoke, non-portable CSS: Fumadocs `--fd-*` overrides in two, hand-rolled `:root` tokens in patternmode's web app. Starting a new site means re-deriving the aesthetic by hand, and the implementations have drifted (dark mode in two, shadows in one, three font-loading strategies).

Patternmode is already the UI-library home (`@patternmode/*` component packages, Turborepo, npm publishing) — but it has no canonical _theme_ artifact, and its own web app's tokens are app-local.

## Goal

Create **one canonical shadcn theme** — patternmode's design language expressed in standard shadcn token vocabulary, gap-filled from scaffold (dark mode) and agentsurface (typography details) — distributed via a **self-hosted shadcn registry inside the patternmode monorepo**, such that any current or future site adopts it with:

```bash
npx shadcn@latest init
npx shadcn@latest add @patternmode/theme
```

### Constraints (user-stated)

1. **Strictly portable.** The theme must work in any stock shadcn project. No framework lock-in beyond the optional Next.js font file.
2. **Known, common shadcn styling.** Standard token names only (`--background`, `--primary`, `--radius`, …). No bespoke namespaces (`--patternmode-*`, `--sc-*`) in the distributed theme. Components remain 100% stock and CLI-upgradeable.
3. **Patternmode is the basis.** Token values are patternmode-canonical; other sites corroborate and fill gaps. `packages/theme` becomes the single source of truth for the design language going forward.

### Non-goals

- Custom/styled components in the theme. Tokens only — explicitly decided. (`@patternmode/*` components are a separate product and unchanged by this spec.)
- Distributing `@patternmode/*` components via the shadcn registry. Possible later — the registry format supports arbitrary files — but out of scope here.
- Migrating agentsurface/scaffold now. They are sources, not consumers, in this phase. (A later spec can map the theme onto Fumadocs `--fd-*` vars.)
- Migrating `apps/web`'s own globals.css onto the theme. Desirable eventually (single source of truth), deferred — see Open Questions.
- Multi-theme support beyond light–dark.

## Decisions made (with rationale)

| Decision     | Choice                            | Rationale                                                                                                                                     |
| ------------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Basis        | Patternmode-canonical             | It's the UI-library home; its `:root` values already dominated the synthesis. Scaffold contributes dark mode, agentsurface typography details |
| Placement    | Inside patternmode monorepo       | One design-system brand, one registry, one domain; reuses existing publishing machinery. howellsui repo abandoned                             |
| Distribution | Self-hosted shadcn registry       | Canonical shadcn mechanism; works for projects that don't exist yet                                                                           |
| Scope        | Tokens only                       | Maximum portability; stock components stay upgradeable                                                                                        |
| Shadows      | Soft ink-tinted (patternmode's)   | Flat-by-default survives, but shadcn popovers/dialogs need elevation; ink-tinted shadows keep it "lifted paper," not generic grey             |
| Dark mode    | Warm charcoal + sage (scaffold's) | Tonal continuity with warm-paper light mode — one material, two lights                                                                        |
| Fonts        | `font-inter` registry item        | Pinned `@fontsource-variable/inter`, self-hosted & subset-split (no Google/rsms); cssVars still work standalone via `var(--font-inter, …)`    |

## The token set

Patternmode's `:root` translated into standard shadcn vocabulary; gaps filled as attributed. Draft values, tuned visually in the preview app.

### Light (`:root`)

| Token                                        | Value                   | Source                                                 |
| -------------------------------------------- | ----------------------- | ------------------------------------------------------ |
| `--background`                               | `#fbfbf9`               | patternmode `--background`                             |
| `--foreground`                               | `#1d1d1b`               | patternmode `--ink`                                    |
| `--card` / `--popover`                       | `#ffffff`               | patternmode `--surface`                                |
| `--card-foreground` / `--popover-foreground` | `#1d1d1b`               | ink                                                    |
| `--primary`                                  | `#1d1d1b`               | near-black buttons (all three sites)                   |
| `--primary-foreground`                       | `#fbfbf9`               | paper on ink                                           |
| `--secondary` / `--muted`                    | `#f6f5f1`               | patternmode `--surface-soft`                           |
| `--secondary-foreground`                     | `#1d1d1b`               | ink                                                    |
| `--muted-foreground`                         | `#77756d`               | patternmode `--muted`                                  |
| `--accent`                                   | `#e1ebe5`               | patternmode `--accent-soft` (hover washes)             |
| `--accent-foreground`                        | `#1d3d30`               | deepened pine for contrast on the wash                 |
| `--destructive`                              | `#a4413a`               | new; warm brick tuned to palette temperature           |
| `--destructive-foreground`                   | `#fbfbf9`               | paper on brick                                         |
| `--border` / `--input`                       | `#e3e1dc`               | patternmode `--border`                                 |
| `--ring`                                     | `#315c4b`               | **patternmode `--accent` — the signature focus color** |
| `--radius`                                   | `0.5rem`                | patternmode `--radius: 8px`                            |
| `--chart-1…5`                                | pine-anchored ramp      | derived; tuned in preview                              |
| `--sidebar-*`                                | paper/ink/pine mappings | mirrors main surface tokens                            |

### Dark (`.dark`)

| Token                      | Value     | Source                                                |
| -------------------------- | --------- | ----------------------------------------------------- |
| `--background`             | `#161614` | scaffold warm charcoal                                |
| `--foreground`             | `#e8e6e1` | scaffold warm off-white                               |
| `--card` / `--popover`     | `#1d1d1b` | scaffold dark surface                                 |
| `--primary`                | `#e8e6e1` | inverted ink                                          |
| `--primary-foreground`     | `#161614` |                                                       |
| `--secondary` / `--muted`  | `#232321` | scaffold surface-soft                                 |
| `--muted-foreground`       | `#a3a199` | scaffold warm grey                                    |
| `--accent`                 | `#24352d` | scaffold dark pine wash                               |
| `--accent-foreground`      | `#a9c7b8` | lightened sage                                        |
| `--border` / `--input`     | `#34332f` | scaffold dark border                                  |
| `--ring`                   | `#7fa896` | **sage — dark-mode signature**                        |
| `--destructive`            | `#c96f68` | lifted brick for dark bg                              |
| `--destructive-foreground` | `#161614` | charcoal on lifted brick (verify contrast in preview) |

### Fonts (`@theme` / theme vars)

- `--font-sans`: `var(--font-inter, Inter), ui-sans-serif, system-ui, sans-serif` — the `var()` fallback means the theme renders correctly even when `font-inter` is skipped
- `--font-mono`: `ui-monospace, "SF Mono", SFMono-Regular, Menlo, Monaco, Consolas, monospace` (patternmode's `--mono`)
- `font-inter` bundles the pinned `@fontsource-variable/inter@^5.2.8` npm dependency and imports its `opsz.css` + `opsz-italic.css` entrypoints (weight 100–900 plus the optical-size axis, true italic — parity with rsms InterVariable), exposing `--font-inter` without any Google Fonts or rsms request. The fontsource CSS is subset-split by `unicode-range` (latin, latin-ext, greek, cyrillic, vietnamese), so a browser downloads only the scripts a page renders. OpenType features (`"cpsp"`, `"cv01"`, `"cv02"`, `"cv11"`) are applied via the theme's base CSS.
- Monospace stays a **system stack** — a design voice (technical data, eyebrows, code), not a loaded font. Matches all three sources.

### Shadows

Ink-tinted, patternmode's observed values, mapped to Tailwind v4 shadow vars:

| Token         | Light                             | Dark                           |
| ------------- | --------------------------------- | ------------------------------ |
| `--shadow-xs` | `0 1px 2px rgba(29,29,27,0.06)`   | `0 1px 2px rgba(0,0,0,0.20)`   |
| `--shadow-sm` | `0 2px 8px rgba(29,29,27,0.06)`   | `0 2px 8px rgba(0,0,0,0.22)`   |
| `--shadow-md` | `0 4px 16px rgba(29,29,27,0.08)`  | `0 4px 16px rgba(0,0,0,0.28)`  |
| `--shadow-lg` | `0 12px 32px rgba(29,29,27,0.08)` | `0 12px 32px rgba(0,0,0,0.32)` |
| `--shadow-xl` | `0 18px 60px rgba(29,29,27,0.18)` | `0 18px 60px rgba(0,0,0,0.45)` |

Dark swaps ink-tint for pure black at higher alpha (ink-tint reads muddy on charcoal). Draft values, tuned in preview.

### Color format note

shadcn's current generator emits `oklch()`. The published theme uses **oklch conversions** of the hex values above (hex kept in comments for traceability). oklch is the current shadcn convention and interpolates better for derived states.

## Architecture

```
patternmode/                        # existing monorepo
├── apps/
│   ├── web/                        # existing catalog site — HOSTS the registry
│   │   └── public/r/               # `shadcn build` output (theme.json, …)
│   └── preview/                    # NEW: small shadcn kitchen-sink app
│       └── …                       # stock shadcn init + @patternmode/theme applied
├── packages/
│   ├── theme/                      # NEW: registry source — the design-language source of truth
│   │   └── registry/
│   │       ├── theme/
│   │       │   ├── item.json        # authored registry:theme item (cssVars)
│   │       │   └── theme.css        # authored base-layer rules (font features)
│   │       └── font-inter/
│   │           └── item.json        # registry:item bundling @fontsource-variable/inter
│   ├── swatch/ …                   # existing component packages (unchanged)
│   └── system/                     # existing sizing utilities (unchanged; NOT the token home)
└── docs/specs/001-patternmode-theme.md
```

- **Registry item `@patternmode/theme`**: `type: registry:theme` carrying `cssVars.light`, `cssVars.dark`, `cssVars.theme` (fonts, radius, shadows).
- **Base-layer CSS ships via the item's `css` field**, not as a consumer-imported file. Font-feature rules are authored in `theme.css` for readability; `shadcn build` compiles them into the item's `css` field so the CLI merges them into the consumer's global stylesheet automatically — no manual import, preserving the zero-manual-edit definition of done.
- **Build**: `npx shadcn build` in `packages/theme`, output to `apps/web/public/r/`. The existing web deployment serves the JSON — the registry rides the catalog site's domain.
- **Preview app is separate from `apps/web` by necessity**: web's `globals.css` already defines `--background`, `--border`, `--radius`, `--accent` with app-local meanings — the same names shadcn uses. Installing the theme into web would collide. `apps/preview` is a clean stock-shadcn app rendering every component under the theme, with a light/dark toggle; it is the QA surface for token tuning and can be exposed as a route/subdomain of the public site later.
- **Namespace**: consumers add to `components.json`:
  ```json
  { "registries": { "@patternmode": "https://<patternmode-domain>/r/{name}.json" } }
  ```

## Consumption workflow (the acceptance test)

From an empty directory:

```bash
npx create-next-app@latest mysite
cd mysite
npx shadcn@latest init            # stock init, default style

# Path A — namespace (the primary UX; must be tested):
#   add to components.json: { "registries": { "@patternmode": "https://<domain>/r/{name}.json" } }
npx shadcn@latest add @patternmode/theme

# Path B — raw URL (also tested; no config needed):
npx shadcn@latest add https://<domain>/r/theme.json

npx shadcn@latest add button card dialog dropdown-menu   # stock components
```

Both address forms are exercised in the acceptance test. Result: site renders in the patternmode theme with zero manual CSS edits. **This flow is the definition of done** — if it requires any hand-editing beyond wiring `fonts.ts` into `layout.tsx`, portability has failed.

## Phases

1. **Scaffold** — `packages/theme` + `apps/preview` in the monorepo, registry.json wiring, `shadcn build` pipeline into `apps/web/public/r/`, turbo task wiring.
2. **Theme synthesis** — encode the token set above; kitchen-sink preview; visual tuning pass (contrast checks for `--muted-foreground` on `--background`, sage `--ring` on charcoal, destructive pairs).
3. **Registry hardening** — deploy via the existing web app; run the clean-room consumption acceptance test (both address forms).
4. **(Later, separate specs)** — adopt in one new site; Fumadocs `--fd-*` bridge for agentsurface/scaffold; migrate `apps/web`'s globals.css onto the theme so patternmode itself consumes its own source of truth; optionally distribute `@patternmode/*` components via the same registry.

## Open questions

1. **Domain/path for the registry.** Rides patternmode's existing web deployment — exact public domain to confirm at deploy time. Doesn't block phases 1–2.
2. **Chart palette.** Five chart colors need designing (only pine green exists in the sources). Proposed: green-anchored ramp with warm neutrals; tune in preview.
3. **Contrast risk.** `--muted-foreground` `#77756d` on `#fbfbf9` is ~4.5:1 — passes AA for normal text but barely; the sources use it at small sizes. May need a darkened variant; verify in phase 2.
4. **Update/versioning story.** When token values change after adoption, the intended mechanism is re-running `shadcn add @patternmode/theme` (the CLI prompts before overwriting). No pinning scheme for now; versioned paths (`/r/v1/theme.json`) can be added later without breaking the unversioned URL.
5. **`apps/web` variable collision long-term.** Web's bespoke `--background`/`--accent`/etc. coexist with the theme only because web doesn't consume the theme yet. The phase-4 migration should rename or replace web's app-local vars with the shadcn set to end the ambiguity.

## Success criteria

- [ ] Clean-room consumption test passes (both namespace and raw-URL address forms)
- [ ] All shadcn tokens defined for light + dark — no component renders with a missing/default-fallback variable
- [ ] AA contrast for foreground/muted-foreground/primary-foreground/destructive pairs in both modes
- [ ] Theme JSON contains only standard shadcn token names — verified by a small script that diffs emitted cssVar keys against the known shadcn token list (not by eye)
- [ ] Registry served from the patternmode web deployment; `npx shadcn add @patternmode/theme` works via namespace config
- [ ] Existing `@patternmode/*` packages and `apps/web` styling are byte-for-byte unaffected by phases 1–3

## Amendments

- **Component distribution moved from non-goals into scope.** "Distributing `@patternmode/*` components via the shadcn registry" (listed above under Non-goals) shipped — see `docs/specs/002-component-registry.md`. `scripts/build-registry.mjs` now vendors the ten `@patternmode/*` component packages plus `system`/`motion` as registry items alongside this spec's theme.
- **Production domain resolved.** The registry's public domain (left as an open question above) is `https://patternmode.com`.
- **`--destructive-foreground` dropped** from `cssVars.light`/`.dark` to match shadcn's current stock default, rather than shipping the bespoke paper-on-brick / charcoal-on-lifted-brick pairing drafted above.
- **Shadows moved from `cssVars.theme` into `cssVars.light`/`.dark`.** They're mode-dependent (ink-tinted in light, pure black at higher alpha in dark, per the Shadows table above), so a single `theme`-scoped value was never correct; the `@theme` block described in Architecture no longer carries them.
- **The `@theme inline` shadow-variable map was removed** from `packages/theme/registry/theme/theme.css`. shadcn's `update-css` step auto-derives the same `@theme inline` mapping from the `shadow-*`/`font-*` keys already present in `cssVars`, and shipping the mapping explicitly crashed `shadcn add` on self-referential custom properties — see spec 002's Defects found & fixed.
- **`font-inter` re-mechanised from `registry:font`/Google to `registry:item` bundling (2026-07-16).** The item dropped shadcn's Google-provider `registry:font` shape — whose only CLI behavior (rewriting `layout.tsx`) never applied cleanly — for a `registry:item` that pins `@fontsource-variable/inter@^5.2.8`, imports its `opsz.css` + `opsz-italic.css` (opsz axis + true italic), and sets `cssVars.theme.font-inter`; the fontsource CSS is subset-split so consumers download only the scripts they render. Font loading now flows through the standard cssVars/css merge into the consumer's globals.css, so `apps/preview` consumes the font exactly as any external site does — `next/font` is gone from the repo. The theme's `font-sans` gained a `var(--font-inter, Inter)` fallback, replacing the invalid bare `var(--font-inter)`, so the theme is genuinely standalone when `font-inter` is skipped.
