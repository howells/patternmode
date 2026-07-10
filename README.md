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

## shadcn registry

Patternmode also self-hosts a [shadcn registry](https://ui.shadcn.com/docs/registry) at
`https://patternmode.com/r/{name}.json`, serving the theme and every `@patternmode/*`
component as vendored, CLI-installed source rather than an npm dependency — consumers
own and can edit the code they install.

```bash
# namespace (add once to components.json):
#   { "registries": { "@patternmode": "https://patternmode.com/r/{name}.json" } }
npx shadcn add @patternmode/theme @patternmode/swatch

# raw URL — no components.json config needed
npx shadcn add https://patternmode.com/r/theme.json
```

Component CSS reads the standard shadcn theme variable vocabulary (`--foreground`,
`--muted-foreground`, `--ring`, …) with each package's original hex values as fallbacks, so
installed components pick up any shadcn-compatible theme automatically. See
`docs/specs/002-component-registry.md` for the vendoring pipeline, the token contract, and
the update/versioning story.

## Release Environment

Package publishing uses `@howells/envy` to validate local release secrets before
running Changesets.

- Store `NPM_TOKEN` in `.env.local`.
- Run `pnpm env:check` to validate the local release environment.
- Run `pnpm publish:packages` to publish with a temporary npm config.

The publish wrapper only reports env key names and deletes the temporary npm
config after Changesets exits.
