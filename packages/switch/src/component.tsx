import { Switch as BaseSwitch } from "@base-ui-components/react/switch";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import type { SwitchProps } from "./types";
import { switchVariants } from "./variants";

const Switch = ({
	ref: forwardedRef,
	className,
	size,
	label,
	...props
}: SwitchProps & {
	ref?: React.RefObject<React.ElementRef<typeof BaseSwitch.Root> | null>;
}) => {
	const { root, thumb } = switchVariants({ size });
	if (label) {
		return (
			<div className="flex items-center space-x-2">
				<BaseSwitch.Root
					ref={forwardedRef}
					className={cx(root(), className)}
					data-testid="switch"
					{...props}
				>
					<BaseSwitch.Thumb className={cx(thumb())} />
				</BaseSwitch.Root>
				<span className="text-sm text-zinc-900 dark:text-zinc-100">
					{label}
				</span>
			</div>
		);
	}
	return (
		<BaseSwitch.Root
			ref={forwardedRef}
			className={cx(root(), className)}
			data-testid="switch"
			{...props}
		>
			<BaseSwitch.Thumb className={cx(thumb())} />
		</BaseSwitch.Root>
	);
};

Switch.displayName = "Switch";

export { Switch };
