import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { createHighlighter } from "shiki";
import { loadManifest, type ExperimentMetadata } from "@/lib/experiments";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// Cache highlighter instance
let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: ["tsx", "typescript", "javascript", "jsx", "css"],
    });
  }
  return highlighterPromise;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const manifest = await loadManifest();
    const experiment = manifest.experiments.find(
      (e: ExperimentMetadata) => e.id === id
    );

    if (!experiment) {
      return NextResponse.json({ error: "Experiment not found" }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), experiment.filePath);
    const code = await readFile(filePath, "utf-8");

    // Highlight the code with Shiki
    const highlighter = await getHighlighter();
    const highlighted = highlighter.codeToHtml(code, {
      lang: "tsx",
      theme: "github-dark",
    });

    return NextResponse.json({ code, highlighted });
  } catch (error) {
    console.error("Failed to read experiment code:", error);
    return NextResponse.json(
      { error: "Failed to read code", code: "// Code not available", highlighted: "" },
      { status: 500 }
    );
  }
}
