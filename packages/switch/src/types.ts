import type { Switch as BaseSwitch } from "@base-ui-components/react/switch";

export type SwitchProps = {
  className?: string;
  size?: "xs" | "sm" | "base" | "lg";
  label?: string;
} & React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>;
