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
- **Package Exports**: Use Node.js exports, avoid TypeScript paths for packages
- **Tailwind 4**: Use `@import "tailwindcss";` syntax, NOT `@tailwind` directives
- **Static Imports**: NO dynamic imports (`await import()`) - causes parsing errors

## Code Style
- **Types**: JSDoc on interfaces, `export const` components, `VariantProps<typeof variants>`
- **Imports**: Individual component imports (`@patternmode/ui/components/button`)
- **NO Barrel Files**: Never create index.ts files
- **TestID**: Every component needs `data-testid` matching directory name
- **Focus**: Use `focusRing`/`focusInput` utilities from `@/lib/utils`
- **Children**: Let inherit from HTML props (don't declare explicitly)

## TypeScript & Packaging (Kibo-aligned)
- **Per-package tsconfig**: Extend `@patternmode/tsconfig/nextjs.json` in every component package.
  - Example `tsconfig.json`:
  ```json
  {
    "extends": "@patternmode/tsconfig/nextjs.json",
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
- **No barrel files**: Do not add `index.ts`. Keep using explicit `exports` in `package.json` to expose public entry points.
- **Publishing types**: Ensure `dist/` contains `.d.ts`. Use `exports` (and optional `types` field) to point to the public API types.