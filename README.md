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

## Releasing

There are two ways to publish and they share everything except how they
authenticate.

**Trusted Publishing, the intended path.** The Release workflow proves this
repo's identity to npm over OIDC and npm mints a short-lived token for that one
publish. No credential is stored anywhere. It needs the one-time per-package
setup below, and until every package has it, a package without it fails its own
publish while the rest go through.

**A local token, the fallback.** `NPM_TOKEN` in `.env.local`, then
`NPM_CONFIG_USERCONFIG=<npmrc with the token> pnpm release`. This is what shipped
the 24 August release, because the trusted publisher setup was not in place yet.
Note the trap it cost an evening: the account is on `auth-and-writes`, so a
classic **Publish** token authenticates and then refuses to write. It has to be a
classic **Automation** token or a granular access token. `npm whoami` succeeding
proves nothing about whether a token can publish.

Versioning stays local either way:

1. `pnpm changeset` to describe the change.
2. `pnpm version-packages` to apply the bumps and write the changelogs.
3. Review, commit, push to `main`.
4. Run the **Release** workflow (`workflow_dispatch`, with a `dry_run` input).

`scripts/release.mjs` sorts the workspace into dependency order, skips whatever
the registry already has, packs each package with pnpm and hands the tarball to
npm. Re-running after a partial failure is safe, which matters because
unpublishing is unavailable after 72 hours. It is the same script both ways -
only the authentication differs.

**pnpm packs and npm publishes, deliberately.** Ten of these packages depend on
another through the `workspace:*` protocol, and only pnpm rewrites that to a real
version when it packs - `npm pack` ships the literal string and the release is
uninstallable. But pnpm has no OIDC support, so it cannot authenticate. Each half
does the thing it can do. `scripts/verify-release.mjs` then reads every published
package back off the registry, because a leaked `workspace:` range publishes
without error and only fails for the first stranger who installs it.

### One-time setup per package

On npmjs.com, package → Settings → Trusted publisher:

| Field                | Value         |
| -------------------- | ------------- |
| Organization or user | `howells`     |
| Repository           | `patternmode` |
| Workflow filename    | `release.yml` |
| Environment          | leave empty   |

Every publishable package needs it once. A package without it fails its own
publish while the rest go through, so a missed one costs a re-run rather than a
broken release.
