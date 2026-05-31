import type {
  ButtonHTMLAttributes,
  ComponentProps,
  ComponentType,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SVGProps,
} from "react";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link";

export interface BadgeProps extends ComponentProps<"span"> {
  asChild?: boolean;
  variant?: BadgeVariant;
}

export type TagSize = "sm" | "base" | "lg";

export type TagTone =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info";

type TagIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface TagProps extends Omit<BadgeProps, "asChild" | "color"> {
  children: ReactNode;
  disabled?: boolean;
  icon?: TagIcon;
  onRemove?: () => void;
  removeLabel?: string;
  selected?: boolean;
  size?: TagSize;
  /** @deprecated Use shadcn-compatible `variant` instead. */
  tone?: TagTone;
}

export interface TagItem {
  disabled?: boolean;
  id: string;
  label: string;
  variant?: BadgeVariant;
}

export interface TagRenderProps<TItem extends TagItem = TagItem> {
  disabled: boolean;
  item: TItem;
  removeProps: ButtonHTMLAttributes<HTMLButtonElement>;
  selected: true;
}

export interface TagOptionRenderProps<TItem extends TagItem = TagItem> {
  active: boolean;
  disabled: boolean;
  item: TItem;
  optionProps: ButtonHTMLAttributes<HTMLButtonElement>;
  selected: boolean;
}

export interface TagSelectorRootProps<TItem extends TagItem = TagItem>
  extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
  "aria-label"?: string;
  children?: ReactNode;
  disabled?: boolean;
  emptyMessage?: ReactNode;
  filterOption?: (item: TItem, query: string) => boolean;
  name?: string;
  onChange: (items: TItem[]) => void;
  onCreateItem?: (label: string) => Promise<TItem> | TItem;
  onSearchChange?: (query: string) => void;
  options: readonly TItem[];
  placeholder?: string;
  renderOption?: (props: TagOptionRenderProps<TItem>) => ReactNode;
  renderTag?: (props: TagRenderProps<TItem>) => ReactNode;
  searchValue?: string;
  separators?: readonly string[];
  serializeItem?: (item: TItem) => string;
  value: readonly TItem[];
}

export interface TagSelectorProps<TItem extends TagItem = TagItem>
  extends TagSelectorRootProps<TItem> {
  contentClassName?: string;
  searchPlaceholder?: string;
  triggerClassName?: string;
}

export interface TagSelectorTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
}

export interface TagSelectorContentProps
  extends HTMLAttributes<HTMLDivElement> {
  align?: "center" | "end" | "start";
  sideOffset?: number;
}

export interface TagSelectorSearchProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "children" | "onChange"
  > {}

export interface TagSelectorListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface TagSelectorEmptyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
