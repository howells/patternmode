import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { examples } from "../../lib/examples";
import { PreviewCode } from "./code";
import { PreviewRender } from "./render";

interface PreviewProps {
  path: string;
}

/**
 * Transform import paths for display purposes.
 * Keeps @patternmode/* paths as-is since they're the public API.
 */
function cleanSourceForDisplay(source: string): string {
  return source;
}

export async function Preview({ path }: PreviewProps) {
  const loader = examples[path];

  if (!loader) {
    return (
      <div className="rounded-lg border border-fd-border bg-fd-muted/50 p-6 text-center text-sm text-fd-muted-foreground">
        No preview available for <code>{path}</code>
      </div>
    );
  }

  // Load the component for live rendering
  const { default: Component } = await loader();

  // Read the source file for the code tab
  const examplePath = join(process.cwd(), "examples", `${path}.tsx`);
  let source: string;
  try {
    source = await readFile(examplePath, "utf-8");
  } catch {
    source = "// Source file not found";
  }

  const displaySource = cleanSourceForDisplay(source);

  return (
    <Tabs items={["Preview", "Code"]} defaultIndex={0}>
      <Tab value="Preview">
        <PreviewRender Component={Component} />
      </Tab>
      <Tab value="Code">
        <PreviewCode code={displaySource} title={`${path}.tsx`} />
      </Tab>
    </Tabs>
  );
}
