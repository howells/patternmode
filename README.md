# Patternmode

Patternmode is the catalog monorepo for Howells UI tools.

For “use Patternmode style”, start with the [style guide](docs/style.md): the
canonical typography, colour roles, spacing, and application recipes.

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
[docs/library-contract.md](docs/library-contract.md) for the vendoring pipeline, the token
contract, and the dependency conventions.

## Releasing

Releases are published from this machine. There are no GitHub Actions in this
repo and nothing runs in CI, so every check, build, release and deploy happens
locally.

1. `pnpm changeset` to describe the change.
2. `pnpm version-packages` to apply the bumps and write the changelogs.
3. Review and commit.
4. `pnpm typecheck && pnpm lint && pnpm build && pnpm test` - the full gate.
5. `pnpm release` (add `--dry-run` to pack and verify without publishing).
6. `node scripts/verify-release.mjs` to read every published package back.

`scripts/release.mjs` sorts the workspace into dependency order, skips whatever
the registry already has, packs each package with pnpm and hands the tarball to
npm. Re-running after a partial failure is safe, which matters because
unpublishing is unavailable after 72 hours.

**The npm session has to be able to write.** The script passes no credential; npm
uses the logged-in user or an `NPM_TOKEN` in the environment
(`NPM_CONFIG_USERCONFIG=<npmrc with the token> pnpm release`). Note the trap it
cost an evening: the account is on `auth-and-writes`, so a classic **Publish**
token authenticates and then refuses to write. It has to be a classic
**Automation** token or a granular access token, and `npm whoami` succeeding
proves nothing about whether a token can publish. An interactive `npm login`
session works but will ask for a one-time password per publish.

**pnpm packs and npm publishes, deliberately.** Ten of these packages depend on
another through the `workspace:*` protocol, and only pnpm rewrites that to a real
version when it packs - `npm pack` ships the literal string and the release is
uninstallable. Each half does the thing it can do.
`scripts/verify-release.mjs` reads every published package back off the registry,
because a leaked `workspace:` range publishes without error and only fails for
the first stranger who installs it.

**Trusted Publishing is retired along with the workflow.** If a package on
npmjs.com still has a trusted publisher configured and set to required, a token
publish is rejected; clear that setting on the package before releasing.
