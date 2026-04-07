const parseShortcut = (s: string) => s.split("+");

/**
 * Common keyboard shortcut presets.
 * Keys are human-readable labels; values are parsed key arrays.
 */
export const KBD_OPTIONS: Record<string, string[] | undefined> = {
  None: undefined,
  "⌘+A (Select All)": parseShortcut("cmd+a"),
  "⌘+C (Copy)": parseShortcut("cmd+c"),
  "⌘+V (Paste)": parseShortcut("cmd+v"),
  "⌘+X (Cut)": parseShortcut("cmd+x"),
  "⌘+Z (Undo)": parseShortcut("cmd+z"),
  "⌘+⇧+Z (Redo)": parseShortcut("cmd+shift+z"),
  "⌘+S (Save)": parseShortcut("cmd+s"),
  "⌘+K (Command)": parseShortcut("cmd+k"),
  "⌘+P (Print)": parseShortcut("cmd+p"),
  "⌘+F (Find)": parseShortcut("cmd+f"),
  "⌘+N (New)": parseShortcut("cmd+n"),
  "⌘+O (Open)": parseShortcut("cmd+o"),
  "⌘+W (Close)": parseShortcut("cmd+w"),
  "⌘+⇧+E (Export)": parseShortcut("cmd+shift+e"),
  "⌘+Enter (Submit)": parseShortcut("cmd+enter"),
  "⇧+Enter (New Line)": parseShortcut("shift+enter"),
  "⌥+↑ (Move Up)": parseShortcut("alt+up"),
  "⌥+↓ (Move Down)": parseShortcut("alt+down"),
  Esc: parseShortcut("esc"),
  Enter: parseShortcut("enter"),
  Tab: parseShortcut("tab"),
  Delete: parseShortcut("delete"),
};

/**
 * Reusable ArgType for a `kbd` prop:
 * - Renders a select dropdown of common keyboard shortcuts
 * - Maps the selected label to the parsed key array
 */
export const kbdControlArgType = {
  control: "select",
  options: Object.keys(KBD_OPTIONS),
  mapping: KBD_OPTIONS,
  description: "Choose a keyboard shortcut",
  table: {
    category: "Keyboard",
  },
} as const;
