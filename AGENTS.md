# Patternmode

A catalog of focused React interface components, each named for the interaction pattern it implements rather than for its implementation.

## This is a shared library - other repos depend on it

- **`@patternmode/swatch` and `@patternmode/scrollframe` are consumed across the fleet.** Other repos are told to reach for these primitives instead of rebuilding them, so a breaking change here lands in someone else's app. Current consumers of those two alone: routerbase, materialgraph, materia, colorscope, litmus, candor, architizer, rulework, materialsinuse, fieldportrait, foolscap, motif, colophon.
- Every package in `packages/` is published and versioned independently: `@patternmode/aperto`, `briolette`, `deck`, `halo`, `parquet`, `scrollframe`, `stacksheet`, `status`, `swatch`, `system`, `tags`, `theme`, `thumbnail`, `verge`, plus `@howells/motion` and `@howells/site-ui`.
- Treat a public API change as a release decision, not an edit. Explain the change and its migration impact before making it, and add a changeset.
- Don't put app-specific demo logic inside a reusable package. App and demo code lives in `apps/web` and `apps/preview`; packages own their public APIs and tests.
- Don't introduce broad compatibility aliases unless discoverability requires them and the docs name the canonical term.

## Language

- Use the product terms from `CONTEXT.md`: Aperto, Deck, Stacksheet, Media Transition, Sheet Stack. Search it before changing names, docs, or prop terminology.
- Aperto is not just a lightbox. Deck is canonical over CardStack. Stacksheet owns the sheet navigation vocabulary.
- Search package tests and examples before changing component behaviour, and existing exports before adding a public surface.

## Commands

- `pnpm dev` - web demo.
- `pnpm check` - typecheck, lint, test, build, boundary check, and `check:tokens`.
- `pnpm test` / `pnpm typecheck` / `pnpm lint` - individual workspace gates.
- `pnpm publish:packages` and `pnpm version-packages` - release operations, ask first.
- `pnpm smoke:tarballs` - package tarball smoke checks.
- Use Arc for public API changes or component refactors. Mastra isn't relevant to this catalog.

## Registry and tokens

- Component CSS reads the standard shadcn theme variable vocabulary with patternmode hex values as fallbacks, e.g. `var(--foreground, #1d1d1b)`. Never reintroduce the old `--ink` / `--muted` / `--surface` / `--surface-soft` / `--accent-soft` / `--border-soft` / `--quiet` era names. `pnpm check:tokens` (`scripts/check-tokens.mjs`, part of `pnpm check`) enforces the vocabulary and fails on any `var(--name)` outside the allowlist.
- `scripts/build-registry-config.mjs` hard-codes two per-package lookup tables that must be updated when adding a package to the registry: `CSS_STYLE` (style A inline, B `styles.css` plus import, C none) and `STRIP_GLOBAL_DECLARATIONS` (packages whose vendored source needs `declare global` blocks stripped, e.g. stacksheet). Add a new `@patternmode/*` component to `COMPONENT_PACKAGES` and `CSS_STYLE`, and to `STRIP_GLOBAL_DECLARATIONS` too if it ships ambient type declarations.
- Rebuild the registry with `pnpm --filter @patternmode/theme build`, which writes `packages/theme/dist/registry`.
- Re-sync the preview app against the freshly built registry with `pnpm --filter @howells/patternmode-preview sync`. It also runs automatically before `dev` and `build` in `apps/preview`.

## Publishing

