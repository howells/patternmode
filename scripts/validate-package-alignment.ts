#!/usr/bin/env tsx

import { globSync } from "glob";
import { existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

type PackageJson = {
  name?: string;
  workspaces?: string[];
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

type ValidationError = {
  type: "duplication" | "version-mismatch" | "missing-root";
  package: string;
  dependency: string;
  details: string;
  suggestion?: string;
};

class PackageAlignmentValidator {
  private rootDir: string;
  private rootPackageJson: PackageJson;
  private workspacePackages: Array<{ path: string; pkg: PackageJson }>;
  private errors: ValidationError[] = [];

  constructor(rootDir: string = process.cwd()) {
    this.rootDir = rootDir;
    this.rootPackageJson = this.loadPackageJson(join(rootDir, "package.json"));
    this.workspacePackages = this.loadWorkspacePackages();
  }

  private loadPackageJson(path: string): PackageJson {
    if (!existsSync(path)) {
      throw new Error(`Package.json not found at ${path}`);
    }
    return JSON.parse(readFileSync(path, "utf8"));
  }

  private loadWorkspacePackages(): Array<{ path: string; pkg: PackageJson }> {
    const workspaces = this.rootPackageJson.workspaces || [];
    const packages: Array<{ path: string; pkg: PackageJson }> = [];

    for (const workspace of workspaces) {
      const pattern = join(this.rootDir, workspace, "package.json");
      const packagePaths = globSync(pattern);

      for (const packagePath of packagePaths) {
        const pkg = this.loadPackageJson(packagePath);
        const relativePath = relative(this.rootDir, packagePath);
        packages.push({ path: relativePath, pkg });
      }
    }

    return packages;
  }

  private getRootDependencies(): Record<string, string> {
    return {
      ...this.rootPackageJson.dependencies,
      ...this.rootPackageJson.devDependencies,
    };
  }

  private validateDuplication(): void {
    const rootDeps = this.getRootDependencies();

    for (const { path, pkg } of this.workspacePackages) {
      const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
      };

      for (const [depName, depVersion] of Object.entries(allDeps)) {
        // Skip workspace dependencies
        if (depVersion.startsWith("workspace:")) {
          continue;
        }

        if (rootDeps[depName]) {
          this.errors.push({
            type: "duplication",
            package: path,
            dependency: depName,
            details: `Dependency "${depName}" is duplicated. Found in both root and ${path}`,
            suggestion: `Remove "${depName}" from ${path} to inherit from root`,
          });
        }
      }
    }
  }

  private validateVersionAlignment(): void {
    const allVersions: Record<string, Array<{ version: string; source: string }>> = {};

    // Collect all versions from root
    const rootDeps = this.getRootDependencies();
    for (const [depName, version] of Object.entries(rootDeps)) {
      if (!allVersions[depName]) {
        allVersions[depName] = [];
      }
      allVersions[depName].push({ version, source: "root" });
    }

    // Collect all versions from workspaces
    for (const { path, pkg } of this.workspacePackages) {
      const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
        ...pkg.peerDependencies,
      };

      for (const [depName, version] of Object.entries(allDeps)) {
        if (version.startsWith("workspace:")) {
          continue;
        }

        if (!allVersions[depName]) {
          allVersions[depName] = [];
        }
        allVersions[depName].push({ version, source: path });
      }
    }

    // Check for version mismatches
    for (const [depName, versions] of Object.entries(allVersions)) {
      const uniqueVersions = Array.from(new Set(versions.map(v => v.version)));

      if (uniqueVersions.length > 1) {
        const versionDetails = versions
          .map(v => `${v.source}: ${v.version}`)
          .join(", ");

        this.errors.push({
          type: "version-mismatch",
          package: "multiple",
          dependency: depName,
          details: `Version mismatch for "${depName}": ${versionDetails}`,
          suggestion: `Standardize to one version and move to root if used in multiple packages`,
        });
      }
    }
  }

  private validateMissingRootDependencies(): void {
    const depCount: Record<string, number> = {};
    const rootDeps = this.getRootDependencies();

    // Count occurrences of each dependency
    for (const { pkg } of this.workspacePackages) {
      const allDeps = {
        ...pkg.dependencies,
        ...pkg.devDependencies,
      };

      for (const depName of Object.keys(allDeps)) {
        if (depName.startsWith("workspace:")) {
          continue;
        }
        depCount[depName] = (depCount[depName] || 0) + 1;
      }
    }

    // Find dependencies used in multiple packages but not in root
    for (const [depName, count] of Object.entries(depCount)) {
      if (count > 1 && !rootDeps[depName]) {
        this.errors.push({
          type: "missing-root",
          package: "multiple",
          dependency: depName,
          details: `"${depName}" is used in ${count} packages but not defined in root`,
          suggestion: `Move "${depName}" to root package.json and remove from individual packages`,
        });
      }
    }
  }

  public validate(): ValidationError[] {
    this.errors = [];

    this.validateDuplication();
    this.validateVersionAlignment();
    this.validateMissingRootDependencies();

    return this.errors;
  }

  public generateReport(): string {
    const errors = this.validate();

    if (errors.length === 0) {
      return "✅ All package.json files are properly aligned with no duplication!";
    }

    let report = "❌ Package.json alignment issues found:\n\n";

    const errorsByType = errors.reduce((acc, error) => {
      if (!acc[error.type]) {
        acc[error.type] = [];
      }
      acc[error.type].push(error);
      return acc;
    }, {} as Record<string, ValidationError[]>);

    for (const [type, typeErrors] of Object.entries(errorsByType)) {
      const typeTitle = {
        "duplication": "🔄 DUPLICATION ISSUES",
        "version-mismatch": "⚠️  VERSION MISMATCHES",
        "missing-root": "📦 MISSING ROOT DEPENDENCIES",
      }[type] || type.toUpperCase();

      report += `${typeTitle} (${typeErrors.length})\n`;
      report += `${"=".repeat(50)}\n`;

      for (const error of typeErrors) {
        report += `\n• ${error.details}\n`;
        if (error.suggestion) {
          report += `  💡 ${error.suggestion}\n`;
        }
      }
      report += "\n";
    }

    return report;
  }

  public getAutoFixSuggestions(): string[] {
    const errors = this.validate();
    const suggestions: string[] = [];

    for (const error of errors) {
      if (error.type === "duplication") {
        suggestions.push(
          `Remove "${error.dependency}" from ${error.package}`,
        );
      }
      else if (error.type === "missing-root") {
        suggestions.push(
          `Move "${error.dependency}" to root package.json dependencies`,
        );
      }
    }

    return suggestions;
  }
}

// CLI Usage
const isMainModule = process.argv[1] && process.argv[1].endsWith("validate-package-alignment.ts");
if (isMainModule) {
  const validator = new PackageAlignmentValidator();
  const report = validator.generateReport();

  console.log(report);

  const errors = validator.validate();
  if (errors.length > 0) {
    console.log("\n🔧 Auto-fix suggestions:");
    const suggestions = validator.getAutoFixSuggestions();
    suggestions.forEach((suggestion, index) => {
      console.log(`${index + 1}. ${suggestion}`);
    });

    process.exit(1);
  }
}

export { PackageAlignmentValidator, type ValidationError };
