// Type declarations for lucide-react dynamic imports
// This helps TypeScript resolve the /dynamic import path

declare module "lucide-react/dynamic" {
	import type { ComponentType, SVGProps } from "react";

	export type DynamicIconProps = {
		name: string;
		fallback?: ComponentType<SVGProps<SVGSVGElement>>;
	} & SVGProps<SVGSVGElement>;

	export const DynamicIcon: ComponentType<DynamicIconProps>;
}
