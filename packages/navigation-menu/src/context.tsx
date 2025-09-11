import React from "react";

/**
 * Context for sharing navigation menu configuration
 */
export const NavigationMenuContext = React.createContext<{
  /** Whether the navigation menu should use rounded styling */
  rounded?: boolean;
  /** Whether the navigation menu should use ring styling */
  ring?: boolean;
}>({});

NavigationMenuContext.displayName = "NavigationMenuContext";

/**
 * Hook to access navigation menu context
 */
export const useNavigationMenuContext = () => {
  const context = React.useContext(NavigationMenuContext);
  return context;
};

/**
 * Provider component for navigation menu context
 */
export const NavigationMenuProvider: React.FC<{
  rounded?: boolean;
  ring?: boolean;
  children: React.ReactNode;
}> = ({ rounded = false, ring = false, children }) => (
  <NavigationMenuContext.Provider value={{ rounded, ring }}>
    {children}
  </NavigationMenuContext.Provider>
);
