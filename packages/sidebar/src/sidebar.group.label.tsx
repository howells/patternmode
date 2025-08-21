import { useRender } from "@patternmode/ui/components/use-render";

export const SidebarGroupLabel = useRender<"div", { render?: React.ComponentType<React.HTMLAttributes<HTMLElement>> }>({
	as: "div",
	className: "text-zinc-500 dark:text-zinc-400 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 focus-visible:ring-zinc-200 dark:focus-visible:ring-zinc-800 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
	"data-slot": "sidebar-group-label",
	"data-sidebar": "group-label",
});
