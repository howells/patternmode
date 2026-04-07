import { highlight } from "fumadocs-core/highlight";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

interface InstallerProps {
  /** npm package name (e.g. "@patternmode/ui"). */
  package: string;
  /** Import path within the package (e.g. "components/button"). When provided, shows an import example. */
  path?: string;
}

export async function Installer({ package: pkg, path }: InstallerProps) {
  const installCode = `pnpm add ${pkg}`;
  const installRendered = await highlight(installCode, {
    lang: "bash",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  if (!path) {
    return (
      <CodeBlock title="Install" allowCopy>
        <Pre>{installRendered}</Pre>
      </CodeBlock>
    );
  }

  const componentName = path
    .split("/")
    .pop()
    ?.replace(/(^[a-z])/, (c) => c.toUpperCase())
    .replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

  const importCode = `import { ${componentName} } from "${pkg}/${path}";`;
  const importRendered = await highlight(importCode, {
    lang: "tsx",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <CodeBlock title="Install" allowCopy>
        <Pre>{installRendered}</Pre>
      </CodeBlock>
      <CodeBlock title="Import" allowCopy>
        <Pre>{importRendered}</Pre>
      </CodeBlock>
    </div>
  );
}
