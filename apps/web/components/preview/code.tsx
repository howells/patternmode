import { highlight } from "fumadocs-core/highlight";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";

interface PreviewCodeProps {
  code: string;
  title?: string;
}

export async function PreviewCode({ code, title }: PreviewCodeProps) {
  const rendered = await highlight(code, {
    lang: "tsx",
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <CodeBlock title={title} allowCopy>
      <Pre>{rendered}</Pre>
    </CodeBlock>
  );
}
