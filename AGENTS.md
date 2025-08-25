# AGENTS.md

## Commands
- **Package Manager**: Always use `pnpm` (never npm/yarn)
- **Build**: `pnpm build` (turbo build across workspace)
- **Dev**: `pnpm dev` (starts Next.js with turbopack)
- **Lint**: `pnpm lint` (ESLint across workspace)
- **Typecheck**: `pnpm typecheck` (TypeScript check across workspace)
- **Test**: `pnpm test` (Vitest unit tests)
- **Test E2E**: `pnpm test:e2e` (Playwright tests)
- **Single Test**: `pnpm vitest run path/to/test.spec.ts`

## Architecture
- **JIT TypeScript**: NO compilation - all .ts/.tsx files executed directly
- **NO .js files**: Everything must be TypeScript
- **Package Exports**: Use Node.js exports; avoid TypeScript paths for external consumers
- **Tailwind 4**: Use `@import "tailwindcss";` syntax, NOT `@tailwind` directives
- **Static Imports**: NO dynamic imports (`await import()`) - causes parsing errors

## Code Style
- **Types**: JSDoc on interfaces, `export const` components, `VariantProps<typeof variants>`
- **Imports**: Individual component imports (`@patternmode/button`)
- **Minimal Barrel Files**: Each package must include `src/index.ts` that re-exports only the public component(s) and their types. Do not re-export internals, examples, or previews.
- **TestID**: Every component needs `data-testid` matching directory name
- **Focus**: Use `focusRing`/`focusInput` utilities from `@/lib/utils`
- **Children**: Let inherit from HTML props (don't declare explicitly)

## TypeScript & Packaging (Kibo-aligned)
- **Per-package tsconfig**: Extend `@patternmode/tsconfig/react-library.json` in every component package.
  - Example `tsconfig.json`:
  ```json
  {
    "extends": "@patternmode/tsconfig/react-library.json",
    "compilerOptions": {
      "baseUrl": ".",
      "paths": { "@patternmode/*": ["../*/src"] }
    },
    "include": ["**/*.ts", "**/*.tsx"],
    "exclude": ["node_modules"]
  }
  ```
- **Types-only build**: Emit declaration files without JS.
  - Add script in each package `package.json`:
  ```json
  {
    "scripts": {
      "types": "tsc -p tsconfig.json --emitDeclarationOnly --declaration --declarationMap --noEmit false --outDir dist"
    }
  }
  ```
- **Barrel file**: Use `src/index.ts` to re-export the component and its types only.
- **Publishing types**: Ensure `dist/` contains `.d.ts`. Use `exports` (and optional `types` field) to point to the public API types.

### Canonical exports policy
- **Root import**: `@patternmode/<pkg>` MUST resolve to `./src/index.ts` and expose only component(s) and public types.
- **Docs-only subpaths (optional)**: expose `./config`, `./preview`, `./examples` for docs site. Do NOT expose other internals.
- **No file extensions**: Rely on TS `module: ESNext` and `moduleResolution: Bundler` (in presets) so we never add `.js` to TS relative imports.

### Consumer configuration
- Next.js apps must transpile TS sources from workspace packages:
  ```ts
  // next.config.ts
  import type { NextConfig } from "next";
  const nextConfig: NextConfig = { transpilePackages: ["@patternmode/*"] };
  export default nextConfig;
  ```

### Enforcement
- Add a repo task to verify each package has:
  - `src/index.ts` barrel exporting only public component(s) and types
  - `exports` root -> `./src/index.ts`; only optional `./config`, `./preview`, `./examples`
  - tsconfig extends `@patternmode/tsconfig/react-library.json`
  - A `types` script emitting declarations