- `pnpm publish:packages` runs `changeset publish`. **Announce version moves to the materialgraph coordination session before publishing.**
- **`changeset publish` is idempotent on partial failure.** Just re-run it, it publishes exactly what is missing. Do not hand-publish.
- **A release no longer builds inside `prepack`.** `changeset publish` runs up to ten `pnpm publish` processes at once, so `prepack` used to mean ten unordered builds racing over each other's `dist/`. `scripts/publish-packages.mjs` now builds every package through turbo in dependency order first and sets `PATTERNMODE_SKIP_PREPACK_BUILD=1`, which `scripts/prepack-build.mjs` honours. **Nothing else suppresses those builds** - `pnpm` reads `ignore-scripts` only from its own `--ignore-scripts` flag, not from an `.npmrc` (user or project) and not from `npm_config_ignore_scripts`. All three were measured.
- **The race that fix removes does not look like a race.** `tsdown` builds with `clean: true`, so a package empties its `dist/` and rewrites `index.mjs` in milliseconds while `tsc --emitDeclarationOnly` takes seconds to put the `.d.ts` files back. A dependent compiling in that window resolves the workspace dependency to **JavaScript with no types** and infers them from the bundle, so a default like `fades = true` becomes `fades: boolean` and the dependent fails on **its own source** with a plausible type error. It builds clean in isolation, which reads as contention. Before calling any publish failure a flake, check whether the failing package depends on another package in the same release.
- **Check `npm view <pkg> dist-tags`, not `npm view <pkg> version`** - the latter serves stale reads straight after publishing.
- **Verify registry access anonymously**, not just that the version exists. `npm view --json` `.private` reads the _package.json field_, not the registry access level, so it won't catch a package published `--access restricted`: `curl -s -o /dev/null -w '%{http_code}' -H 'Authorization:' https://registry.npmjs.org/<pkg>/<version>` - want 200.
- `pnpm smoke:tarballs` builds a real Next.js consumer against the packed tarballs. It resolves _dependencies_ from npm, so it legitimately fails before a release that includes a new version of an internal dependency. Re-run it after publishing.

## Dependency conventions

- **`peerDependencies` use an explicit range; the `devDependencies` twin uses `catalog:`.** See how `react` is declared in any component package. Don't "fix" the asymmetry.
- Anything identity-bearing or heavy is a peer, not a regular dependency (`@instruments/colorscope`, `lucide-react`). A regular dependency on a caret floats independently of the host's pin, so a consumer can pin a version exactly and still get a different one underneath them. Never mark a required peer `optional`; that only moves the failure from install time to runtime.
- **First-party scopes are exempt from release-age gates BY NAME, never by version**: `@howells/*`, `@instruments/*`, `@patternmode/*`. A per-version exemption for a package we publish ourselves expires silently the moment we ship the next one. Third-party pins stay per-version on purpose - they're transient unblocks that should lapse.

## CSS layers

- Only a package that opens `@layer utilities` can invert a consumer's cascade. A layer is registered the first time it is seen and a later `@layer …;` cannot move one that already exists, so such a sheet loaded before the app's Tailwind entry leaves the app's `components` appended _after_ `utilities`. Those packages must declare `@layer theme, base, components, utilities;` **before their `@import`s** - position is load-bearing, and emitted after the layer blocks it does nothing.
- **Every package that opens any layer declares the full order**, including ones that only open `components`. They can't invert a consumer's utilities, but registering `components` early leaves it ahead of the host's `theme` and `base`, so a base reset outranks the component rules. This supersedes the older "packages that only open `components` need no declaration" - true about `utilities`, wrong about `base`.
- **Never ship a style rule outside a layer.** Verify it in the built artifact by brace depth, not by reading the source: `aperto` and `parquet` shipped 51 and 12 layerless rules respectively until the cascade-layer patch, which made them unoverridable by any consumer utility at any specificity. Tailwind's own `*,::before,::after,::backdrop` block of `--tw-*` initialisers is legitimately layerless - don't "fix" it.
- **`check:layers` walks `packages/*/dist/styles.css` AND `packages/\*/registry/**`**, because `theme.css`reaches every consumer through the registry rather than through a`dist/`. A gate that only knows about build output is blind to exactly the file installed into everybody, the same blind spot `check-tokens.mjs` had. If a package ever ships CSS by a third route, add it here too.
- Importing `tailwindcss/utilities` on its own emits rules **layerless**, and a layerless declaration outranks every rule in a named layer regardless of specificity. Always `layer(utilities)`.

## Pointer interaction

- **Capture on pointerdown only if the element already owns the gesture.** `setPointerCapture` retargets the rest of the gesture, including the compatibility mouseup and the click, at the capturing element, so every clickable descendant stops being activatable. Capturing speculatively, before a drag threshold, kills them all with nothing thrown, nothing prevented and nothing in the console. `stacksheet`'s `use-drag` and `briolette` capture after the drag commits; `scrollframe` did not, and shipped dead links downstream (2.0.2).
- **Where capture on pointerdown _is_ correct, the captured element may never contain an interactive descendant.** `halo`'s pad and arc commit a colour on pointerdown, so capturing there is honest, but measured in a browser a button placed inside the pad receives `pointerdown` and then loses both `pointerup` and `click` to the pad. Their children are decorative on purpose.
- **A control whose gesture starts with `preventDefault()` must focus itself.** Preventing the default on pointerdown suppresses the compatibility mousedown, and with it the action that moves focus, so a `role="slider"` with arrow keys becomes unreachable to anyone who arrived by pointer. Capture isn't the cause; measured both ways. `briolette` had this right, `halo` did not until 2026-08-09.

