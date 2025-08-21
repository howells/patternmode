import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { useSidebar } from "./sidebar-store";

interface SidebarMobileProps {
	children: React.ReactNode;
}

export function SidebarMobile({ children }: SidebarMobileProps) {
	const state = useSidebar((s) => s.state);
	const setState = useSidebar((s) => s.setState);

	return (
		<BaseDialog.Root
			open={state === "open"}
			onOpenChange={(open) => setState(open ? "open" : "collapsed")}
		>
			<BaseDialog.Portal>
				<BaseDialog.Backdrop
					className={cx(
						"fixed inset-0 z-40",
						"bg-black/50 backdrop-blur-sm",
						"transition-opacity duration-200 ease-out",
					)}
				/>
				<BaseDialog.Popup
					className={cx(
						"fixed inset-y-0 left-0 z-50",
						"w-[--sidebar-open-width] max-w-xs",
						"bg-white dark:bg-zinc-900",
						"border-r border-zinc-200 dark:border-zinc-800",
						"transition-transform duration-200 ease-out",
						"focus:outline-none",
					)}
				>
					{children}
				</BaseDialog.Popup>
			</BaseDialog.Portal>
		</BaseDialog.Root>
	);
}
