#!/usr/bin/env node

/**
 * Quick script to check React Fast Refresh compliance progress
 * Run with: node scripts/check-react-refresh-progress.js
 */

import { execSync } from "child_process";

try {
  console.log("🔍 Checking React Fast Refresh compliance progress...\n");
  
  const result = execSync("pnpm test react-refresh-compliance.test.ts", {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: "inherit"
  });
  
  console.log("\n✅ Progress check complete!");
} catch (error) {
  console.error("❌ Error checking progress:", error.message);
  process.exit(1);
}