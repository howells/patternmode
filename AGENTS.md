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

## Repo-Specific Rules
- Aperto is not just a lightbox; Deck is the canonical term over CardStack; Stacksheet owns sheet navigation vocabulary.
- Use Arc for public API changes or component refactors.
- Mastra is not relevant to this component catalog unless a future docs/agent surface explicitly requires it.
