# Library contract

## Registry and tokens

Component CSS reads the shadcn theme variable vocabulary with patternmode hex values as
fallbacks, e.g. `var(--foreground, #1d1d1b)`. Never reintroduce the older `--ink` /
`--muted` / `--surface` / `--surface-soft` / `--accent-soft` / `--border-soft` / `--quiet`
names. `packages/theme/test/token-vocabulary.test.mjs`, run by `pnpm test`, enforces the
vocabulary and fails on any `var(--name)` outside the allowlist.

`scripts/build-registry-config.mjs` hard-codes two per-package lookup tables that must be
updated when a package joins the registry: `CSS_STYLE` (style A inline, B `styles.css`
plus import, C none) and `STRIP_GLOBAL_DECLARATIONS` (packages whose vendored source needs
`declare global` blocks stripped, stacksheet for instance). A new `@patternmode/*`
component also goes in `COMPONENT_PACKAGES`.

Rebuild the registry with `pnpm --filter @patternmode/theme build`, which writes
`packages/theme/dist/registry`. Re-sync the preview app with
`pnpm --filter @howells/patternmode-preview sync`; it also runs automatically before `dev`
and `build` in `apps/preview`.

## Dependency conventions

- `peerDependencies` use an explicit range; the `devDependencies` twin uses `catalog:`.
  See how `react` is declared in any component package, and don't "fix" the asymmetry.
- Anything identity-bearing or heavy is a peer, not a regular dependency
  (`@instruments/colorscope`, `lucide-react`). A regular dependency on a caret floats
  independently of the host's pin, so a consumer can pin a version exactly and still get
  a different one underneath them. Never mark a required peer `optional`; that only moves
  the failure from install time to runtime.
- Peer ranges express minimum API requirements. Keep an upper bound only for a
  demonstrated incompatibility. Lockfiles record tested versions.

## Deciding what to build

- Build what shadcn, ReUI, Base UI and AI Elements do not serve. If a registry has it and
  it's fine, don't duplicate it.
- The promotion test is duplication plus divergence plus a discoverable reason the shipped
  option was rejected. Duplication alone finds messy repos rather than under-served ones,
  and the reason something was rebuilt is the finding. Cross-repo filename frequency is a
  bad instrument: it can't tell a commodity from an unmet need, copied lineage from
  independent invention, or territory from difficulty. Hash files before counting them as
  separate.
- Promote the mechanism and leave the opinion in each app's tokens. Ship a design register
  inside a component and consumers with a different one will fork rather than argue.
- Components take a behaviour, not a value. A consumer maintaining a lookup table keyed on
  its own theme tokens is a component that can't ask its environment a question it needs
  answered.

## TypeScript compiler boundary

Workspace checks, package declaration emission and both Next apps use native TypeScript.
Aperto uses tsdown's native declarations while preserving its public `.js` and `.d.ts`
exports; other packages keep their separate native declaration emission. No JavaScript
TypeScript compiler or compiler-API compatibility aliases are retained.
