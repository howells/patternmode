# Releasing

`.github/workflows/release.yml` is the only workflow here, and publishing to npm is the
only thing it does. Nothing else runs on a push, a pull request or a schedule.

## The sequence

1. `pnpm version-packages` (changeset version), then review the bumps and changelogs.
2. Commit and push.
3. Tag the release commit `release-<something>` and push the tag, or
   `gh workflow run release.yml`. Add `-f dry_run=true` to pack and verify every package
   without publishing.

A release has no single version, which is why the trigger isn't a version tag. One
`pnpm version-packages` can bump fourteen packages to fourteen different numbers: the tag
records that a release happened, the changelogs record what was in it.

## Trusted publisher rows

Every package in `packages/` needs its own trusted publisher on npmjs.com, set on that
package's page under Settings, Trusted publisher: organisation `howells`, repository
`patternmode`, workflow filename `release.yml`, environment blank, **Allow npm publish**
ticked. It can only be done in the browser and it can't be scripted. A package without
one fails its own publish while the rest of the release succeeds; register it and re-run
the workflow, which skips versions already on the registry.

`--provenance` is passed explicitly, despite npm documenting trusted publishing as
attaching provenance by itself. Measured as a controlled pair on `@howells/lint`: the flag
is what attaches the attestation, and dropping it loses provenance silently.

## Build ordering

The typecheck, lint, build and test run happens in the same job immediately before the
release, and that isn't ceremony.
`scripts/release.mjs` sets `PATTERNMODE_SKIP_PREPACK_BUILD=1` and reuses whatever is in
`dist/`, which on a fresh runner starts empty, so splitting the two into separate jobs
would publish empty packages. Nothing else suppresses those builds: `pnpm` reads
`ignore-scripts` only from its own flag, not from an `.npmrc` and not from
`npm_config_ignore_scripts`.

Before calling any publish failure a flake, check whether the failing package depends on
another package in the same release. `tsdown` builds with `clean: true`, so a package
empties its `dist/` and rewrites `index.mjs` in milliseconds while `tsc
--emitDeclarationOnly` takes seconds to put the `.d.ts` files back. A dependent compiling
in that window resolves the dependency to JavaScript with no types, infers them from the
bundle, and fails on its own source with a plausible type error - while building clean in
isolation.

## Verifying

- `pnpm release` is idempotent on partial failure: it checks the registry first and
  publishes only missing versions.
- Read `npm view <pkg> dist-tags`, not `npm view <pkg> version`, which serves stale reads
  straight after publishing.
- Verify registry access anonymously. `npm view --json` `.private` reads the
  package.json field rather than the registry access level, so it misses a package
  published `--access restricted`:
  `curl -s -o /dev/null -w '%{http_code}' -H 'Authorization:' https://registry.npmjs.org/<pkg>/<version>`
  should give 200.
- The workflow runs `node scripts/verify-release.mjs` after publishing, which reads the
  published metadata back off the registry and proves the release is installable. Run it
  by hand only when investigating.
- `pnpm e2e:consumer` builds a real Next.js consumer against the packed tarballs. It
  resolves dependencies from npm, so it legitimately fails before a release that includes
  a new version of an internal dependency. Re-run it afterwards.
- Confirm a consumer actually resolves from npm before reasoning about blast radius, and
  watch for stale `node_modules/.pnpm` entries.
