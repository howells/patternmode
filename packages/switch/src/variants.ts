import { tv } from "tailwind-variants";

export const switchVariants = tv({
	slots: {
		root: [
			// Track container
			"group relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent p-1",
			"transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
			// Default + checked backgrounds
			"bg-zinc-200 dark:bg-zinc-700",
            "data-[checked]:bg-zinc-900 aria-[checked=true]:bg-zinc-900",
            "dark:data-[checked]:bg-zinc-50 dark:aria-[checked=true]:bg-zinc-50",
		],
		thumb: [
			"pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-xl ring-0 transform-gpu transition-transform",
			// Left by default, slide right when checked
            "translate-x-0 data-[checked]:translate-x-5 group-aria-[checked=true]:translate-x-5 group-data-[checked]:translate-x-5",
		],
	},
});
