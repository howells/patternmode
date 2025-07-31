import { Kbd } from "@patternmode/ui";

// Default example - basic keyboard shortcut
export const /**
              *
              */
  DefaultExample = () => <Kbd>K</Kbd>;

// Key combination example - multiple keys
export const /**
              *
              */
  CombinationExample = () => (
    <Kbd keys={["cmd", "shift", "k"]}>Command palette</Kbd>
  );

// Sizes example - different size variants
export const /**
              *
              */
  SizesExample = () => (
    <div className="flex gap-2">
      <Kbd size="xs">Esc</Kbd>
      <Kbd size="sm">Esc</Kbd>
      <Kbd size="base">Esc</Kbd>
      <Kbd size="lg">Esc</Kbd>
    </div>
  );

// Keep the original KbdExample for the preview component
export const /**
              *
              */
  KbdExample = ({
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
