import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import {
  Copy,
  LogOut,
  Mail,
  MessageSquare,
  Settings,
  Trash2,
  User,
  UserPlus,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { MENU_ITEM_RADIUS } from "../../lib/menu-content";
import type { ComponentSize } from "../../lib/size";
import { VariantGrid } from "../../stories/utils/variant-grid";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { MenuItem } from "../menu-item/menu-item";
import { DropdownMenuContext } from "./dropdown-menu-context";

type DropdownMenuSize = Extract<ComponentSize, "xs" | "sm" | "base" | "lg">;
const SIZE_OPTIONS: DropdownMenuSize[] = ["xs", "sm", "base", "lg"];

type DropdownMenuStoryArgs = React.ComponentProps<typeof DropdownMenu> & {
  size?: DropdownMenuSize;
  triggerLabel?: string;
  menuLabel?: string;
};

const meta: Meta<DropdownMenuStoryArgs> = {
  title: "DropdownMenu",
  component: DropdownMenu,
  argTypes: {
    // Visual
    size: {
      control: "select",
      options: SIZE_OPTIONS,
      description: "Size of all menu items",
    },

    // Content
    triggerLabel: {
      control: "text",
      description: "Trigger button label",
    },
    menuLabel: {
      control: "text",
      description: "Menu label/heading",
    },
  },
  args: {
    size: "base",
    triggerLabel: "Open menu",
    menuLabel: "My Account",
  },
  parameters: {
    builder: {
      category: "interactive",
      icon: "menu",
    },
    docs: {
      description: {
        component:
          "List of actions or options. Supports nested submenus, checkboxes, radio groups, separators, and keyboard shortcuts.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Base interactive story with all controls.
 */
export const Base: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button appearance="outline" size={args.size} variant="secondary">
          {args.triggerLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" size={args.size}>
        <DropdownMenuLabel>{args.menuLabel}</DropdownMenuLabel>
        <DropdownMenuItem icon={User}>Profile</DropdownMenuItem>
        <DropdownMenuItem icon={Settings}>Settings</DropdownMenuItem>
        <DropdownMenuItem icon={Mail}>Messages</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={LogOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/** Static container that mimics DropdownMenuContent appearance. */
function StaticMenuContainer({
  size,
  children,
}: {
  size: ComponentSize;
  children: React.ReactNode;
}) {
  return (
    <DropdownMenuContext.Provider
      value={{
        size,
        itemRadiusClass: MENU_ITEM_RADIUS.default,
      }}
    >
      <div className="w-48 rounded-2xl border bg-popover p-1 text-popover-foreground shadow-xs">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

type ContentVariant = "basic" | "icons" | "destructive";

const CONTENT_COLUMNS: { key: ContentVariant; label: string }[] = [
  { key: "basic", label: "Basic" },
  { key: "icons", label: "With Icons" },
  { key: "destructive", label: "Destructive" },
];

/**
 * Size matrix showing all sizes across content variations.
 */
export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "The size prop on DropdownMenuContent controls the size of all menu items. Static previews shown here \u2014 open the Base story for interactive behavior.",
      },
    },
  },
  render: () => {
    const rows = SIZE_OPTIONS.map((size) => ({ key: size, label: size }));

    const renderCell = (size: DropdownMenuSize, variant: ContentVariant) => (
      <StaticMenuContainer size={size}>
        {variant === "basic" && (
          <>
            <MenuItem size={size}>Profile</MenuItem>
            <MenuItem size={size}>Settings</MenuItem>
            <MenuItem size={size}>Log out</MenuItem>
          </>
        )}
        {variant === "icons" && (
          <>
            <MenuItem icon={User} size={size}>
              Profile
            </MenuItem>
            <MenuItem icon={Settings} size={size}>
              Settings
            </MenuItem>
            <MenuItem icon={LogOut} size={size}>
              Log out
            </MenuItem>
          </>
        )}
        {variant === "destructive" && (
          <>
            <MenuItem icon={User} size={size}>
              Profile
            </MenuItem>
            <MenuItem icon={Settings} size={size}>
              Settings
            </MenuItem>
            <MenuItem icon={Trash2} size={size} variant="destructive">
              Delete
            </MenuItem>
          </>
        )}
      </StaticMenuContainer>
    );

    return (
      <VariantGrid
        columns={CONTENT_COLUMNS}
        renderCell={renderCell}
        rowLabels="Size"
        rows={rows}
      />
    );
  },
};

function ComplexExampleDemo() {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState("light");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button appearance="outline" variant="secondary">
          Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem icon={User} kbd={["\u2318", "P"]}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem icon={Settings} kbd={["\u2318", "S"]}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger icon={UserPlus}>
            Invite users
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem icon={Mail}>Email</DropdownMenuItem>
            <DropdownMenuItem icon={MessageSquare}>Message</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={Copy}>Copy link</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={notifications}
          onCheckedChange={setNotifications}
        >
          Notifications
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={LogOut} kbd={["\u21E7", "\u2318", "Q"]}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Comprehensive example with all features.
 */
export const ComplexExample: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A comprehensive example combining groups, separators, icons, shortcuts, checkboxes, radio groups, and submenus.",
      },
    },
  },
  render: () => <ComplexExampleDemo />,
};
