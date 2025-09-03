import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";

interface SidebarGroupLabelProps extends useRender.ComponentProps<"div"> {}

export function SidebarGroupLabel({
  render = <div />,
  ...props
}: SidebarGroupLabelProps) {
  const defaultProps = {
    className:
      "text-zinc-500 dark:text-zinc-400 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 focus-visible:ring-zinc-200 dark:focus-visible:ring-zinc-800 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
    "data-slot": "sidebar-group-label",
    "data-sidebar": "group-label",
  } as useRender.ElementProps<"div">;

  const element = useRender({
    render,
    props: mergeProps<"div">(defaultProps, props),
  });

  return element;
}
