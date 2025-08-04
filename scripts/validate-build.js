#!/usr/bin/env node

/**
 * Build Validation Script
 * 
 * This script validates that the build process works correctly by:
 * 1. Generating component pages
 * 2. Running type checking
 * 3. Building the application
 * 4. Checking for common issues
 */

const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

function runCommand(command, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    execSync(command, { stdio: "inherit", cwd: process.cwd() });
    console.log(`✅ ${description} completed successfully`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} failed`);
    console.error(error.message);
    return false;
  }
}

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${description} exists`);
    return true;
  } else {
    console.log(`❌ ${description} missing: ${filePath}`);
    return false;
  }
}

async function validateBuild() {
  console.log("🚀 Starting build validation...");
  
  let success = true;
  
  // Step 1: Clean previous builds
  success = runCommand("pnpm clean", "Cleaning previous builds") && success;
  
  // Step 2: Install dependencies
  success = runCommand("pnpm install", "Installing dependencies") && success;
  
  // Step 3: Generate component pages
  success = runCommand("pnpm generate:pages", "Generating component pages") && success;
  
  // Step 4: Check that pages were generated
  const pagesDir = path.join(process.cwd(), "apps/web/src/app/ui/components");
  if (fs.existsSync(pagesDir)) {
    const pageCount = fs.readdirSync(pagesDir).length;
    console.log(`✅ Generated ${pageCount} component pages`);
  } else {
    console.log("❌ Component pages directory not found");
    success = false;
  }
  
  // Step 5: Type checking
  success = runCommand("pnpm typecheck", "Running type checking") && success;
  
  // Step 6: Linting
  success = runCommand("pnpm lint", "Running linting") && success;
  
  // Step 7: Build application
  success = runCommand("pnpm build --filter=@patternmode/web", "Building web application") && success;
  
  // Step 8: Check build outputs
  const buildDir = path.join(process.cwd(), "apps/web/.next");
  success = checkFile(buildDir, "Next.js build directory") && success;
  success = checkFile(path.join(buildDir, "static"), "Static assets") && success;
  
  // Step 9: Run tests
  success = runCommand("pnpm test:run", "Running unit tests") && success;
  
  console.log(`\n${"=".repeat(50)}`);
  if (success) {
    console.log("🎉 Build validation passed! Ready for deployment.");
    process.exit(0);
  } else {
    console.log("💥 Build validation failed! Please fix the issues above.");
    process.exit(1);
  }
}

// Handle uncaught errors
process.on("uncaughtException", (error) => {
  console.error("💥 Uncaught exception:", error.message);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("💥 Unhandled rejection:", error.message);
  process.exit(1);
});

validateBuild();