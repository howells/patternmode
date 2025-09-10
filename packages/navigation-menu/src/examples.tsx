"use client";

import { NavigationMenu } from "./components/navigation-menu";
import { NavigationMenuContent } from "./components/navigation-menu-content";
import { NavigationMenuItem } from "./components/navigation-menu-item";
import { NavigationMenuItemLink } from "./components/navigation-menu-item-link";
import { NavigationMenuLink } from "./components/navigation-menu-link";
import { NavigationMenuList } from "./components/navigation-menu-list";
import { NavigationMenuTrigger } from "./components/navigation-menu-trigger";
import { NavigationMenuViewport } from "./components/navigation-menu-viewport";

export const DefaultExample = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="space-y-2 p-4">
              <NavigationMenuLink href="#product1">
                Product 1
              </NavigationMenuLink>
              <NavigationMenuLink href="#product2">
                Product 2
              </NavigationMenuLink>
              <NavigationMenuLink href="#product3">
                Product 3
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="space-y-2 p-4">
              <NavigationMenuLink href="#service1">
                Service 1
              </NavigationMenuLink>
              <NavigationMenuLink href="#service2">
                Service 2
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const WithViewportExample = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-96 grid-cols-2 gap-4 p-6">
              <div>
                <h4 className="mb-2 font-medium">Software</h4>
                <NavigationMenuLink href="#app1">
                  Application 1
                </NavigationMenuLink>
                <NavigationMenuLink href="#app2">
                  Application 2
                </NavigationMenuLink>
              </div>
              <div>
                <h4 className="mb-2 font-medium">Hardware</h4>
                <NavigationMenuLink href="#device1">
                  Device 1
                </NavigationMenuLink>
                <NavigationMenuLink href="#device2">
                  Device 2
                </NavigationMenuLink>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Support</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-64 space-y-2 p-4">
              <NavigationMenuLink href="#docs">
                Documentation
              </NavigationMenuLink>
              <NavigationMenuLink href="#contact">
                Contact Support
              </NavigationMenuLink>
              <NavigationMenuLink href="#community">
                Community
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  );
};

export const MixedLinksExample = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuItemLink href="#home">Home</NavigationMenuItemLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="space-y-2 p-4">
              <NavigationMenuLink href="#product1">Web Apps</NavigationMenuLink>
              <NavigationMenuLink href="#product2">
                Mobile Apps
              </NavigationMenuLink>
              <NavigationMenuLink href="#product3">
                Desktop Apps
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuItemLink href="#about">About</NavigationMenuItemLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuItemLink href="#contact">
            Contact
          </NavigationMenuItemLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
