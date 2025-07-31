import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@patternmode/ui";
import React from "react";

export function DefaultExample() {
  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="#product1">Product 1</NavigationMenuLink>
          <NavigationMenuLink href="#product2">Product 2</NavigationMenuLink>
          <NavigationMenuLink href="#product3">Product 3</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Services</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink href="#service1">Service 1</NavigationMenuLink>
          <NavigationMenuLink href="#service2">Service 2</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>
  );
}
