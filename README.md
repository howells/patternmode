# Patternmode

Patternmode is the catalog monorepo for Howells UI tools.

- `@patternmode/stacksheet` lives in `packages/stacksheet`.
- `@patternmode/aperto` lives in `packages/aperto`.
- `@patternmode/deck` lives in `packages/deck`.
- `@patternmode/system` lives in `packages/system`.
- `@patternmode/swatch` lives in `packages/swatch`.
- `@patternmode/scrollframe` lives in `packages/scrollframe`.
- `apps/web` is the minimal catalog site.
- `packages/site-ui` and `packages/motion` are private workspace packages.

The old Patternmode UI system, Storybook, playground, transition package, and
longform docs were intentionally retired during the catalog migration.

## Release Environment

Package publishing uses `@howells/envy` to validate local release secrets before
running Changesets.

- Store `NPM_TOKEN` in `.env.local`.
- Run `pnpm env:check` to validate the local release environment.
- Run `pnpm publish:packages` to publish with a temporary npm config.

The publish wrapper only reports env key names and deletes the temporary npm
config after Changesets exits.