## Browser tests

- **`pnpm test:browser` is a separate gate and is NOT part of `pnpm check`.** It runs Vitest browser mode on Playwright Chromium, so it needs a browser binary (`pnpm --filter @patternmode/scrollframe exec playwright install chromium`). `pnpm check` stays browser-free on purpose: nobody should be blocked from the ordinary gate by a missing binary. **Run it before releasing any package whose behaviour depends on where the browser delivers an event** - today `scrollframe` and `halo`.
- **Browser tests are `src/**/_.browser.tsx`, never `_.test.tsx`.** The name keeps them out of vitest's default include, so `pnpm test`never tries them under jsdom. Each package's`tsconfig.json`excludes them so they can't reach`dist`, and `scripts/build-registry.mjs`skips them so they can't be vendored into`apps/preview`. That last one isn't hypothetical: the first version of these tests shipped into the preview app and failed its Next build on a `vitest/browser` import.
- **They assert the outcome; the jsdom tests assert the mechanism.** Keep both. The jsdom test localises a failure and runs in milliseconds; the browser test is the only one that answers "can a user click this". Reintroducing the 2.0.0 capture bug fails the jsdom suite with `setPointerCapture` was called, and the browser suite with `expected +0 to be 1` - the handler never ran.
- **A browser test that needs hard-coded coordinates should not be written.** Halo's hue arc is deliberately uncovered: its keyboard surface is a 1×1 visually hidden input Playwright refuses to click, and the arc is a stroked path whose bounding-box centre is empty space with the pad behind it, so a centre-click would pass for the wrong reason. It's asserted in jsdom and verified by hand instead, with the reason written in the test file.

## Verification discipline

- **A unit test cannot detect a bug about where an event is delivered.** `fireEvent.click(target)` proves only that the test dispatched it; deciding which element a real click activates is precisely the part jsdom doesn't model, which is how every scrollframe test stayed green through the capture bug. Assert the **input to the browser's decision** - was capture taken, did focus move - and confirm the outcome in a browser. Say in the test which one it is.
- **jsdom implements neither `getAnimations` nor `ResizeObserver`, and base-ui couples them.** Its scroll-area viewport effect needs a `ResizeObserver` before it schedules the timeout that calls `viewport.getAnimations({ subtree: true })`, so a test without the observer never reaches it and looks fine, and adding the observer (the obvious thing to do when testing scroll behaviour) makes it throw. It surfaces as an **unhandled error attributed to the file**, with every test in it still reporting as passed. Stub both together: `scrollframe`, `tags`, `aperto` and `stacksheet` do.
- **A gate that only checks what you thought of is not a gate.** Prove a check can fail before trusting that it passes - `check-tokens.mjs` once scanned line-by-line and was blind to formatter-wrapped `var(\n  --name,`, reporting "clean" while unable to fail.
- **Measure the published artifact, not the source or the changelog.** Grep the _compiled_ form (`role: "slider"`, not JSX `role="slider"`) or you'll get false negatives.
- Confirm a consumer actually resolves from npm before reasoning about blast radius, and beware stale `node_modules/.pnpm` entries. Measuring the wrong artifact is a recurring trap.
- **Never use a `link:` override to test an unpublished build** against materia or colorscope; turbopack can't resolve subpath exports through an external symlink. Use a tarball.
- `pnpm install` after any lockfile change, including in sibling worktrees sharing the repo.

## Deciding what to build

- Build what shadcn / ReUI / Base UI / AI Elements do **not** serve. If a registry has it and it's fine, don't duplicate it.
- **Promotion test: duplication + divergence + a discoverable reason the shipped option was rejected.** Duplication alone finds messy repos, not under-served ones; the _reason_ something was rebuilt is the finding. Cross-repo filename frequency is a bad instrument - it can't distinguish a commodity from an unmet need, copied lineage from independent invention, or territory from difficulty. Hash files before counting them as separate.
- **Promote the mechanism; leave the opinion in each app's tokens.** Ship a design register inside a component and consumers with a different one will fork rather than argue.
- Components should take a **behaviour**, not a value. A consumer maintaining a lookup table keyed on its own theme tokens is a component that can't ask its environment a question it needs answered.
