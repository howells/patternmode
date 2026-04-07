import type { ComponentAnatomy } from "./anatomy";

interface AnatomyRowProps {
  depth?: number;
  node: ComponentAnatomy;
}

function AnatomyRow({ node, depth = 0 }: AnatomyRowProps) {
  const indent = depth * 24;

  return (
    <>
      <tr className="border-border border-b last:border-b-0">
        <td className="py-2 pr-4" style={{ paddingLeft: `${indent + 12}px` }}>
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            {node.label}
          </code>
        </td>
        <td className="px-4 py-2">
          <code className="text-muted-foreground text-xs">{node.slot}</code>
        </td>
        <td className="py-2 pl-4 text-muted-foreground text-sm">
          {node.description}
        </td>
      </tr>
      {node.children?.map((child) => (
        <AnatomyRow depth={depth + 1} key={child.slot} node={child} />
      ))}
    </>
  );
}

interface AnatomyTableProps {
  anatomy: ComponentAnatomy;
}

/**
 * Renders component anatomy as a hierarchical table for Storybook documentation.
 *
 * @example
 * ```tsx
 * export const Anatomy: Story = {
 *   render: () => <AnatomyTable anatomy={cardAnatomy} />,
 * };
 * ```
 */
export function AnatomyTable({ anatomy }: AnatomyTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left">
        <thead>
          <tr className="border-border border-b bg-muted/50">
            <th className="py-2 pr-4 pl-3 font-medium text-sm">Component</th>
            <th className="px-4 py-2 font-medium text-sm">Slot</th>
            <th className="py-2 pl-4 font-medium text-sm">Description</th>
          </tr>
        </thead>
        <tbody>
          <AnatomyRow node={anatomy} />
        </tbody>
      </table>
    </div>
  );
}
