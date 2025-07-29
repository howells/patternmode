import { Kbd } from "@patternmode/ui";

export const KbdExample = ({
  keys,
  platform = "auto",
  size = "sm",
  children = "K",
  ...props
}: {
  keys?: string[];
  platform?: "mac" | "pc" | "auto";
  size?: "xs" | "sm" | "base" | "lg";
  children?: React.ReactNode;
  [key: string]: unknown;
}) => {
  return (
    <div className="flex items-center gap-4 p-4">
      <span className="text-sm text-zinc-600 dark:text-zinc-400">
        Keyboard shortcut:
      </span>
      <Kbd keys={keys} platform={platform} size={size} {...props}>
        {children}
      </Kbd>
    </div>
  );
};