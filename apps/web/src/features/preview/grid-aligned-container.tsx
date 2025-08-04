import React from "react";

type GridAlignedContainerProps = {
  children: React.ReactNode;
  isResponsive?: boolean;
};

/**
 * Component that centers components horizontally with optional responsive behavior
 */
export const GridAlignedContainer: React.FC<GridAlignedContainerProps> = ({
  children,
  isResponsive = false,
}) => {
  if (isResponsive) {
    // For responsive components, provide full width and center them
    return (
      <div className="w-full flex justify-center">
        {children}
      </div>
    );
  }

  // For all other components, just center them horizontally
  return (
    <div className="flex justify-center">
      {children}
    </div>
  );
};
