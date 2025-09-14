# Patternmode

A comprehensive UI component library and design system.

> Alpha note: During the alpha, packages are intended to be consumed directly from source (JIT TypeScript) rather than from npm. The steps below show how to wire your app so `@patternmode/*` resolves to your local filesystem.

## Using `@patternmode/heading` in Next.js (local dev)

If your app lives alongside this repo (for example at `~/Sites/danielhowells` with this repo at `~/Sites/patternmode`), follow these steps to import `@patternmode/heading` cleanly in Next.js 15 (Turbopack):

1) Add local dependencies with the `workspace:` protocol (recommended when using a single meta‑workspace):

```jsonc
// your-app/package.json
{
  "dependencies": {
    "@patternmode/heading": "workspace:*",
    "@patternmode/utils": "workspace:*",
    "@patternmode/config": "workspace:*"
  }
}
```

2) Enable transpilation of Patternmode packages and allow following external dirs (Turbopack):

```ts
// your-app/next.config.ts
import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@patternmode/heading",
    "@patternmode/utils",
    "@patternmode/config",
  ],
  experimental: { externalDir: true },
  // Optional but helpful when your app and this repo are siblings
  turbopack: { root: path.join(__dirname, "..") },
};

export default nextConfig;
```

3) Do not add `tsconfig.json` path aliases to `../patternmode` for `@patternmode/*`. Let Node resolve via `node_modules` (workspace packages).

4) Use the component:

```tsx
// your-app/src/components/SiteHeading.tsx
import { Heading } from "@patternmode/heading";

export default function SiteHeading({ children }: { children: React.ReactNode }) {
  return <Heading>{children}</Heading>; // defaults to <h1>
}
```

### Known pitfalls (and fixes)

- Don’t alias `@patternmode/heading` to the repo root (e.g. `../patternmode`). Always link to `../patternmode/packages/heading`.
- Don’t use `file:` for local Patternmode packages. Prefer `workspace:*` so internal workspace deps continue to resolve.
- Remove custom `.d.ts` shims that redefine the package API; they can mask the real types.
- Ensure React 19 in your app to satisfy peer dependencies.

## Local Development via yalc (instant updates)

For development across separate repos without publishing to npm, use `yalc`. It pushes your local package files directly into the consuming app’s `node_modules` and updates them on change.

### Producer: Patternmode repo

Scripts provided at the repo root:

```bash
# Publish all packages to the local yalc store (one-time per boot)
pnpm yalc:publish

# Publish a subset (set env PKG as a pnpm filter)
PKG='@patternmode/{button,utils,styles}' pnpm yalc:publish:filter

# Live push on change for all packages
pnpm yalc:watch

# Live push for a subset
PKG='@patternmode/{button,utils}' pnpm yalc:watch:filter
```

Keep the watch command running while you edit files under `packages/*/src`.

### Consumer: Your app repo

1) Add Patternmode packages via yalc and install:

```bash
yalc add @patternmode/button @patternmode/styles
pnpm install
```

2) Next.js (or your bundler) must transpile TS from `@patternmode/*`:

```ts
// next.config.ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = { transpilePackages: ["@patternmode/*"] };
export default nextConfig;
```

3) Import normally:

```tsx
import { Button } from "@patternmode/button";
import "@patternmode/styles/globals.css";
```

4) Run your app’s dev server. Edits in Patternmode are pushed instantly by `yalc` and reflected on refresh.

### Maintenance
- Stop using yalc later with: `yalc remove @patternmode/* && pnpm install`.
- If things look stale: rerun `yalc add …` then `pnpm install`.
- No version bumps, no registry logins, no republish cycles required.


## Local Alpha Integration (no npm)

Two supported approaches to use local source without publishing.

### Option 1: Meta‑workspace (recommended)

Keep your app and this repo in a single pnpm workspace so every `@patternmode/*` import resolves locally.

1) Create a parent folder and place both projects inside it:

- `~/dev/patternmode/` (this repo)
- `~/dev/my-app/` (your app)

2) Create a root `pnpm-workspace.yaml` at the parent:

```yaml
packages:
  - "patternmode/packages/*"
  - "patternmode/apps/*" # optional
  - "my-app"
```

3) In `my-app/package.json`, add the Patternmode packages you use via the workspace protocol, for example:

```json
{
  "dependencies": {
    "@patternmode/button": "workspace:*",
    "@patternmode/utils": "workspace:*"
  }
}
```

4) Install once at the parent root: `pnpm install`.

5) Next.js config (required for JIT TS): enable transpilation of workspace packages.

```ts
// my-app/next.config.ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = { transpilePackages: ["@patternmode/*"] };
export default nextConfig;
```

6) Dev: from the parent, run your app: `pnpm dev --filter my-app` (or `pnpm --filter my-app dev`).

Result: All `@patternmode/*` resolve to local `src/index.ts` without publishing.

### Option 2: Direct symlink links (package‑by‑package)

Keep repos anywhere, and link only what you need using pnpm’s `link:` protocol.

1) Clone this repo somewhere, e.g. `~/dev/patternmode`.

2) In your app, add specific packages:

- `pnpm add link:~/dev/patternmode/packages/button`
- `pnpm add link:~/dev/patternmode/packages/utils`
- (repeat for any `@patternmode/*` you use)

3) Next.js config (same as above) to transpile TypeScript sources:

```ts
// my-app/next.config.ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = { transpilePackages: ["@patternmode/*"] };
export default nextConfig;
```

4) Dev: `pnpm dev` in your app. Symlinked packages will reflect source edits immediately.

## Expectations and requirements

- React version: packages declare peerDependencies for React 19; use React 19 in your app.
- JIT TypeScript: packages export `./src/index.ts` via `exports`. Your app (Next) builds TS directly; no JS build step in this repo is required for consumption.
- Import style: use individual component imports such as `import { Button } from "@patternmode/button"`.
- Static imports: avoid dynamic `await import()` in consumer code when importing Patternmode components.

## Troubleshooting

- Not transpiling TS: ensure `transpilePackages: ["@patternmode/*"]` is set in `next.config.ts`.
- Duplicate React or resolution quirks (Vite): set `resolve.preserveSymlinks: true` and keep a single React version.
- Missing types: each package exposes types from `src`; no `.js` files are emitted in alpha. If your tooling ignores TS in `node_modules`, enable transpilation for these packages.

## Scripts

At the repo root:

- `pnpm dev`: turbo dev across workspace.
- `pnpm build`: turbo build (types, checks).
- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:e2e`.

See `AGENTS.md` for full conventions and architecture notes.
