"use client";

import type { NavigationMenuProps } from "./component";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./component";

export function NavigationMenuExample(props: NavigationMenuProps) {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 space-y-2">
              <NavigationMenuLink href="#product1">Product 1</NavigationMenuLink>
              <NavigationMenuLink href="#product2">Product 2</NavigationMenuLink>
              <NavigationMenuLink href="#product3">Product 3</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 space-y-2">
              <NavigationMenuLink href="#service1">Service 1</NavigationMenuLink>
              <NavigationMenuLink href="#service2">Service 2</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
