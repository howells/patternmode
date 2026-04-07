import { resolve } from "node:path";
import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable } from "fumadocs-typescript/ui";

const generator = createGenerator({
  tsconfigPath: resolve(process.cwd(), "../../tsconfig.json"),
});

interface PropTableProps {
  /** Exported type/interface name to document (e.g. "ButtonProps"). */
  component: string;
  /** Path to the source file, relative to the monorepo root (e.g. "packages/ui/src/components/button/button-root.tsx"). */
  source: string;
}

export async function PropTable({ component, source }: PropTableProps) {
  const filePath = resolve(process.cwd(), "../..", source);

  const tables = await AutoTypeTable({
    generator,
    path: filePath,
    name: component,
  });

  return <>{await Promise.all(tables)}</>;
}
