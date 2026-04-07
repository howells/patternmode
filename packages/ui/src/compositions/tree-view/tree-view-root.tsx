"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import type * as React from "react";
import { createContext, useCallback, useContext, useState } from "react";
import { Icon } from "../../components/icon";
import { Text } from "../../components/text";

// ============================================================================
// Context
// ============================================================================

interface TreeViewContextValue {
  /** Current depth level (0 = root) */
  depth: number;
  /** Indentation per level in px */
  indent: number;
}

const TreeViewContext = createContext<TreeViewContextValue>({
  depth: 0,
  indent: 20,
});

function useTreeView() {
  return useContext(TreeViewContext);
}

// ============================================================================
// TreeView Root
// ============================================================================

export interface TreeViewProps extends React.ComponentProps<"div"> {
  /** Indentation per level in px. Default 20. */
  indent?: number;
}

/**
 * Container for a tree of collapsible items. Provides depth context
 * so children indent automatically.
 *
 * @example
 * ```tsx
 * <TreeView>
 *   <TreeViewItem label="Documents" icon={Folder}>
 *     <TreeViewItem label="README.md" icon={FileText} />
 *     <TreeViewItem label="Notes" icon={Folder}>
 *       <TreeViewItem label="Ideas.md" icon={FileText} />
 *     </TreeViewItem>
 *   </TreeViewItem>
 * </TreeView>
 * ```
 */
export function TreeView({
  children,
  className,
  indent = 20,
  ...props
}: TreeViewProps) {
  return (
    <TreeViewContext.Provider value={{ depth: 0, indent }}>
      <div
        className={cn("flex flex-col", className)}
        data-component="tree-view"
        data-slot="tree-view"
        role="tree"
        {...props}
      >
        {children}
      </div>
    </TreeViewContext.Provider>
  );
}

// ============================================================================
// TreeViewItem
// ============================================================================

export interface TreeViewItemProps {
  /** Child tree items (makes this a branch node) */
  children?: React.ReactNode;
  /** Additional classes */
  className?: string;
  /** Whether the branch starts expanded. Default false. */
  defaultOpen?: boolean;
  /** Icon component (Lucide icon or SVG component) */
  icon?: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** Item label text */
  label: string;
  /** Click handler for the label (not the expand toggle) */
  onClick?: () => void;
  /** Whether this item is currently selected/active */
  selected?: boolean;
  /** Trailing content (badges, actions, etc.) */
  suffix?: React.ReactNode;
}

/**
 * A single item in a TreeView. If `children` are provided, renders
 * as a collapsible branch with a chevron toggle. Otherwise renders
 * as a leaf node.
 */
export function TreeViewItem({
  children,
  className,
  defaultOpen = false,
  icon,
  label,
  onClick,
  selected = false,
  suffix,
}: TreeViewItemProps) {
  const { depth, indent } = useTreeView();
  const isBranch = !!children;
  const [open, setOpen] = useState(defaultOpen);

  const toggleOpen = useCallback(() => {
    if (isBranch) setOpen((prev) => !prev);
  }, [isBranch]);

  const handleClick = useCallback(() => {
    if (onClick) onClick();
    else if (isBranch) toggleOpen();
  }, [onClick, isBranch, toggleOpen]);

  const paddingLeft = depth * indent;

  return (
    <div data-slot="tree-view-item" role="treeitem" tabIndex={-1}>
      <button
        aria-expanded={isBranch ? open : undefined}
        className={cn(
          "flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left text-sm transition-colors",
          "hover:bg-muted/50",
          selected && "bg-muted text-foreground font-medium",
          !selected && "text-muted-foreground",
          className,
        )}
        onClick={handleClick}
        style={{ paddingLeft: paddingLeft + 8 }}
        type="button"
      >
        {/* Chevron for branches */}
        {isBranch ? (
          <span
            className={cn(
              "flex shrink-0 items-center justify-center transition-transform duration-150",
              open && "rotate-90",
            )}
            aria-hidden="true"
          >
            <Icon icon={ChevronRight} size="2xs" />
          </span>
        ) : (
          <span className="w-3.5 shrink-0" />
        )}

        {/* Icon */}
        {icon && (
          <Icon
            className="shrink-0 text-muted-foreground"
            icon={icon}
            size="xs"
          />
        )}

        {/* Label */}
        <Text
          asChild
          className={cn("truncate", selected && "text-foreground")}
          size="sm"
          variant={selected ? "default" : "muted"}
        >
          <span>{label}</span>
        </Text>

        {/* Suffix */}
        {suffix && <span className="ml-auto shrink-0">{suffix}</span>}
      </button>

      {/* Children (nested items) */}
      {isBranch && open && (
        <TreeViewContext.Provider value={{ depth: depth + 1, indent }}>
          <div>{children}</div>
        </TreeViewContext.Provider>
      )}
    </div>
  );
}
