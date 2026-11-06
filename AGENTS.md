# patternmode

pnpm/turbo monorepo of `@howells/patternmode-*` / `@patternmode/*` packages in `packages/`, plus `apps/web` (docs site), `apps/preview` and `tools/`. Issues live in Linear (howells, PAT).

```sh
pnpm dev         # apps/web
pnpm build
pnpm typecheck
pnpm lint
pnpm test
pnpm e2e         # browser tests in packages that have them
```

- Releases: add a changeset, `pnpm version-packages`, then tag `release-*` or run the Publish workflow; it publishes via `scripts/release.mjs`.
- Don't overwrite other people's uncommitted work.
