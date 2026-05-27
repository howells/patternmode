# Audit Report: full codebase

**Date:** 2026-05-22  
**Reviewers:** performance-engineer, architecture-engineer, senior-engineer, daniel-product-engineer, lee-nextjs-engineer, accessibility-engineer, test-quality-engineer  
**Scope:** full codebase  
**Project Type:** pnpm/Turborepo monorepo with Next.js 16 demo app and React/TypeScript component packages  
**Project Stage:** development

> Severity ratings are calibrated for the **development** stage. Security was kept to the lightweight gate because the repository has no auth, database, public write API, payment, webhook, file upload, or production deployment signal in this checkout.

## Detection Summary

- **Project scale:** medium, 88 source files excluding build output and fixtures.
- **Has database:** no.
- **Has tests:** yes, 14 test files.
- **Security gate:** lightweight only, dependency audit and secret scan were clean.
- **Mechanical checks:** build, typecheck, lint, tests, package-boundary check, and tarball smoke test passed.
- **Dead-code signals:** Knip reported 1 unused file, 1 unused export, 2 unused exported types, and several package-level dev dependency signals. These need triage because some are script/tooling false positives.
- **React audit signals:** 20 client-boundary files, 21 effect/timer/media/frontend hotspots, and no eval-like or dangerous HTML findings.

## Structural Hotspots

- **Long files >250 LOC:** 11 authored source/test files.
- **Severe long files >400 LOC:** 6 files, 4 of them authored component/source files.
- **Suspicious boundary files:** 1 file, `packages/aperto/src/aperto-content.tsx`.
- **Suspicious + long overlap:** 0.

| File | LOC | Why flagged |
|---|---:|---|
| `packages/scrollframe/src/scrollframe.tsx` | 661 | Compound component, context, measurement, controls, and rendering in one file |
| `packages/stacksheet/src/sheet-panel.tsx` | 528 | Panel focus, drag, layout, aria, header, handle, and animation concerns |
| `packages/aperto/src/aperto.tsx` | 480 | Single Media Transition and Media Group orchestration plus Media Navigation/rendering |
| `packages/deck/src/deck.tsx` | 449 | Child parsing, state, keyboard, drag, stacking, and rendering |
| `packages/stacksheet/src/use-drag.ts` | 413 | Complex gesture pipeline, but cohesive and well commented |

## Scorecard: 11/18 — Developing

Security posture is not included in the denominator because the full security reviewer was intentionally skipped by the readiness gate.

| # | Axis | Score | Rationale |
|---|---:|:---:|---|
| 1 | Security Posture | -- | Lightweight dependency and secret scans were clean; no sensitive surface was detected. |
| 2 | Performance | 2/3 | Build output is small and effects clean up, but permanent `will-change` and large client components leave room for tuning. |
| 3 | Architecture | 2/3 | Package boundaries are clean, but several compound components carry multiple responsibilities in long files. |
| 4 | Code Quality | 2/3 | Typecheck and lint are clean; noisy tests, `any` escape hatches, and dead-code signals keep this below excellent. |
| 5 | Test Health | 2/3 | Unit/integration coverage exists and passes, but consumer smoke coverage is incomplete for published packages. |
| 6 | Resilience | 2/3 | Modal/focus behavior is considered, but primitive dialog composition can emit accessibility warnings. |
| 7 | Operations | 1/3 | Local checks pass and packaging smoke exists, but no CI/deploy automation was detected. |
| | **Total** | **11/18** | **Developing** |

| Bonus | Score | Rationale |
|---|:---:|---|
| Accessibility | +2/3 | Mostly semantic primitives with labels and reduced-motion handling, with dialog-title warnings and small touch targets to address. |

## Executive Summary

The codebase is in good mechanical shape: all primary checks passed, package boundaries are clean, and the tarball consumer smoke test succeeds for the packages it currently covers. The main audit risk is not immediate breakage. It is publish readiness and maintainability: a package-side CSS side-effect flag is inconsistent with the rest of the public packages, the smoke consumer does not cover every public package, and several component implementations are large enough that future changes will be harder than they need to be.

There are no critical or high severity findings under development-stage calibration. The most useful next work is to harden package-consumer guarantees, quiet test warnings, and split the biggest compound components along already-visible boundaries.

- **Critical:** 0
- **High:** 0
- **Medium:** 5
- **Low:** 4

## Must Fix

No must-fix findings were confirmed.

## Should Consider

### Stacksheet CSS May Be Marked Tree-Shakable

**File:** `packages/stacksheet/package.json:7`  
**Flagged by:** architecture-engineer, test-quality-engineer  
**Description:** `@patternmode/stacksheet` exports `./styles.css`, but its package metadata says `"sideEffects": false`. The other public CSS-shipping packages use `"sideEffects": ["**/*.css"]`. Some bundlers use `sideEffects: false` to drop side-effect-only CSS imports, so this package is inconsistent with its peers and may be fragile for consumers.  
**Recommendation:** Match the other packages and set `sideEffects` to include CSS files, then keep it covered by the tarball consumer.

