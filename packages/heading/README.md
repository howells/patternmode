# @patternmode/heading

Heading component with semantic levels and consistent typography.

> Alpha note: In this stack, Patternmode packages are consumed via pnpm’s `workspace:` protocol and transpiled by Next.js. Prefer `workspace:*` over `link:`.

## Install (workspace)

If this package lives in the same pnpm workspace as your app, add dependencies using the workspace protocol:

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

Then run `pnpm install` in your workspace root.

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
- Do not add tsconfig path aliases like `"@patternmode/heading": ["../patternmode"]`. Let Node resolve via `node_modules` (workspace-installed packages).
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
If you develop across sibling repos (outside a single workspace), you may use `link:` locally, but this stack standardizes on `workspace:*`.

## Requirements
- React `^19`
- Node `>=18`
