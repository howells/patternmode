# @patternmode/heading

Heading component with semantic levels and consistent typography.

> Alpha note: Patternmode packages are consumed from source (TypeScript) during local development. Use pnpm’s `link:` protocol and let Next.js transpile these packages.

## Install (local, sibling repos)

Assuming your app is at `~/Sites/danielhowells` and Patternmode is at `~/Sites/patternmode`:

Add the packages to your app’s `package.json` (use the actual package folders, not the repo root):

```jsonc
// your-app/package.json
{
  "dependencies": {
    "@patternmode/heading": "link:../patternmode/packages/heading",
    "@patternmode/utils": "link:../patternmode/packages/utils",
    "@patternmode/config": "link:../patternmode/packages/config"
  }
}
```

Then install in your app:

```bash
pnpm install
```

Why utils and config too? This package depends on them and they’re authored in the same monorepo. Linking them explicitly avoids resolution issues when consuming from another repo.

## Next.js configuration (Turbopack)

Enable transpilation of Patternmode packages and allow following external directories. Optionally widen the Turbopack root when repos are siblings.

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
  // Optional but helpful when app and patternmode are siblings
  turbopack: { root: path.join(__dirname, "..") },
};

export default nextConfig;
```

Notes
- Do not add tsconfig path aliases like `"@patternmode/heading": ["../patternmode"]`. Let Node resolve via `node_modules` (the `link:` symlinks).
- Restart the dev server after changing Next config.

## Usage

```tsx
import * as React from "react";
import { Heading } from "@patternmode/heading";

export function Example() {
  return (
    <div>
      <Heading>Page Title</Heading> {/* renders <h1> */}
      <Heading level={2} className="mt-4">Section</Heading> {/* renders <h2> */}
    </div>
  );
}
```

API
- `level` (1–6): selects the semantic heading element (`h1`–`h6`). Defaults to `1`.
- `className`: merge in additional styles.
- Other props: forwarded to the underlying `h1`–`h6` element.

Accessibility
- `Heading` renders semantic heading tags. Keep level order logical for screen readers.
- Do not hide headings with `aria-hidden` and ensure the text is meaningful.

## Troubleshooting
- Module not found for `@patternmode/heading`:
  - Ensure you linked the package folder (`packages/heading`), not the repo root.
  - Ensure `experimental.externalDir` is `true` and `transpilePackages` includes `@patternmode/heading`, `@patternmode/utils`, and `@patternmode/config`.
  - Remove custom `.d.ts` shims that redefine the package API.
- Types or build errors when using `file:` instead of `link:`:
  - Use `link:` so internal `workspace:*` dependencies in Patternmode resolve correctly across repos.

## Requirements
- React `^19`
- Node `>=18`