### Tarball Smoke Test Does Not Cover All Public Packages

**File:** `scripts/smoke-tarballs.mjs:27`  
**Flagged by:** test-quality-engineer, architecture-engineer  
**Description:** The smoke test only packs and consumes `@patternmode/system`, `@patternmode/stacksheet`, and `@patternmode/aperto`. Public packages `@patternmode/deck`, `@patternmode/scrollframe`, and `@patternmode/swatch` have package exports and CSS exports, but they are not exercised by the consumer fixture.  
**Recommendation:** Pack every public package and import each JS and CSS export in the fixture so package metadata, peer deps, CSS exports, and Next.js consumption are verified together.

### Primitive Aperto Dialog Content Can Be Rendered Without Title/Description Wiring

**File:** `packages/aperto/src/aperto-content.tsx:153`  
**Flagged by:** accessibility-engineer, daniel-product-engineer  
**Description:** The primitive API exposes `Aperto.Primitive.Content` directly. Tests render it with `aria-label` only, and the test run emits Radix warnings that `DialogContent` requires `DialogTitle` and a description or explicit `aria-describedby={undefined}`. The higher-level `Aperto` path wires title/description, but primitive consumers can easily miss the required pattern.  
**Recommendation:** Update primitive examples/tests to include `Aperto.Primitive.Title` and either `Aperto.Primitive.Description` or `aria-describedby={undefined}`. Consider a dev-time invariant or helper composition if primitive consumers are expected to use it directly.

### Deck Child Parsing Silently Ignores Wrapped Cards

**File:** `packages/deck/src/deck.tsx:413`  
**Flagged by:** daniel-product-engineer, senior-engineer  
**Description:** `useDeckChildren` uses `Children.forEach` and `child.type === DeckCard`. That means fragments, wrappers, and other composition layers around `Deck.Card` are silently ignored. For a public compound component, this creates a sharp edge: valid-looking React composition can render an empty deck without a useful warning.  
**Recommendation:** Either document and test the direct-child-only contract clearly, or replace child inspection with a data/props-driven API that does not depend on fragile React child traversal.

### Long Compound Components Are Becoming Change Hotspots

**File:** `packages/scrollframe/src/scrollframe.tsx:243`  
**Flagged by:** architecture-engineer, senior-engineer, daniel-product-engineer  
**Description:** `scrollframe.tsx`, `sheet-panel.tsx`, `aperto.tsx`, and `deck.tsx` are all over 400 lines and mix orchestration, event handling, component parts, measurement, and rendering. None crosses the 1000-line blocker threshold, and some are cohesive, but they are already the places where future accessibility, gesture, and rendering changes will collide.  
**Recommendation:** Split one boundary at a time: child parsing/render helpers for Deck, primitive parts for ScrollFrame, group state/navigation for Aperto, and focus/handles/content for SheetPanel. Add characterization tests before splitting behavior-heavy paths.

## Worth Noting

### Test Output Contains Known Warnings

**File:** `packages/deck/src/deck.test.tsx:16`  
**Flagged by:** test-quality-engineer  
**Description:** Tests pass, but stderr includes a React warning because the Motion mock does not strip `dragTransition`. Aperto tests also emit Radix dialog warnings. Passing with expected warnings makes it easier to miss a new warning that indicates a real regression.  
**Recommendation:** Update test mocks/fixtures so expected runs are quiet, then treat unexpected stderr as a signal.

### Permanent `will-change` Is Used On Animated Media/Card Layers

**File:** `packages/deck/src/styles.css:14`  
**Flagged by:** performance-engineer  
**Description:** Deck cards and Aperto media stages set `will-change` permanently. That can reserve compositor resources even when the element is idle. The impact is probably small here, but this is a component library where many instances may appear on a page.  
**Recommendation:** Prefer applying layer promotion only while dragging/transitioning, or keep it limited to the active element.

### Default Icon Buttons Are Below 44px Touch Target Guidance

**File:** `packages/stacksheet/src/sheet-panel.tsx:61`  
**Flagged by:** accessibility-engineer, daniel-product-engineer  
**Description:** Several default close/back controls use 32px visual and hit dimensions (`h-8 w-8`). Aperto compensates on mobile with `size-11`, but Stacksheet defaults do not appear to expand the touch target.  
**Recommendation:** Add an invisible hit area or mobile `min-h-11 min-w-11` treatment while preserving the compact visual.

### Public Surface Still Has Small Dead-Code Signals

**File:** `packages/stacksheet/src/renderer-helpers.ts:43`  
**Flagged by:** senior-engineer  
**Description:** Knip reported `EMPTY_CLASSNAMES`, `BaseMediaItem`, and `SwatchIcon` as unused exported symbols. Some package-level dev dependency warnings are likely tooling false positives, but unused exported symbols are worth checking before publish.  
**Recommendation:** Confirm whether these exports are intentional public API. Remove them if not, or add explicit usage/tests/docs if they are public.

## Task Clusters

### 1. Package Consumer Hardening

**Why:** The repo is publishing multiple component packages, so package metadata and consumer fixtures need to cover the real public surface.

