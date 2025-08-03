# Package Alignment & Dependency Management

This document outlines the systems and processes in place to ensure consistent dependency management across the PatternMode monorepo with no duplication.

## 🎯 Goals

- **Single Source of Truth**: Common dependencies are managed at the root level
- **Version Consistency**: All packages use the same versions of shared dependencies
- **No Duplication**: Dependencies are not repeated across multiple package.json files
- **Automated Validation**: Multiple layers of validation prevent alignment issues

## 📁 Current Structure

### Root Dependencies
All common dependencies are defined in the root `package.json`:

```json
{
  "dependencies": {
    // Runtime dependencies used by multiple packages
    "@internationalized/date": "^3.8.2",
    "clsx": "^2.1.1",
    "motion": "^12.23.12"
    // ... more
  },
  "devDependencies": {
    // Development dependencies used by multiple packages
    "@types/react": "^19.1.9",
    "typescript": "^5.8.0",
    "vitest": "^3.2.4"
    // ... more
  }
}
```

### Workspace-Specific Dependencies
Individual packages only contain dependencies that are:
- **Unique to that package** (not used elsewhere)
- **Workspace references** (`workspace:*`)
- **Peer dependencies** (when different from root)

## 🔧 Validation Systems

### 1. Automated Script Validation
**File**: `scripts/validate-package-alignment.ts`

```bash
# Check alignment
pnpm validate-packages

# Get detailed report with suggestions
pnpm validate-packages:fix
```

**What it checks**:
- ✅ Duplicate dependencies across packages
- ✅ Version mismatches between packages
- ✅ Missing root dependencies (used in 2+ packages)

### 2. Pre-commit Hooks
**File**: `.husky/pre-commit`

Automatically runs before every commit:
```bash
🔍 Validating package.json alignment...
🔧 Running linters...
```

### 3. Turbo Task Integration
**File**: `turbo.json`

```json
{
  "validate-packages": {
    "cache": false,
    "inputs": ["**/package.json", "scripts/validate-package-alignment.ts"]
  }
}
```

### 4. ESLint Rules
**File**: `packages/eslint-config/rules/package-json-alignment-rules.mjs`

- Enforces consistent package.json key ordering
- Validates dependency sorting
- Applied to all `**/package.json` files

### 5. CI/CD Validation
**File**: `.github/workflows/validate-packages.yml`

Runs on:
- Every push to `main`/`develop`
- Every PR that modifies `package.json` files

## 📋 Maintenance Workflows

### Adding a New Dependency

#### If used in multiple packages:
1. Add to root `package.json` dependencies or devDependencies
2. Remove from individual package.json files
3. Run `pnpm validate-packages` to verify

#### If used in only one package:
1. Add directly to that package's `package.json`
2. Validation will pass as it's not duplicated

### Updating Dependencies

#### For root dependencies:
```bash
# Update in root
pnpm add dependency@^2.0.0

# Validation automatically ensures no conflicts
pnpm validate-packages
```

#### For package-specific dependencies:
```bash
# Update in specific package
cd packages/ui
pnpm add package-specific-dep@^1.0.0
```

### Version Alignment Issues

When the validator detects version mismatches:

```bash
❌ Package.json alignment issues found:

⚠️  VERSION MISMATCHES (1)
==================================================

• Version mismatch for "eslint": root: ^9.17.0, packages/ui/package.json: ^9.32.0
  💡 Standardize to one version and move to root if used in multiple packages
```

**Resolution**:
1. Choose the desired version (usually the latest)
2. Update root `package.json` to that version
3. Remove from individual packages
4. Run `pnpm install` to apply changes

## 🚨 Common Issues & Solutions

### Issue: "Dependency duplicated"
```bash
• Dependency "typescript" is duplicated. Found in both root and packages/ui/package.json
  💡 Remove "typescript" from packages/ui/package.json to inherit from root
```

**Solution**: Remove the dependency from the individual package.json file.

### Issue: "Missing root dependency"
```bash
• "react-hook-form" is used in 2 packages but not defined in root
  💡 Move "react-hook-form" to root package.json dependencies
```

**Solution**:
1. Add the dependency to root `package.json`
2. Remove from individual packages
3. Choose the highest version if there are conflicts

### Issue: Pre-commit validation fails
If validation fails during commit:
1. Fix the reported issues
2. Run `pnpm validate-packages` to verify
3. Commit again

## 🔄 Automated Fixes

The validation script provides actionable suggestions:

```bash
🔧 Auto-fix suggestions:
1. Remove "clsx" from packages/ui/package.json
2. Remove "@types/react" from apps/web/package.json
3. Move "react-hook-form" to root package.json dependencies
```

## 📊 Validation Report Example

```bash
✅ All package.json files are properly aligned with no duplication!
```

Or when issues exist:
```bash
❌ Package.json alignment issues found:

🔄 DUPLICATION ISSUES (2)
==================================================

• Dependency "clsx" is duplicated. Found in both root and packages/ui/package.json
  💡 Remove "clsx" from packages/ui/package.json to inherit from root

• Dependency "@types/react" is duplicated. Found in both root and apps/web/package.json
  💡 Remove "@types/react" from apps/web/package.json to inherit from root

📦 MISSING ROOT DEPENDENCIES (1)
==================================================

• "react-hook-form" is used in 2 packages but not defined in root
  💡 Move "react-hook-form" to root package.json and remove from individual packages
```

## 🎛️ Configuration

### Disable Validation (Not Recommended)
To temporarily skip validation:
```bash
# Skip pre-commit validation
HUSKY=0 git commit -m "message"

# Skip CI validation
git push --no-verify
```

### Custom Validation Rules
Modify `scripts/validate-package-alignment.ts` to add custom validation logic.

## 🔗 Integration Points

- **Turbo**: Integrated as a pipeline task
- **ESLint**: Validates package.json formatting
- **Husky**: Pre-commit validation
- **GitHub Actions**: CI validation
- **pnpm**: Workspace dependency resolution

## 📈 Benefits

1. **Consistency**: All packages use identical versions
2. **Maintainability**: Single point to update shared dependencies
3. **Bundle Size**: Reduced duplication in node_modules
4. **Developer Experience**: Clear validation feedback
5. **CI/CD**: Automated prevention of alignment issues

---

For questions or issues with package alignment, check the validation output or run `pnpm validate-packages` for detailed diagnostics.