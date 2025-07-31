# Package Configuration & Test Structure Changes

## Summary

Reorganized the monorepo structure to better separate concerns between the UI component library and the web documentation app, standardized TypeScript checking, and improved test organization.

## Key Changes

### 1. TypeScript Configuration Standardization

- **Removed `check-types`** script duplication across all package.json files
- **Standardized on `typecheck`** as the single script name
- Updated `turbo.json` to use `typecheck` consistently
- Added proper task dependencies in Turborepo configuration

### 2. Test Structure Reorganization

#### Before:
```
tests/                    # Root level tests (mixed concerns)
├── components/ui/        # Empty
├── e2e/                  # Web app e2e tests
├── screenshots/          # E2e screenshots
└── setup/               # Test setup

packages/ui/tests/        # UI component tests
└── components/
```

#### After:
```
apps/web/tests/           # Web app specific tests
├── components/           # Web app component tests
├── e2e/                  # E2e tests for documentation site
├── screenshots/          # E2e screenshots
└── setup/               # Test setup

packages/ui/tests/        # UI component library tests
├── components/           # Component unit tests
└── setup/               # Test setup
```

### 3. Configuration Updates

#### Root `package.json`:
- Removed `check-types` script
- Kept `typecheck` script
- Maintained all other scripts

#### `packages/ui/package.json`:
- Removed `check-types` script
- Kept `typecheck` script

#### `apps/web/package.json`:
- Removed `check-types` script
- Added `typecheck` script
- Added Playwright dependencies (`@playwright/test`, `playwright`)

#### `turbo.json`:
- Removed duplicate `check-types` task
- Enhanced `typecheck` task with proper inputs
- Added `typecheck` as dependency for `build`, `test`, and `test:run`
- Improved caching with better input specifications
- Added missing outputs for build task

### 4. Moved Configuration Files

- `playwright.config.ts` → `apps/web/playwright.config.ts`
- `vitest.config.ts` → `apps/web/vitest.config.ts`
- Updated paths and configurations for new locations

### 5. Test File Updates

- Fixed import paths in e2e tests
- Updated Playwright config to run from correct directory
- Added proper `cwd` setting for web server command

### 6. Documentation

- Added README files for both test directories
- Created test helper utilities
- Added example component test for web app

## Benefits

1. **Clear Separation of Concerns**: E2e tests that test the documentation site are now colocated with the web app
2. **Consistent TypeScript Checking**: Single `typecheck` command across all packages
3. **Better Caching**: Turborepo can now cache more effectively with proper input specifications
4. **Improved Developer Experience**: Clearer test organization and better documentation
5. **Proper Dependencies**: Build tasks now depend on type checking, catching errors earlier

## Running Tests

### From Root:
```bash
pnpm typecheck           # Type check all packages
pnpm test               # Run all tests
pnpm test:e2e           # Run e2e tests
```

### From Specific Packages:
```bash
# UI package tests
cd packages/ui && pnpm test

# Web app tests
cd apps/web && pnpm test
cd apps/web && pnpm test:e2e
```

## Next Steps

1. Fix the existing TypeScript errors in the web app
2. Add more comprehensive component tests to the UI package
3. Consider adding integration tests for the component library
4. Set up proper CI/CD workflows that leverage the improved caching