| # | Severity | File | Issue | Flagged by |
|---|---|---|---|---|
| 1 | Medium | `packages/stacksheet/package.json:7` | CSS export is paired with `"sideEffects": false` | architecture-engineer |
| 2 | Medium | `scripts/smoke-tarballs.mjs:27` | Smoke test omits three public packages | test-quality-engineer |
| 3 | Low | `packages/stacksheet/src/renderer-helpers.ts:43` | Unused exported symbols need public-API triage | senior-engineer |

**Suggested approach:** Fix the metadata first, then expand the tarball fixture to import all public package entries and CSS exports. Re-run `pnpm smoke:tarballs`.

### 2. Dialog And Interaction Accessibility

**Why:** The high-level components mostly handle accessibility, but primitive and default-control paths still expose avoidable friction.

| # | Severity | File | Issue | Flagged by |
|---|---|---|---|---|
| 1 | Medium | `packages/aperto/src/aperto-content.tsx:153` | Primitive dialog content can miss title/description wiring | accessibility-engineer |
| 2 | Low | `packages/stacksheet/src/sheet-panel.tsx:61` | Default icon buttons are below 44px touch-target guidance | accessibility-engineer |
| 3 | Low | `packages/deck/src/deck.test.tsx:16` | Test output includes expected React/Radix warnings | test-quality-engineer |

**Suggested approach:** Make tests warning-free while updating the primitive dialog examples. Then adjust Stacksheet hit areas with CSS or structural spans and cover them with component tests.

### 3. Compound Component Decomposition

**Why:** The long source files are still functional, but they are the main future-change risk.

| # | Severity | File | Issue | Flagged by |
|---|---|---|---|---|
| 1 | Medium | `packages/deck/src/deck.tsx:413` | Child parsing silently ignores wrapped cards | daniel-product-engineer |
| 2 | Medium | `packages/scrollframe/src/scrollframe.tsx:243` | Multiple long compound components are becoming change hotspots | architecture-engineer |
| 3 | Low | `packages/deck/src/styles.css:14` | Permanent `will-change` may over-promote layers | performance-engineer |

**Suggested approach:** Start with Deck because it has a concrete public API edge, then split ScrollFrame/SheetPanel/Aperto only behind existing tests. Keep decomposition behavior-preserving.

<details>
<summary>Dismissed findings (4 items)</summary>

| Finding | Reviewer | Reason Dismissed |
|---|---|---|
| Missing full security hardening | security gate | No sensitive surface or production signal in this development-stage checkout. |
| `packages/aperto/styles.css` unused | knip | Build script uses package-root `styles.css` as Tailwind input, so this is not confirmed dead code. |
| Package-level `@howells/lint` devDependency unused | knip | Lint scripts call `howells-biome`; this is tooling/bin usage, not an import. |
| Console output in scripts | debug-log scan | Script status output is intentional and not shipped runtime debug logging. |

</details>

## Mechanical Verification

- `pnpm build` passed.
- `pnpm typecheck` passed.
- `pnpm lint:check` passed.
- `pnpm test` passed, with warnings noted above.
- `pnpm check:boundaries` passed.
- `pnpm smoke:tarballs` passed for the packages it currently covers.
- `pnpm audit --json` reported 0 critical/high findings.
- Fallback secret scan found no likely credentials.

## Implementation Status

Updated on 2026-05-22 after `/arc:implement all recommendations`.

- Package publishing hardening is complete: `@patternmode/stacksheet` now preserves CSS side effects, and `pnpm smoke:tarballs` packs and consumes `system`, `stacksheet`, `aperto`, `deck`, `scrollframe`, and `swatch` with JS and CSS imports.
- Aperto primitive fixtures now include `Aperto.Primitive.Title` and explicit description handling, with a console-error guard so Radix accessibility warnings fail the layout test suite.
- Deck child parsing now supports fragments and warns when cards are wrapped in unsupported elements instead of silently rendering an empty deck.
- Stacksheet default close/back controls now use 44px minimum hit targets in classic and composable layouts, with integration assertions and generated CSS coverage.
- The unused exported symbol findings for `EMPTY_CLASSNAMES`, `BaseMediaItem`, and `SwatchIcon` were removed from the public surface. Knip still reports the previously dismissed package/tooling false positives for package-root CSS and bin-only dev dependencies.
- Idle `will-change` usage was reduced by limiting Deck card promotion to the active card and Aperto media-stage promotion to active transitions.
- Dependency audit drift found after the original report was resolved by updating `turbo` to 2.9.14 and overriding PostCSS to a patched 8.5.x release; `pnpm audit --json` now reports 0 vulnerabilities.

## Next Steps

1. Split the long compound components one boundary at a time, starting with behavior-preserving extraction in `scrollframe.tsx`, `sheet-panel.tsx`, `aperto.tsx`, or `deck.tsx`.
2. Add CI/deploy automation when this moves beyond local development checks.
3. Revisit Knip package-root CSS and bin-only dev dependency signals if the tooling configuration changes.
