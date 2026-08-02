# Patternmode - Agent Instructions

## Communication Expectations

- Use product terms from `CONTEXT.md` when discussing components: Aperto, Deck, Stacksheet, Media Transition, Sheet Stack, and related concepts.
- State whether work touches a package, web demo, release process, or docs.
- Explain any public API change and its migration impact before editing.

## How To Work In This Codebase

- Patternmode is a catalog of focused React interface components named for reusable interaction patterns.
- Keep component names and docs centered on the pattern, not implementation details.
- App/demo code lives under `apps/web`; reusable packages own public APIs and tests.
- Use changesets for package versioning when public behavior changes.

## Editing Constraints

- Do not introduce broad compatibility aliases unless discoverability requires them and docs identify the canonical term.
- Do not place app-specific demo logic inside reusable package APIs.
- Keep `@howells/lint` as the shared lint/format route.
- Ask before publishing packages or changing release scripts.

## Search Preferences

- Search `CONTEXT.md` before changing names, docs, or prop terminology.
- Search package tests and examples before changing component behavior.
- Search existing package exports before adding a new public surface.

## Commands

- `pnpm dev` - web demo dev task.
- `pnpm check` - typecheck, lint, test, build, and boundary check.
- `pnpm test` / `pnpm typecheck` / `pnpm lint` - workspace gates.
- `pnpm publish:packages` and `pnpm version-packages` - release operations; ask first.
- `pnpm smoke:tarballs` - package tarball smoke checks.

## Registry & Token Rules

- Component CSS reads the standard shadcn theme variable vocabulary with patternmode hex
  values as fallbacks (e.g. `var(--foreground, #1d1d1b)`) — never reintroduce the old
  `--ink` / `--muted` / `--surface` / `--surface-soft` / `--accent-soft` / `--border-soft` /
  `--quiet`-era names. `pnpm check:tokens` (`scripts/check-tokens.mjs`, part of `pnpm check`)
  enforces the vocabulary and fails on any `var(--name)` outside the allowlist.
- `scripts/build-registry-config.mjs` (split out of the builder) hard-codes two per-package lookup tables that must be updated
  when adding a package to the registry: `CSS_STYLE` (style A inline / B `styles.css` + import
  / C none) and `STRIP_GLOBAL_DECLARATIONS` (packages whose vendored source needs `declare
global` blocks stripped, e.g. stacksheet). Both live in `build-registry-config.mjs`. Add a new `@patternmode/*` component to
  `COMPONENT_PACKAGES` and `CSS_STYLE`; add it to `STRIP_GLOBAL_DECLARATIONS` too if it ships
  ambient type declarations.
- Rebuild the registry: `pnpm --filter @patternmode/theme build` (writes
  `packages/theme/dist/registry`).
- Re-sync the preview app against the freshly built registry: `pnpm --filter
@howells/patternmode-preview sync` (also runs automatically before `dev`/`build` in
  `apps/preview`).

## Repo-Specific Rules

- Aperto is not just a lightbox; Deck is the canonical term over CardStack; Stacksheet owns sheet navigation vocabulary.
- Use Arc for public API changes or component refactors.
- Mastra is not relevant to this component catalog unless a future docs/agent surface explicitly requires it.

## Publishing

- `pnpm publish:packages` runs `changeset publish`. **Announce version moves to the
  materialgraph coordination session before publishing.**
- **`changeset publish` is idempotent on partial failure.** Parallel prepack builds can
  crash a DTS worker (`Worker.emit` trace) and fail one or two packages while the rest
  succeed. Just re-run it — it publishes exactly what is missing. Do not hand-publish.
- **Check `npm view <pkg> dist-tags`, not `npm view <pkg> version`** — the latter serves
  stale reads straight after publishing.
- **Verify registry access anonymously**, not just that the version exists. `npm view --json`
  `.private` reads the _package.json field_, not the registry access level, so it will not
  catch a package published `--access restricted`:
  `curl -s -o /dev/null -w '%{http_code}' -H 'Authorization:' https://registry.npmjs.org/<pkg>/<version>` → want 200.
- `pnpm smoke:tarballs` builds a real Next.js consumer against the packed tarballs. It
  resolves _dependencies_ from npm, so it legitimately fails before a release that includes
  a new version of an internal dependency. Re-run it after publishing.

## Dependency conventions

- **`peerDependencies` use an explicit range; the `devDependencies` twin uses `catalog:`.**
  See how `react` is declared in any component package. Do not "fix" the asymmetry.
- Anything identity-bearing or heavy is a peer, not a regular dependency
  (`@instruments/colorscope`, `lucide-react`). A regular dependency on a caret floats
  independently of the host's pin — a consumer can pin a version exactly and still get a
  different one underneath them. Never mark a required peer `optional`; that only moves the
  failure from install time to runtime.
- **First-party scopes are exempt from release-age gates BY NAME, never by version**:
  `@howells/*`, `@instruments/*`, `@patternmode/*`. A per-version exemption for a package we
  publish ourselves expires silently the moment we ship the next one. Third-party pins stay
  per-version on purpose — they are transient unblocks that should lapse.

## CSS layers

- Only a package that opens `@layer utilities` can invert a consumer's cascade. A layer is
  registered the first time it is seen and a later `@layer …;` cannot move one that already
  exists, so such a sheet loaded before the app's Tailwind entry leaves the app's
  `components` appended _after_ `utilities`. Those packages must declare
  `@layer theme, base, components, utilities;` **before their `@import`s** — position is
  load-bearing; emitted after the layer blocks it does nothing.
- Packages that only open `@layer components` need no declaration: registering `components`
  early still leaves `utilities` last. Do not churn them.
- Importing `tailwindcss/utilities` on its own emits rules **layerless**, and a layerless
  declaration outranks every rule in a named layer regardless of specificity. Always
  `layer(utilities)`.

## Verification discipline

- **A gate that only checks what you thought of is not a gate.** Prove a check can fail
  before trusting that it passes — `check-tokens.mjs` once scanned line-by-line and was
  blind to formatter-wrapped `var(\n  --name,`, reporting "clean" while unable to fail.
- **Measure the published artifact, not the source or the changelog.** Grep the _compiled_
  form (`role: "slider"`, not JSX `role="slider"`) or you will get false negatives.
- Confirm a consumer actually resolves from npm before reasoning about blast radius, and
  beware stale `node_modules/.pnpm` entries — measuring the wrong artifact is a recurring trap.
- **Never use a `link:` override to test an unpublished build** against materia or colorscope;
  turbopack cannot resolve subpath exports through an external symlink. Use a tarball.
- `pnpm install` after any lockfile change, including in sibling worktrees sharing the repo.

## Deciding what to build

- Build what shadcn / ReUI / Base UI / AI Elements do **not** serve. If a registry has it and
  it is fine, do not duplicate it.
- **Promotion test: duplication + divergence + a discoverable reason the shipped option was
  rejected.** Duplication alone finds messy repos, not under-served ones; the _reason_
  something was rebuilt is the finding. Cross-repo filename frequency is a bad instrument —
  it cannot distinguish a commodity from an unmet need, copied lineage from independent
  invention, or territory from difficulty. Hash files before counting them as separate.
- **Promote the mechanism; leave the opinion in each app's tokens.** Ship a design register
  inside a component and consumers with a different one will fork rather than argue.
- Components should take a **behaviour**, not a value. A consumer maintaining a lookup table
  keyed on its own theme tokens is a component that cannot ask its environment a question it
  needs answered.
