"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./component";

export type NavigationMenuPreviewProps = {
  /**
   * Menu orientation layout.
   * Controls whether menu items are arranged horizontally or vertically.
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Number of menu items to display.
   * Controls how many top-level menu items are shown.
   */
  itemCount?: 2 | 3 | 4;
  /**
   * Whether to show menu item descriptions.
   * Controls if detailed descriptions appear in dropdown content.
   */
  showDescriptions?: boolean;
  /**
   * Dropdown content layout style.
   * Controls how submenu content is organized and displayed.
   */
  contentLayout?: "simple" | "grid" | "list";
};

export function NavigationMenuPreview({
  orientation = "horizontal",
  itemCount = 2,
  showDescriptions = false,
  contentLayout = "simple",
}: NavigationMenuPreviewProps = {}) {
  const menuItems = [
    {
      title: "Products",
      items: [
        { name: "Product 1", href: "#product1", desc: "Our flagship product solution" },
        { name: "Product 2", href: "#product2", desc: "Advanced product features" },
        { name: "Product 3", href: "#product3", desc: "Enterprise product offering" },
      ],
    },
    {
      title: "Services",
      items: [
        { name: "Consulting", href: "#service1", desc: "Expert consultation services" },
        { name: "Support", href: "#service2", desc: "24/7 customer support" },
      ],
    },
    {
      title: "Company",
      items: [
        { name: "About", href: "#about", desc: "Learn about our mission" },
        { name: "Careers", href: "#careers", desc: "Join our growing team" },
      ],
    },
    {
      title: "Resources",
      items: [
        { name: "Documentation", href: "#docs", desc: "Technical documentation" },
        { name: "Blog", href: "#blog", desc: "Latest news and insights" },
      ],
    },
  ].slice(0, itemCount);

  const getContentClassName = () => {
    switch (contentLayout) {
      case "grid":
        return "grid grid-cols-2 gap-3 p-4";
      case "list":
        return "p-4 space-y-3";
      default:
        return "p-4 space-y-2";
    }
  };

  return (
    <NavigationMenu orientation={orientation}>
      <NavigationMenuList>
        {menuItems.map(menu => (
          <NavigationMenuItem key={menu.title}>
            <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className={getContentClassName()}>
                {menu.items.map(item => (
                  <NavigationMenuLink key={item.name} href={item.href}>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      {showDescriptions && (
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                          {item.desc}
                        </div>
                      )}
                    </div>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// Preview props for prop explorer
export const navigationMenuPreviewProps = [
  {
    name: "orientation",
    type: "select",
    description: "Menu orientation layout - controls whether menu items are arranged horizontally or vertically.",
    options: ["horizontal", "vertical"],
    defaultValue: "horizontal",
  },
  {
    name: "itemCount",
    type: "select",
    description: "Number of menu items to display - controls how many top-level menu items are shown.",
    options: [2, 3, 4],
    defaultValue: 3,
  },
  {
    name: "showDescriptions",
    type: "boolean",
    description: "Whether to show menu item descriptions - controls if detailed descriptions appear in dropdown content.",
    defaultValue: true,
  },
  {
    name: "contentLayout",
    type: "select",
    description: "Dropdown content layout style - controls how dropdown content is organized and displayed.",
    options: ["grid", "list", "featured"],
    defaultValue: "grid",
  },
];
