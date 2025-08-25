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
- **Imports**: Individual component imports (`@patternmode/ui/components/button`)
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