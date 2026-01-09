"use server";

import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import {
  addExperiment,
  deleteExperiment as deleteExperimentFromManifest,
  loadManifest,
  updateExperiment,
} from "@/lib/experiments";

/**
 * Generate experiment via Claude Code CLI
 */
export async function generateExperiment(theme: string) {
  // Validate input
  if (!theme || typeof theme !== "string" || theme.length > 200) {
    return { success: false, error: "Invalid theme parameter" };
  }

  try {
    // Read prompt template
    const promptPath = path.join(
      process.cwd(),
      "prompts/experiment-library.md"
    );
    const promptTemplate = await fs.readFile(promptPath, "utf-8");
    const prompt = promptTemplate.replace("{{THEME}}", theme);

    // Generate unique ID
    const id = `exp-${Date.now()}`;
    const componentPath = path.join(
      process.cwd(),
      "src/components/experiments",
      `${id}.tsx`
    );

    // Call Claude Code CLI
    return new Promise<{ success: boolean; id?: string; error?: string }>(
      (resolve) => {
        const claude = spawn("claude", ["--print", "-p", prompt], {
          cwd: process.cwd(),
        });

        let output = "";
        let errorOutput = "";

        claude.stdout.on("data", (data) => {
          output += data.toString();
        });

        claude.stderr.on("data", (data) => {
          errorOutput += data.toString();
        });

        claude.on("close", async (code) => {
          if (code !== 0) {
            resolve({
              success: false,
              error: errorOutput || "Claude Code failed",
            });
            return;
          }

          try {
            // Parse frontmatter from generated code
            const metadata = parseFrontmatter(output);

            // Save component file
            await fs.writeFile(componentPath, output, "utf-8");

            // Add to manifest
            await addExperiment({
              id,
              ...metadata,
              filePath: `src/components/experiments/${id}.tsx`,
              approved: false,
              featured: false,
              generatedAt: new Date().toISOString(),
            });

            resolve({ success: true, id });
          } catch (error) {
            resolve({
              success: false,
              error: error instanceof Error ? error.message : "Unknown error",
            });
          }
        });
      }
    );
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Approve experiment
 */
export async function approveExperiment(id: string) {
  // Validate input
  if (!id || typeof id !== "string" || !/^[\w-]+$/.test(id)) {
    return { success: false, error: "Invalid experiment ID" };
  }

  try {
    await updateExperiment(id, { approved: true });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Delete experiment
 */
export async function deleteExperiment(id: string) {
  // Validate input
  if (!id || typeof id !== "string" || !/^[\w-]+$/.test(id)) {
    return { success: false, error: "Invalid experiment ID" };
  }

  try {
    const manifest = await loadManifest();
    const experiment = manifest.experiments.find((exp) => exp.id === id);

    if (!experiment) {
      throw new Error("Experiment not found");
    }

    // Delete file
    const filePath = path.join(process.cwd(), experiment.filePath);
    await fs.unlink(filePath);

    // Remove from manifest
    await deleteExperimentFromManifest(id);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get all experiments (for admin)
 */
export async function getAllExperiments() {
  try {
    const manifest = await loadManifest();
    return { success: true, experiments: manifest.experiments };
  } catch (error) {
    return {
      success: false,
      experiments: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

interface ParsedFrontmatter {
  title: string;
  description: string;
  mechanics: string[];
  dependencies: string[];
}

/**
 * Parse frontmatter from generated component
 */
function parseFrontmatter(code: string): ParsedFrontmatter {
  const frontmatterRegex = /\/\*\*\s*\n([\s\S]*?)\n\s*\*\//;
  const match = code.match(frontmatterRegex);

  if (!match) {
    throw new Error("No frontmatter found in generated code");
  }

  const frontmatter = match[1];
  const lines = frontmatter.split("\n");

  let title: string | undefined;
  let description: string | undefined;
  let mechanics: string[] = [];
  let dependencies: string[] = [];

  for (const line of lines) {
    const titleMatch = line.match(/@title\s+(.+)/);
    const descMatch = line.match(/@description\s+(.+)/);
    const mechanicsMatch = line.match(/@mechanics\s+(.+)/);
    const depsMatch = line.match(/@dependencies\s+(.+)/);

    if (titleMatch) title = titleMatch[1].trim();
    if (descMatch) description = descMatch[1].trim();
    if (mechanicsMatch)
      mechanics = mechanicsMatch[1].split(",").map((m) => m.trim());
    if (depsMatch) dependencies = depsMatch[1].split(",").map((d) => d.trim());
  }

  if (!(title && description)) {
    throw new Error("Missing required frontmatter fields");
  }

  return { title, description, mechanics, dependencies };
}
