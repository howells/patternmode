# UI Package Tests

This directory contains all tests for the `@patternmode/ui` component library.

## Structure

- `components/` - Unit tests for individual UI components
- `setup/` - Test setup and configuration files

## Running Tests

From the root of the monorepo:

```bash
# Run all UI package tests
pnpm test

# Run only UI package tests
turbo test --filter=@patternmode/ui

# Run tests with UI
turbo test:ui --filter=@patternmode/ui
```

From the UI package directory (`packages/ui`):

```bash
# Run unit tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests once
pnpm test:run
```

## Configuration

- `vitest.config.ts` - Vitest configuration
- `setup/vitest.setup.ts` - Vitest setup file

## Testing Guidelines

- Each component should have comprehensive unit tests
- Test both functionality and accessibility
- Mock external dependencies appropriately
- Use meaningful test descriptions