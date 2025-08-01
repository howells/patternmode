# @patternmode/eslint-config

Shared ESLint configuration for the PatternMode monorepo, built on top of [@antfu/eslint-config](https://github.com/antfu/eslint-config) with Turborepo integration.

## Features

- ✨ **Anthony Fu's ESLint Config**: Opinionated, modern ESLint setup
- 🔧 **Auto-formatting**: Built-in Prettier integration
- ⚡ **Framework Support**: Next.js and React configurations
- 🏗️ **Turborepo Integration**: Includes `eslint-config-turbo` rules
- 📦 **Monorepo Ready**: Separate configs for different workspace types

## Configurations

### Base Configuration

For general TypeScript projects:

```js
import { base } from "@patternmode/eslint-config";

export default base();
```

### Next.js Configuration

For Next.js applications (includes React + Next.js specific rules):

```js
import { nextjs } from "@patternmode/eslint-config";

export default nextjs();
```

### UI Configuration

For React component libraries with enhanced JSDoc and component pattern enforcement:

```js
import { ui } from "@patternmode/eslint-config";

export default ui();
```

### React Configuration

For React libraries and components:

```js
import { react } from "@patternmode/eslint-config";

export default react();
```

## Installation

This package is automatically installed as a workspace dependency. To use it in a new workspace:

```bash
pnpm add -D @patternmode/eslint-config
```

## Usage in Workspaces

### Root (Turborepo)

```typescript
// eslint.config.ts
import { base } from "@patternmode/eslint-config";

export default [
  ...base(),
  {
    name: "turbo/rules",
    extends: ["turbo"],
  },
];
```

### Web App (Next.js)

```javascript
// eslint.config.js
import { nextjs } from "@patternmode/eslint-config";

export default nextjs();
```

### UI Package (React)

```javascript
// eslint.config.js
import { ui } from "@patternmode/eslint-config";

export default ui();
```

## What's Included

- **@antfu/eslint-config**: Modern, opinionated ESLint setup
- **TypeScript support**: Full TypeScript linting
- **React/Next.js rules**: Framework-specific linting
- **Auto-formatting**: Prettier integration for consistent code style
- **Import sorting**: Automatic import organization
- **Turborepo rules**: Monorepo-specific linting rules
- **Component pattern enforcement**: React.forwardRef standardization (UI config)
- **JSDoc validation**: Comprehensive documentation requirements (UI config)

## Commands

Run linting across all workspaces:

```bash
pnpm lint
```

Auto-fix issues:

```bash
pnpm lint -- --fix
```

## Modular Rules Architecture

Rules are organized into focused modules in the `rules/` directory. Each rule file follows the **"more than 1 line = separate file"** principle for better maintainability:

### Rule Extraction Principle

- ✅ **Single-line rules**: Stay in main config (e.g., `"no-console": "off"`)
- ✅ **Multi-line rules**: Extracted to dedicated files (e.g., complex configurations)
- ✅ **Logical grouping**: Related rules grouped by concern (TypeScript, JSDoc, etc.)
- ✅ **Clear naming**: File names clearly indicate their purpose

### Component-Specific Rules (UI Package)

- **`react-component-patterns.mjs`**: Enforces React.forwardRef pattern standardization
- **`jsdoc-component-rules.mjs`**: Comprehensive JSDoc validation for React components

### General Rules (All Packages)

- **`turbo-rules.mjs`**: Turborepo environment variable validation and monorepo rules
- **`typescript-rules.mjs`**: TypeScript-specific linting and type preferences
- **`node-environment-rules.mjs`**: Node.js, console logging, and environment rules
- **`import-sorting-rules.mjs`**: Import/export organization using perfectionist
- **`jsdoc-general-rules.mjs`**: General JSDoc requirements for exported functions/classes

### Direct Imports

All rule configurations are imported directly from their respective files (no barrel files).

### Custom Rules

#### React Component Pattern Enforcement

The UI configuration enforces consistent React component patterns:

- ✅ **Required**: `const Component = React.forwardRef<RefType, PropsType>((props, ref) => { ... });`
- ❌ **Blocked**: Arrow functions, function declarations, component aliases, standalone forwardRef

#### JSDoc Requirements

Components must include:

- **Description**: Meaningful component description
- **Required tags**: `@id`, `@name`, `@component`, `@example`
- **Optional tags**: `@see`, `@since`, `@deprecated`, `@version`

## Configuration Philosophy

This configuration follows Anthony Fu's philosophy of:

- **Less opinionated**: Reasonable defaults that don't get in your way
- **Auto-formatting**: Let tools handle formatting, focus on logic
- **Modern standards**: ESM, flat config, latest best practices
- **Framework awareness**: Different rules for different contexts
- **Modular architecture**: Focused rule sets for specific concerns

## File Structure

```
packages/eslint-config/
├── index.mjs                           # Main config exports (base, ui, react, nextjs)
├── package.json                        # Package configuration
├── README.md                          # Documentation
└── rules/                             # 🗂️ Modular rules directory
    ├── import-sorting-rules.mjs       # Import/export organization
    ├── jsdoc-component-rules.mjs      # JSDoc for React components
    ├── jsdoc-general-rules.mjs        # JSDoc for functions/classes
    ├── node-environment-rules.mjs     # Node.js & environment rules
    ├── react-component-patterns.mjs   # React.forwardRef enforcement
    ├── turbo-rules.mjs               # Turborepo monorepo rules
    └── typescript-rules.mjs          # TypeScript preferences
```
